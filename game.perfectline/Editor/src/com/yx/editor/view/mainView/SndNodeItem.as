package com.yx.editor.view.mainView
{
	import com.xiaohuzi999.xControls.util.xEvent.MainDispatcher;
	import com.xiaohuzi999.xControls.util.xEvent.XEvent;
	import com.yx.editor.data.DB;
	import com.yx.editor.data.SndNodeVo;
	
	import flash.display.NativeMenu;
	import flash.display.NativeMenuItem;
	import flash.display.Sprite;
	import flash.events.Event;
	
	/**
	 * SndNodeItem
	 * author:xiaohuzi999
	 * SndNodeItem.as Aug 1, 2018 1:28:03 PM
	 * version 1.0
	 *
	 */
	public class SndNodeItem extends Sprite
	{
		private var _ui:SndNodeUI
		private var _data:SndNodeVo;
		/**操作菜单*/
		private var _menu:NativeMenu;
		/***/
		private var _selected:Boolean = false;
		
		/**编辑属性*/
		public  var editPro:String  = "x"
			
		/**事件-编辑*/
		public static const EDIT:String  = "edit";
		/**事件-删除*/
		public static const DELETE:String  = "del";
		public function SndNodeItem()
		{
			super();
			this.init();
		}
		
		private function init():void{
			this._ui = new SndNodeUI();
			this.addChild(this._ui);
			this.mouseChildren = false;
			this.contextMenu = createMenu();
			this._ui.arrH.visible = this._ui.arrV.visible  = false;
		}
		
		public function set data(vo:SndNodeVo):void{
			this._data = vo;
			this.x = vo.x;
			this.y = vo.y;
		}
		
		public function get data():SndNodeVo{
			return this._data;
		}
		
		public function set selected(v:Boolean):void{
			_selected = v;
			if(!_selected){
				this._ui.arrH.visible = this._ui.arrV.visible  = false;
				editPro  = "";
			}else{
				if(editPro == "y"){
					this._ui.arrH.visible = false;
					this._ui.arrV.visible  = true;
				}else{
					this._ui.arrH.visible = true;
					this._ui.arrV.visible  = false;
					editPro = "x";
				}
			}
		}
		
		override public function set x(value:Number):void{
			super.x = value;
			this.data.x  = value;
		}
		
		override public function set y(value:Number):void{
			super.y = value;
			this.data.y = value;
			this.data.t = DB.getTimeStamp(value);
			this._ui.label.text = data.t+"";
		}
		
		public function get selected():Boolean{
			return this._selected;
		}
		
		public function dispose():void{
			this.parent && this.parent.removeChild(this);
		}
		
		private  function createMenu():NativeMenu{
			if(!_menu){
				_menu = new NativeMenu();
				
				var item:NativeMenuItem = new NativeMenuItem("左右移动")
				_menu.addItem(item);
				item.addEventListener(Event.SELECT, onSelect);
				
				item = new NativeMenuItem("上下移动（调整时间）")
				_menu.addItem(item);
				item.addEventListener(Event.SELECT, onSelect);
				
				item = new NativeMenuItem("删除节点")
				_menu.addItem(item);
				item.addEventListener(Event.SELECT, onSelect);
			}
			return _menu;
		}
		
		private function onSelect(event:Event):void{
			if(event.currentTarget.label == "左右移动"){
				this._ui.arrH.visible = true;
				this._ui.arrV.visible = false;
				editPro = "x";
				MainDispatcher.getInstance().dispatchEvent(new XEvent(EDIT, this));
			}else if(event.currentTarget.label == "上下移动（调整时间）"){
				this._ui.arrH.visible = false;
				this._ui.arrV.visible = true;
				editPro = "y"
				MainDispatcher.getInstance().dispatchEvent(new XEvent(EDIT, this));
			}else if(event.currentTarget.label == "删除节点"){
				if(data.t > 0){ //第一个节点不能被删除。。
					MainDispatcher.getInstance().dispatchEvent(new XEvent(DELETE, this));
				}
			}
		}
	}
}