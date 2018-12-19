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
var BigCardView = /** @class */ (function (_super) {
    __extends(BigCardView, _super);
    function BigCardView() {
        var _this = _super.call(this) || this;
        _this.ui = new ui.views.PopBigCardUI();
        _this.cardView = new ui.views.CardViewUI();
        _this.shareMenu = new ui.views.ShareMenuUI();
        _this.months = ["JANUARY", "FEBURARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
        _this.bgAlpha = 0.8;
        // 分享卡片
        _this.ui.shareBtn.on(Laya.Event.CLICK, null, function (event) {
            // 阻止事件往下传递
            event.stopPropagation();
            // 弹出底部分享选择框
            _this.shareMenu.bottomView.y = 1334;
            Laya.Tween.to(_this.shareMenu.bottomView, { y: 1038 }, 300, Laya.Ease.linearInOut);
            _this.ui.addChild(_this.shareMenu);
            _this.shareMenu.on(Laya.Event.CLICK, null, function () {
                // 阻止事件往下传递
                event.stopPropagation();
                _this.clearShareMenu();
            });
            _this.shareMenu.wxBtn.on(Laya.Event.CLICK, null, function () {
                // 分享
                var avatarImg = User.instace.userInfo.avatarUrl;
                var shareImgPath = HelpUtil.shareByView(_this.cardView, -30, -50, 440, 440); // HelpUtil.shareByView(this.cardView);
                var title1 = "《" + _this.params.name + "》" + "--" + _this.params.author;
                var title2 = "今日份的音乐心情";
                var titles = [title1, title2];
                var materialIds = ['15350799111612', '15350799122613'];
                var randomNum = Math.round(Math.random());
                yxmp.report.event('2000_2004_click');
                var shareObj = {
                    title: titles[randomNum],
                    imageUrl: shareImgPath,
                    entry: '2000_2004_click',
                    material: materialIds[randomNum],
                    query: "cover=" + _this.params.card + "&avatar=" + avatarImg + "&id=" + _this.params.id + "&cid=" + _this.params.cid + "&time=" + _this.time
                };
                var options = yxmp.plugin.help.getShareOptions(shareMuiscCard, shareObj);
                wx.shareAppMessage(options);
            });
            _this.shareMenu.pyq.on(Laya.Event.CLICK, null, function () {
                yxmp.report.event('2000_2003_click');
                var shareImgPath = HelpUtil.shareByView(_this.cardView);
                wx.saveImageToPhotosAlbum({
                    filePath: shareImgPath,
                    success: function (res) {
                        wx.showToast({
                            icon: "none",
                            title: "已保存至相册，记得去分享哦～"
                        });
                    },
                    fail: function (err) {
                        wx.showToast({
                            icon: "none",
                            title: "保存失败, 点击右上角=>关于完美音轨=>设置=>保存到相册"
                        });
                    }
                });
            });
            _this.shareMenu.closeBtn.on(Laya.Event.CLICK, null, function () {
                console.log("关闭");
                _this.clearShareMenu();
            });
        });
        _this.ui.on(Laya.Event.CLICK, null, function () {
            _this.finish();
        });
        return _this;
    }
    BigCardView.prototype.onShow = function () {
        if (this.params && this.params.card) {
            this.cardView.bgImg.skin = "https://s.xiuwu.me/perfectline/res/map/" + this.params.card + ".png";
        }
        var date = new Date();
        if (this.params.timeTemp) {
            date = new Date(this.params.timeTemp);
        }
        this.time = date.getTime();
        this.cardView.dateDay.text = date.getDate().toString();
        this.cardView.dateMonth.text = this.months[date.getMonth()];
        this.cardView.dateYear.text = date.getFullYear().toString();
        this.ui.bigImg.addChild(this.cardView);
        var positions = GameDataManager.instance.cardConfig[this.params.cid];
        this.cardView.roleImg.skin = GameDataManager.instance.currentUserRoleImg();
        this.cardView.roleImg.x = positions[0] * 50 / 75 - 4;
        this.cardView.roleImg.y = positions[1] * 50 / 75 - 4;
    };
    BigCardView.prototype.clearShareMenu = function () {
        var _this = this;
        Laya.Tween.to(this.shareMenu.bottomView, { y: 1334 }, 300, Laya.Ease.linearInOut, Laya.Handler.create(this, function () {
            _this.shareMenu.removeSelf();
        }));
    };
    return BigCardView;
}(xframe.XMWindow));
