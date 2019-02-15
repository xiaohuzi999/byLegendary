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
var GameResultView = /** @class */ (function (_super) {
    __extends(GameResultView, _super);
    function GameResultView() {
        var _this = _super.call(this) || this;
        _this.ui = new ui.views.GameResultViewUI();
        _this.topToast = new ui.views.TopToastViewUI();
        _this.bgAlpha = 0.5;
        _this.init();
        return _this;
    }
    GameResultView.prototype.init = function () {
        var _this = this;
        this.ui.homebtn.on(Laya.Event.CLICK, null, function () {
            // 返回
            XEvent.instance.event(GameEvent.BACK);
            _this.close();
        });
        this.ui.restartbtn.on(Laya.Event.CLICK, null, function (e) {
            // 重新开始
            e.stopPropagation();
            XEvent.instance.event(GameEvent.RESTART);
            _this.close();
        });
    };
    GameResultView.prototype.show = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        _super.prototype.show.call(this);
        this.params = args[0];
    };
    GameResultView.prototype.onShow = function () {
        // 金币的数量
        this._rewardCoin = 0;
        this.updateUi();
        User.instace.gold += this._rewardCoin;
    };
    GameResultView.prototype.updateUi = function () {
        for (var i = 1; i < 4; i++) {
            if (i > this.params.star) {
                this.ui["star" + i].skin = "res/game/ic_star_result_gray_b.png";
            }
            else {
                this.ui["star" + i].skin = "res/game/ic_star_result_b.png";
            }
        }
        if (this.params.star > 2) {
            this.ui.restartbtn.visible = false;
            this.ui.nextBtn.visible = true;
        }
        //需要数据支撑~~
        this.ui.tip.text = this.params.music.name;
        this.ui.authname.text = this.params.music.author;
        this.ui.scorelabel.text = this.params.score + "分";
        this.ui.coinLabel.text = "X" + this._rewardCoin;
    };
    return GameResultView;
}(xframe.XMWindow));
