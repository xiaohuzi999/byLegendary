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
        return _super.call(this) || this;
    }
    PopGamePause.prototype.createUI = function () {
        var _this = this;
        this._view = new ui.views.GamePauseUI();
        this.addChild(this._view);
        //
        this._view.btnHome.on(Laya.Event.CLICK, null, function () {
            XEvent.instance.event(GameEvent.BACK);
            XFacade.instance.closeModule(PopGamePause);
        });
        this._view.btnRestart.on(Laya.Event.CLICK, null, function () {
            _this._restartHandler.run();
            XFacade.instance.closeModule(PopGamePause);
        });
        this._view.btnResume.on(Laya.Event.CLICK, null, function (e) {
            e.stopPropagation();
            _this._resumeHandler.run();
            XFacade.instance.closeModule(PopGamePause);
        });
    };
    PopGamePause.prototype.show = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        _super.prototype.show.call(this);
        this._restartHandler = args[1];
        this._resumeHandler = args[0];
    };
    PopGamePause.prototype.close = function () {
        _super.prototype.close.call(this);
        this._restartHandler = this._resumeHandler = null;
    };
    return PopGamePause;
}(xframe.XMWindow));
