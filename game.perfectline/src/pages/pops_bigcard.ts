
class BigCardView extends xframe.XMWindow {
    ui = new ui.views.PopBigCardUI();
    private cardView = new ui.views.CardViewUI();
    private shareMenu = new ui.views.ShareMenuUI();
    private months: Array<string> = ["JANUARY", "FEBURARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
    private time: number;

    onShow() {
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
    }

    constructor() {
        super();
        this.bgAlpha = 0.8;
        // 分享卡片
        this.ui.shareBtn.on(Laya.Event.CLICK, null, (event: Laya.Event) => {
            // 阻止事件往下传递
            event.stopPropagation();
            // 弹出底部分享选择框
            this.shareMenu.bottomView.y = 1334;
            Laya.Tween.to(this.shareMenu.bottomView, { y: 1038 }, 300, Laya.Ease.linearInOut);
            this.ui.addChild(this.shareMenu);

            this.shareMenu.on(Laya.Event.CLICK, null, () => {
                // 阻止事件往下传递
                event.stopPropagation();
                this.clearShareMenu();
            });

            this.shareMenu.wxBtn.on(Laya.Event.CLICK, null, () => {
                // 分享
                var avatarImg = User.instace.userInfo.avatarUrl;
                var shareImgPath = HelpUtil.shareByView(this.cardView, -30, -50, 440, 440);// HelpUtil.shareByView(this.cardView);
                var title1 = "《" + this.params.name + "》" + "--" + this.params.author;
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
                    query: `cover=${this.params.card}&avatar=${avatarImg}&id=${this.params.id}&cid=${this.params.cid}&time=${this.time}`
                }
                var options = yxmp.plugin.help.getShareOptions(shareMuiscCard, shareObj);
                wx.shareAppMessage(options);
            });

            this.shareMenu.pyq.on(Laya.Event.CLICK, null, () => {
                yxmp.report.event('2000_2003_click');
                var shareImgPath = HelpUtil.shareByView(this.cardView);
                wx.saveImageToPhotosAlbum({
                    filePath: shareImgPath,
                    success: (res) => {
                        wx.showToast({
                            icon: "none",
                            title: "已保存至相册，记得去分享哦～"
                        });
                    },
                    fail: (err) => {
                        wx.showToast({
                            icon: "none",
                            title: "保存失败, 点击右上角=>关于完美音轨=>设置=>保存到相册"
                        });
                    }
                })
            });

            this.shareMenu.closeBtn.on(Laya.Event.CLICK, null, () => {
                console.log("关闭");
                this.clearShareMenu();
            });
        });

        this.ui.on(Laya.Event.CLICK, null, () => {
            this.finish();
        });
    }

    clearShareMenu() {
        Laya.Tween.to(this.shareMenu.bottomView, { y: 1334 }, 300, Laya.Ease.linearInOut, Laya.Handler.create(this, () => {
            this.shareMenu.removeSelf();
        }));
    }

    // aa() {
    //     var path = HelpUtil.shareByView(this.cardView, -30, -50, 440, 440);
    //     var img = new Laya.Image(path);
    //     img.graphics.drawCircle(0,0,5,"#ff0001");
    //     this.ui.addChild(img);
    // }

}