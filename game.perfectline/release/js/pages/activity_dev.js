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
var DevActivity = /** @class */ (function (_super) {
    __extends(DevActivity, _super);
    function DevActivity() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ui = new ui.pages.DevPageUI();
        return _this;
    }
    DevActivity.prototype.createUI = function () {
        var _this = this;
        _super.prototype.createUI.call(this);
        this.ui.btnBack.on(Laya.Event.CLICK, null, function () {
            _this.close();
        });
        this.ui.panelOutput.vScrollBarSkin = null;
        this.ui.btnAddCoin.on(Laya.Event.CLICK, null, function () {
            // TODO:添加1000金币
            User.instace.userInfo.coin += 1000;
            User.instace.userInfo.power += 10;
        });
        this.ui.btnClearLocalData.on(Laya.Event.CLICK, null, function () {
            _this.ui.labelOutput.text = '本地数据清除成功\n';
        });
        this.ui.btnClearRemoteData.on(Laya.Event.CLICK, null, function () {
            XTip.showTip("开发中~~");
        });
        this.ui.btnExit.on(Laya.Event.CLICK, null, function () {
            XTip.showTip("开发中~~");
        });
    };
    return DevActivity;
}(xframe.XMWindow));
