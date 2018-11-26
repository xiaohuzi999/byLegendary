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
/*
* name;
*/
var LoadingView = /** @class */ (function (_super) {
    __extends(LoadingView, _super);
    function LoadingView() {
        return _super.call(this) || this;
    }
    LoadingView.prototype.show = function () {
        _super.prototype.show.call(this);
        //加载本地资源
        var urlList = [];
        /*
        let urlList:any[] = [
            "res/atlas/common.atlas",
            "res/atlas/share.atlas"
        ]*/
        if (urlList.length) {
            Laya.loader.load(urlList, Handler.create(this, this.fetchSrvData));
        }
        else {
            this.fetchSrvData();
        }
    };
    //获取远程存储数据
    LoadingView.prototype.fetchSrvData = function () {
        XDB.fetchSrvData(Laya.Handler.create(this, this.onFetchSrvData));
    };
    //已获取服务端数据
    LoadingView.prototype.onFetchSrvData = function () {
        User.getInstance().init();
        XEvent.instance.event(LoadingView.RDY);
        this.close();
    };
    LoadingView.prototype.createUI = function () {
        this.ui = new ui.loading.LoadingUI();
        this.addChild(this.ui);
    };
    /** */
    LoadingView.RDY = "rdy";
    return LoadingView;
}(xframe.XWindow));
//# sourceMappingURL=LoadingView.js.map