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
var ShareEnter = /** @class */ (function (_super) {
    __extends(ShareEnter, _super);
    function ShareEnter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ui = new ui.pages.ShareEnterUI();
        _this.months = ["JANUARY", "FEBURARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
        return _this;
    }
    ShareEnter.prototype.onCreate = function () {
        var _this = this;
        this.ui.getBtn.on(Laya.Event.CLICK, null, function () {
            _this.back();
        });
        this.init();
    };
    ShareEnter.prototype.init = function () {
        var lanunch = GameDataManager.instance.lanuchInfo;
        var cid = lanunch.cid;
        // var id = lanunch.id;
        var bgImg = lanunch.cover;
        var time = parseInt(lanunch.time);
        var positions = GameDataManager.instance.cardConfig[cid];
        this.ui.cardView.roleImg.skin = GameDataManager.instance.currentUserRoleImg();
        this.ui.cardView.roleImg.x = positions[0] * 50 / 75 - 4;
        this.ui.cardView.roleImg.y = positions[1] * 50 / 75 - 4;
        var date = new Date(time);
        this.ui.cardView.dateDay.text = date.getDate().toString();
        this.ui.cardView.dateMonth.text = this.months[date.getMonth()];
        this.ui.cardView.dateYear.text = date.getFullYear().toString();
        this.ui.avatar.skin = lanunch.avatar;
        this.ui.cardView.bgImg.skin = "https://s.xiuwu.me/perfectline/res/map/" + bgImg + ".png";
    };
    return ShareEnter;
}(xframe.XWindow));
