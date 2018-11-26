/*
* name;
*/
class LoadingView extends xframe.XWindow{
    public ui:ui.loading.LoadingUI;
    /** */
    public static readonly RDY:string = "rdy";
    constructor(){
        super();
    }

    public show():void{
        super.show();
        //加载本地资源
        //获取用户信息
        //初始化完成
        XEvent.instance.event(LoadingView.RDY);
        this.close();
    }

    protected createUI():void{
        this.ui = new ui.loading.LoadingUI();
        this.addChild(this.ui);
    }
}