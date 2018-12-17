package com.yx.editor.view.chapterEditer
{
	import com.xiaohuzi999.xControls.frame.XTip;
	import com.xiaohuzi999.xControls.util.XCookie;
	import com.xiaohuzi999.xControls.util.XUtil;
	import com.xiaohuzi999.xControls.util.xEvent.MainDispatcher;
	import com.xiaohuzi999.xControls.util.xEvent.XEvent;
	import com.yx.editor.data.DB;
	import com.yx.editor.data.SndNodeVo;
	
	import flash.events.Event;
	import flash.filesystem.File;
	import flash.filesystem.FileMode;
	import flash.filesystem.FileStream;
	import flash.net.FileFilter;
	import flash.net.URLLoader;
	import flash.net.URLRequest;
	import flash.utils.ByteArray;

	/**
	 * DBChapter
	 * author:xiaohuzi999
	 * DBChapter.as 2018-8-8 下午4:56:52
	 * version 1.0
	 *
	 */
	public class DBChapter
	{
		public static var chapData:Array = [];
		/**key*/
		private static const NAME:String = "Chap";
		private static var fileURL:String
		//事件-更新
		public static const UPDATE:String = "chap_update";
		public function DBChapter()
		{
		}
		
		/**初始化*/
		public static function init(data:Array = null):void{
			if(!data){//没有数据默认读本地数据
				data = XCookie.get(NAME) as Array || [];
			}
			chapData.length = 0;
			for(var i:int=0; i<data.length; i++){
				chapData.push(new ChapterData(data[i]));
			}
			save();
			MainDispatcher.getInstance().dispatchEvent(new Event(UPDATE));
		}
		
		/**新增一个配置*/
		public static function add():void{
			chapData.push(new ChapterData());
			save();
			MainDispatcher.getInstance().dispatchEvent(new Event(UPDATE));
		}
		
		/**删除一个配置*/
		public static function remove(data:ChapterData):void{
			for(var i:int=0; i<chapData.length; i++){
				if(chapData[i] == data){
					chapData.splice(i,1);
					break;
				}
			}
			save();
			MainDispatcher.getInstance().dispatchEvent(new Event(UPDATE));
		}
		
		public static function save():void{
			XCookie.set(NAME, chapData);
		}
		
		/**
		 * 导入配置
		 * 主要对节点信息加工：x速度
		 */
		public static function input():void{
			var file:File = File.applicationDirectory.resolvePath("");
			file.browse([new FileFilter(".json","*.json")]);
			file.addEventListener(Event.SELECT, onOpen);
			
			function onOpen(event:Event):void{
				var file:File = event.target as File;
				var loader:URLLoader = new URLLoader();
				loader.load(new URLRequest(file.url));
				loader.addEventListener(Event.COMPLETE, onC);
				
				function onC(e:Event):void{
					loader.removeEventListener(Event.COMPLETE, onC);
					//loader.data;
					try{
						init(JSON.parse(loader.data) as Array);
					}catch(e:Error){
						XTip.showTip("数据格式错误~");
						return;
					}
					DBChapter.fileURL = file.url
					save();
					MainDispatcher.getInstance().dispatchEvent(new XEvent(UPDATE));
				}
			}
		}
		
		/**
		 * 输出配置
		 * 主要对节点信息加工：x速度
		 */
		public static function output():void{
			//数据过滤
			var arr:Array = [];
			for(var i:int=0; i<chapData.length; i++){
				if(validate(chapData[i])){
					arr.push(format(chapData[i]));
				}
			}
			
			var fliePath:String = DBChapter.fileURL;
			if(!fliePath){
				fliePath = "stage.json"
			}
			
			var file:File = File.applicationDirectory.resolvePath(fliePath);
			file.browseForSave("保存数据");
			file.addEventListener(Event.SELECT, onSave);
			
			function onSave(event:Event):void{
				var file:File = event.target as File;
				trace("file：：:", file.url)
				if(file.exists){
					file.deleteFile();
				}
				var fs:FileStream=new FileStream();
				var bt:ByteArray=new ByteArray();
				bt.writeUTFBytes(JSON.stringify(arr));
				fs.open(file,FileMode.UPDATE);
				fs.writeBytes(bt);
				fs.close();
			}
			
			function validate(data:ChapterData):Boolean{
				if(!data.id || !data.mp3 || !data.json){
					return false
				}
				return data.id.length /*&& data.album && data.name && data.author*/ && data.mp3.length>1 && data.json.length>1;
			}
			
			/**删除空格*/
			function format(data:*):Object{
				data = JSON.parse(JSON.stringify(data));
				for(var i:String in data){
					data[i] = XUtil.ltrim(data[i]);
				}
				return data;
			}
		}
	}
}