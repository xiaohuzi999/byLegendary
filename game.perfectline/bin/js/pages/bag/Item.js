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
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item(vo) {
        var _this = _super.call(this) || this;
        _this.dataSource = vo;
        return _this;
    }
    Object.defineProperty(Item.prototype, "dataSource", {
        get: function () {
            return this._vo;
        },
        set: function (vo) {
            this._vo = vo;
            if (vo) {
                if (vo.itemId) {
                    this._itemVo = DBItem.getItemVo(vo.itemId);
                }
                else {
                    this.pic.skin = "";
                }
                if (vo.num > 0) {
                    this.tfNum.text = vo.num + "";
                }
                else {
                    this.tfNum.text = "";
                }
            }
            else {
                this._itemVo = null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "ItemVo", {
        get: function () {
            return this._itemVo;
        },
        enumerable: true,
        configurable: true
    });
    return Item;
}(ui.bag.ItemUI));
