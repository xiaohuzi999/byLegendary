/*
* name;
*/
var DBBuff = /** @class */ (function () {
    function DBBuff() {
    }
    /** */
    DBBuff.getBuff = function (buffId) {
        return this.data[buffId];
    };
    Object.defineProperty(DBBuff, "data", {
        get: function () {
            if (!this._db) {
                this._db = JSON.parse(Laya.loader.getRes("cfgs/buff.txt") + "");
                Laya.loader.clearRes("cfgs/buff.txt");
            }
            return this._db;
        },
        enumerable: true,
        configurable: true
    });
    return DBBuff;
}());
//# sourceMappingURL=DBBuff.js.map