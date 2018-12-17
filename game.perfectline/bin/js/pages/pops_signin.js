var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var hadShowSignView = "hadShowSignView";
var SigninPop = /** @class */ (function (_super) {
    __extends(SigninPop, _super);
    function SigninPop() {
        var _this = _super.call(this) || this;
        _this.ui = new ui.plugins.SignInUI();
        _this.bgAlpha = 0.8;
        _this.isTranslucent = false;
        _this.canceledOnTouchOutside = false;
        _this.visible = !SigninPop.autoFlag;
        _this.ui.btnClose.on(Laya.Event.CLICK, _this, function () {
            _this.finish();
        });
        _this.ui.btnReceice.on(Laya.Event.CLICK, _this, function () {
            var index = SigninManager.signIndex();
            var signData = _this.configList[index];
            SigninManager.sign(signData);
            _this.showAddCoinToast(signData);
            // 关闭签到卡片
            _this.ui.btnReceice.visible = false;
        });
        var _self = _this;
        fetchSignList().then(function (res) {
            if (res && res.list) {
                var source = res.list;
                var lastItem = source[source.length - 1];
                var rewards = lastItem.rewards;
                var type;
                if (DataManager.getData(HadRole)) {
                    type = 2;
                }
                else {
                    type = 3;
                }
                var reward = rewards.find(function (item) {
                    return item.type = type;
                });
                lastItem.type = type;
                lastItem.target = reward.target;
                _self.configList = res.list;
                _self.updateUI();
            }
        });
        return _this;
    }
    SigninPop.show = function (force) {
        if (force === void 0) { force = false; }
        // SigninManager.signinState(0, (state) => {
        //     if (force || state == -1 || state == 0) {
        //         Tape.PopManager.showPop(SigninPop);
        //     }
        // });
        Tape.PopManager.showPop(SigninPop);
    };
    /**显示加金币提示 */
    SigninPop.prototype.showAddCoinToast = function (data) {
        SignResultView.show(data);
    };
    SigninPop.prototype.updateUI = function (frist) {
        var _this = this;
        if (frist === void 0) { frist = false; }
        if (!this.ui) {
            return;
        }
        this.configList.forEach(function (element, index) {
            var sign = _this.ui["sign" + (index + 1)];
            var type = element.type;
            sign.rewardCountLabel.text = "X" + element.target;
            sign.dayLabel.text = "\u7B2C" + (index + 1) + "\u5929";
            // 1 体力 2 金币 3 角色
            if (type == 1) {
                sign.rewardImg.skin = "res/signin/ic_power.png";
                sign.tfType.text = "体力";
            }
            else if (type == 2) {
                sign.rewardImg.skin = "res/signin/ic_coin.png";
                sign.tfType.text = "金币";
            }
            else if (type == 3) {
                sign.visible = false;
                sign = _this.ui["sign" + (7 + 1)];
                sign.visible = true;
            }
        });
        // 没有断签
        if (!SigninManager.checkSignBreak()) {
            var list = DataManager.getData(SignKey);
            list.forEach(function (element, index) {
                if (element.type == 3) {
                    _this.ui.sevenRoleLabel.text = "已领取";
                }
                else {
                    var sign = _this.ui["sign" + (index + 1)];
                    sign.dayLabel.text = "已领取";
                    sign.stateImg.visible = true;
                    sign.stateImg.skin = 'res/signin/btn_choose.png';
                }
            });
        }
        // 是否显示领取按钮
        if (SigninManager.hadSign()) { //已签到
            this.ui.btnReceice.visible = false;
            if (SigninPop.autoFlag) {
                this.finish();
            }
        }
        else {
            this.ui.btnReceice.visible = true;
            if (SigninPop.autoFlag) {
                this.visible = true;
            }
        }
        SigninPop.autoFlag = false;
    };
    SigninPop.prototype.onShow = function () {
        Laya.stage.on(refreshSign, this, this.updateUI);
    };
    SigninPop.prototype.onHide = function () {
        Laya.stage.off(refreshSign, this, this.updateUI);
    };
    //自动弹出标注
    SigninPop.autoFlag = false;
    return SigninPop;
}(xframe.XMWindow));
