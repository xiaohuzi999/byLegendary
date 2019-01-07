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
var GameLoading = /** @class */ (function (_super) {
    __extends(GameLoading, _super);
    function GameLoading() {
        var _this = _super.call(this) || this;
        _this.ui = new ui.views.LoadingViewUI();
        return _this;
    }
    GameLoading.prototype.close = function () {
        _super.prototype.close.call(this);
        Laya.timer.clear(this, this.showLoading);
    };
    //
    GameLoading.prototype.show = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.params = args[0];
        _super.prototype.show.call(this);
        this.onShow();
        Laya.timer.frameLoop(1, this, this.showLoading);
    };
    GameLoading.prototype.onShow = function () {
        //加载配置
        var res = [
            { url: AppConfig.urlRoot + 'res/snd/' + this.params.json + '.json', type: Laya.Loader.JSON }
        ];
        GameView.mp3 = AppConfig.urlRoot + 'res/snd/' + this.params.mp3 + '.mp3';
        Laya.loader.load(res, Laya.Handler.create(this, this.loadSnd));
    };
    GameLoading.prototype.loadSnd = function () {
        XEvent.instance.event(GameEvent.SELECTED, this.params);
        this.close();
    };
    GameLoading.prototype.showLoading = function () {
        this.ui.loading.rotation -= 5;
    };
    return GameLoading;
}(xframe.XMWindow));
