package com.yx.editor.view.chapterEditer
{
	import com.xiaohuzi999.xControls.frame.XAlert;
	import com.xiaohuzi999.xControls.frame.XModeWindow;
	import com.xiaohuzi999.xControls.frame.manager.TipManager;
	import com.xiaohuzi999.xControls.util.xEvent.MainDispatcher;
	
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.ui.Mouse;
	
	import fl.events.DataGridEvent;
	
	/**
	 * ChapterEditorView 数据编辑器
	 * author:xiaohuzi999
	 * ChapterEditorView.as 2018-8-8 下午4:18:26
	 * version 1.0
	 *
	 */
	public class ChapterEditorView extends XModeWindow
	{
		private var _ui:StageEditUI;
		public function ChapterEditorView()
		{
			super();
		}
		
		override public function show(autoAlignCenter:Boolean=true):void{
			if(!this._ui){
				this.init();
			}
			super.show();
			DBChapter.init();
			TipManager.registerTip(this._ui.btnHelp, tipStr)
		}
		
		private function onEdit(e:DataGridEvent):void{
			DBChapter.save();
		}
		
		private function onClick(e:MouseEvent):void{
			switch(e.target){
				case _ui.btnClose:
					this.close();
					break;
				case _ui.btnOpen:
					DBChapter.input();
					break;
				case _ui.btnSave:
					DBChapter.output();
					break;
				case _ui.btnAdd:
					DBChapter.add();
					break;
				case _ui.btnNew:
					XAlert.showArert("亲~新建的话，表里的数据数据会被清空哦~需要保存么？","新建提示", DBChapter.output, null, "保存", "新建", true, true, DBChapter.init,[[]])
					break;
			}
		}
		
		private function onUpdate(e:Event):void{
			_ui.dg.removeAll();
			for(var i:int=0; i<DBChapter.chapData.length; i++){
				_ui.dg.addItem(DBChapter.chapData[i]);
			}
		}
		
		/***/
		override protected function initEvent():void{
			this._ui.addEventListener(MouseEvent.CLICK, this.onClick);
			this._ui.dg.addEventListener(DataGridEvent.ITEM_EDIT_END, onEdit);
			MainDispatcher.getInstance().addEventListener(DBChapter.UPDATE, onUpdate);
		}
		
		override protected function removeEvent():void{
			this._ui.removeEventListener(MouseEvent.CLICK, this.onClick);
			this._ui.dg.removeEventListener(DataGridEvent.ITEM_EDIT_END, onEdit);
			MainDispatcher.getInstance().removeEventListener(DBChapter.UPDATE, onUpdate);
			TipManager.removeTip(this._ui.btnHelp);
		}
		
		private function init():void{
			this._ui = new StageEditUI();
			this.addChild(_ui);
			
			_ui.dg.columns = ["id","cid", "album", "name", "author", "stars", "mp3", "json", "card"];
			_ui.dg.editable = true;
		}
		
		private var tipStr:String = "id:关卡ID,必须\n" +
			"cid:所属篇章ID\n" +
			"album:歌曲出处\n" +
			"name:歌曲名称\n" +
			"author:歌曲作者\n" +
			"stars:星级划分,格式xx|xx|xx\n" +
			"mp3:歌曲文件名,必须\n" +
			"json:配置文件名,必须\n"+
			"如果哪一行不想被导出，id,mp3,json任意一个就可以了"
	}
}