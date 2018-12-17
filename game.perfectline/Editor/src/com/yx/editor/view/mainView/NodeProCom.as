package com.yx.editor.view.mainView
{
	import com.yx.editor.data.DB;
	
	import flash.display.InteractiveObject;
	import flash.display.MovieClip;
	import flash.events.MouseEvent;
	import flash.text.TextField;

	/**
	 * NodeProCom
	 * author:xiaohuzi999
	 * NodeProCom.as Aug 1, 2018 8:23:57 PM
	 * version 1.0
	 *
	 */
	public class NodeProCom
	{
		private var _ui:MovieClip;
		private var $tfXPos:TextField;
		private var $tfTime:TextField;
		private var $btnSet:InteractiveObject;
		
		private var _item:SndNodeItem;
		public function NodeProCom(ui:MovieClip)
		{
			this._ui = ui;
			$tfXPos = _ui.tfXPos;
			$tfTime = _ui.tfTime;
			$tfTime.restrict = this.$tfXPos.restrict = "0-9";
			$btnSet = _ui.btnSet;
		}
		
		public function show(item:SndNodeItem):void{
			$tfXPos.text  = Math.round(item.x)+"";
			$tfTime.text = item.data.t+"";
			this._item = item;
		}
		
		private function applyPro():void{
			var x:int = parseInt($tfXPos.text);
			var t:int = parseInt($tfTime.text);
			_item.data.x = x;
			_item.data.t = t;
			_item.data.y = DB.getYPos(t);
			_item.data = _item.data;
		}
		
		private function onClick(e:MouseEvent):void{
			switch(e.target){
				case $btnSet:
					applyPro();
					break;
			}
		}
		
		public function set visible(v:Boolean):void{
			this._ui.visible  = v;
			addEvent();
		}
		
		public function get visible():Boolean{
			return this._ui.visible;
			removeEvent();
		}
		
		public function addEvent():void{
			this._ui.addEventListener(MouseEvent.CLICK, this.onClick);
		}
		
		public function removeEvent():void{
			this._ui.removeEventListener(MouseEvent.CLICK, this.onClick);
		}
	}
}