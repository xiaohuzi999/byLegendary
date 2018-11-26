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
        //获取用户信息
        //初始化完成
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