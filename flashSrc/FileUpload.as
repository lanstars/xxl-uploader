package {
    import flash.display.Sprite;
    import flash.events.*;
	import flash.events.TimerEvent;
    import flash.net.FileFilter;
    import flash.net.FileReference;
    import flash.net.URLRequest;
	import flash.net.URLVariables;
	import flash.utils.Timer;

    public class FileUpload extends Sprite {
		
        private var uploadURL:URLRequest;
        private var fileRef:FileReference;
		
		private var callBackFun:Function;
		private var checkFileFun:Function;
		private var proHanderFun:Function;
		private var errHanderFun:Function;
		
		private var currLoaded:uint = 0;
		private var totalSize:uint = 0;
		private var myTimer:Timer;
		private var uploadSeconds:uint = 1;
		private var fileName:String = "";
		private var fieldName:String = "filedata";
		
        public function FileUpload(_checkFileFun:Function, _callBackFun:Function, _proHanderFun:Function, _errHanderFun:Function) {
			checkFileFun = _checkFileFun;
			callBackFun = _callBackFun;
			proHanderFun = _proHanderFun;
			errHanderFun = _errHanderFun;
        }
		
		//取消操作
		public function cancel():void{
			fileRef.cancel();
			myTimer.stop();
		}
		
		public function getfileRef(){
			return fileRef.name;
		}
		//上传文件
		public function uploadFile(url:String, upParam:Array, fileType:String, fieldName:String){
			if(url.indexOf("?") < 0) url += "?version=" + new Date().getTime();
			else  url += "&version=" + new Date().getTime();
			this.fieldName = fieldName;
			
			uploadURL = new URLRequest(); 
			uploadURL.contentType = "multipart/form-data";
			
			//var header:flash.net.URLRequestHeader = new flash.net.URLRequestHeader("asbc", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8");
			//uploadURL.requestHeaders.push(header);
			
			uploadURL.url = url;
			uploadURL.method = "POST";
			var urlVar:URLVariables = new URLVariables();
			var param:Array;
		
			for(var i=0;i<upParam.length;i++){
				param = upParam[i].split("=");
				urlVar[param[0]] = param[1];
			}
			
			uploadURL.data = urlVar;
			
			fileRef = new FileReference();
			fileRef.addEventListener(Event.SELECT, selectHandler);
			fileRef.addEventListener(ProgressEvent.PROGRESS, progressHandler);
			fileRef.addEventListener(DataEvent.UPLOAD_COMPLETE_DATA, completeHandler);
			fileRef.addEventListener(IOErrorEvent.IO_ERROR,errorHandler);
			
			if(fileType == "file"){
				fileRef.browse([new FileFilter("File(.pdf,.doc,.txt,.rar,.zip,.ppt,.xls,.html,.xls,.htm,.js,.gif)", "*.pdf;*.doc;*.txt;*.rar;*.zip;*.ppt;*.xls;*.html;*.htm;*.js;*.gif")]);
			}else if(fileType == "image"){
				fileRef.browse([new FileFilter("Image(.gif,.png,.bmp,.jpg,.ico)", "*.gif;*.png;*.bmp;*.jpg;*.ico;")]);
			}else{
				fileRef.browse([new FileFilter(fileType, fileType)]);
			}
			
			
		}
		
		//选择一个文件
		function selectHandler(event:Event):void{
			
			try{
				if(checkFileFun(fileRef.name, fileRef.size)){
					//public function upload(request:URLRequest, uploadDataFieldName:String = "Filedata", testUpload:Boolean = false):void
					fileRef.upload(uploadURL, fieldName, false);
					fileName = fileRef.name;
					totalSize = fileRef.size;
					
					myTimer = new Timer(1000,0);
            		myTimer.addEventListener("timer", function(e:TimerEvent){uploadSeconds++;});
            		myTimer.start();
				}
        		
    		} catch (error:Error){
        		trace("Trace: Unable to upload file.");
    		}
			
		}
		/*
		 *文件上传过程中的事件处理
		 */
		function progressHandler(e:ProgressEvent):void {
			currLoaded = e.bytesLoaded;
			totalSize = e.bytesTotal;
			this.proHanderFun(fileName, currLoaded, totalSize, uploadSeconds);
			if(e.bytesLoaded >= e.bytesTotal) myTimer.stop();
        }
		function completeHandler(e:DataEvent):void{
			this.callBackFun(e.data, fileName, totalSize, uploadSeconds);
			this.cancel();
		}
		function errorHandler(e:IOErrorEvent):void{
			this.errHanderFun(fileName, e.text);
			this.cancel();
		}
    }
}