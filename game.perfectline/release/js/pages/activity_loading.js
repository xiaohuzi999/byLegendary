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
var refreshModelList = "reloadModeList";
var refreshRoleList = "loadingRoleList";
var noticficationShowSign = "fristShowSign";
var noticficationRefreshMainData = "refreshUserData";
var LoadingActivity = /** @class */ (function (_super) {
    __extends(LoadingActivity, _super);
    function LoadingActivity() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ui = new ui.pages.LoadingPageUI();
        return _this;
    }
    LoadingActivity.prototype.onCreate = function () {
        this.initSDK();
        Laya.timer.frameLoop(1, this, this.showLoading);
    };
    LoadingActivity.prototype.showLoading = function () {
        this.ui.loading.rotation -= 5;
    };
    LoadingActivity.prototype.onDestroy = function () {
        Laya.timer.clear(this, this.showLoading);
    };
    LoadingActivity.prototype.initSDK = function () {
        wx.showLoading({
            title: '正在初始化'
        });
    };
    return LoadingActivity;
}(xframe.XWindow));
