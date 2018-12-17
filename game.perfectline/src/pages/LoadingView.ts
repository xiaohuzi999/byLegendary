const refreshModelList = "reloadModeList";
const refreshRoleList = "loadingRoleList";
const noticficationShowSign = "fristShowSign";
const noticficationRefreshMainData = "refreshUserData";

class LoadingView extends xframe.XWindow {
    ui = new ui.pages.LoadingPageUI();
    constructor() {
        super();
        this.initSDK();
    }

    public show():void{
        super.show();
        Laya.timer.frameLoop(1, this, this.showLoading);
        //加载资源
        //初始化主场景
        //显示主场景
        XFacade.instance.showModule(HomeView)
        //获取数据
        User.instace.initdData();;
        //关闭界面
        this.close();
    }

    public close():void{
        Laya.timer.clear(this, this.showLoading);
    }

    private showLoading(): void {
        this.ui.loading.rotation -= 5;
    }

    initSDK() {
        //do sth.
    }
}
