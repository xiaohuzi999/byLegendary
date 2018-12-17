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
var refreshSign = "updateSignUI";
var SignResultView = /** @class */ (function (_super) {
    __extends(SignResultView, _super);
    function SignResultView() {
        var _this = _super.call(this) || this;
        _this.ui = new ui.plugins.SignResultUI();
        _this.init();
        return _this;
    }
    SignResultView.prototype.init = function () {
        this.isTranslucent = false;
        this.canceledOnTouchOutside = false;
        this.ui.scale(0, 0);
        this.bgAlpha = 0.8;
        Laya.Tween.to(this.ui, { scaleX: 1, scaleY: 1 }, 500, Laya.Ease.linearOut);
    };
    SignResultView.prototype.onShow = function () {
        var _this = this;
        if (this.params) {
            if (this.params.type == 1) {
                this.ui.rewardImg.skin = "res/signin/ic_power_get.png";
            }
            else if (this.params.type == 2) {
                this.ui.rewardImg.skin = "res/signin/ic_coin_get.png";
            }
            else if (this.params.type == 2) {
                //待定
            }
        }
        this.ui.rewardLabel.text = "X" + this.params.target;
        this.ui.getBtn.on(Laya.Event.CLICK, this, function () {
            if (_this.params.type == 1) {
                User.instace.userInfo.power += _this.params.target;
            }
            else if (_this.params.type == 2) {
                User.instace.userInfo.coin += _this.params.target;
            }
            else if (_this.params.type == 3) {
            }
            GameDataManager.instance.recordUserGameData();
            Laya.stage.event(refreshSign);
            Laya.stage.event(noticficationRefreshMainData);
            _this.finish();
        });
    };
    SignResultView.prototype.show = function (data) {
        Tape.PopManager.showPop(SignResultView, data);
    };
    return SignResultView;
}(xframe.XMWindow));
