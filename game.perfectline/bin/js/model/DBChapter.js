/*
* name;
*/
var DBChapter = /** @class */ (function () {
    function DBChapter() {
    }
    /**判断是否满足解锁条件 */
    DBChapter.canUnlock = function (id) {
        var vo = this.getChapInfo(id);
        return Bag.getInstance().getItemNum(vo.cond[0]) >= vo.cond[1];
    };
    //
    DBChapter.getChapInfo = function (id) {
        for (var i in this.chapList) {
            if (this.chapList[i].id == id) {
                return this.chapList[i];
            }
        }
        return null;
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
