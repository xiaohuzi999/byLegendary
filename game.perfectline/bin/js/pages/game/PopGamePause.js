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
var PopGamePause = /** @class */ (function (_super) {
    __extends(PopGamePause, _super);
    function PopGamePause() {
        var _this = _super.call(this) || this;
        _this.createUI();
        return _this;
    }
    PopGamePause.prototype.createUI = function () {
        this._view = new ui.views.GamePauseUI();
        this.addChild(this._view);
        //
        this._view.btnHome.on(Laya.Event.CLICK, null, function () {
            XEvent.instance.event(GameEvent.BACK);
            Tape.PopManager.hidePop(PopGamePause);
        });
        this._view.btnRestart.on(Laya.Event.CLICK, null, function () {
            PopGamePause.restartHandler.run();
            Tape.PopManager.hidePop(PopGamePause);
        });
        this._view.btnResume.on(Laya.Event.CLICK, null, function (e) {
            e.stopPropagation();
            PopGamePause.resumeHandler.run();
            Tape.PopManager.hidePop(PopGamePause);
        });
    };
    /** */
    PopGamePause.show = function (force, opt) {
        if (force === void 0) { force = false; }
        if (opt === void 0) { opt = null; }
        this.resumeHandler = opt[0];
        this.restartHandler = opt[1];
        Tape.PopManager.showPop(PopGamePause);
    };
    return PopGamePause;
}(xframe.XMWindow));
