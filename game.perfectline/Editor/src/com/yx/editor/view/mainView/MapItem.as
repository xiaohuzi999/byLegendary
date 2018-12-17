package com.yx.editor.view.mainView
{
	import com.xiaohuzi999.xControls.util.xEvent.MainDispatcher;
	import com.xiaohuzi999.xControls.util.xEvent.XEvent;
	import com.yx.editor.data.DB;
	import com.yx.editor.data.MapItemVo;
	
	import flash.display.Loader;
	import flash.display.NativeMenu;
	import flash.display.NativeMenuItem;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.filesystem.File;
	import flash.net.URLRequest;
	import flash.text.TextField;
	import flash.text.TextFieldAutoSize;
	
	/**
	 * MapItem
	 * author:xiaohuzi999
	 * MapItem.as 2018-8-7 下午3:35:27
	 * version 1.0
	 *
	 */
	public class MapItem extends MapItemUI
	{
		/**数据关联*/
		private var _data:MapItemVo;
		private var _loader:Loader;
		private var _menu:NativeMenu;
		public static const PRE_URL:String = "res/";
		public static const SPACE:int = 300;
		/**事件-强行更新图片列表*/
		public static const UPDATE:String = "MapItem.update"
		public function MapItem()
		{
			super();
			init();
			this.initFileMenu();
		}
		
		public function update(fileName:String):void{
			this.name = (fileName+"").replace(".png", "");
			_loader.load(new URLRequest(PRE_URL+this.name+".png"));
			this.tfName.text = fileName+"";
		}
		
		public function clone():MapItem{
			var item:MapItem = new MapItem();
			item.update(this.name+".png");
			return item;
		}
		
		public function set data(vo:MapItemVo):void{
			this._data = vo;
			if(this._data){
				update(_data.id);
				this.x = _data.x;
				this.y = _data.y;
				this.scaleX = _data.s;
				this.tfName.text = "";
				this.icon.visible = true;
				this.icon.gotoAndStop(_data.type);
				this.icon.scaleX = this.scaleX;
				initMenu();
			}else{
				this.icon.visible = false;			
			}
		}
		
		public function get data():MapItemVo{
			return this._data;
		}
		
		private function init():void{
			_loader = new Loader();
			this.addChildAt(_loader,0);
			this.icon.visible = false;
			//_loader.x = -50;
			//_loader.y = -50;
			//_loader.width = _loader.height  =100;
		}
		
		private function initMenu():void{
			//if(!_menu){
				_menu = new NativeMenu();
				
				var item:NativeMenuItem = new NativeMenuItem("标记为图片")
				_menu.addItem(item);
				item.addEventListener(Event.SELECT, onSelect);
				
				item = new NativeMenuItem("标记为动画")
				_menu.addItem(item);
				item.addEventListener(Event.SELECT, onSelect);
				
				item = new NativeMenuItem("翻转")
				_menu.addItem(item);
				item.addEventListener(Event.SELECT, onSelect);
				
				item = new NativeMenuItem("删除")
				_menu.addItem(item);
				item.addEventListener(Event.SELECT, onSelect);
				
				this.contextMenu = _menu;
			//}
		}
		
		private function  initFileMenu():void{
			_menu = new NativeMenu();
			
			var item:NativeMenuItem = new NativeMenuItem("删除本地资源")
			_menu.addItem(item);
			item.addEventListener(Event.SELECT, onSelect);
			
			this.contextMenu = _menu;
		}
		
		private function onSelect(event:Event):void{
			if(event.currentTarget.label == "删除"){
				DB.delMapItem(this.data);
			}else if(event.currentTarget.label == "翻转"){
				DB.modify(this.data, "s", this.scaleX*-1);
			}else if(event.currentTarget.label == "标记为图片"){
				DB.modify(this.data, "type", DB.PIC);
			}else if(event.currentTarget.label == "标记为动画"){
				DB.modify(this.data, "type", DB.SWF);
			}else if(event.currentTarget.label == "删除本地资源"){
				var file:File = new File(File.applicationDirectory.resolvePath("res/"+this.name+".png").nativePath);
				try{
					file.moveToTrash();
				}catch(e:Error){
					
				}
				MainDispatcher.getInstance().dispatchEvent(new XEvent(UPDATE));
			}
		}
	}
}