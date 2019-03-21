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
        this.ui.btnRevive.on(Laya.Event.CLICK, null, function (e) {
            // 重新开始
            e.stopPropagation();
            XEvent.instance.event(GameEvent.REVIVE);
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
        trace("params::", this.params);
        this.ui.tfGold.text = this.params[ItemVo.GOLD] || "0";
        this.ui.tfDiamond.text = this.params[ItemVo.DIAMOND] || "0";
        this.ui.tfItem.text = this.params[ItemVo.KEY] || "0";
        this.ui.tfScore.text = "完成" + this.params["score"] + "%";
        this.params[ItemVo.GOLD] && Bag.getInstance().addItem(ItemVo.GOLD, this.params[ItemVo.GOLD]);
        this.params[ItemVo.DIAMOND] && Bag.getInstance().addItem(ItemVo.DIAMOND, this.params[ItemVo.DIAMOND]);
        this.params[ItemVo.KEY] && Bag.getInstance().addItem(ItemVo.KEY, this.params[ItemVo.KEY]);
        if (this.params["revive"]) {
            this.ui.btnRevive.visible = true;
            this.ui.btnRevive.pos(56, 730);
            this.ui.homebtn.pos(334, 730);
        }
        else {
            this.ui.btnRevive.visible = false;
            this.ui.homebtn.pos(188, 730);
        }
        //保存==;
        var musicId = this.params.music.id;
        if (User.instace.starInfo[musicId] != undefined && User.instace.starInfo[musicId] < this.params.score) {
            User.instace.starInfo[musicId] = this.params.score;
        }
        User.instace.dispatchEvent();
        User.instace.save();
    };
    GameResultView.prototype.updateUi = function () {
        //需要数据支撑~~
        this.ui.tip.text = this.params.music.name;
        this.ui.tfGold.text = "X" + this._rewardCoin;
    };
    return GameResultView;
}(xframe.XMWindow));
