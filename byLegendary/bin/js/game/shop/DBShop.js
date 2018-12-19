/*
* name;
*/
var DBShop = /** @class */ (function () {
    function DBShop() {
    }
    //
    DBShop.getShopItemVo = function (id) {
        return this.data[id];
    };
    /**获取所有列表 */
    DBShop.getShopList = function () {
        trace("getShopList::", this._data);
        var items = [];
        for (var i in this.data) {
            items.push(this.data[i]);
        }
        return items;
    };
    Object.defineProperty(DBShop, "data", {
        get: function () {
            if (!this._data) {
                this._data = Laya.loader.getRes("res/cfg/shop.json");
            }
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    return DBShop;
}());
//# sourceMappingURL=DBShop.js.map