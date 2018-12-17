package
{
	import com.xiaohuzi999.xControls.frame.XFacade;
	import com.xiaohuzi999.xControls.frame.manager.ModelManager;
	import com.yx.editor.data.DB;
	import com.yx.editor.utils.LrcUtil;
	import com.yx.editor.view.createView.CreateView;
	import com.yx.editor.view.help.DBHelp;
	import com.yx.editor.view.help.HelpView;
	import com.yx.editor.view.mainView.MainView;
	
	import flash.desktop.NativeApplication;
	import flash.display.Loader;
	import flash.display.LoaderInfo;
	import flash.display.NativeMenu;
	import flash.display.NativeMenuItem;
	import flash.display.NativeWindow;
	import flash.display.Sprite;
	import flash.display.StageAlign;
	import flash.display.StageScaleMode;
	import flash.events.Event;
	import flash.events.KeyboardEvent;
	import flash.filesystem.File;
	import flash.geom.Point;
	import flash.net.URLRequest;
	import flash.ui.Keyboard;
	
	//[SWF(width="1200", height="954")]
	[SWF(width="1000", height="954")]
	public class Editor extends Sprite
	{
		/**菜单-新建*/
		public static const MENU_NEW:String = "新建 Ctrl+N";
		/**菜单-导入配置*/
		public static const MENU_IM_CFG:String = "打开配置表 Ctrl+O";
		/**菜单-导入时间表*/
		public static const MENU_IM_TIME:String = "导入时间表 Ctrl+I";
		/**菜单-导出图片*/
		public static const MENU_OUT_PIC:String  = "导出图片 Ctrl+P";
		/**菜单-保存*/
		public static const MENU_SAVE:String = "保存 Ctrl+S"
			
		/***/
		public static const MENU_SCALE_80:String = "缩放80% Ctrl+-";
		public static const MENU_SCALE_NO:String  = "原始大小 Ctrl++"
			
		/**帮助,功能说明*/
		public static const MENU_HELP_FUN:String = "功能说明"
		public static const MENU_HELP_HOWTO:String  = "操作流程"
		/**边框大小*/
		public static var Frame_Size:Point;
		/**窗口大小*/
		public static var Win_Size:Point = new Point(1000, 954);
		public function Editor()
		{
			//http://www.adobe.com/go/getair/
			if(this.stage){
				this.init();
			}else{
				this.addEventListener(Event.ADDED_TO_STAGE, this.init);
			}
			//var loader:Loader = new Loader();
			//loader.contentLoaderInfo.addEventListener(Event.COMPLETE, this.onComplete);
			//loader.load(new URLRequest("assets\/icon.png"));
		}
		
		private function onComplete(e:Event):void{
			NativeApplication.nativeApplication.icon.bitmaps=[LoaderInfo(e.currentTarget).content];
		}
		
		private function init(e:Event = null):void{
			XFacade.getInstance().init(this, App, "Editor");
			this.initEvent();
			stage.frameRate = 48;
			//创建文件夹
			//var dir:File = new File(File.applicationDirectory.resolvePath("res").nativePath);
			//dir.createDirectory();
			
			var window:NativeWindow = stage.nativeWindow;
			var rootMenu:NativeMenu = new NativeMenu();
			Frame_Size = new Point(window.width-stage.stageWidth, window.height-stage.stageHeight);
			
			var tmpMenu:NativeMenu = new NativeMenu();
			var tmpItem:NativeMenuItem = new NativeMenuItem(MENU_NEW);
			tmpItem.addEventListener(Event.SELECT, onSelcect);
			tmpMenu.addItem(tmpItem);
			
			tmpItem = new NativeMenuItem(MENU_IM_CFG);
			tmpItem.addEventListener(Event.SELECT, onSelcect);
			tmpMenu.addItem(tmpItem);
			
			tmpItem = new NativeMenuItem(MENU_IM_TIME);
			tmpItem.addEventListener(Event.SELECT, onSelcect);
			tmpMenu.addItem(tmpItem);
			
			tmpItem = new NativeMenuItem(MENU_OUT_PIC);
			tmpItem.addEventListener(Event.SELECT, onSelcect);
			tmpMenu.addItem(tmpItem);
			
			tmpItem = new NativeMenuItem(MENU_SAVE);
			tmpItem.addEventListener(Event.SELECT, onSelcect);
			tmpMenu.addItem(tmpItem);
			
			rootMenu.addSubmenu(tmpMenu, "文件");
			
			//编辑
			tmpMenu = new NativeMenu();
			tmpItem = new NativeMenuItem(MENU_SCALE_80);
			tmpItem.addEventListener(Event.SELECT, onSelcect);
			tmpMenu.addItem(tmpItem);
			
			tmpItem = new NativeMenuItem(MENU_SCALE_NO);
			tmpItem.addEventListener(Event.SELECT, onSelcect);
			tmpMenu.addItem(tmpItem);
			
			rootMenu.addSubmenu(tmpMenu, "缩放");
			
			tmpMenu = new NativeMenu();
			tmpItem = new NativeMenuItem(MENU_HELP_HOWTO);
			tmpItem.addEventListener(Event.SELECT, onSelcect);
			tmpMenu.addItem(tmpItem);
			
			tmpItem = new NativeMenuItem(MENU_HELP_FUN);
			tmpItem.addEventListener(Event.SELECT, onSelcect);
			tmpMenu.addItem(tmpItem);
			rootMenu.addSubmenu(tmpMenu, "帮助");
			
			window.menu = rootMenu;
			
			
			stage.scaleMode = StageScaleMode.NO_SCALE;
			stage.align = StageAlign.TOP_LEFT;
		}
		
		private function onSelcect(event:Event):void{
			showMenu(event.currentTarget.label);
		}
		
		private function showMenu(menu:String):void{
			switch(menu){
				case MENU_NEW:
					ModelManager.getInstance(CreateView).show();
					break;
				case MENU_IM_CFG:
					DB.input();
					break;
				case MENU_IM_TIME:
					LrcUtil.loadLrc();
					break;
				case MENU_OUT_PIC:
					(ModelManager.getInstance(MainView) as MainView).outPic();
					break;
				case MENU_SAVE:
					DB.output();
					break;
				case MENU_SCALE_80:
					this.scaleX = this.scaleY = 0.8;
					stage.nativeWindow.width = Win_Size.x*0.8+Frame_Size.x;
					stage.nativeWindow.height = Win_Size.y*0.8+Frame_Size.y;
					break;
				case MENU_SCALE_NO:
					this.scaleX = this.scaleY = 1;
					stage.nativeWindow.width = Win_Size.x+Frame_Size.x;
					stage.nativeWindow.height = Win_Size.y+Frame_Size.y;
					break;
				case MENU_HELP_FUN:
					(ModelManager.getInstance(HelpView) as HelpView).showHelp(DBHelp.FUN_MSG, DBHelp.FUN_TITLE)
					break;
				case MENU_HELP_HOWTO:
					(ModelManager.getInstance(HelpView) as HelpView).showHelp(DBHelp.HOW_TO_C, DBHelp.HOW_TO_T)
					break;
			}
		}
		
		//快捷键设置；
		private function onKD(e:KeyboardEvent):void{
			if(e.ctrlKey){
				switch(e.keyCode){
					case Keyboard.N:
						showMenu(MENU_NEW);
						break;
					case Keyboard.S:
						showMenu(MENU_SAVE);
						break;
					case Keyboard.I:
						showMenu(MENU_IM_TIME);
						break;
					case Keyboard.O:
						showMenu(MENU_IM_CFG);
						break;
					case Keyboard.NUMPAD_ADD:
						showMenu(MENU_SCALE_NO);
						break;
					case Keyboard.NUMPAD_SUBTRACT:
						showMenu(MENU_SCALE_80);
						break;
				}
			}
		}
		
		private function initEvent():void{
			stage.addEventListener(KeyboardEvent.KEY_DOWN, this.onKD);
		}
	}
}