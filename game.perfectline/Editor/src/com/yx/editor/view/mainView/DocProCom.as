package com.yx.editor.view.mainView
{
	import com.xiaohuzi999.xControls.frame.XAlert;
	import com.xiaohuzi999.xControls.frame.XTip;
	import com.xiaohuzi999.xControls.frame.manager.ModelManager;
	import com.xiaohuzi999.xControls.util.xEvent.MainDispatcher;
	import com.xiaohuzi999.xControls.util.xEvent.XEvent;
	import com.yx.editor.data.DB;
	import com.yx.editor.utils.LrcUtil;
	import com.yx.editor.view.chapterEditer.ChapterEditorView;
	import com.yx.editor.view.createNodeView.CreateNodeView;
	import com.yx.editor.view.recorderView.RecorderView;
	
	import flash.display.InteractiveObject;
	import flash.display.MovieClip;
	import flash.events.Event;
	import flash.events.FocusEvent;
	import flash.events.IOErrorEvent;
	import flash.events.KeyboardEvent;
	import flash.events.MouseEvent;
	import flash.filesystem.File;
	import flash.media.Sound;
	import flash.net.FileFilter;
	import flash.net.URLRequest;
	import flash.text.TextField;
	import flash.ui.Keyboard;

	/**
	 * DocProCom 文档信息；
	 * author:xiaohuzi999
	 * DocProCom.as Aug 1, 2018 8:22:25 PM
	 * version 1.0
	 *
	 */
	public class DocProCom
	{
		private var _ui:MovieClip;
		private var $tfSpeed:TextField;
		private var $tfName:TextField;
		private var $tfAngle:TextField;
		private var $btnModifySpd:InteractiveObject;
		private var $btnStop:InteractiveObject;
		private var $btnAdd:InteractiveObject;
		private var $btnSet:InteractiveObject;
		private const MaxSpeed:int = 10;
		/**事件-预览*/
		public static const PREVIEW:String  = "preview";
		/**事件-停止*/
		public static const STOP:String  = "stop";
		/**时间-暂停*/
		public static const PAUSE:String  = "pause";
		/**事件-继续*/
		public static const RESUME:String = "resume";
		/**时间-当前位置播放*/
		public static const PLAY_NOW:String  = "playNow"
		/**事件-显示宽路径*/
		public static const SHOW_WIDE:String = "show_wide";
		/**事件-显示窄路径*/
		public static const SHOW_NARROW:String = "show_narrow";
		public function DocProCom(ui:MovieClip)
		{
			this._ui = ui;
			$tfSpeed = _ui.tfSpeed;
			$tfName = _ui.tfName;
			$tfAngle = _ui.tfAngle;
			$tfSpeed.restrict = $tfAngle.restrict  = "0-9 .";
			$btnModifySpd = _ui.btnModifySpd;
			$btnStop = _ui.btnStop;
			$btnAdd = _ui.btnAdd;
			$btnSet = _ui.btnSet;
			initEvent();
		}
		
		public function update():void{
			$tfSpeed.text = DB.cfg.speed * DB.RenderTime+"";
			this._ui.tfURL.text = DB.cfg.mp3 +"";
			$tfName.text = DB.cfg.name + "";
		}
		
		private function onClick(e:MouseEvent):void{
			switch(e.target){
				case this._ui.btnSelect:
					selectSong();
					break;
				case this._ui.btnPlay:
					if(DB.cfg.mp3.length < 3){
						XAlert.showArert("需要选定一首歌", "歌曲未选择", selectSong);
						return ;
					}
					if(DB.cfg.nodes.length < 3){
						XAlert.showArert("未发现节拍数据，可以导入节拍数据，或者生成节拍数据", "未发现节拍数据", LrcUtil.loadLrc, null, 
							"导入数据","生成节拍", true, true, recordTimeTable
						);
						return;
					}
					MainDispatcher.getInstance().dispatchEvent(new XEvent(PREVIEW));
					break;
				case $btnStop:
					MainDispatcher.getInstance().dispatchEvent(new XEvent(STOP));
					break;
				case $btnModifySpd:
					var speed:Number = parseFloat($tfSpeed.text);
					if(speed >= MaxSpeed){
						speed = MaxSpeed;
						$tfSpeed.text  = MaxSpeed+"";
					}
					DB.modifySpeed(speed/DB.RenderTime);
					break;
				case $btnAdd:
					ModelManager.getInstance(CreateNodeView).show();
					break;
				case _ui.btnRecord:
					if(DB.cfg.mp3.length < 3){
						XAlert.showArert("需要选定一首歌", "歌曲未选择", selectSong, [true]);
					}else{
						ModelManager.getInstance(RecorderView).show();
					}
					break;
				case $btnSet:
					DB.angle = parseFloat($tfAngle.text);
					XTip.showTip("设置成功，下次导入时间线或录制节拍时生效。")
					break;
				case _ui.btnPause:
					MainDispatcher.getInstance().dispatchEvent(new XEvent(PAUSE));
					break;
				case _ui.btnResume:
					MainDispatcher.getInstance().dispatchEvent(new XEvent(RESUME));
					break;
				case _ui.btnPlayNow:
					MainDispatcher.getInstance().dispatchEvent(new XEvent(PLAY_NOW));
					break;
				case _ui.btnEditChapter:
					ModelManager.getInstance(ChapterEditorView).show();
					break;
				case _ui.btnCreatWidePath:
					MainDispatcher.getInstance().dispatchEvent(new XEvent(SHOW_WIDE));
					break;
				case _ui.btnCreatNarrowPath:
					MainDispatcher.getInstance().dispatchEvent(new XEvent(SHOW_NARROW));
					break;
			}
		}
		
		private function onKD(e:KeyboardEvent):void{
			if(e.keyCode == Keyboard.A){
				MainDispatcher.getInstance().dispatchEvent(new XEvent(PAUSE));
			}else if(e.keyCode == Keyboard.S){
				MainDispatcher.getInstance().dispatchEvent(new XEvent(RESUME));
			}
		}
		
		private function recordTimeTable():void{
			ModelManager.getInstance(RecorderView).show();
		}
		
		private function selectSong(openRecord:Boolean = false):void{
			var file:File = File.applicationDirectory.resolvePath("");
			file.browse([new FileFilter(".mp3","*.mp3")]);
			file.addEventListener(Event.SELECT, onOpen);
			
			function onOpen(event:Event):void{
				var file:File = event.target as File;
				file.removeEventListener(Event.SELECT, onOpen);
				DB.cfg.mp3 = file.url;
				_ui.tfURL.text = file.url +"";
				DB.save();
				if(openRecord){
					ModelManager.getInstance(RecorderView).show();
				}
			}
		}
				
		private function onFO(e:FocusEvent):void{
			DB.cfg.name = $tfName.text;
			DB.save();
		}
		
		private function initEvent():void{
			this._ui.addEventListener(MouseEvent.CLICK, this.onClick);
			$tfName.addEventListener(FocusEvent.FOCUS_OUT, this.onFO);
			this._ui.addEventListener(KeyboardEvent.KEY_DOWN, this.onKD);
		}
		
		public function set visible(v:Boolean):void{
			this._ui.visible  = v;
		}
		
		public function get visible():Boolean{
			return this._ui.visible;
		}
	}
}