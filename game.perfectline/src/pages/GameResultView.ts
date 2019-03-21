class GameResultView extends xframe.XMWindow {
    ui = new ui.views.GameResultViewUI();
    private _rewardCoin: number;
    private params:any;
    constructor() {
        super();
        this.bgAlpha = 0.5;
        this.init();
    }

    init() {
        this.ui.homebtn.on(Laya.Event.CLICK, null, () => {
            // 返回
            XEvent.instance.event(GameEvent.BACK);
            this.close();
        });

        this.ui.btnRevive.on(Laya.Event.CLICK, null, (e: Laya.Event) => {
            // 重新开始
            e.stopPropagation();
            XEvent.instance.event(GameEvent.REVIVE);
            this.close();
        });
    }

    public show(...args):void{
        super.show();
        this.params = args[0];
        trace("params::",this.params)
        this.ui.tfGold.text = this.params[ItemVo.GOLD] || "0";
        this.ui.tfDiamond.text = this.params[ItemVo.DIAMOND] || "0";
        this.ui.tfItem.text = this.params[ItemVo.KEY] || "0"
        this.ui.tfScore.text = "完成"+this.params["score"]+"%";

        this.params[ItemVo.GOLD] && Bag.getInstance().addItem(ItemVo.GOLD, this.params[ItemVo.GOLD])
        this.params[ItemVo.DIAMOND] && Bag.getInstance().addItem(ItemVo.DIAMOND, this.params[ItemVo.DIAMOND])
        this.params[ItemVo.KEY] && Bag.getInstance().addItem(ItemVo.KEY, this.params[ItemVo.KEY])

        if(this.params["revive"]){
            this.ui.btnRevive.visible = true;
            this.ui.btnRevive.pos(56, 730);
            this.ui.homebtn.pos(334, 730)
        }else{
            this.ui.btnRevive.visible = false;
            this.ui.homebtn.pos(188, 730)
        }

        //保存==;
        let musicId:number = this.params.music.id
        if(User.instace.starInfo[musicId] != undefined && User.instace.starInfo[musicId] < this.params.score){
            User.instace.starInfo[musicId] = this.params.score;
        }
        User.instace.dispatchEvent();
        User.instace.save();
    }

    updateUi() {
        //需要数据支撑~~
        this.ui.tip.text = this.params.music.name;
        this.ui.tfGold.text = "X" + this._rewardCoin;
    }
}