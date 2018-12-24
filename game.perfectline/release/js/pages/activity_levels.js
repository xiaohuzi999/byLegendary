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
var LevelsActivity = /** @class */ (function (_super) {
    __extends(LevelsActivity, _super);
    function LevelsActivity() {
        var _this = _super.call(this) || this;
        _this.ui = new ui.pages.LevelPageUI();
        _this.source = [];
        _this.initView();
        return _this;
    }
    LevelsActivity.prototype.initView = function () {
        var _this = this;
        this.ui.btnBack.on(Laya.Event.CLICK, null, function () {
            _this.close();
        });
        this.ui.list.array = [];
        this.ui.list.itemRender = ui.views.LevelRenderViewUI;
        this.ui.list.vScrollBarSkin = null;
        this.ui.list.scrollBar.elasticBackTime = 200;
        this.ui.list.scrollBar.elasticDistance = 200;
        this.ui.list.renderHandler = Laya.Handler.create(this, function (item, index) {
            _this.renderItem(item, index);
        }, null, false);
        this.ui.list.mouseHandler = Laya.Handler.create(this, function (event, index) {
            _this.mouseItem(event, index);
        }, null, false);
    };
    LevelsActivity.prototype.show = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        _super.prototype.show.call(this);
        this.params = args[0];
    };
    LevelsActivity.prototype.onShow = function () {
        trace("params::", this.params);
        this.ui.list.array = GameDataManager.instance.getMuicList(this.params);
    };
    LevelsActivity.prototype.renderItem = function (item, index) {
        var data = this.ui.list.array[index];
        var itemRender = item;
        var musicRecord = null;
        if (musicRecord) {
            itemRender.title.text = data.name;
            itemRender.tfAuthor.text = data.author;
            for (var i = 1; i < 4; i++) {
                if (i > musicRecord.star) {
                    itemRender["star_" + (i - 1)].skin = "res/game/ic_star_result_gray_s.png";
                }
                else {
                    itemRender["star_" + (i - 1)].skin = "res/game/ic_star_result_s.png";
                }
            }
        }
        else {
            itemRender.title.text = "挑战后可获得音乐信息";
            itemRender.tfAuthor.text = "";
            itemRender.star_1.skin = "res/game/ic_star_result_gray_s.png";
            itemRender.star_2.skin = "res/game/ic_star_result_gray_s.png";
            itemRender.star_0.skin = "res/game/ic_star_result_gray_s.png";
        }
    };
    LevelsActivity.prototype.mouseItem = function (event, index) {
        if (event && event.type === Laya.Event.CLICK) {
            var data = this.ui.list.array[index];
            XFacade.instance.showModule(GameLoading, data);
            this.close();
        }
    };
    return LevelsActivity;
}(xframe.XMWindow));
