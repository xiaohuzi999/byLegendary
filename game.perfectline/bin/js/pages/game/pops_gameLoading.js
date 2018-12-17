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
    GameLoading.prototype.showLoading = function () {
        this.ui.loading.rotation -= 5;
    };
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
        var cid = 0;
        /**
         * var res:any[] =  [
            { url: 'res/snd/' + this.params.json + '.json', type:Laya.Loader.JSON},
            { url: 'res/map/bj' + cid + '1.jpg', type:Laya.Loader.IMAGE},
            { url: 'res/map/bj' + cid + '2.jpg', type:Laya.Loader.IMAGE},
            { url: 'res/map/bj' + cid + '3.jpg', type:Laya.Loader.IMAGE}
        ]
         */
        var res = [
            { url: 'res/snd/' + this.params.json + '.json', type: Laya.Loader.JSON }
        ];
        //预加载2张背景图
        var res2 = [
            { url: 'res/map/bj' + cid + '2.jpg', type: Laya.Loader.IMAGE },
            { url: 'res/map/bj' + cid + '3.jpg', type: Laya.Loader.IMAGE }
        ];
        //Laya.loader.load(res);
        console.log(Laya.URL.basePath + 'res/snd/' + this.params.mp3 + '.mp3');
        //GameActivity.mp3 = Laya.URL.basePath+'res/snd/' + this.params.mp3 + '.mp3';
        GameActivity.mp3 = 'res/snd/' + this.params.mp3 + '.mp3';
        Laya.timer.once(22000, this, this.onErr);
        Laya.loader.load(res, Laya.Handler.create(this, this.loadSnd));
    };
    GameLoading.prototype.loadSnd = function () {
        var _this = this;
        console.log('启动歌曲加载-----------------------');
        if (Laya.loader.getRes('res/snd/' + this.params.json + '.json')) {
            XEvent.instance.event(GameEvent.SELECTED, this.params);
        }
        else {
            Laya.timer.clear(this, this.onErr);
            this.onErr();
            return;
        }
        Laya.loader.load(GameActivity.mp3, Laya.Handler.create(null, function () {
            //trace(Laya.MiniAdpter["getFileList"]());
            Laya.timer.clear(_this, _this.onErr);
            _this.close();
        }), null, Laya.Loader.SOUND);
    };
    GameLoading.prototype.onErr = function () {
        Laya.URL.version[GameActivity.mp3] = Math.random();
        XEvent.instance.event(GameEvent.ERR);
    };
    return GameLoading;
}(xframe.XMWindow));
