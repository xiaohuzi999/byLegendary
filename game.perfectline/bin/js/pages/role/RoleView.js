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
var RoleView = /** @class */ (function (_super) {
    __extends(RoleView, _super);
    function RoleView() {
        var _this = _super.call(this) || this;
        _this.ui = new ui.views.RoleViewUI();
        _this.bgAlpha = 0.8;
        _this.ui.rolelist.vScrollBarSkin = null;
        _this.ui.rolelist.scrollBar.elasticBackTime = 200;
        _this.ui.rolelist.scrollBar.elasticDistance = 200;
        _this.closeOnBlank = true;
        return _this;
    }
    RoleView.prototype.show = function () {
        _super.prototype.show.call(this);
        this.ui.rolelist.array = DBGame.roleInfo;
    };
    RoleView.prototype.update = function () {
        trace("update");
        this.ui.rolelist.refresh();
    };
    RoleView.prototype.initEvent = function () {
        _super.prototype.initEvent.call(this);
        this.ui.closebtn.on(Laya.Event.CLICK, this, this.close);
        XEvent.instance.on(User.UPDATE, this, this.update);
    };
    RoleView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this.ui.closebtn.off(Laya.Event.CLICK, this, this.close);
        XEvent.instance.off(User.UPDATE, this, this.update);
    };
    return RoleView;
}(xframe.XMWindow));
