class GameResultView extends xframe.XMWindow {
    ui = new ui.views.GameResultViewUI();
    private topToast = new ui.views.TopToastViewUI();
    private _rewardCoin: number;
    private static tipArrays: Array<string> = ["加油哦", "不错！", "腻害了", "棒极了"];
    private params:any;
    constructor() {
        super();
        this.bgAlpha = 0.5;
        this.init();
    }

    init() {
        this.ui.homebtn.on(Laya.Event.CLICK, null, () => {
            // 返回
            XEvent.instance.event(GameEvent.BACK);
            this.close();
        });

        this.ui.restartbtn.on(Laya.Event.CLICK, null, (e: Laya.Event) => {
            // 重新开始
            e.stopPropagation();
            XEvent.instance.event(GameEvent.RESTART);
            this.close();
        });

        this.ui.nextBtn.on(Laya.Event.CLICK, null, () => {
            // 下一首
            this.chooseNextMusic();
            this.close();
        });
    }

    public show(...args):void{
        super.show();
        this.params = args[0];
    }

    onShow() {
        // 金币的数量
        this._rewardCoin = GameDataManager.instance.rewardCoinByStar(this.params.star);
        this.updateUi();
        User.instace.gold += this._rewardCoin;
    }

    updateUi() {
        for (let i = 1; i < 4; i++) {
            if (i > this.params.star) {
                this.ui["star" + i].skin = "res/game/ic_star_result_gray_b.png";
            } else {
                this.ui["star" + i].skin = "res/game/ic_star_result_b.png";
            }
        }

        if (this.params.star > 2) {
            this.ui.restartbtn.visible = false;
            this.ui.nextBtn.visible = true;
        }

        //需要数据支撑~~
        this.ui.musicname.text = this.params.music.name;
        this.ui.authname.text = this.params.music.author;
        this.ui.scorelabel.text = this.params.score + "分";
        this.ui.tip.text = GameResultView.tipArrays[this.params.star];
        this.ui.coinLabel.text = "X" + this._rewardCoin;
    }

    updateData() {
        // 好友排行榜
        GameDataManager.instance.uploadCloudData();
        // 保存单曲结果
        GameDataManager.instance.recordMusicById(this.params.music.id, {
            score: this.params.score,
            star: this.params.star,
            name: this.params.music.name
        });
    }

    //上传分数
    private updateScore():void{
        // 单曲排行榜 开放域排行
        GameDataManager.instance.uploadMusicCloudData(this.params.music.id, this.params.score);
        // 单曲排行榜 世界排行
        // GameDataManager.instance.updateMusicGrade(this.params.score, this.params.music.id);
    }

    // 选择下一首音乐
    chooseNextMusic() {
        var music = this.params.music;
        var modeId = music.cid;
        var list: Array<any> = GameDataManager.instance.getMuicList({ id: modeId });
        var index = list.indexOf(music);

        if (index < list.length - 1) {
            var nextMusic = list[index + 1];
            XFacade.instance.showModule(GameLoading, nextMusic)
        } else {
            // 最后一首 ，下章节没有解锁
            var nextChapter = GameDataManager.instance.nextChapter(modeId);
            if (nextChapter) {
                var lock: Array<any> = GameDataManager.instance.checkModeIslock(nextChapter.id);
                if (lock.length > 0) {
                    // 下一章节没有解锁
                    xframe.XTip.showTip("coming soon---------------")
                } else {
                    
                }
            } else {
                // 敬请期待
                xframe.XTip.showTip("coming soon---------------")
                XEvent.instance.event(GameEvent.HOMECHAPTER);
            }
        }
    }

    // 提示解锁下一篇章
    toastReleaseNextChapter() {
        var _self = this;
        this.topToast.y = -60;
        this.ui.addChild(this.topToast);
        Laya.Tween.to(this.topToast, { y: 0 }, 500, Laya.Ease.linearIn, Laya.Handler.create(this, () => {
            setTimeout(function () {
                Laya.Tween.to(_self.topToast, { y: -60 }, 500, Laya.Ease.linearIn, Laya.Handler.create(_self, () => {
                    Laya.Tween.clearTween(_self.topToast);
                    _self.ui.removeChild(_self.topToast);
                    _self.topToast = null;
                }));
            }, 2000);
        }));
    }
}