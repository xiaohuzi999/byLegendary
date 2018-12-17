package com.yx.editor.view.mainView
{
	import com.greensock.TweenLite;
	import com.xiaohuzi999.xControls.frame.XAlert;
	import com.xiaohuzi999.xControls.frame.XTip;
	import com.xiaohuzi999.xControls.frame.XWindow;
	import com.xiaohuzi999.xControls.frame.manager.AnimateManager;
	import com.xiaohuzi999.xControls.frame.manager.LayerManager;
	import com.xiaohuzi999.xControls.util.XUtil;
	import com.xiaohuzi999.xControls.util.xEvent.MainDispatcher;
	import com.xiaohuzi999.xControls.util.xEvent.XEvent;
	import com.yx.editor.data.DB;
	import com.yx.editor.data.MapItemVo;
	import com.yx.editor.utils.PNGEncoder;
	
	import flash.display.BitmapData;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.IOErrorEvent;
	import flash.events.KeyboardEvent;
	import flash.events.MouseEvent;
	import flash.filesystem.File;
	import flash.filesystem.FileMode;
	import flash.filesystem.FileStream;
	import flash.geom.Matrix;
	import flash.geom.Rectangle;
	import flash.media.Sound;
	import flash.media.SoundChannel;
	import flash.net.FileFilter;
	import flash.net.URLLoader;
	import flash.net.URLRequest;
	import flash.text.TextField;
	import flash.ui.Keyboard;
	import flash.ui.Mouse;
	import flash.utils.ByteArray;
	
	public class MainView extends XWindow
	{
		private var _ui:MainUI;
		private var _sndCh:SoundChannel;
		private var _snd:Sound
		/**节点容器*/
		private var _itemCon:Sprite;
		private var _con:Sprite;
		//
		private var _map:Sprite;
		/**选中的节点*/
		private var _selectItem:SndNodeItem;
		private var _items:Array = [];
		//地图元素
		private var _mapItems:Array = [];
		//选中的地图元素
		private var _selectMapItem:MapItem;
		//临时地图渲染元件
		private var _tmpItems:Array;
		//文档属性
		private var _docProCom:DocProCom;
		//节拍属性
		private var _nodeProCom:NodeProCom;
		//地图编辑
		private var _mapEdit:MapEditCom;
		/***/
		private var _pos:Number = 0;
		private var _lineWith:int  = 4;
		public function MainView()
		{
			super();
		}
		
		override public function show(autoAlignCenter:Boolean=false):void{
			if(!this._ui){
				this.init();
			}
			super.show();
			//TODO回收实例
			createItems();
			createMapItems();
			showItems();
			_docProCom.update();
			_mapEdit.show();
		}
		
		public function outPic():void{
			var bmd:BitmapData = new BitmapData(750, _itemCon.height);
			for(var i:int=0 ; i<_items.length; i++){
				this._items[i].visible = false;
			}
			bmd.draw(this._itemCon, new Matrix(1,0,0,1,0,this._itemCon.height-stage.height));
			for(i=0 ; i<_items.length; i++){
				this._items[i].visible = true;
			}
			var pngCoder:PNGEncoder = new PNGEncoder();
			var bytes:ByteArray = pngCoder.encode(bmd);
			
			
			var fileName:String = "map_" + DB.cfg.name;
			var fliePath:String = "img/"+ fileName +".png";
			var file:File = File.applicationDirectory.resolvePath(fliePath);
			file.browseForSave("导出图片");
			file.addEventListener(Event.SELECT, onSave);
			
			function onSave(event:Event):void{
				var file:File = event.target as File;
				trace("file：：:", file.url)
				if(file.exists){
					file.deleteFile();
				}
				var stream:FileStream = new FileStream();
				stream.open(file,FileMode.WRITE);
				stream.writeBytes(bytes);
				stream.close();
			}
			/*
			var fileName:String = "map_" + DB.cfg.name;
			var fileFullName:String = File.applicationStorageDirectory.resolvePath("img/"+ fileName +".png").nativePath;
			var file:File = new File(fileFullName);
			trace(file.nativePath);     
			var stream:FileStream = new FileStream();
			stream.open(file,FileMode.WRITE);
			//stream.addEventListener(IOErrorEvent.IO_ERROR,writeIOErrorHandler);
			//stream.addEventListener(Event.COMPLETE, writeCompleteHandler); 
			stream.writeBytes(bytes);
			stream.close();
			*/
		}
		
		private function createItems():void{
			clear();
			if(DB.cfg){
				var arr:Array = DB.cfg.nodes;
				var item:SndNodeItem;
				for(var i:int=0; i<arr.length; i++){
					item = new SndNodeItem();
					item.data = arr[i];
					item.addEventListener(MouseEvent.CLICK, this.onItemClick);
					
					this._itemCon.addChild(item);
					_items.push(item);
				}
			}
		}
		
		private function createMapItems():void{
			clearMapItems();
			if(DB.cfg){
				var arr:Array = DB.cfg.items;
				var item:MapItem;
				for(var i:int=0; i<arr.length; i++){
					item = new MapItem();
					item.data = arr[i];
					item.addEventListener(MouseEvent.MOUSE_DOWN, this.onItemME);
					
					this._map.addChild(item);
					_mapItems.push(item);
				}
			}
		}
		
		private function clear():void{
			this.selectItem = null;
			for(var i:int=0; i<_items.length ; i++){
				_items[i].dispose();
				_items[i].removeEventListener(MouseEvent.CLICK, this.onItemClick);
			}
			_items.length = 0;
		}
		private function clearMapItems():void{
			for(var i:int=0; i<_mapItems.length ; i++){
				_mapItems[i].parent.removeChild(_mapItems[i]);
			}
			this._mapItems.length = 0;
		}
		
		private function showItems():void{
			_itemCon.graphics.clear()
			_itemCon.graphics.lineStyle(_lineWith, 0x888888);
			var item:SndNodeItem;
			for(var i:int=0; i<_items.length; i++){
				item = _items[i];
				if(i == 0){
					_itemCon.graphics.moveTo(item.x, item.y);
				}else{
					_itemCon.graphics.lineTo(item.x, item.y);
				}
			}
		}
		
		private function showMapItems():void{
			
		}
		
		private function onSndAct(e:Event):void{
			switch(e.type){
				case DocProCom.STOP:
					_pos = 0;
					onComplete();
					break;
				case DocProCom.PREVIEW:
					_pos = 0;
					onComplete();
					var s:Sound = new Sound(); 
					s.addEventListener(Event.COMPLETE, onSoundLoaded); 
					s.addEventListener(IOErrorEvent.IO_ERROR, onIO); 
					s.load(new URLRequest(DB.cfg.mp3)); 
					break;
				case DocProCom.PAUSE:
					pause();
					break;
				case DocProCom.RESUME:
					if(!_sndCh && _snd){
						_sndCh = _snd.play(_pos); 
						_sndCh.addEventListener(Event.SOUND_COMPLETE, this. onComplete);
						this.addEventListener(Event.ENTER_FRAME, this.onEF);
						this.clearMapItems();
						_tmpItems  = JSON.parse(JSON.stringify(DB.cfg.items)) as Array;
					}
					break;
				case DocProCom.PLAY_NOW:
					_pos = Math.abs(_itemCon.y/DB.cfg.speed);
					onComplete();
					if(_snd){
						_sndCh = _snd.play(_pos); 
						_sndCh.addEventListener(Event.SOUND_COMPLETE, this. onComplete);
						this.addEventListener(Event.ENTER_FRAME, this.onEF);
						this.clearMapItems();
						_tmpItems  = JSON.parse(JSON.stringify(DB.cfg.items)) as Array;
					}else{
						s = new Sound(); 
						s.addEventListener(Event.COMPLETE, onSoundLoaded); 
						s.addEventListener(IOErrorEvent.IO_ERROR, onIO); 
						s.load(new URLRequest(DB.cfg.mp3)); 
					}
					break;
				case DocProCom.SHOW_WIDE:
					_lineWith  = 160;
					showItems();
					break;
				case DocProCom.SHOW_NARROW:
					_lineWith  = 4;
					showItems();
					break;
			}
		}
		
		private function onSoundLoaded(event:Event):void 
		{ 
			event.currentTarget.removeEventListener(Event.COMPLETE, onSoundLoaded); 
			event.currentTarget.removeEventListener(IOErrorEvent.IO_ERROR, onIO); 
			_snd = event.target as Sound; 
			_sndCh = _snd.play(_pos); 
			_sndCh.addEventListener(Event.SOUND_COMPLETE, this. onComplete);
			//开始驱动
			this.addEventListener(Event.ENTER_FRAME, this.onEF);
			this.clearMapItems();
			_tmpItems  = JSON.parse(JSON.stringify(DB.cfg.items)) as Array;
			//
			/*for(var i:int=0 ; i<_items.length; i++){
				this._items[i].visible = false;
			}*/
		} 
		
		private function onComplete(e:Event=null):void{
			if(_sndCh){
				_sndCh.stop();
				_sndCh.removeEventListener(Event.SOUND_COMPLETE, this. onComplete);
				this.removeEventListener(Event.ENTER_FRAME, this.onEF);
				/*for(var i:int=0 ; i<_items.length; i++){
					this._items[i].visible = true;
				}*/
			}
		}
		
		private function pause():void{
			if(_sndCh){
				_pos = this._sndCh.position;
				_sndCh.stop();
				_sndCh.removeEventListener(Event.SOUND_COMPLETE, this. onComplete);
				this.removeEventListener(Event.ENTER_FRAME, this.onEF);
				_sndCh = null;
			}
		}
		
		private function onIO(e:IOErrorEvent):void{
			XTip.showTip("歌曲加载失败，请重新选择歌曲");
			e.currentTarget.removeEventListener(Event.COMPLETE, onSoundLoaded); 
			e.currentTarget.removeEventListener(IOErrorEvent.IO_ERROR, onIO); 
		}
		
		private function onEF(e:Event):void{
			//trace(_sndCh.leftPeak, _sndCh.rightPeak);
			this._itemCon.y = Math.round(this._sndCh.position * DB.cfg.speed);
			_map.y  = this._itemCon.y;
			//处理地图
			renderMapItems();
		}
		
		/**
		 * 渲染地图元素
		 * 1,渲染不根据时间变化的元素，生成变化元素列表；todo
		 * 2，渲染变化元素；
		 * */
		private function renderMapItems():void{
			var time:Number = this._sndCh.position;
			for(var i:int=0; i<this._tmpItems.length; i++){
				if(_tmpItems[i].t < time+4200){
					var item:MapItem = new MapItem();
					item.data = new MapItemVo(_tmpItems[i]);
					_map.addChild(item);
					_tmpItems.splice(i--,1);
					_mapItems.push(item);
					//AnimateManager.fadeIn(item, 0.4);
					//AnimateManager.popIn(item);
				}else{
					break;
				}
			}
		}
		
		private function update(e:XEvent):void{
			this.createItems();
			this.createMapItems();
			this.showItems();
			this._docProCom.update();
		}
		
		private function onClickBlank(e:MouseEvent):void{
			this.selectItem = null;
		}
		
		private function onItemEvent(e:XEvent):void{
			switch(e.type){
				case SndNodeItem.EDIT:
					selectItem = e.data;
					break;
				case SndNodeItem.DELETE:
					XAlert.showArert("确定要删除该节点么？","删除节点", delItem, [e.data]);
					break;
			}
		}
		
		private function onItemClick(e:MouseEvent):void{
			stage.focus = null;
			this.selectItem = e.currentTarget as SndNodeItem;
		}
		
		private function delItem(item:SndNodeItem):void{
			DB.deleteNode(item.data);
		}
		
		//鼠标当前坐标；
		private var _curY:Number;
		private var _curX:Number;
		private function onME(e:MouseEvent):void{
				if(e.type == MouseEvent.MOUSE_DOWN){
					stage.addEventListener(MouseEvent.MOUSE_MOVE, this.onMM);
					_curY = stage.mouseY;
					_curX = stage.mouseX;
				}else if(e.type == MouseEvent.MOUSE_UP){
					stage.removeEventListener(MouseEvent.MOUSE_MOVE, this.onMM);
					if(_selectItem){
						showItems();
					}
					if(_selectMapItem){
						//修改
						_selectMapItem.stopDrag();
						if(_ui.bg.hitTestPoint(LayerManager.stage.mouseX, LayerManager.stage.mouseY)){
							//修改时间坐标
							DB.modifyMapItem(_selectMapItem.data, _selectMapItem.x, _selectMapItem.y);
						}else{
							DB.delMapItem(_selectMapItem.data);
						}
						_selectMapItem = null;
					}
				}
		}
		
		private function onKD(e:KeyboardEvent):void{
			if(e.keyCode == Keyboard.SPACE){
				selectItem = null;
			}
		}
		
		private function onMM(e:MouseEvent):void{
			var delx:Number = stage.mouseX - _curX;
			var delY:Number = stage.mouseY - _curY;
			if(e.ctrlKey){
				this._itemCon.y += delY;
				_map.y  = this._itemCon.y;
			}else if(e.shiftKey){
				DB.moveAll(delx);
			}else{
				if(!(stage.focus is TextField)){
					if(this._selectItem){
						if(this._selectItem.editPro == "x"){
							this._selectItem.x += delx;
						}else if(this._selectItem.editPro == "y"){
							//需要重新计算时间；
							this._selectItem.y += delY;
						}
						_nodeProCom.show(this._selectItem);
						DB.save();
					}
				}
			}
			_curX = stage.mouseX;
			_curY = stage.mouseY;
		}
		
		private function onItemME(e:MouseEvent):void{
			if(!e.ctrlKey){
				selectItem = null;
				_selectMapItem = e.currentTarget as MapItem;
				_selectMapItem.startDrag();
			}
		}
		
		private function set selectItem(item:SndNodeItem):void{
			if(this._selectItem && this._selectItem != item){
				this._selectItem.selected = false;
			}
			this._selectItem = item;
			if(this._selectItem){
				this._selectItem.selected = true;
				this._nodeProCom.show(_selectItem);
			}
			this._docProCom.visible = this._selectItem == null;
			this._nodeProCom.visible = this._selectItem != null
		}
		
		private function get selectItem():SndNodeItem{
			return this._selectItem;
		}
		
		override protected function initEvent():void{
			this._ui.bg.addEventListener(MouseEvent.CLICK, this.onClickBlank);
			MainDispatcher.getInstance().addEventListener(DB.UPDATE, this.update);
			this.stage.addEventListener(MouseEvent.MOUSE_DOWN, this.onME);
			this.stage.addEventListener(MouseEvent.MOUSE_UP, this.onME);
			this.stage.addEventListener(KeyboardEvent.KEY_DOWN, this.onKD);
			
			MainDispatcher.getInstance().addEventListener(SndNodeItem.EDIT, onItemEvent);
			MainDispatcher.getInstance().addEventListener(SndNodeItem.DELETE, onItemEvent);
			
			MainDispatcher.getInstance().addEventListener(DocProCom.PREVIEW, onSndAct);
			MainDispatcher.getInstance().addEventListener(DocProCom.STOP, onSndAct);
			MainDispatcher.getInstance().addEventListener(DocProCom.PAUSE, onSndAct);
			MainDispatcher.getInstance().addEventListener(DocProCom.RESUME, onSndAct);
			MainDispatcher.getInstance().addEventListener(DocProCom.PLAY_NOW, onSndAct);
			MainDispatcher.getInstance().addEventListener(DocProCom.SHOW_WIDE, onSndAct);
			MainDispatcher.getInstance().addEventListener(DocProCom.SHOW_NARROW, onSndAct);
		}
		
		override protected function removeEvent():void{
			//todo
		}
		
		private function init():void{
			this._ui = new MainUI();
			this.addChild(this._ui);
			
			_con = new  Sprite();
			this._ui.addChild(_con);
			_con.scaleX = _con.scaleY = 0.7;
			this._itemCon = new Sprite();
			this._con.addChild(this._itemCon);
			
			var map:Sprite = new Sprite();
			_con.addChild(map);
			//关联一个实例
			_ui.map = map;
			_map = map;
			
			_docProCom = new DocProCom(this._ui.docPro);
			_nodeProCom = new NodeProCom(this._ui.nodePro);
			this.selectItem = null;
			this.scrollRect = new Rectangle(0, 0, LayerManager.stage.stageWidth, LayerManager.stage.stageHeight);
			
			_mapEdit = new MapEditCom(this._ui);
		}
	}
}