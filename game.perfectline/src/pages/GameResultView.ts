class GameResultView extends xframe.XMWindow {
    ui = new ui.views.GameResultViewUI();
    private topToast = new ui.views.TopToastViewUI();
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

        this.ui.restartbtn.on(Laya.Event.CLICK, null, (e: Laya.Event) => {
            // 重新开始
            e.stopPropagation();
            XEvent.instance.event(GameEvent.RESTART);
            this.close();
        });
    }

    public show(...args):void{
        super.show();
        this.params = args[0];
    }

    onShow() {
        // 金币的数量
        this._rewardCoin = 0;
        this.updateUi();
        User.instace.gold += this._rewardCoin;
    }

    updateUi() {
        for (let i = 1; i < 4; i++) {
            if (i > this.params.star) {
                this.ui["star" + i].skin = "res/game/ic_star_result_gray_b.png";
            } else {
                this.ui["star" + i].skin = "res/game/ic_star_result_b.png";
            }
        }

        if (this.params.star > 2) {
            this.ui.restartbtn.visible = false;
            this.ui.nextBtn.visible = true;
        }

        //需要数据支撑~~
        this.ui.tip.text = this.params.music.name;
        this.ui.authname.text = this.params.music.author;
        this.ui.scorelabel.text = this.params.score + "分";
        this.ui.coinLabel.text = "X" + this._rewardCoin;
    }
}