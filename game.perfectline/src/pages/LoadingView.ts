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
        //XDB.delLocalData();
        XDB.fetchSrvData(Handler.create(this, this.onGetData))
    }

    private onGetData():void{
        User.instace.initdData();;
        XEvent.instance.event(LoadingView.RDY)
        //this.close();
    }

    public close():void{
        super.close();
        Laya.timer.clear(this, this.showLoading);
    }

    private showLoading(): void {
        this.ui.loading.rotation -= 5;
    }
}
