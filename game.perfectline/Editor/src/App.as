package
{
	import com.xiaohuzi999.xControls.frame.interfaces.IApp;
	import com.xiaohuzi999.xControls.frame.manager.ModelManager;
	import com.yx.editor.data.DB;
	import com.yx.editor.view.mainView.MainView;
	
	public class App implements IApp
	{
		public function App()
		{
		}
		
		public function start():void
		{
			DB.init();
			ModelManager.getInstance(MainView).show();
		}
	}
}