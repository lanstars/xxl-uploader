/**
 * @Created cdlanxingxing@jd.com on 2015/9/27.
 * @Use ajax(formData)、flash、form(iFrame)三种方案
 * @Demo new UploadBase({ target : $but, isFlash : false, postData :{ folderId:0, type:0 } })
 * .on('select',function(data){ })
 * .on('success',function(data){ })
 */
!(function (factory) {
    if (typeof define === 'function') {
        define(factory);
    } else {
        window['XxlUploader'] = factory();
    }
})(function () {

    /**
     * flash uploader class
     * @type {*|exports|module.exports}
     */
    var xxlSwfUploader = window.xxlSwfUploader || void(0);

    function XxlUploader(options) {

        this.config = $.extend({
            target:'',
            fileName: 'file',
            postUrl: '',
            postData: {},
            isFlash: false,
            swfUrl: '',
            fileTypes: "*.gif;*.jpg;*.jpeg;*.png;*.bmp",
            fileMaxCount: 1,
            isHandUpload: false,
            fileMaxSize: 1024 * 1024 * 2
        }, options);

        this.target = $(this.config.target);

        this.isHTML5 = window.FormData ? true : false;

        if(!xxlSwfUploader) this.isFlash = false;

        /* 存放事件处理函数 */
        this.cash = {};
        /* 当前实例化ID */
        this.placeholder = 'xxlUploaderBtn' + parseInt(Math.random() * 1000);

        /* 存放等待上传的队列 */
        this.queue = [];

        this.init();
    }

    $.extend(XxlUploader, {
        type: {AUTO: 'auto', IFRAME: 'iframe', AJAX: 'ajax', FLASH: 'flash'},
        event: {
            //选择完文件后触发
            SELECT: 'select',
            //向队列添加一个文件后触发
            ADD: 'add',
            //开始上传后触发
            START: 'start',
            //正在上传中时触发
            PROGRESS: 'progress',
            //上传成功后触发
            SUCCESS: 'success',
            //取消上传后触发
            CANCEL: 'cancel',
            //上传失败后触发
            ERROR: 'error',
            //移除队列中的一个文件后触发
            REMOVE: 'remove',
            //初始化默认文件数据时触发
            RESTORE: 'restore',

            //批量上传结束后触发（在上传成功或上传失败后都会触发）
            COMPLETES: 'completes'
        },
        status: {
            WAITING: 'waiting',
            START: 'start',
            PROGRESS: 'progress',
            SUCCESS: 'success',
            CANCEL: 'cancel',
            ERROR: 'error'
        },
        formatSize: function (size, pointLength, units) {
            var unit;
            var units = units || ['B', 'K', 'M', 'G', 'TB'];
            while ((unit = units.shift()) && size > 1024) size = size / 1024;
            return unit ? (( unit === 'B' ? size.toFixed(0) : size.toFixed(pointLength || 2) ) + unit) : (size.toFixed((pointLength || 2)) + 'TB');
        },
        getGuId: (function () {
            var counter = 0;
            return function (prefix, bits) {
                var guid = (+new Date()).toString(32), i = 0;
                for (; i < 5; i++) {
                    guid += Math.floor(Math.random() * 65535).toString(32);
                }
                var u = guid + (counter++).toString(32);
                if (bits && bits < u.length) u = u.substr(u.length - bits, u.length);
                return (prefix || 'U') + u;
            };
        })(),
        loadScripts: function (url) {
            var success = function () {
            };
            var error = function () {
            };
            var isSuccessEnd = false, isErrorEnd = false;
            var script = document.createElement('script');
            script.type = 'text/javascript';
            console.log('loaded:', url);
            script.onload = function () {
                isSuccessEnd = true;
                document.head.removeChild(script);
                success();
            }
            script.onerror = function () {
                isErrorEnd = true;
                error();
            }
            document.head.appendChild(script);
            return {
                done: function (callback) {
                    if (isSuccessEnd == true) callback();
                    else success = callback;
                },
                fail: function (callback) {
                    if (isErrorEnd == true) callback();
                    else error = callback;
                }
            }
        }
    });

    $.extend(XxlUploader.prototype, {
        init: function () {
            var self = this;
            self._renderButton();
        },
        on: function (type, cb) {
            var self = this;
            if (!self.cash[type]) {
                self.cash[type] = [];
            }
            self.cash[type].push(cb);
            return self;
        },
        fire: function (type, data) {
            var self = this, types = self.cash[type];
            if (types) {
                $.each(types, function (key, item) {
                    item(data);
                })
            }
            return self;
        },
        /**
         * 移除队列中的文件
         * @param fileIds
         */
        remove: function (ids) {
            var self = this;
            var temps = [];
            $.each(ids, function (i, id) {
                for (var i = 0; i < self.queue.length; i++) {
                    if (self.queue[i].id == id) {
                        temps.push(self.queue[i]);
                        self.queue.splice(i, 1);
                    }
                }
            });

            if (self.queue.length == 0) self.target[0].value = '';

            self.fire(XxlUploader.event.REMOVE, temps);
        },
        /**
         * 移除队列中所有的文件
         */
        removeAll: function () {
            var self = this;
            var temps = self.queue;
            self.queue = [];
            self.target[0].value = '';
            self.fire(XxlUploader.event.REMOVE, temps);
        },
        /**
         * 取消文件上传，当index参数不存在时取消当前正在上传的文件的上传。cancel并不会停止其他文件的上传（对应方法是stop）
         * @param {Number} index 队列数组索引
         * @return {XxlUploader}
         */
        cancel: function (index) {
            return self;
        },
        /**
         * 停止上传动作
         * @return {XxlUploader}
         */
        stop: function () {
            var self = this;
            self.set('uploadFilesStatus', '');
            self.cancel();
            return self;
        },
        /**
         * 批量上传队列中的指定状态下的文件
         */
        uploadFiles: function () {
            var self = this;
            self._renderUploaderCore();
        },

        /**
         * 取消上传后调用的方法
         _uploadStopHanlder:function () {
            var self = this, queue = self.get('queue'), index = self.get('curUploadIndex');
            queue.fileStatus(index, XxlUploader.status.CANCEL);
            self.set('curUploadIndex', '');
            self.fire(XxlUploader.event.CANCEL, {index:index});
        },*/

        _get: function (type) {
            var self = this;
            return self.config[type];
        },
        /**
         * 运行Button上传按钮组件
         * @return {Button}
         */
        _renderButton: function () {
            var self = this
            var buttonTarget = self.target;

            if (self._get('isFlash')) {

                var id = self.placeholder;
                var replacement = $('<input id="' + id + '">');
                buttonTarget.append(replacement);
                buttonTarget.css({'position': 'relative'});

                new xxlSwfUploader.Uploader({
                    flashId: id,
                    swfUrl: self.config.swfUrl,
                    postUrl: self.config.postUrl,
                    postData: self.config.postData,
                    fieldName: self.config.fileName,
                    fileTypes: self.config.fileTypes,
                    fileMaxSize: self.config.fileMaxSize,
                    fileMaxCount: self.config.fileMaxCount,
                    debug: true
                })
                    .on(xxlSwfUploader.EVENT.PROGRESS, function (flashId, fileName, uploadScale, scaleInfo, uploadSpeed, residualTime, currLoaded, totalSize) {
                        self.fire(XxlUploader.event.PROGRESS, {
                            fileName: fileName,
                            uploadScale: uploadScale,
                            scaleInfo: scaleInfo,
                            uploadSpeed: uploadSpeed,
                            residualTime: residualTime,
                            currLoaded: currLoaded,
                            totalSize: totalSize
                        });
                    })
                    .on(xxlSwfUploader.EVENT.COMPLETE, function (flashId, rsData, fileName, fileSize, uploadSeconds) {
                        self.fire(XxlUploader.event.SUCCESS, JSON.parse(rsData));
                    })
                    .on(xxlSwfUploader.EVENT.ERROR, function (flashId, type, desc, fileName, maxsize, filesize) {
                        self.fire(XxlUploader.event.SUCCESS, {
                            type: type,
                            desc: desc,
                            fileName: fileName,
                            maxsize: maxsize,
                            filesize: filesize
                        });
                    });

            } else {
                if (buttonTarget[0].tagName.toLowerCase() !== 'input' && buttonTarget.attr('type') !== 'file') {
                    $(buttonTarget).append('<input id="' + self.placeholder + '" name="file" type="file"/>');
                    self.target = $(buttonTarget).find('input');
                    if (self.config.fileMaxCount > 1) {
                        self.target.attr('multiple', 'multiple');
                    }
                    if (self._get('fileTypes')) {
                        //self.target.attr('accept','image/png,image/jpeg,image/gif,image/bmp');
                        self.target.attr('accept', self._get('fileTypes').replace(/;/g, ',').replace(/\*/g, ''));
                    }
                }
                self.target.on('change', $.proxy(self, '_select'));
            }

            buttonTarget.addClass('uploaderBtn').find('object,input').css({
                'position': 'absolute',
                'right': 0,
                'top': 0,
                'width': '100%',
                'height': '100%',
                'margin': 0,
                'padding': 0,
                'opacity': 0
            });

            return $(buttonTarget);
        },
        _select: function (ev) {
            var self = this;
            var target = ev.target;
            var files = target.files || [];
            var value = target.value;

            if (files.length > 0) {
                $.each(files, function (key, file) {
                    if (!file.size) file.size = 0;
                    //chrome文件名属性名为fileName，而firefox为name
                    if (!file.name) file.name = file.fileName || '';
                    file.input = target; //ev.input || file;
                    file.ext = ( file.name.substr(file.name.lastIndexOf('.') + 1) ).toLowerCase();
                    file.id = XxlUploader.getGuId('f_', 8);
                });
                //self.fire( XxlUploader.event.SELECT, files );
                //self._dealWithFiles();
            } else if (value.length > 0) {
                //b<=ie9,only one file
                console.log(value);
                files.push({
                    id: XxlUploader.getGuId('f_', 8),
                    size: 0,
                    name: value.substr(value.lastIndexOf('\\') + 1),
                    ext: ( value.substr(value.lastIndexOf('.') + 1) ).toLowerCase(),
                    input: target
                });
                //self.fire(XxlUploader.event.SELECT, files);
                //self._dealWithFiles();
            }


            var fts = self._get('fileTypes');
            var maxSize = self._get('fileMaxSize');

            /* 当前错误的文件列表 */
            var errorFiles = [];
            /* 清空队列 */
            self.queue = [];

            $.each(files, function (i, file) {
                if (fts.indexOf(file.ext) < 0 || file.size > maxSize) {
                    errorFiles.push(file);
                } else {
                    self.queue.push(file);
                }
            });

            if (self.queue.length > 0) {
                self.fire(XxlUploader.event.SELECT, self.queue);
                self._dealWithFiles();
            }

            if (errorFiles.length > 0) {
                self.fire(XxlUploader.event.ERROR, errorFiles);
            }

            console.log('input.files', files);
        },
        /**
         * 处理文件
         */
        _dealWithFiles: function () {
            var self = this;
            var isHandUpload = self._get('isHandUpload');
            if (!isHandUpload) {
                self._renderUploaderCore();
            }
        },
        /**
         *  运行上传核心类（根据不同的上传方式，有所差异）
         * @private
         */
        _renderUploaderCore: function (files) {
            var self = this;

            if (!files) files = self.target[0].files;

            self.fire(XxlUploader.event.START, []);

            //选择上传方式
            if (self.isHTML5) {
                self._html5Upload(files);
            } else {
                self._iframeUpload();
            }
        },
        _html5Upload: function () {
            var self = this;
            var files = self.queue;

            var url = self.config.postUrl;
            var name = self.config.fileName;
            var postData = self.config.postData;


            $.each(files, function (i, file) {

                var formData = new FormData();

                $.each(postData, function (k, v) {
                    formData.append(k, v);
                });

                formData.append(name, file);

                self.fire(XxlUploader.event.START, [file]);

                self._ajaxUploadFile(url, formData, file.id);
            });

            /* for ( var i=0; i < self.queue.length; i++ ) {
             formData.append(name, self.queue[i]);
             }
             self._ajaxUploadFile( url, formData );*/
        },
        _iframeUpload: function () {
            var self = this;

            var files = self.queue;

            self.fire(XxlUploader.event.START, files);

            var className = 'hide';
            var frameId = 'result_' + self.placeholder;
            var form = document.createElement('form');
            var file = self.target;
            var body = document.getElementsByTagName('body')[0];
            var frame = document.createElement('iframe');

            form.className = className;
            form.target = frameId;
            form.action = self.config.postUrl;
            form.method = 'post';
            form.enctype = 'multipart/form-data';

            frame.id = frameId;
            frame.name = frameId;
            frame.className = className;

            $.each(self.config.postData, function (k, v) {
                var input = document.createElement('input');
                input.name = k;
                input.value = v;
                form.appendChild(input)
            });
            var parent = $(file).parent();
            $(form).append(file);
            body.appendChild(form);
            body.appendChild(frame);
            form.submit();
            $(parent).append(file);
            $(form).remove();
            self._checkUploadStatus(frameId, $.proxy(self, '_success'));
        },
        _checkUploadStatus: function (frameId, success) {
            var self = this;
            var fileId = self.queue[0].id;

            var result = null;
            var uploadTimer = setInterval(function () {
                result = $(document.getElementById(frameId).contentWindow.document.body).html();
                console.log("iframe 检测 " + result)
                if (result) {
                    var data;
                    try {
                        data = JSON.parse(result);
                        success(data, fileId);
                    } catch (ex) {
                        success({code: -1, data: null, desc: "连接超时"}, fileId);
                    }
                    clearInterval(uploadTimer);
                    $('#' + frameId).remove();
                }
            }, 50);
        },

        _ajaxUploadFile: function (url, formdata, fileId) {
            var self = this;
            var defaultCon = {
                url: url,
                type: 'post',
                data: formdata,
                dataType: 'json',
                success: function (data) {
                    self._success(data, fileId);
                },
                error: function () {
                    self._success({code: -1, data: null, desc: "连接超时"}, fileId);
                },
                beforeSend: function () {
                }
            };
            //Ajax需要设置processData: false,contentType: false。
            var ajaxCon = $.extend(defaultCon, {processData: false, contentType: false});
            console.log(ajaxCon);
            $.ajax(ajaxCon)
        },

        /**
         * 上传成功后执行的回调函数
         * @param {Object} data 服务器端返回的数据
         */
        _success: function (data, fileId) {
            var self = this;

            data['local'] = {id: fileId};
            self.fire(XxlUploader.event.SUCCESS, data);

            var isAllComplete = true, i = 0;
            for (; i < self.queue.length; i++) {
                if (self.queue[i].id === fileId) {
                    self.queue[i]['ajaxComplete'] = true;
                    break;
                }
                if (!self.queue[i]['ajaxComplete']) isAllComplete = false;
            }

            if (isAllComplete) {
                for (; i < self.queue.length; i++) {
                    if (!self.queue[i]['ajaxComplete']) isAllComplete = false;
                }
            }

            isAllComplete && self._completes();
        },
        _completes: function () {
            var self = this;
            //self.queue = [];
            //self.target[0].value = '';
            self.fire(XxlUploader.event.COMPLETES);
        },
        _error: function (data) {
            var self = this;
            self.fire(XxlUploader.event.ERROR, data)
        }
    });

    /**
     * 主要用于用户改变POST参数改变 特殊处理
     * @param config
     */
    XxlUploader.prototype.resetConfig = function (config) {
        this.config = $.extend(this.config, config);
    };

    return XxlUploader;
});