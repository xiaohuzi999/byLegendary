package com.yx.editor.view.help
{
	import com.xiaohuzi999.xControls.frame.XModeWindow;
	import com.xiaohuzi999.xControls.frame.manager.AnimateManager;
	
	import flash.events.MouseEvent;
	import flash.ui.Mouse;
	
	/**
	 * HelpView
	 * author:xiaohuzi999
	 * HelpView.as 2018-8-6 上午11:11:11
	 * version 1.0
	 *
	 */
	public class HelpView extends XModeWindow
	{
		private var _ui:Help_FunUI;
		public function HelpView()
		{
			super();
		}
		
		override public function show(autoAlignCenter:Boolean=true):void{
			if(!this._ui){
				this.init();
			}
			super.show();
			//AnimateManager.flowin(this);
		}
		
		/*override public function close():void{
			AnimateManager.flowout(this, super.close);
		}*/
		
		public function showHelp(msg:String, title:String):void{
			this.show();
			this._ui.tfTitle.text = title +"";
			this._ui.tfContent.text = msg + "";
			this.cacheAsBitmap = true;
		}
		
		private function onClick(e:MouseEvent):void{
			switch(e.target){
				case _ui.btnClose:
					this.close();
					break;
			}
		}
		
		private function init():void{
			this._ui = new Help_FunUI();
			this.addChild(this._ui);
		}
		
		override protected function  initEvent():void{
			this._ui.addEventListener(MouseEvent.CLICK, onClick);
		}
		
		override protected function removeEvent():void{
			this._ui.removeEventListener(MouseEvent.CLICK, onClick);
		}
	}
}