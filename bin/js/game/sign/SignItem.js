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
var SignItem = /** @class */ (function (_super) {
    __extends(SignItem, _super);
    function SignItem() {
        var _this = _super.call(this) || this;
        _this.dataSource;
        return _this;
    }
    Object.defineProperty(SignItem.prototype, "dataSource", {
        get: function () {
            return this._vo;
        },
        set: function (vo) {
            this._vo = vo;
            if (this._vo) {
                this.tfDay.text = this._vo.day;
                this.tfName.text = this._vo.name + "";
            }
        },
        enumerable: true,
        configurable: true
    });
    return SignItem;
}(ui.sign.SignItemUI));
//# sourceMappingURL=SignItem.js.map