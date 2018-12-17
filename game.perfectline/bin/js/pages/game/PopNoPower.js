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
var PopNoPower = /** @class */ (function (_super) {
    __extends(PopNoPower, _super);
    function PopNoPower() {
        var _this = _super.call(this) || this;
        _this.ui = new ui.views.NoPowerTipUI;
        _this.ui.btnClose.on(Laya.Event.CLICK, null, function () {
            _this.params.run();
            _this.finish();
        });
        return _this;
    }
    PopNoPower.prototype.onShow = function () {
        trace("PopNoPower show");
    };
    return PopNoPower;
}(xframe.XMWindow));
