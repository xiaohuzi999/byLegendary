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
var MainView = /** @class */ (function (_super) {
    __extends(MainView, _super);
    function MainView() {
        var _this = _super.call(this) || this;
        _this._index = 0;
        return _this;
    }
    MainView.prototype.show = function () {
        _super.prototype.show.call(this);
        this.ui.player.dataSource = User.getInstance().role;
    };
    MainView.prototype.onPlayerClick = function (e) {
        if (User.getInstance().role.lv == 1) {
            this._index++;
            if (this._index > 3) {
                this._index = 0;
                User.getInstance().role.lv++;
                this.ui.player.update();
            }
        }
        else {
            //
        }
    };
    MainView.prototype.initEvent = function () {
        this.ui.player.on(Laya.Event.CLICK, this, this.onPlayerClick);
    };
    MainView.prototype.removeEvent = function () {
        this.ui.player.off(Laya.Event.CLICK, this, this.onPlayerClick);
    };
    MainView.prototype.createUI = function () {
        this.ui = new ui.main.MainUI();
        this.addChild(this.ui);
    };
    return MainView;
}(xframe.XWindow));
//# sourceMappingURL=MainView.js.map