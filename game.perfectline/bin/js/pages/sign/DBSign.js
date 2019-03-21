/*
* name;
*/
var DBSign = /** @class */ (function () {
    function DBSign() {
    }
    //
    DBSign.getSignVo = function (id) {
        return this.data[id];
    };
    Object.defineProperty(DBSign, "data", {
        get: function () {
            if (!this._data) {
                this._data = Laya.loader.getRes("res/cfg/sign.json");
            }
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    return DBSign;
}());
