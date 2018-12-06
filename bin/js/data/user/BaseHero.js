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
var BaseHero = /** @class */ (function (_super) {
    __extends(BaseHero, _super);
    function BaseHero() {
        var _this = _super.call(this) || this;
        /**攻击成长*/
        _this.strengthGrow = 1;
        /**体质成长*/
        _this.physiqueGrow = 0;
        /**敏捷成长*/
        _this.agilityGrow = 0;
        return _this;
    }
    return BaseHero;
}(BaseRole));
//# sourceMappingURL=BaseHero.js.map