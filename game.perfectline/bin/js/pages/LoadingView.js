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
var LoadingView = /** @class */ (function (_super) {
    __extends(LoadingView, _super);
    function LoadingView() {
        var _this = _super.call(this) || this;
        _this.ui = new ui.pages.LoadingPageUI();
        return _this;
    }
    LoadingView.prototype.show = function () {
        _super.prototype.show.call(this);
        Laya.timer.frameLoop(1, this, this.showLoading);
        //加载资源
        //初始化主场景
        //获取数据
        //XDB.delLocalData();
        XDB.fetchSrvData(Handler.create(this, this.onGetData));
    };
    //
    LoadingView.prototype.onGetData = function () {
        User.instace.initdData();
        ;
        XEvent.instance.event(LoadingView.RDY);
    };
    LoadingView.prototype.close = function () {
        _super.prototype.close.call(this);
        Laya.timer.clear(this, this.showLoading);
    };
    LoadingView.prototype.showLoading = function () {
        this.ui.loading.rotation -= 5;
    };
    /**事件 */
    LoadingView.RDY = "rdy";
    return LoadingView;
}(xframe.XWindow));
