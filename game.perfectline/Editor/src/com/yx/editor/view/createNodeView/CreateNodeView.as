package com.yx.editor.view.createNodeView
{
	import com.xiaohuzi999.xControls.frame.XModeWindow;
	import com.yx.editor.data.DB;
	import com.yx.editor.view.recorderView.DBRecord;
	
	import flash.events.MouseEvent;
	
	/**
	 * CreateNodeView
	 * author:xiaohuzi999
	 * CreateNodeView.as Aug 2, 2018 6:06:15 PM
	 * version 1.0
	 *
	 */
	public class CreateNodeView extends XModeWindow
	{
		private var _ui:CreateNodeUI;
		/**是否节拍器器模式*/
		public static var RecordMode:Boolean = false;
		public function CreateNodeView()
		{
			super();
		}
		
		override public function show(autoAlignCenter:Boolean=true):void{
			if(!this._ui){
				this.init();
			}
			super.show();
		}
		
		override public function close():void{
			super.close();
			RecordMode = false;
		}
		
		private function onClick(e:MouseEvent):void{
			switch(e.target){
				case _ui.btnCreate:
					if(RecordMode){
						DBRecord.add(parseInt(_ui.tfTime.text));
					}else{
						DB.insert(parseInt(_ui.tfTime.text));
					}
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
			this._ui = new CreateNodeUI();
			this.addChild(this._ui);
			_ui.tfTime.restrict = "0-9"
		}
	}
}