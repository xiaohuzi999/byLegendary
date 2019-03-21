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
var Tip = /** @class */ (function (_super) {
    __extends(Tip, _super);
    function Tip() {
        var _this = _super.call(this) || this;
        _this.ui = new ui.views.TipUI();
        _this._layer = xframe.LayerManager.LAYER_TIP;
        return _this;
    }
    Tip.prototype.show = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        _super.prototype.show.call(this);
        var vo = args[0];
        this.ui.tfName.text = vo.name + "";
        this.ui.tfDesc.text = vo.desc + "";
    };
    Tip.prototype.onClose = function () {
        if (!xframe.XUtils.checkHit(this)) {
            this.close();
        }
    };
    Tip.prototype.initEvent = function () {
        _super.prototype.initEvent.call(this);
        Laya.stage.on(Laya.Event.CLICK, this, this.onClose);
    };
    Tip.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        Laya.stage.off(Laya.Event.CLICK, this, this.onClose);
    };
    return Tip;
}(xframe.XWindow));
