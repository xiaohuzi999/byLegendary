package com.yx.editor.view.createView
{
	import com.xiaohuzi999.xControls.frame.XModeWindow;
	import com.xiaohuzi999.xControls.frame.manager.AnimateManager;
	import com.yx.editor.data.DB;
	
	import flash.events.MouseEvent;
	
	/**
	 * CreateView
	 * author:xiaohuzi999
	 * CreateView.as Aug 2, 2018 4:13:31 PM
	 * version 1.0
	 *
	 */
	public class CreateView extends XModeWindow
	{
		private var _ui:CreateUI;
		public function CreateView()
		{
			super();
		}
		
		override public function show(autoAlignCenter:Boolean=true):void{
			if(!this._ui){
				this.init();
			}
			super.show();
		}
		
		private function onClick(e:MouseEvent):void{
			switch(e.target){
				case _ui.btnCreate:
					DB.create(_ui.tfName.text, _ui.tfSpeed.text);
					this.close();
					break;
				case _ui.btnClose:
					this.close();
					break;
			}
		}
		
		override protected function initEvent():void{
			super.initEvent();
			this._ui.addEventListener(MouseEvent.CLICK, this.onClick);
		}
		
		override protected function removeEvent():void{
			super.removeEvent();
			this._ui.removeEventListener(MouseEvent.CLICK, this.onClick);
		}
		
		private function init():void{
			this._ui  = new CreateUI();
			this.addChild(this._ui);
		}
	}
}