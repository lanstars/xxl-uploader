package {
    public class MyUtil{
		static var num_str:String;
		static var num_arr:Array;
		static var seconds_str:String;
		static var minute_str:String;
		static var hour_str:String;
       
        public function MyUtil() {
			
        }
		
		//截取小数点后两位
		public static function formatNumber(_num:Number,nAfterDot:int):String{
			num_str= _num.toString();
			
			if(num_str.indexOf(".") == -1){
				return num_str;
			}else{
				
				num_arr = num_str.split(".");
				return num_arr[0] + "." + num_arr[1].substring(0,nAfterDot);
			}
  		}
		
		//格式化文件大小
		public static function sizeFormat(size:uint){
			if(size < 1024){
				return size + "B";
			}else if(size < (1024*1024)){
				return Math.floor(size/1024) + "KB";
			}else if(size < (1024*1024*1024)){
				return formatNumber(size/(1024*1024), 2) + "M";
			}else{
				return formatNumber(size/(1024*1024*1024), 2) + "G";
			}
		}
		
		//格式化秒数据
		public static function secondsToFull(seconds:Number){
			
			if(seconds < 60){
				seconds_str = seconds < 10 ? "0"+ seconds : seconds.toString();
				return "00:00:" + seconds_str;
				
			}else if(seconds < (60*60)){
				if(seconds == 60){
					return "00:01:00";
				}else if(seconds > 60){
					minute_str = seconds/60 < 10 ? "0"+Math.floor(seconds/60) : Math.floor(seconds/60).toString();
					seconds_str = seconds%60 < 10 ? "0"+Math.floor(seconds%60) : Math.floor(seconds%60).toString();
					return "00:"+ minute_str + ":" + seconds_str;
				}
				
			}else if(seconds < (60*60*60)){
				if(seconds == 60*60){
					return "01:00:00";
				}else if(seconds > 60 * 60){
					hour_str = seconds/(60*60) < 10 ? "0" + Math.floor(seconds/(60*60)) : Math.floor(seconds/(60*60)).toString();
					minute_str = (seconds%(60*60))/60 < 10 ? "0" + Math.floor((seconds%(60*60))/60) : Math.floor((seconds%(60*60))/60).toString();
					seconds_str = (seconds%(60*60))%60 < 10 ? "0" + Math.floor((seconds%(60*60))%60) : Math.floor((seconds%(60*60))%60).toString();
					return hour_str +":"+ minute_str + ":" + seconds_str;
				}
			}else{
				return "23:59:59";
			}
		}
    }
}