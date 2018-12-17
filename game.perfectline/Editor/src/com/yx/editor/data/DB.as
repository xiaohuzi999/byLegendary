package com.yx.editor.data
{
	import com.xiaohuzi999.xControls.frame.XTip;
	import com.xiaohuzi999.xControls.util.XCookie;
	import com.xiaohuzi999.xControls.util.xEvent.MainDispatcher;
	import com.xiaohuzi999.xControls.util.xEvent.XEvent;
	
	import flash.events.Event;
	import flash.filesystem.File;
	import flash.filesystem.FileMode;
	import flash.filesystem.FileStream;
	import flash.net.FileFilter;
	import flash.net.URLLoader;
	import flash.net.URLRequest;
	import flash.utils.ByteArray;

	/**
	 * DB 数据处理层，静态引用
	 * author:xiaohuzi999
	 * DB.as Aug 1, 2018 1:54:15 PM
	 * version 1.0
	 *
	 */
	public class DB
	{
		/**音轨配置数据-全局唯一*/
		public static var cfg:CfgVo;
		/***/
		public static var angle:Number = 45;
		
		private static const BASIC_X:Number = 750/2;
		private static const BASIC_Y:Number = 1334/2;
		/**事件，更新*/
		public static const UPDATE:String = "update";
		/**key*/
		private static const NAME:String = "cfg";
		/**文件路径--*/
		private static var fileUrl:String = "";
		/**渲染时间 毫秒*/
		public static const RenderTime:int = 20;
		/**类型-图片*/
		public static const PIC:int = 1;
		/**类型-动画*/
		public static const SWF:int = 2;
		public function DB()
		{
			
		}
		
		/**初始化*/
		public static function init():void{
			cfg = new CfgVo();
			//赋值本地数据
			var data:Object = XCookie.get(NAME);
			setCfg(data);
		}
		
		private static function setCfg(data:Object):void{
			if(data){
				cfg.name = data.name;
				cfg.mp3 = data.mp3;
				cfg.speed = data.speed;
				
				var list:Array  = data.nodes;
				cfg.nodes = [];
				for(var i:int=0; i<list.length; i++){
					cfg.nodes.push(new SndNodeVo(list[i]));
				}
				
				list = data.items || [];
				trace("list::",JSON.stringify(list));
				cfg.items = [];
				for(i=0; i<list.length; i++){
					cfg.items.push(new  MapItemVo(list[i]));
				}
			}
		}
		
		/**新建配置*/
		public static function create(name:String, speedStr:String):void{
			fileUrl = null;
			var speed:Number = parseFloat(speedStr);
			cfg = new CfgVo();
			cfg.name = name;
			cfg.speed = speed/DB.RenderTime;
			MainDispatcher.getInstance().dispatchEvent(new XEvent(UPDATE));
			save();
		}
		
		/**插入节点*/
		public static function insert(timeStamp:Number):void{
			var list:Array = cfg.nodes;
			var node:SndNodeVo;
			if(list.length > 0){
				for(var i:int=list.length-1; i>-1; i--){
					node = list[i];
					if(timeStamp > node.t){
						node = new SndNodeVo();
						node.x = BASIC_X;
						node.y = getYPos(timeStamp);
						node.t = timeStamp;
						list.splice(i+1, 0 ,node);
						break;
					}
				}
				save();
				MainDispatcher.getInstance().dispatchEvent(new XEvent(UPDATE));
			}
		}
		
		/**删除节点*/
		public static function deleteNode(node:SndNodeVo):void{
			var list:Array = cfg.nodes;
			if(list.length > 0){
				for(var i:int=list.length-1; i>-1; i--){
					if(list[i] == node){
						list.splice(i,1);
						break;
					}
				}
				save();
				MainDispatcher.getInstance().dispatchEvent(new XEvent(UPDATE));
			}
		}
		
		public static function save():void{
			XCookie.set(NAME, cfg);
		}
		
		
		/**初始化配置*/
		public static function initCfg(timeTable:Array):void{
			cfg.nodes.length = 0;
			var node:SndNodeVo;
			var dir:int = 1;
			var curY:Number = NaN;
			var delY:Number
			var curX:Number;
			for(var i:int=0; i<timeTable.length; i++){
				node = new SndNodeVo();
				node.t = timeTable[i];
				//node.x = BASIC_X;
				node.y = getYPos(timeTable[i]);
				
				//生成初始角度
				//node.x = BASIC_X+150*dir;
				//dir *= -1;
				//if(i > 0 ){
				if(isNaN(curY)){
					curY = node.y;
					curX = BASIC_X;
				}
				
				if(i < 2){
					node.x = BASIC_X;
				}else{
					delY = node.y - curY;
					node.x = curX + dir*delY/Math.tan(angle*Math.PI/180);
					dir *= -1;
				}
					curY = node.y;
					curX = node.x;
				//}
				
				cfg.nodes.push(node);
			}
			MainDispatcher.getInstance().dispatchEvent(new XEvent(UPDATE));
			save();
		}
		
		/**修改Y轴速度*/
		public static function modifySpeed(spd:Number):void{
			cfg.speed = spd;
			var list:Array = cfg.nodes;
			var node:SndNodeVo;
			if(list.length > 0){
				for(var i:int=0; i<list.length; i++){
					node = list[i];
					node.y = getYPos(node.t);
				}
				MainDispatcher.getInstance().dispatchEvent(new XEvent(UPDATE));
			}
			save();
		}
		
		/**修改所有节点坐标*/
		public static function moveAll(delx:int):void{
			var list:Array = cfg.nodes;
			var node:SndNodeVo;
			if(list.length > 0){
				for(var i:int=0; i<list.length; i++){
					node = list[i];
					node.x += delx;
				}
				MainDispatcher.getInstance().dispatchEvent(new XEvent(UPDATE));
			}
			save();
		}
		
		/**
		 * 加入地图装饰
		 * @param id 元素识别码
		 * @param x x坐标
		 * @param y y坐标
		 * @param type 类型；
		 * */
		public static function addMapItem(id:String, x:int, y:int, type:int = PIC ):void{
			var vo:MapItemVo = new MapItemVo();
			vo.id = id;
			vo.x = x;
			vo.y = y;
			vo.t = getTimeStamp(y);
			vo.type = type;
			
			var list:Array = cfg.items;
			var itemVo:MapItemVo;
			if(list.length > 0){
				for(var i:int=list.length-1; i>-1; i--){
					itemVo = list[i];
					if(vo.t > itemVo.t){
						list.splice(i+1, 0 ,vo);
						vo = null;
						break;
					}
				}
			}
			vo && list.push(vo);
			save();
			MainDispatcher.getInstance().dispatchEvent(new XEvent(UPDATE));
		}
		
		/**修改装饰物坐标-会修改时间线~~*/
		public static function modifyMapItem(vo:MapItemVo, x:int, y:int):void{
			vo.x = x;
			vo.y =y;
			vo.t = getTimeStamp(y);
			save();
			MainDispatcher.getInstance().dispatchEvent(new XEvent(UPDATE));
		}
		
		/**删除装饰物*/
		public static function delMapItem(vo:MapItemVo):void{
			var list:Array = cfg.items;
			if(list.length > 0){
				for(var i:int=list.length-1; i>-1; i--){
					if(list[i] == vo){
						list.splice(i, 1);
						break;
					}
				}
			}
			save();
			MainDispatcher.getInstance().dispatchEvent(new XEvent(UPDATE));
		}
		
		/**修改属性*/
		public static function modify(vo:MapItemVo, key:String, value:*):void{
			if(vo.hasOwnProperty(key)){
				vo[key] = value;
			}
			save();
			MainDispatcher.getInstance().dispatchEvent(new XEvent(UPDATE));
		}
		
		/**根据时间戳计算Y坐标*/
		public static function getYPos(timeStamp:Number):int{
			return Math.round(BASIC_Y-timeStamp*cfg.speed);
		}
		
		/**根据Y坐标反推时间*/
		public static function getTimeStamp(yPos:Number):int{
			var delY:int = Math.abs(yPos - BASIC_Y);
			return  delY/ cfg.speed
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
						setCfg(JSON.parse(loader.data));
					}catch(e:Error){
						XTip.showTip("配置表格式错误~");
						return;
					}
					DB.fileUrl = file.url
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
			var list:Array = cfg.nodes;
			var curNode:SndNodeVo;
			var nextNode:SndNodeVo;
			if(list.length > 0){
				for(var i:int=0; i<list.length-1; i++){
					curNode = list[i];
					nextNode = list[i+1];
					curNode.sx = Math.round((nextNode.x-curNode.x)*1000/(nextNode.t-curNode.t))/1000;
				}
			}
			trace(JSON.stringify(cfg));
			
			var fliePath:String = DB.fileUrl;
			if(!fliePath){
				fliePath = cfg.name+".json"
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
				bt.writeUTFBytes(JSON.stringify(cfg));
				fs.open(file,FileMode.UPDATE);
				fs.writeBytes(bt);
				fs.close();
			}
		}
	}
}