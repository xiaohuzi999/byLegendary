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
var TaskView = /** @class */ (function (_super) {
    __extends(TaskView, _super);
    function TaskView() {
        return _super.call(this) || this;
    }
    TaskView.prototype.show = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        _super.prototype.show.call(this);
        this.showTask({ id: 1, value: 0 });
    };
    TaskView.prototype.showTask = function (taskInfo) {
        this._curId = taskInfo.id;
        var vo = DBTask.getTaskVo(this._curId);
        var done = DBTask.checkFinish(this._curId);
        if (vo) {
            this.ui.tfName.text = vo.name + "";
            this.ui.tfDesc.text = vo.desc + "";
            var arr = vo.reward || [];
            var items = [];
            for (var i = 0; i < arr.length; i++) {
                items.push({ itemId: arr[i][0], num: arr[i][1] });
            }
            this.ui.itemList.array = items;
        }
        this.ui.btnDone.disabled = !done;
    };
    TaskView.prototype.onClick = function (e) {
        switch (e.target) {
            case this.ui.btnDone:
                if (DBTask.finishTask(this._curId)) {
                    this.close();
                }
                break;
            case this.ui.btnDone:
                DBTask.dropTask(this._curId);
                this.close();
                break;
        }
    };
    TaskView.prototype.createUI = function () {
        this.ui = new ui.task.TaskViewUI();
        this.addChild(this.ui);
        this.closeOnBlank = true;
    };
    TaskView.prototype.initEvent = function () {
        _super.prototype.initEvent.call(this);
        this.ui.on(Laya.Event.CLICK, this, this.onClick);
    };
    TaskView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this.ui.off(Laya.Event.CLICK, this, this.onClick);
    };
    return TaskView;
}(xframe.XMWindow));
//# sourceMappingURL=TaskView.js.map