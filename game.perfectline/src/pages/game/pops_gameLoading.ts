class GameLoading extends xframe.XMWindow{
    ui = new ui.views.LoadingViewUI();
    private params:{mp3:string, json:string}
    constructor() {
        super();
    }

    private showLoading():void{
        this.ui.loading.rotation -= 5;
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

    onShow() {
        //加载配置
        var cid:any = 0;
        /**
         * var res:any[] =  [
            { url: 'res/snd/' + this.params.json + '.json', type:Laya.Loader.JSON},
            { url: 'res/map/bj' + cid + '1.jpg', type:Laya.Loader.IMAGE},
            { url: 'res/map/bj' + cid + '2.jpg', type:Laya.Loader.IMAGE},
            { url: 'res/map/bj' + cid + '3.jpg', type:Laya.Loader.IMAGE}
        ]
         */
        var res:any[] =  [
            { url: 'res/snd/' + this.params.json + '.json', type:Laya.Loader.JSON}
        ]

        //预加载2张背景图
        var res2:any = [
            { url: 'res/map/bj' + cid + '2.jpg', type:Laya.Loader.IMAGE},
            { url: 'res/map/bj' + cid + '3.jpg', type:Laya.Loader.IMAGE}
        ]
        //Laya.loader.load(res);

        console.log(Laya.URL.basePath+'res/snd/' + this.params.mp3 + '.mp3')

        //GameActivity.mp3 = Laya.URL.basePath+'res/snd/' + this.params.mp3 + '.mp3';
        GameActivity.mp3 = 'res/snd/' + this.params.mp3 + '.mp3';
        Laya.timer.once(22000, this, this.onErr);
        Laya.loader.load(res, Laya.Handler.create(this, this.loadSnd));
    }

    private loadSnd():void{
        console.log('启动歌曲加载-----------------------');
        if(Laya.loader.getRes('res/snd/' + this.params.json + '.json')){
            XEvent.instance.event(GameEvent.SELECTED, this.params);
        }else{
            Laya.timer.clear(this, this.onErr);
            this.onErr();
            return;
        }
        
        
        
        Laya.loader.load(GameActivity.mp3, Laya.Handler.create(null, ()=>{
            //trace(Laya.MiniAdpter["getFileList"]());
            Laya.timer.clear(this, this.onErr);
            this.close();
        }), null, Laya.Loader.SOUND);
    }

    private onErr():void{
        Laya.URL.version[GameActivity.mp3] = Math.random();
        XEvent.instance.event(GameEvent.ERR);
    }
}