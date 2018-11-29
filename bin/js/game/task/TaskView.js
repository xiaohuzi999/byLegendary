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
        this.showTask(User.getInstance().task[0]);
    };
    TaskView.prototype.showTask = function (taskId) {
        var vo = DBTask.getTaskVo(taskId);
        if (vo) {
            this.ui.tfName.text = vo.name + "";
            this.ui.tfDesc.text = vo.desc + "";
        }
    };
    TaskView.prototype.createUI = function () {
        this.ui = new ui.task.TaskViewUI();
        this.addChild(this.ui);
        this.closeOnBlank = true;
    };
    TaskView.prototype.initEvent = function () {
        _super.prototype.initEvent.call(this);
    };
    TaskView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
    };
    return TaskView;
}(xframe.XMWindow));
//# sourceMappingURL=TaskView.js.map