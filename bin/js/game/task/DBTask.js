/*
* name;
*/
var DBTask = /** @class */ (function () {
    function DBTask() {
    }
    /**check task state */
    DBTask.checkFinish = function (id) {
        var vo = DBTask.getTaskVo(id);
        //状态判定
        if (vo.type == TaskVo.TypeItem) {
            if (vo.cond && vo.cond.length) {
                var itemNum = Bag.getInstance().getItemNum(vo.cond[0]);
                if (itemNum >= vo.cond[1]) {
                    return true;
                }
            }
        }
        return false;
    };
    /** */
    DBTask.finishTask = function (id) {
        if (this.checkFinish(id)) {
            var vo = this.getTaskVo(id);
            if (vo.type == TaskVo.TypeItem) {
                Bag.getInstance().delItem(vo.cond[0], vo.cond[1]);
            }
            if (vo.reward) {
                for (var i = 0; i < vo.reward.length; i++) {
                    var tmp = vo.reward[i];
                    Bag.getInstance().addItem(tmp[0], tmp[1]);
                }
            }
            //todo special
            if (vo.special) {
                XAlert.showAlert("doing ~~~~~~~~~~~~~~~~~~");
            }
            User.getInstance().taskDone.push(id);
            for (var i = 0; i < User.getInstance().task.length; i++) {
                if (User.getInstance().task[i].id == id) {
                    User.getInstance().task.splice(i, 1);
                }
            }
            return true;
        }
        else {
            XTip.showTip("not finish~");
        }
        return false;
    };
    /** */
    DBTask.getTaskVo = function (id) {
        return this.data[id];
    };
    Object.defineProperty(DBTask, "data", {
        get: function () {
            if (!this._data) {
                this._data = Laya.loader.getRes("res/cfg/task.json");
                trace(this._data);
            }
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    return DBTask;
}());
//# sourceMappingURL=DBTask.js.map