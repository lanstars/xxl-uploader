/**
 * @Created by xingxing.lan@qq.com on 2015/10/20.
 * @Need SWFObject v2.2
 * @SWFObjectType {{registerObject, getObjectById, embedSWF, switchOffAutoHideShow, ua, getFlashPlayerVersion, hasFlashPlayerVersion, createSWF, showExpressInstall, removeSWF, createCSS, addDomLoadEvent, addLoadEvent, getQueryParamValue, expressInstallCallback}}
 */
;(function(callback){

    var swfobject=function(){var d="undefined",R="object",s="Shockwave Flash",w="ShockwaveFlash.ShockwaveFlash",Q="application/x-shockwave-flash",r="SWFObjectExprInst",X="onreadystatechange",o=window,J=document,T=navigator,t=false,u=[H],O=[],n=[],i=[],L,q,e,b,j=false,A=false,N,g,M=true,m=function(){var AA=typeof J.getElementById!=d&&typeof J.getElementsByTagName!=d&&typeof J.createElement!=d,AH=T.userAgent.toLowerCase(),y=T.platform.toLowerCase(),AE=y?/win/.test(y):/win/.test(AH),AC=y?/mac/.test(y):/mac/.test(AH),AF=/webkit/.test(AH)?parseFloat(AH.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,x=!+"\v1",AG=[0,0,0],AB=null;if(typeof T.plugins!=d&&typeof T.plugins[s]==R){AB=T.plugins[s].description;if(AB&&!(typeof T.mimeTypes!=d&&T.mimeTypes[Q]&&!T.mimeTypes[Q].enabledPlugin)){t=true;x=false;AB=AB.replace(/^.*\s+(\S+\s+\S+$)/,"$1");AG[0]=parseInt(AB.replace(/^(.*)\..*$/,"$1"),10);AG[1]=parseInt(AB.replace(/^.*\.(.*)\s.*$/,"$1"),10);AG[2]=/[a-zA-Z]/.test(AB)?parseInt(AB.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof o.ActiveXObject!=d){try{var AD=new ActiveXObject(w);if(AD){AB=AD.GetVariable("$version");if(AB){x=true;AB=AB.split(" ")[1].split(",");AG=[parseInt(AB[0],10),parseInt(AB[1],10),parseInt(AB[2],10)]}}}catch(z){}}}return{w3:AA,pv:AG,wk:AF,ie:x,win:AE,mac:AC}}(),K=function(){if(!m.w3){return }if((typeof J.readyState!=d&&J.readyState=="complete")||(typeof J.readyState==d&&(J.getElementsByTagName("body")[0]||J.body))){F()}if(!j){if(typeof J.addEventListener!=d){J.addEventListener("DOMContentLoaded",F,false)}if(m.ie&&m.win){J.attachEvent(X,function(){if(J.readyState=="complete"){J.detachEvent(X,arguments.callee);F()}});if(o==top){(function(){if(j){return }try{J.documentElement.doScroll("left")}catch(x){setTimeout(arguments.callee,0);return }F()})()}}if(m.wk){(function(){if(j){return }if(!/loaded|complete/.test(J.readyState)){setTimeout(arguments.callee,0);return }F()})()}S(F)}}();function F(){if(j){return }try{var z=J.getElementsByTagName("body")[0].appendChild(c("span"));z.parentNode.removeChild(z)}catch(AA){return }j=true;var x=u.length;for(var y=0;y<x;y++){u[y]()}}function k(x){if(j){x()}else{u[u.length]=x}}function S(y){if(typeof o.addEventListener!=d){o.addEventListener("load",y,false)}else{if(typeof J.addEventListener!=d){J.addEventListener("load",y,false)}else{if(typeof o.attachEvent!=d){I(o,"onload",y)}else{if(typeof o.onload=="function"){var x=o.onload;o.onload=function(){x();y()}}else{o.onload=y}}}}}function H(){if(t){v()}else{h()}}function v(){var x=J.getElementsByTagName("body")[0];var AA=c(R);AA.setAttribute("type",Q);var z=x.appendChild(AA);if(z){var y=0;(function(){if(typeof z.GetVariable!=d){var AB=z.GetVariable("$version");if(AB){AB=AB.split(" ")[1].split(",");m.pv=[parseInt(AB[0],10),parseInt(AB[1],10),parseInt(AB[2],10)]}}else{if(y<10){y++;setTimeout(arguments.callee,10);return }}x.removeChild(AA);z=null;h()})()}else{h()}}function h(){var AG=O.length;if(AG>0){for(var AF=0;AF<AG;AF++){var y=O[AF].id;var AB=O[AF].callbackFn;var AA={success:false,id:y};if(m.pv[0]>0){var AE=C(y);if(AE){if(f(O[AF].swfVersion)&&!(m.wk&&m.wk<312)){W(y,true);if(AB){AA.success=true;AA.ref=Z(y);AB(AA)}}else{if(O[AF].expressInstall&&a()){var AI={};AI.data=O[AF].expressInstall;AI.width=AE.getAttribute("width")||"0";AI.height=AE.getAttribute("height")||"0";if(AE.getAttribute("class")){AI.styleclass=AE.getAttribute("class")}if(AE.getAttribute("align")){AI.align=AE.getAttribute("align")}var AH={};var x=AE.getElementsByTagName("param");var AC=x.length;for(var AD=0;AD<AC;AD++){if(x[AD].getAttribute("name").toLowerCase()!="movie"){AH[x[AD].getAttribute("name")]=x[AD].getAttribute("value")}}p(AI,AH,y,AB)}else{P(AE);if(AB){AB(AA)}}}}}else{W(y,true);if(AB){var z=Z(y);if(z&&typeof z.SetVariable!=d){AA.success=true;AA.ref=z}AB(AA)}}}}}function Z(AA){var x=null;var y=C(AA);if(y&&y.nodeName=="OBJECT"){if(typeof y.SetVariable!=d){x=y}else{var z=y.getElementsByTagName(R)[0];if(z){x=z}}}return x}function a(){return !A&&f("6.0.65")&&(m.win||m.mac)&&!(m.wk&&m.wk<312)}function p(AA,AB,x,z){A=true;e=z||null;b={success:false,id:x};var AE=C(x);if(AE){if(AE.nodeName=="OBJECT"){L=G(AE);q=null}else{L=AE;q=x}AA.id=r;if(typeof AA.width==d||(!/%$/.test(AA.width)&&parseInt(AA.width,10)<310)){AA.width="310"}if(typeof AA.height==d||(!/%$/.test(AA.height)&&parseInt(AA.height,10)<137)){AA.height="137"}J.title=J.title.slice(0,47)+" - Flash Player Installation";var AD=m.ie&&m.win?"ActiveX":"PlugIn",AC="MMredirectURL="+encodeURI(window.location).toString().replace(/&/g,"%26")+"&MMplayerType="+AD+"&MMdoctitle="+J.title;if(typeof AB.flashvars!=d){AB.flashvars+="&"+AC}else{AB.flashvars=AC}if(m.ie&&m.win&&AE.readyState!=4){var y=c("div");x+="SWFObjectNew";y.setAttribute("id",x);AE.parentNode.insertBefore(y,AE);AE.style.display="none";(function(){if(AE.readyState==4){AE.parentNode.removeChild(AE)}else{setTimeout(arguments.callee,10)}})()}U(AA,AB,x)}}function P(y){if(m.ie&&m.win&&y.readyState!=4){var x=c("div");y.parentNode.insertBefore(x,y);x.parentNode.replaceChild(G(y),x);y.style.display="none";(function(){if(y.readyState==4){y.parentNode.removeChild(y)}else{setTimeout(arguments.callee,10)}})()}else{y.parentNode.replaceChild(G(y),y)}}function G(AB){var AA=c("div");if(m.win&&m.ie){AA.innerHTML=AB.innerHTML}else{var y=AB.getElementsByTagName(R)[0];if(y){var AC=y.childNodes;if(AC){var x=AC.length;for(var z=0;z<x;z++){if(!(AC[z].nodeType==1&&AC[z].nodeName=="PARAM")&&!(AC[z].nodeType==8)){AA.appendChild(AC[z].cloneNode(true))}}}}}return AA}function U(AI,AG,y){var x,AA=C(y);if(m.wk&&m.wk<312){return x}if(AA){if(typeof AI.id==d){AI.id=y}if(m.ie&&m.win){var AH="";for(var AE in AI){if(AI[AE]!=Object.prototype[AE]){if(AE.toLowerCase()=="data"){AG.movie=AI[AE]}else{if(AE.toLowerCase()=="styleclass"){AH+=' class="'+AI[AE]+'"'}else{if(AE.toLowerCase()!="classid"){AH+=" "+AE+'="'+AI[AE]+'"'}}}}}var AF="";for(var AD in AG){if(AG[AD]!=Object.prototype[AD]){AF+='<param name="'+AD+'" value="'+AG[AD]+'" />'}}AA.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+AH+">"+AF+"</object>";n[n.length]=AI.id;x=C(AI.id)}else{var z=c(R);z.setAttribute("type",Q);for(var AC in AI){if(AI[AC]!=Object.prototype[AC]){if(AC.toLowerCase()=="styleclass"){z.setAttribute("class",AI[AC])}else{if(AC.toLowerCase()!="classid"){z.setAttribute(AC,AI[AC])}}}}for(var AB in AG){if(AG[AB]!=Object.prototype[AB]&&AB.toLowerCase()!="movie"){E(z,AB,AG[AB])}}AA.parentNode.replaceChild(z,AA);x=z}}return x}function E(z,x,y){var AA=c("param");AA.setAttribute("name",x);AA.setAttribute("value",y);z.appendChild(AA)}function Y(y){var x=C(y);if(x&&x.nodeName=="OBJECT"){if(m.ie&&m.win){x.style.display="none";(function(){if(x.readyState==4){B(y)}else{setTimeout(arguments.callee,10)}})()}else{x.parentNode.removeChild(x)}}}function B(z){var y=C(z);if(y){for(var x in y){if(typeof y[x]=="function"){y[x]=null}}y.parentNode.removeChild(y)}}function C(z){var x=null;try{x=J.getElementById(z)}catch(y){}return x}function c(x){return J.createElement(x)}function I(z,x,y){z.attachEvent(x,y);i[i.length]=[z,x,y]}function f(z){var y=m.pv,x=z.split(".");x[0]=parseInt(x[0],10);x[1]=parseInt(x[1],10)||0;x[2]=parseInt(x[2],10)||0;return(y[0]>x[0]||(y[0]==x[0]&&y[1]>x[1])||(y[0]==x[0]&&y[1]==x[1]&&y[2]>=x[2]))?true:false}function V(AC,y,AD,AB){if(m.ie&&m.mac){return }var AA=J.getElementsByTagName("head")[0];if(!AA){return }var x=(AD&&typeof AD=="string")?AD:"screen";if(AB){N=null;g=null}if(!N||g!=x){var z=c("style");z.setAttribute("type","text/css");z.setAttribute("media",x);N=AA.appendChild(z);if(m.ie&&m.win&&typeof J.styleSheets!=d&&J.styleSheets.length>0){N=J.styleSheets[J.styleSheets.length-1]}g=x}if(m.ie&&m.win){if(N&&typeof N.addRule==R){N.addRule(AC,y)}}else{if(N&&typeof J.createTextNode!=d){N.appendChild(J.createTextNode(AC+" {"+y+"}"))}}}function W(z,x){if(!M){return }var y=x?"visible":"hidden";if(j&&C(z)){C(z).style.visibility=y}else{V("#"+z,"visibility:"+y)}}function l(y){var z=/[\\\"<>\.;]/;var x=z.exec(y)!=null;return x&&typeof encodeURIComponent!=d?encodeURIComponent(y):y}var D=function(){if(m.ie&&m.win){window.attachEvent("onunload",function(){var AC=i.length;for(var AB=0;AB<AC;AB++){i[AB][0].detachEvent(i[AB][1],i[AB][2])}var z=n.length;for(var AA=0;AA<z;AA++){Y(n[AA])}for(var y in m){m[y]=null}m=null;for(var x in swfobject){swfobject[x]=null}swfobject=null})}}();return{registerObject:function(AB,x,AA,z){if(m.w3&&AB&&x){var y={};y.id=AB;y.swfVersion=x;y.expressInstall=AA;y.callbackFn=z;O[O.length]=y;W(AB,false)}else{if(z){z({success:false,id:AB})}}},getObjectById:function(x){if(m.w3){return Z(x)}},embedSWF:function(AB,AH,AE,AG,y,AA,z,AD,AF,AC){var x={success:false,id:AH};if(m.w3&&!(m.wk&&m.wk<312)&&AB&&AH&&AE&&AG&&y){W(AH,false);k(function(){AE+="";AG+="";var AJ={};if(AF&&typeof AF===R){for(var AL in AF){AJ[AL]=AF[AL]}}AJ.data=AB;AJ.width=AE;AJ.height=AG;var AM={};if(AD&&typeof AD===R){for(var AK in AD){AM[AK]=AD[AK]}}if(z&&typeof z===R){for(var AI in z){if(typeof AM.flashvars!=d){AM.flashvars+="&"+AI+"="+z[AI]}else{AM.flashvars=AI+"="+z[AI]}}}if(f(y)){var AN=U(AJ,AM,AH);if(AJ.id==AH){W(AH,true)}x.success=true;x.ref=AN}else{if(AA&&a()){AJ.data=AA;p(AJ,AM,AH,AC);return }else{W(AH,true)}}if(AC){AC(x)}})}else{if(AC){AC(x)}}},switchOffAutoHideShow:function(){M=false},ua:m,getFlashPlayerVersion:function(){return{major:m.pv[0],minor:m.pv[1],release:m.pv[2]}},hasFlashPlayerVersion:f,createSWF:function(z,y,x){if(m.w3){return U(z,y,x)}else{return undefined}},showExpressInstall:function(z,AA,x,y){if(m.w3&&a()){p(z,AA,x,y)}},removeSWF:function(x){if(m.w3){Y(x)}},createCSS:function(AA,z,y,x){if(m.w3){V(AA,z,y,x)}},addDomLoadEvent:k,addLoadEvent:S,getQueryParamValue:function(AA){var z=J.location.search||J.location.hash;if(z){if(/\?/.test(z)){z=z.split("?")[1]}if(AA==null){return l(z)}var y=z.split("&");for(var x=0;x<y.length;x++){if(y[x].substring(0,y[x].indexOf("="))==AA){return l(y[x].substring((y[x].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(A){var x=C(r);if(x&&L){x.parentNode.replaceChild(L,x);if(q){W(q,true);if(m.ie&&m.win){L.style.display="block"}}if(e){e(b)}}A=false}}}}();

    /*存放所有当前类型Flash的处理函数Select,Progress,Complete,Error的实例。 key==flashId, value:handler */
    window._xxlMapSelect = {};
    window._xxlMapProgress = {};
    window._xxlMapComplete = {};
    window._xxlMapError = {};
    /* flash通知window的通信桥 */
    window._xxlUploaderBridgeCallback = {
        progress : function(flashId, fileName, uploadScale, scaleInfo, uploadSpeed, residualTime, currLoaded, totalSize){
            console.log("xxlUploaderProgress:"+JSON.stringify({flashId:flashId, fileName:fileName, uploadScale:uploadScale, scaleInfo:scaleInfo, uploadSpeed:uploadSpeed, residualTime:residualTime, currLoaded:currLoaded, totalSize:totalSize}));
            if(typeof(window._xxlMapProgress[flashId]) == 'function'){
                window._xxlMapProgress[flashId](flashId, fileName, uploadScale, scaleInfo, uploadSpeed, residualTime, currLoaded, totalSize);
            }
        },
        complete : function(flashId, rsData, fileName, fileSize, uploadSeconds){
            console.log("xxlUploaderComplete:"+JSON.stringify({flashId:flashId, rsData:rsData, fileName:fileName, fileSize:fileSize, uploadSeconds:uploadSeconds}));
            if(typeof(window._xxlMapComplete[flashId]) == 'function'){
                window._xxlMapComplete[flashId](flashId, rsData, fileName, fileSize, uploadSeconds);
            }
        },
        error : function(flashId, type, desc, fileName, maxsize, filesize){
            if(type=="1"){
                //文件过大
            }else if(type=="2"){
                //网络异常
            }else if(type=="3"){
                //上一个文件正在传输中
            }
            console.log("xxlUploaderError:"+JSON.stringify({flashId:flashId,type:type,desc:desc,fileName:fileName,maxsize:maxsize,filesize:filesize}));
            if(typeof(window._xxlMapError[flashId]) == 'function'){
                window._xxlMapError[flashId](flashId, type, desc, fileName, maxsize, filesize);
            }
        }
    };

    var xxlUploader = {};
    xxlUploader.version = '1.0.0';
    xxlUploader.EVENT ={
        SELECT : "select",
        PROGRESS : 'progress',
        COMPLETE : 'complete',
        ERROR : 'error'
    };
    xxlUploader.getFlashObjectById = function(id) {
        return window[id] || document[id];
    };
    xxlUploader.hasFlash = function(){
        return swfobject.ua.pv[0] >= 9;
    };
    xxlUploader.flashVersion = swfobject.ua.pv[0];

    xxlUploader.Uploader = function(conf){
        this.debug = conf.debug || false;

        this.uploadUri = conf.postUrl;
        this.swfUrl = conf.swfUrl;
        this.flashId = conf.flashId;

        var params = [], list = conf.postData || {};
        for( var k in list ) params.push(k + '=' + list[k]);
        this.uploadParam = params.join('&');

        this.fieldName = conf.fieldName || 'file';
        this.uploadType = conf.fileTypes || '*.gif;*.jpg;*.jpeg;*.png;*.bmp';
        this.uploadMaxSize = conf.fileMaxSize || 1024*1024*2;

        this.uploadProgressJs = "window._xxlUploaderBridgeCallback.progress";
        this.uploadCompleteJs = "window._xxlUploaderBridgeCallback.complete";
        this.errorJs = "window._xxlUploaderBridgeCallback.error";

        this._flash = null;
        this.init();
        return this;
    };
    xxlUploader.Uploader.prototype.init = function(){
        swfobject.embedSWF(
            this.swfUrl,
            this.flashId,
            '100%',
            '100%',
            "9.0.0",
            "expressInstall.swf",
            {
                uploadParam : encodeURI(this.uploadParam),
                uploadUri : encodeURI(this.uploadUri),
                uploadType : this.uploadType,
                uploadMaxSize : this.uploadMaxSize,
                flashId : this.flashId,
                fieldName : this.fieldName,
                uploadProgressJs : this.uploadProgressJs,
                uploadCompleteJs : this.uploadCompleteJs,
                errorJs : this.errorJs
            },
            {
                wmode:"transparent",
                AllowScriptAccess:"always"
            },
            {
                id : this.flashId,
                name : 'xxlUploader',
                align: 'middle'
            }
        );
    };

    xxlUploader.Uploader.prototype.on = function(eventName,callback){
        switch (eventName){
            case xxlUploader.EVENT.SELECT: window._xxlMapSelect[this.flashId] = callback; break;
            case xxlUploader.EVENT.PROGRESS: window._xxlMapProgress[this.flashId] = callback; break;
            case xxlUploader.EVENT.COMPLETE: window._xxlMapComplete[this.flashId] = callback; break;
            case xxlUploader.EVENT.ERROR: window._xxlMapError[this.flashId] = callback; break;
        }
        return this;
    };

    callback && callback(xxlUploader);

})(function(xxlUploader){
    window.xxlUploader = xxlUploader;
});

typeof define == 'function' && define(function(){
    return window.xxlUploader;
});
