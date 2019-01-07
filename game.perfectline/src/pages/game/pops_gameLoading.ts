class GameLoading extends xframe.XMWindow{
    ui = new ui.views.LoadingViewUI();
    private params:ChapterVo;
    constructor() {
        super();
    }
    public close():void{
        super.close();
        Laya.timer.clear(this, this.showLoading);
    }

    //
    public show(...args):void {
        this.params = args[0];
        super.show();
        this.onShow();
        Laya.timer.frameLoop(1, this, this.showLoading)
    }

    private onShow() {
        //加载配置
        var res:any[] =  [
            { url: AppConfig.urlRoot+'res/snd/' + this.params.json + '.json', type:Laya.Loader.JSON}
        ]
        GameView.mp3 = AppConfig.urlRoot+'res/snd/' + this.params.mp3 + '.mp3';
        Laya.loader.load(res, Laya.Handler.create(this, this.loadSnd));
    }

    private loadSnd():void{
        XEvent.instance.event(GameEvent.SELECTED, this.params);
        this.close();
    }

    private showLoading():void{
        this.ui.loading.rotation -= 5;
    }
}