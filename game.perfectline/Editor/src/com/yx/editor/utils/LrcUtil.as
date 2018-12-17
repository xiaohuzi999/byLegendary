package com.yx.editor.utils
{
	import com.yx.editor.data.DB;
	
	import flash.events.Event;
	import flash.filesystem.File;
	import flash.net.FileFilter;
	import flash.net.URLLoader;
	import flash.net.URLRequest;

	/**
	 * LrcUtil 时间表工具
	 * author:xiaohuzi999
	 * LrcUtil.as Aug 1, 2018 11:48:50 AM
	 * version 1.0
	 *
	 */
	public class LrcUtil
	{
		public function LrcUtil()
		{
		}
		
		/**
		 * 将策划端时间配置节点转换成数组；
		 * @param str [0:01.655][0:01.995]
		 */
		public static function convert(str:String):Array{
			str = str.replace(/\]\[/g,",")
			str = str.replace("[", "");
			str = str.replace("]","");
			var arr:Array = str.split(",");
			for(var i:int=0; i<arr.length; i++){
				arr[i] = node2Num(arr[i]);
			}
			//加入头
			arr.unshift(0);
			return arr;
			
			function node2Num(str:String):Number{
				var tmp:Array = str.split(":");
				//minute
				var time:Number = parseInt(tmp[0])*60000;
				time += parseFloat(tmp[1])*1000
				return time;
			}
		}
		
		/**加载时间表--*/
		public static function loadLrc():void{
			var file:File = File.applicationDirectory.resolvePath("");
			file.browse([new FileFilter(".lrc","*.lrc"), new FileFilter(".json","*.json")]);
			file.addEventListener(Event.SELECT, onOpenTimeCfg);
		}
		
		private static function onOpenTimeCfg(event:Event):void{
			var file:File = event.target as File;
			file.removeEventListener(Event.SELECT, onOpenTimeCfg);
			
			var loader:URLLoader = new URLLoader();
			loader.load(new URLRequest(file.url));
			loader.addEventListener(Event.COMPLETE, onC);
			
			function onC(e:Event):void{
				loader.removeEventListener(Event.COMPLETE, onC);
				DB.initCfg(LrcUtil.convert(loader.data));
			}
		}
	}
}