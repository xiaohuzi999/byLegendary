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
var PopAddPower = /** @class */ (function (_super) {
    __extends(PopAddPower, _super);
    function PopAddPower() {
        var _this = _super.call(this) || this;
        _this.ui = new ui.views.home.AddPowerUI();
        _this.ui.btnClose.on(Laya.Event.CLICK, null, function () {
            _this.close();
        });
        _this.ui.btnWatch.on(Laya.Event.CLICK, null, function () {
            //watch
        });
        return _this;
    }
    return PopAddPower;
}(xframe.XMWindow));
