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
var MusicCard = /** @class */ (function (_super) {
    __extends(MusicCard, _super);
    function MusicCard() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ui = new ui.pages.MusicCardUI();
        _this.months = ["JANUARY", "FEBURARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
        return _this;
    }
    MusicCard.prototype.onCreate = function () {
        var _this = this;
        this.ui.backBtn.on(Laya.Event.CLICK, null, function () {
            _this.back();
        });
        this.ui.topImg.on(Laya.Event.CLICK, null, function () {
        });
        if (User.instace.cards.length > 0) {
            this.ui.tipsLabel.visible = false;
        }
        else {
            this.ui.tipsLabel.visible = true;
        }
        this.ui.cardList.array = User.instace.cards;
        this.ui.cardList.itemRender = ui.views.CardRenderItemUI;
        this.ui.cardList.vScrollBarSkin = null;
        this.ui.cardList.scrollBar.elasticBackTime = 200;
        this.ui.cardList.scrollBar.elasticDistance = 200;
        this.ui.cardList.renderHandler = Laya.Handler.create(this, function (item, index) {
            _this.renderItem(item, index);
        }, null, false);
        this.ui.cardList.mouseHandler = Laya.Handler.create(this, function (event, index) {
            _this.mouseItem(event, index);
        }, null, false);
    };
    MusicCard.prototype.renderItem = function (item, index) {
        var data = this.ui.cardList.array[index];
        var cell = item;
        cell.cover.skin = "https://s.xiuwu.me/perfectline/res/map/" + data.card + ".png";
        var time = data.timeTemp;
        var date = new Date(time);
        cell.dayLabel.text = date.getDate().toString();
        cell.yearLabel.text = date.getFullYear().toString();
        cell.mounthLabel.text = this.months[date.getMonth()];
        var positions = GameDataManager.instance.cardConfig[data.cid];
        if (positions.length > 0) {
            cell.roleImg.skin = GameDataManager.instance.currentUserRoleImg();
            cell.roleImg.x = positions[0] * 346 / 750 - 4;
            cell.roleImg.y = positions[1] * 346 / 750 - 4;
        }
    };
    MusicCard.prototype.mouseItem = function (event, index) {
        if (event && event.type == Laya.Event.CLICK) {
            var data = this.ui.cardList.array[index];
            Tape.PopManager.showPop(BigCardView, data);
        }
    };
    MusicCard.prototype.onResume = function () {
    };
    return MusicCard;
}(xframe.XWindow));
