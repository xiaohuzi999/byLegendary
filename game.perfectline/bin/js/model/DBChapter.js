/*
* name;
*/
var DBChapter = /** @class */ (function () {
    function DBChapter() {
    }
    //
    DBChapter.getChapInfo = function (id) {
        return this.chapList[id];
    };
    Object.defineProperty(DBChapter, "chapList", {
        get: function () {
            if (!this._data) {
                this._data = Laya.loader.getRes("res/cfg/stage.json");
            }
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    return DBChapter;
}());
