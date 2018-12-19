/*
* name;
*/
var DBItem = /** @class */ (function () {
    function DBItem() {
    }
    /** */
    DBItem.getItemVo = function (id) {
        return this.data[id];
    };
    Object.defineProperty(DBItem, "data", {
        get: function () {
            if (!this._data) {
                this._data = Laya.loader.getRes("res/cfg/item.json");
                trace(this._data);
            }
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    return DBItem;
}());
//# sourceMappingURL=DBItem.js.map