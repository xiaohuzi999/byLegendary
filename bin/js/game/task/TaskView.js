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