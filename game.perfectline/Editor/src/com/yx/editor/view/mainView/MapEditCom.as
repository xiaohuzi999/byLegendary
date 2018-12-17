package com.yx.editor.view.mainView
{
	import com.xiaohuzi999.xControls.frame.manager.LayerManager;
	import com.xiaohuzi999.xControls.util.xEvent.MainDispatcher;
	import com.yx.editor.data.DB;
	
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.FileListEvent;
	import flash.events.MouseEvent;
	import flash.filesystem.File;
	import flash.net.FileFilter;

	/**
	 * MapEditCom
	 * author:xiaohuzi999
	 * MapEditCom.as 2018-8-7 下午2:52:12
	 * version 1.0
	 *
	 */
	public class MapEditCom
	{
		private var _ui:MainUI;
		private var _itemCon:Sprite;
		private var _items:Array = [];
		private var _selectItem:MapItem;
		public function MapEditCom(ui:MainUI)
		{
			this._ui = ui;
			_itemCon = new Sprite();
			_ui.pane.source = _itemCon;
			this.addEvent();
		}
		
		public function show(e:Event = null):void{
			clear();
			var directory:File = new File(File.applicationDirectory.resolvePath("res").nativePath);
			directory.getDirectoryListingAsync();
			directory.addEventListener(FileListEvent.DIRECTORY_LISTING, dirListHandler);
			function dirListHandler(event:FileListEvent):void
			{
				var contents:Array = event.files;
				var item:MapItem;
				for (var i:uint = 0; i < contents.length; i++)
				{
					item = new MapItem();
					item.update(contents[i].name);
					item.x = i*MapItem.SPACE+50;
					item.y = 50;
					_itemCon.addChild(item);
					_items.push(item);
					item.addEventListener(MouseEvent.MOUSE_DOWN, onItemClick);
					//trace(contents[i].name, contents[i].size);
				}
				_ui.pane.update();
			}
		}
		
		private function onItemClick(e:MouseEvent):void{
			_selectItem = (e.currentTarget as MapItem).clone();
			_ui.stage.addChild(_selectItem);
			_selectItem.x  = _ui.stage.mouseX;
			_selectItem.y = _ui.stage.mouseY;
			_selectItem.startDrag(true);
		}
		
		private function onMU(e:MouseEvent):void{
			if(_selectItem){
				if(_ui.bg.hitTestPoint(LayerManager.stage.mouseX, LayerManager.stage.mouseY)){
					trace("gooooooooooooooooo 加入一个装饰物", _ui.map.mouseX, _ui.map.mouseY);
					DB.addMapItem(_selectItem.name, _ui.map.mouseX, _ui.map.mouseY)
				}
				_selectItem.parent.removeChild(_selectItem);
				_selectItem = null;
			}
		}
		
		private function clear():void{
			var item:MapItem;
			for(var i:int=0; i<_items.length; i++){
				item = _items[i];
				item.removeEventListener(MouseEvent.MOUSE_DOWN, onItemClick);
				item.parent.removeChild(item);
			}
			_items.length = 0;
		}
		
		private function onSelecte(e:Event):void{
			var original:File = e.target as File;
			var newFile:File = new File(File.applicationDirectory.resolvePath("res/"+original.name).nativePath);
			try{
				original.copyTo(newFile, true);
			}catch(e:Error){
				
			}
			//更新
			show();
		}
		
		private function onBtnClick(e:MouseEvent):void{
			var file:File = File.applicationDirectory.resolvePath("");
			file.browse([new FileFilter(".png","*.png")]);
			file.addEventListener(Event.SELECT, onSelecte);
		}
		
		private function addEvent():void{
			this._ui.btnImport.addEventListener(MouseEvent.CLICK, this.onBtnClick);
			LayerManager.stage.addEventListener(MouseEvent.MOUSE_UP, this.onMU);
			MainDispatcher.getInstance().addEventListener(MapItem.UPDATE, this.show);
		}
	}
}