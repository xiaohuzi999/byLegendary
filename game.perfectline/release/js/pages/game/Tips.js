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
var Tips = /** @class */ (function (_super) {
    __extends(Tips, _super);
    function Tips() {
        var _this = _super.call(this) || this;
        _this.createUI();
        return _this;
    }
    Tips.prototype.createUI = function () {
        var _this = this;
        this._view = new ui.views.NoPowerTipUI();
        this.addChild(this._view);
        this._view.btnClose.on(Laya.Event.CLICK, null, function () {
            Tape.PopManager.hidePop(Tips);
            Tape.PopManager.hidePop(GameLoading);
            _this.params.handle.run();
        });
    };
    Tips.prototype.onShow = function () {
        //
        this._view.tfTitle.text = this.params.title + "";
        this._view.tfContent.text = this.params.msg + "";
    };
    Tips.showTip = function (title, msg, handle) {
        Tape.PopManager.showPop(Tips, { title: title, msg: msg, handle: handle });
    };
    return Tips;
}(xframe.XMWindow));
