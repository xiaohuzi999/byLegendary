package com.yx.editor.view.recorderView
{
	import com.xiaohuzi999.xControls.frame.XAlert;
	import com.xiaohuzi999.xControls.frame.XModeWindow;
	import com.xiaohuzi999.xControls.frame.XTip;
	import com.xiaohuzi999.xControls.frame.manager.ModelManager;
	import com.xiaohuzi999.xControls.frame.manager.TipManager;
	import com.xiaohuzi999.xControls.util.XUtil;
	import com.xiaohuzi999.xControls.util.xEvent.MainDispatcher;
	import com.yx.editor.data.DB;
	import com.yx.editor.view.createNodeView.CreateNodeView;
	
	import flash.display.NativeMenu;
	import flash.display.NativeMenuItem;
	import flash.display.Shape;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.IOErrorEvent;
	import flash.events.MouseEvent;
	import flash.geom.Rectangle;
	import flash.media.Sound;
	import flash.media.SoundChannel;
	import flash.net.URLRequest;
	
	/**
	 * RecorderView
	 * author:xiaohuzi999
	 * RecorderView.as Aug 2, 2018 8:37:29 PM
	 * version 1.0
	 *
	 */
	public class RecorderView extends XModeWindow
	{
		private var _ui:RecorderUI;
		private var _snd:SoundChannel;
		private var _srcSnd:Sound;
		private var _itemCon:Sprite;
		private var _items:Array = [];
		private var _selectedItem:RecordItem;
		private var _sp1:Shape;
		private var _sp2:Shape;
		private var _drawComplete:Boolean = false;
		/**操作菜单*/
		private var _menu:NativeMenu;
		private const BASIC_Y:int = 168;
		private var _helpStr:String;
		public function RecorderView()
		{
			super();
			this.bgAlpha = 0.3
		}
		
		override public function show(autoAlignCenter:Boolean=true):void{
			if(!this._ui){
				this.init();
			}
			super.show();
			
			_sp1 = new Shape();
			_sp2 = new Shape();
			_itemCon.addChild(_sp1);
			_itemCon.addChild(_sp2);
			_sp1.graphics.lineStyle(2, 0x0000ff);
			_sp2.graphics.lineStyle(2, 0x0000ff);
			_sp1.graphics.moveTo(DBRecord.BASIC_X/2, BASIC_Y/2);
			_sp2.graphics.moveTo(DBRecord.BASIC_X/2, BASIC_Y/2);
			
			_drawComplete = false;
			_srcSnd = null;
			selectedItem = null;
			_ui.tfTime.text = "";
			DBRecord.init();
		}
		
		override public function close():void{
			this._snd && _snd.stop();
			super.close();
			if(_sp1.parent){
				_sp1.parent.removeChild(_sp1);
				_sp1 = null;
			}
			if(_sp2.parent){
				_sp2.parent.removeChild(_sp2);
				_sp2 = null;
			}
			this.clear();
		}
		
		private function onClick(e:MouseEvent):void{
			switch(e.target){
				case _ui.btnPlay:
					selectedItem = null;
					if(!_srcSnd){
						var s:Sound = new Sound(); 
						s.addEventListener(Event.COMPLETE, onSoundLoaded); 
						s.addEventListener(IOErrorEvent.IO_ERROR, onIO); 
						s.load(new URLRequest(DB.cfg.mp3)); 
					}else{
						if(!_snd){
							onSoundLoaded();
						}
					}
					break;
				case _ui.btnStop:
					selectedItem = null;
					this.onComplete();
					break;
				case _ui.btnRecord:
					selectedItem = null;
					if(_snd){
						DBRecord.add(_snd.position);
					}else{
						XTip.showTip("先点“播放”按钮，然后再打点");
					}
					break;
				case _ui.btnSave:
					this.save();
					break;
				case _ui.btnClose:
					selectedItem = null;
					XAlert.showArert("记得保存数据哦~如果已经保存，点“确定”关闭面板","保存数据", this.close);
					break;
			}
		}
		
		private function save():void{
			var timeTable:Array = DBRecord.output();	
			if(timeTable.length > 3){
				if(DB.cfg.nodes.length){
					XAlert.showArert("已经存在节点信息，将覆盖原来节点信息，是否覆盖?","保存节点", DB.initCfg, [timeTable]);
				}else{
					DB.initCfg(timeTable);
				}
			}else{
				XTip.showTip("节点数据无效~，请重新打点");
			}
		}
		
		private function onSoundLoaded(event:Event =null):void 
		{ 
			if(event){
				event.currentTarget.removeEventListener(Event.COMPLETE, onSoundLoaded); 
				event.currentTarget.removeEventListener(IOErrorEvent.IO_ERROR, onIO); 
				_srcSnd = event.target as Sound; 
			}
			_ui.tfTime.text = "";
			_snd = _srcSnd.play(); 
			_snd.addEventListener(Event.SOUND_COMPLETE, this. onComplete);
			//开始驱动
			this.addEventListener(Event.ENTER_FRAME, this.onEF);
		} 
		
		
		private function onComplete(e:Event=null):void{
			if(_snd){
				if(e){
					_drawComplete = true
				}else{
					_sp1.graphics.moveTo(DBRecord.BASIC_X/2, BASIC_Y/2);
					_sp2.graphics.moveTo(DBRecord.BASIC_X/2, BASIC_Y/2);
				}
				_snd.stop();
				_snd.removeEventListener(Event.SOUND_COMPLETE, this. onComplete);
				this.removeEventListener(Event.ENTER_FRAME, this.onEF);
				_snd = null;
			}
		}
		
		private function onEF(e:Event):void{
			var pos:int = this._snd.position * DBRecord.SX;
			_ui.tfTime.text = Math.round(this._snd.position) + "";
			this._itemCon.x = -pos+ DBRecord.BASIC_X/2;
			if(!_drawComplete){
				_sp1.graphics.lineTo(pos, BASIC_Y/2+_snd.leftPeak*40);
				_sp2.graphics.lineTo(pos, BASIC_Y/2 - _snd.rightPeak*40);
			}
		}
		
		private function onIO(e:IOErrorEvent):void{
			XTip.showTip("歌曲加载失败，请重新选择歌曲");
			e.currentTarget.removeEventListener(Event.COMPLETE, onSoundLoaded); 
			e.currentTarget.removeEventListener(IOErrorEvent.IO_ERROR, onIO); 
		}
		
		private function onUpdate(e:Event):void{
			clear();
			var item:RecordItem
			for(var i:int=0; i<DBRecord.nodes.length; i++){
				item = new RecordItem();
				item.addEventListener(MouseEvent.CLICK, this.onItemClick);
				_items.push(item);
				item.data = DBRecord.nodes[i];
				item.y = BASIC_Y/2;
				_itemCon.addChild(item);
			}
		}
		
		private function clear():void{
			var item:RecordItem;
			for(var i:int=0; i<_items.length; i++){
				item = _items[i];
				item.parent.removeChild(item);
				item.removeEventListener(MouseEvent.CLICK, this.onItemClick);
			}
			_items.length = 0;
		}
		
		private function onSelect(event:Event):void{
			if(event.currentTarget.label == "插入节点"){
				CreateNodeView.RecordMode = true;
				ModelManager.getInstance(CreateNodeView).show();
			}
		}
		
		private function onItemClick(e:MouseEvent):void{
			this.selectedItem = e.currentTarget as RecordItem;
			e.stopPropagation();
			e.stopImmediatePropagation();
		}
		
		private var _curx:int;
		private function onME(e:MouseEvent):void{
			switch(e.type){
				case MouseEvent.MOUSE_DOWN:
					if(e.target is RecordItem){
						//do noth.
					}else{
						selectedItem = null;
					}
					_curx = stage.mouseX;
					this._ui.nodeCon.addEventListener(MouseEvent.MOUSE_MOVE, onME);
					this._ui.nodeCon.addEventListener(MouseEvent.MOUSE_UP, onME);
					break;
				case MouseEvent.MOUSE_MOVE:
					var delx:Number = stage.mouseX - _curx;
					if(_selectedItem){
						_selectedItem.x += delx;
						_ui.nodeInfo.tfNodeTime.text  =_selectedItem.data.t+"";
					}else{
						this._itemCon.x += delx;
						//反推时间
						var t:int = Math.abs(_itemCon.x - DBRecord.BASIC_X/2)/DBRecord.SX;
						_ui.tfTime.text = t+"";
					}
					_curx = stage.mouseX;
					break;
				case MouseEvent.MOUSE_UP:
					this._ui.nodeCon.removeEventListener(MouseEvent.MOUSE_MOVE, onME);
					this._ui.nodeCon.removeEventListener(MouseEvent.MOUSE_UP, onME);
					break;
			}
		}
		
		override protected function initEvent():void{
			this._ui.addEventListener(MouseEvent.CLICK, this.onClick);
			this._ui.nodeCon.addEventListener(MouseEvent.MOUSE_DOWN, onME);
			MainDispatcher.getInstance().addEventListener(DBRecord.UPDATE, this.onUpdate);
			TipManager.registerTip(this._ui.btnHelp, _helpStr);
		}
		
		override protected function removeEvent():void{
			this._ui.removeEventListener(MouseEvent.CLICK, this.onClick);
			this.removeEventListener(Event.ENTER_FRAME, this.onEF);
			this._ui.nodeCon.removeEventListener(MouseEvent.MOUSE_DOWN, onME);
			MainDispatcher.getInstance().removeEventListener(DBRecord.UPDATE, this.onUpdate);
			TipManager.removeTip(this._ui.btnHelp);
		}
		
		private function set selectedItem(item:RecordItem):void{
			if(this._selectedItem){
				this._selectedItem.selected = false;
			}
			this._selectedItem = item;
			if(this._selectedItem){
				this._selectedItem.selected = true;
				_ui.nodeInfo.tfNodeTime.text  =_selectedItem.data.t+"";
			}else{
				_ui.nodeInfo.tfNodeTime.text  ="";
			}
		}
		
		private function get selectedItem():RecordItem{
			return this._selectedItem;
		}
		
		private function init():void{
			this._ui = new RecorderUI();
			this.addChild(this._ui);
			
			_itemCon = new Sprite();
			_ui.nodeCon.addChild(_itemCon);
			_ui.nodeCon.scrollRect = new Rectangle(0, 0, DBRecord.BASIC_X, BASIC_Y);
			
			_menu = new NativeMenu();
			var item:NativeMenuItem = new NativeMenuItem("插入节点")
			_menu.addItem(item);
			item.addEventListener(Event.SELECT, onSelect);
			_ui.nodeCon.contextMenu = _menu
				
			_helpStr = "1，点击“播放”按钮播放音乐;" +
				"\n2，在合适点地方打点" +
				"\n3，编辑节点, 右键“删除”删除节点，左键选中节点左右拖动调整时间；虚线区域内点击右键可以插入节点。" +
				"\n4，点播放按钮预览打点成果。" +
				"\n5，保存数据";
		}
	}
}