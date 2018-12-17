
const hadShowSignView = "hadShowSignView";

class SigninPop extends xframe.XMWindow {

    ui = new ui.plugins.SignInUI();
    private configList: Array<any>;
    //自动弹出标注
    public static autoFlag:boolean = false;
    public static show(force = false) {
        // SigninManager.signinState(0, (state) => {
        //     if (force || state == -1 || state == 0) {
        //         Tape.PopManager.showPop(SigninPop);
        //     }
        // });
        Tape.PopManager.showPop(SigninPop);
    }

    /**显示加金币提示 */
    showAddCoinToast(data) {
        SignResultView.show(data);
    }

    constructor() {
        super();
        this.bgAlpha = 0.8;
        this.isTranslucent = false;
        this.canceledOnTouchOutside = false;
        this.visible = !SigninPop.autoFlag;

        this.ui.btnClose.on(Laya.Event.CLICK, this, () => {
            this.finish();
        });

        this.ui.btnReceice.on(Laya.Event.CLICK, this, () => {
            var index = SigninManager.signIndex();
            var signData = this.configList[index];
            SigninManager.sign(signData);
            this.showAddCoinToast(signData);
            // 关闭签到卡片
            this.ui.btnReceice.visible = false;
        });

        var _self = this;
        fetchSignList().then(res => {
            if (res && res.list) {
                var source: Array<any> = res.list;
                var lastItem = source[source.length - 1];
                var rewards: Array<any> = lastItem.rewards;
                var type;
                if (DataManager.getData(HadRole)) {
                    type = 2;
                } else {
                    type = 3;
                }
                var reward = rewards.find(item => {
                    return item.type = type
                });
                lastItem.type = type;
                lastItem.target = reward.target;
                _self.configList = res.list;
                _self.updateUI();
            }
        });
    }

    updateUI(frist = false) {
        if (!this.ui) {
            return;
        }
        this.configList.forEach((element, index) => {
            let sign = this.ui[`sign${index + 1}`] as ui.plugins.SignInItemUI;
            var type: number = element.type;
            sign.rewardCountLabel.text = `X${element.target}`;
            sign.dayLabel.text = `第${index + 1}天`;
            // 1 体力 2 金币 3 角色
            if (type == 1) {
                sign.rewardImg.skin = "res/signin/ic_power.png";
                sign.tfType.text = "体力";
            } else if (type == 2) {
                sign.rewardImg.skin = "res/signin/ic_coin.png"
                sign.tfType.text = "金币";
            } else if (type == 3) {
                sign.visible = false;
                sign = this.ui[`sign${7 + 1}`];
                sign.visible = true;
            }
        });

        // 没有断签
        if (!SigninManager.checkSignBreak()) {
            var list: Array<any> = DataManager.getData(SignKey);
            list.forEach((element, index) => {
                if (element.type == 3) {
                    this.ui.sevenRoleLabel.text = "已领取";
                } else {
                    let sign = this.ui[`sign${index + 1}`] as ui.plugins.SignInItemUI;
                    sign.dayLabel.text = "已领取";
                    sign.stateImg.visible = true;
                    sign.stateImg.skin = 'res/signin/btn_choose.png';
                }
            });
        }

        // 是否显示领取按钮
        if(SigninManager.hadSign()) {//已签到
            this.ui.btnReceice.visible = false;
            if(SigninPop.autoFlag){
                this.finish();
            }
        } else {
            this.ui.btnReceice.visible = true;  
            if(SigninPop.autoFlag){
                this.visible = true;
            }
        }
        SigninPop.autoFlag = false;
    }

    onShow() {
        Laya.stage.on(refreshSign, this, this.updateUI);
    }

    onHide() {
        Laya.stage.off(refreshSign, this, this.updateUI);
    }

}
