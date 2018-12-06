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
var FightView = /** @class */ (function (_super) {
    __extends(FightView, _super);
    function FightView() {
        var _this = _super.call(this) || this;
        _this.ui = new ui.fight.FightUI();
        return _this;
    }
    //
    FightView.prototype.fight = function (home, away) {
        FightModel.init(home, away);
    };
    return FightView;
}(xframe.XMWindow));
//# sourceMappingURL=FightView.js.map