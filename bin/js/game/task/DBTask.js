/*
* name;
*/
var DBTask = /** @class */ (function () {
    function DBTask() {
    }
    /** */
    DBTask.getTaskVo = function (id) {
        return this.data[id];
    };
    Object.defineProperty(DBTask, "data", {
        get: function () {
            if (!this._data) {
                this._data = Laya.loader.getRes("res/cfg/task.json");
            }
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    return DBTask;
}());
//# sourceMappingURL=DBTask.js.map