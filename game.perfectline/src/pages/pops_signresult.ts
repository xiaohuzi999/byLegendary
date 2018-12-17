const refreshSign = "updateSignUI";
    
class SignResultView extends xframe.XMWindow {
    ui = new ui.plugins.SignResultUI();
    constructor () {
        super();
        this.init();
    }

    init() {
        this.isTranslucent = false;
        this.canceledOnTouchOutside = false;
        this.ui.scale(0, 0);
        this.bgAlpha = 0.8;
        Laya.Tween.to(this.ui, { scaleX: 1, scaleY: 1 }, 500, Laya.Ease.linearOut);
    }

    onShow() {
        if(this.params) {
            if(this.params.type == 1) {
                 this.ui.rewardImg.skin = "res/signin/ic_power_get.png";
            } else if(this.params.type == 2) {
                 this.ui.rewardImg.skin = "res/signin/ic_coin_get.png";
            } else if(this.params.type == 2) {
                //待定
            }
        }
        this.ui.rewardLabel.text = "X" + this.params.target;
        this.ui.getBtn.on(Laya.Event.CLICK, this, () => {
            if(this.params.type == 1) {
                User.instace.userInfo.power += this.params.target;
            } else if(this.params.type == 2) {
                User.instace.userInfo.coin += this.params.target
            } else if(this.params.type == 3) {

            }
            GameDataManager.instance.recordUserGameData();
            Laya.stage.event(refreshSign);
            Laya.stage.event(noticficationRefreshMainData);
            this.finish();
        });
    }

    public show(data) {
        Tape.PopManager.showPop(SignResultView,data);
    }
}