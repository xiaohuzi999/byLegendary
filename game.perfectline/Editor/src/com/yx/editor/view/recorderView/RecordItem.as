package com.yx.editor.view.recorderView
{
	import com.xiaohuzi999.xControls.frame.manager.ModelManager;
	import com.yx.editor.data.SndNodeVo;
	import com.yx.editor.view.createNodeView.CreateNodeView;
	
	import flash.display.NativeMenu;
	import flash.display.NativeMenuItem;
	import flash.events.Event;

	/**
	 * DBRecordItem
	 * author:xiaohuzi999
	 * DBRecordItem.as Aug 3, 2018 10:55:39 AM
	 * version 1.0
	 *
	 */
	public class RecordItem extends RecorderNodeUI
	{
		private var _data:SndNodeVo;
		/**操作菜单*/
		private var _menu:NativeMenu;
		
		public function RecordItem()
		{
			super();
			init();
			this.gotoAndStop(1);
		}
		
		public function set selected(b:Boolean):void{
			if(b){
				this.gotoAndStop(2)
			}else{
				this.gotoAndStop(1);
			}
		}
		public function get selected():Boolean{
			return this.currentFrame == 2;
		}
		
		public function set data(vo:SndNodeVo):void{
			this._data = vo;
			if(this._data){
				this.x = DBRecord.getXpos(_data.t);
			}
		}
		
		public function get data():SndNodeVo{
			return this._data;
		}
		
		override public function set x(value:Number):void{
			super.x = value;
			_data.t = DBRecord.getTime(x);
		}
		
		private function onSelect(event:Event):void{
			if(event.currentTarget.label == "删除节点"){
				DBRecord.delNode(this.data);
			}
		}
		
		private function init():void{
			_menu = new NativeMenu();
			var item:NativeMenuItem = new NativeMenuItem("删除节点")
			_menu.addItem(item);
			item.addEventListener(Event.SELECT, onSelect);
			this.contextMenu = _menu;
		}
	}
}