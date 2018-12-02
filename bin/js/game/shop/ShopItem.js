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
var ShopItem = /** @class */ (function (_super) {
    __extends(ShopItem, _super);
    function ShopItem() {
        return _super.call(this) || this;
    }
    Object.defineProperty(ShopItem.prototype, "dataSource", {
        get: function () {
            return this._vo;
        },
        set: function (vo) {
            this._vo = vo;
            this.item.dataSource = vo;
            if (this._vo) {
                var itemVo = DBItem.getItemVo(vo.itemId);
                this.tfPriece.text = vo.price + "";
                this.tfName.text = itemVo.name + "";
                if (this._vo.priceType == 1) {
                    this.icon.skin = "icon/jinbi.png";
                }
                else {
                    this.icon.skin = "icon/diamond.png";
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    return ShopItem;
}(ui.shop.ShopItemUI));
//# sourceMappingURL=ShopItem.js.map