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
var DevView = /** @class */ (function (_super) {
    __extends(DevView, _super);
    function DevView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ui = new ui.pages.DevPageUI();
        return _this;
    }
    DevView.prototype.createUI = function () {
        var _this = this;
        _super.prototype.createUI.call(this);
        this.ui.btnBack.on(Laya.Event.CLICK, null, function () {
            _this.close();
        });
        this.ui.panelOutput.vScrollBarSkin = null;
        this.ui.btnAddCoin.on(Laya.Event.CLICK, null, function () {
            // TODO:添加1000金币
            User.instace.gold += 1000;
            User.instace.power += 10;
            User.instace.dispatchEvent();
            User.instace.save();
        });
        this.ui.btnClearLocalData.on(Laya.Event.CLICK, null, function () {
            XDB.delLocalData();
            _this.ui.labelOutput.text = '本地数据清除成功\n';
        });
        this.ui.btnClearRemoteData.on(Laya.Event.CLICK, null, function () {
            XTip.showTip("开发中~~");
        });
        this.ui.btnExit.on(Laya.Event.CLICK, null, function () {
            XTip.showTip("开发中~~");
        });
    };
    return DevView;
}(xframe.XMWindow));
