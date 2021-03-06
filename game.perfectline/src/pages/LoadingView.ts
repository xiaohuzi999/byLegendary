class LoadingView extends xframe.XWindow {
    ui = new ui.pages.LoadingPageUI();
    /**事件 */
    public static readonly RDY:string = "rdy";
    constructor() {
        super();
    }

    public show():void{
        super.show();
        Laya.timer.frameLoop(1, this, this.showLoading);
        //加载资源
        //初始化主场景
        //获取数据
        XDB.delLocalData();
        XDB.fetchSrvData(Handler.create(this, this.onGetData))
    }

    //
    private onGetData():void{
        User.instace.initdData();
        Bag.getInstance().init();
        User.instace.diamond = 99999;
        XEvent.instance.event(LoadingView.RDY)
    }

    public close():void{
        super.close();
        Laya.timer.clear(this, this.showLoading);
    }

    private showLoading(): void {
        this.ui.loading.rotation -= 5;
    }
}
