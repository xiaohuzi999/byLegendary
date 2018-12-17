class HomeView extends xframe.XWindow {

    public ui = new ui.pages.HomePageUI();
    private recommendApp = null;
    //选中的ITEM
    private _selectedItem: any;

    public show() {
        super.show();
    }
    


    protected createUI() {
        super.createUI();
        //暂时注释
        wx.showShareMenu({ withShareTicket: true });

        this.ui.btnDev.on(Laya.Event.CLICK, null, () => {
            this.navigate(DevActivity)
        });
        this.ui.actionView.btnStart.on(Laya.Event.CLICK, null, () => {
            var mode = this.ui.actionView.chapList.selectedItem;
            XFacade.instance.showModule(GameActivity, mode)
        });
        this.ui.actionView.btnSignin.on(Laya.Event.CLICK, null, () => {
            SigninPop.show(true);
        });
        this.ui.actionView.roleBtn.on(Laya.Event.CLICK, null, () => {
            Tape.PopManager.showPop(RoleList);
        });
        this.ui.actionView.btnAddPower.on(Laya.Event.CLICK, null, () => {
            PopAddPower.show(null, () => {
                this.updateTopUi();
            });
        });
        this.ui.actionView.btnUserInfo.on(Laya.Event.CLICK, null, () => {
            PopUserInfo.show();
        });
        this.ui.actionView.cardBtn.on(Laya.Event.CLICK, null, () => {
            this.navigate(MusicCard);
        });

        Laya.stage.on(noticficationRefreshMainData, this, () => {
            this.updateTopUi();
        });

        if (GameDataManager.instance.fristOpen) {
            SigninPop.autoFlag = true;
            Tape.PopManager.showPop(SigninPop);
        } else {
            Laya.stage.on(noticficationShowSign, this, () => {
                SigninPop.autoFlag = true;
                Tape.PopManager.showPop(SigninPop);
            });
        }

        XEvent.instance.on(GameEvent.HOMECHAPTER, null, (type: string, data: any = null) => {
            var index: number = GameDataManager.instance.nearestPlayChapterIndex();
            this.scrollToIndex(index + 1);
        }, [GameEvent.HOMECHAPTER]);

        this.ui.actionView.chapList.array = [null, ...GameDataManager.instance.modeList, { cover: "https://s.xiuwu.me/perfectline/res/map/futureChapter.png" }, null];
        this.ui.actionView.chapList.hScrollBarSkin = "";
        this.ui.actionView.chapList.scrollBar.elasticBackTime = 100;
        this.ui.actionView.chapList.scrollBar.rollRatio = 0.7
        this.ui.actionView.chapList.selectedIndex = 1;
        this.checkCurrentModeStatus();

        //滑动逻辑
        this.selectedItem = this.ui.actionView.chapList.getCell(1);
        this.ui.actionView.chapList.scrollBar.on(Laya.Event.END, null, () => {
            var index: number = Math.round(this.ui.actionView.chapList.scrollBar.value / 480);
            this.scrollToIndex(index);
        });
        this.ui.actionView.chapList.mouseHandler = Laya.Handler.create(null, (e: Laya.Event, index: number) => {
            if (e.type == Laya.Event.CLICK) {
                if (index == this.ui.actionView.chapList.selectedIndex) {
                    if (this.ui.actionView.btnStart.visible) {
                        this.ui.actionView.btnStart.event(Laya.Event.CLICK);
                    } else if (this.ui.actionView.btnInvite.visible) {
                        this.ui.actionView.btnInvite.event(Laya.Event.CLICK);
                    }
                } else {
                    this.scrollToIndex(index - 1);
                }
            }
        }, null, false)

        Laya.stage.on(refreshModelList, this, () => {
            this.ui.actionView.chapList.array = [null, ...GameDataManager.instance.modeList, { cover: "https://s.xiuwu.me/perfectline/res/map/futureChapter.png" }, null];
            this.checkCurrentModeStatus();
            this.ui.actionView.chapList.selectedIndex = GameDataManager.instance.nearestPlayChapterIndex();
            this.scrollToIndex(GameDataManager.instance.nearestPlayChapterIndex());
        });

        //
        XEvent.instance.on(RoleList.UPDATE, null, () => {
            this.updateTopUi();
        })

        this.updateTopUi();
        this.showMoveStar();
    }

    //滑动到指定位置
    scrollToIndex(index) {
        this.ui.actionView.chapList.tweenTo(index);
        this.ui.actionView.chapList.selectedIndex = index + 1;
        this.selectedItem = this.ui.actionView.chapList.getCell(index + 1);
        this.checkCurrentModeStatus();
    }

    //
    private set selectedItem(item: any) {
        if (this._selectedItem != item) {
            if (this._selectedItem) {
                this._selectedItem.selected = false;
            }
            this._selectedItem = item;
            if (this._selectedItem) {
                this._selectedItem.selected = true;
            }
        }
    }

    // 判断当前章节状态
    checkCurrentModeStatus() {
        var mode = this.ui.actionView.chapList.selectedItem;
        mode && this.updateGameStatus(mode);
    }

    // 更新用户数据展示
    updateTopUi() {
        this.ui.actionView.coinNum.text = User.instace.userInfo.gold + '';
        this.ui.actionView.starNum.text = User.instace.userInfo.star + '';
        this.ui.actionView.heartNum.text = User.instace.userInfo.power + '';
        this.ui.actionView.btnAddPower.visible = User.instace.userInfo.power < 30;
        this.ui.actionView.btnUserInfo.skin = User.instace.userInfo.avatarUrl;
    }

    // 更新关卡对应的信息
    updateGameStatus(mode) {
        if (!mode.id) {
            this.ui.actionView.conditionLabel.text = "";
            this.ui.actionView.conditionStar.visible = false;
            this.ui.actionView.btnStart.visible = false;
            this.ui.actionView.btnInvite.visible = false;
            this.ui.actionView.modeLabel.text = "敬请期待";
            return;
        }

    }

    // lifecycle
    onResume() {
        this.updateTopUi();
        this.showMoveStar();
        this.ui.actionView.chapList.refresh();
        this.checkCurrentModeStatus();
    }

    // 背景星星
    showMoveStar() {
        Star.shine(30, this.ui.bgView);
    }

}
