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
var HomeView = /** @class */ (function (_super) {
    __extends(HomeView, _super);
    function HomeView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ui = new ui.pages.HomePageUI();
        _this.recommendApp = null;
        return _this;
    }
    HomeView.prototype.show = function () {
        _super.prototype.show.call(this);
    };
    HomeView.prototype.createUI = function () {
        var _this = this;
        _super.prototype.createUI.call(this);
        //暂时注释
        wx.showShareMenu({ withShareTicket: true });
        this.ui.btnDev.on(Laya.Event.CLICK, null, function () {
            _this.navigate(DevActivity);
        });
        this.ui.actionView.btnStart.on(Laya.Event.CLICK, null, function () {
            var mode = _this.ui.actionView.chapList.selectedItem;
            XFacade.instance.showModule(GameActivity, mode);
        });
        this.ui.actionView.btnSignin.on(Laya.Event.CLICK, null, function () {
            SigninPop.show(true);
        });
        this.ui.actionView.roleBtn.on(Laya.Event.CLICK, null, function () {
            Tape.PopManager.showPop(RoleList);
        });
        this.ui.actionView.btnAddPower.on(Laya.Event.CLICK, null, function () {
            PopAddPower.show(null, function () {
                _this.updateTopUi();
            });
        });
        this.ui.actionView.btnUserInfo.on(Laya.Event.CLICK, null, function () {
            PopUserInfo.show();
        });
        this.ui.actionView.cardBtn.on(Laya.Event.CLICK, null, function () {
            _this.navigate(MusicCard);
        });
        Laya.stage.on(noticficationRefreshMainData, this, function () {
            _this.updateTopUi();
        });
        if (GameDataManager.instance.fristOpen) {
            SigninPop.autoFlag = true;
            Tape.PopManager.showPop(SigninPop);
        }
        else {
            Laya.stage.on(noticficationShowSign, this, function () {
                SigninPop.autoFlag = true;
                Tape.PopManager.showPop(SigninPop);
            });
        }
        XEvent.instance.on(GameEvent.HOMECHAPTER, null, function (type, data) {
            if (data === void 0) { data = null; }
            var index = GameDataManager.instance.nearestPlayChapterIndex();
            _this.scrollToIndex(index + 1);
        }, [GameEvent.HOMECHAPTER]);
        this.ui.actionView.chapList.array = [null].concat(GameDataManager.instance.modeList, [{ cover: "https://s.xiuwu.me/perfectline/res/map/futureChapter.png" }, null]);
        this.ui.actionView.chapList.hScrollBarSkin = "";
        this.ui.actionView.chapList.scrollBar.elasticBackTime = 100;
        this.ui.actionView.chapList.scrollBar.rollRatio = 0.7;
        this.ui.actionView.chapList.selectedIndex = 1;
        this.checkCurrentModeStatus();
        //滑动逻辑
        this.selectedItem = this.ui.actionView.chapList.getCell(1);
        this.ui.actionView.chapList.scrollBar.on(Laya.Event.END, null, function () {
            var index = Math.round(_this.ui.actionView.chapList.scrollBar.value / 480);
            _this.scrollToIndex(index);
        });
        this.ui.actionView.chapList.mouseHandler = Laya.Handler.create(null, function (e, index) {
            if (e.type == Laya.Event.CLICK) {
                if (index == _this.ui.actionView.chapList.selectedIndex) {
                    if (_this.ui.actionView.btnStart.visible) {
                        _this.ui.actionView.btnStart.event(Laya.Event.CLICK);
                    }
                    else if (_this.ui.actionView.btnInvite.visible) {
                        _this.ui.actionView.btnInvite.event(Laya.Event.CLICK);
                    }
                }
                else {
                    _this.scrollToIndex(index - 1);
                }
            }
        }, null, false);
        Laya.stage.on(refreshModelList, this, function () {
            _this.ui.actionView.chapList.array = [null].concat(GameDataManager.instance.modeList, [{ cover: "https://s.xiuwu.me/perfectline/res/map/futureChapter.png" }, null]);
            _this.checkCurrentModeStatus();
            _this.ui.actionView.chapList.selectedIndex = GameDataManager.instance.nearestPlayChapterIndex();
            _this.scrollToIndex(GameDataManager.instance.nearestPlayChapterIndex());
        });
        //
        XEvent.instance.on(RoleList.UPDATE, null, function () {
            _this.updateTopUi();
        });
        this.updateTopUi();
        this.showMoveStar();
    };
    //滑动到指定位置
    HomeView.prototype.scrollToIndex = function (index) {
        this.ui.actionView.chapList.tweenTo(index);
        this.ui.actionView.chapList.selectedIndex = index + 1;
        this.selectedItem = this.ui.actionView.chapList.getCell(index + 1);
        this.checkCurrentModeStatus();
    };
    Object.defineProperty(HomeView.prototype, "selectedItem", {
        //
        set: function (item) {
            if (this._selectedItem != item) {
                if (this._selectedItem) {
                    this._selectedItem.selected = false;
                }
                this._selectedItem = item;
                if (this._selectedItem) {
                    this._selectedItem.selected = true;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    // 判断当前章节状态
    HomeView.prototype.checkCurrentModeStatus = function () {
        var mode = this.ui.actionView.chapList.selectedItem;
        mode && this.updateGameStatus(mode);
    };
    // 更新用户数据展示
    HomeView.prototype.updateTopUi = function () {
        this.ui.actionView.coinNum.text = User.instace.userInfo.gold + '';
        this.ui.actionView.starNum.text = User.instace.userInfo.star + '';
        this.ui.actionView.heartNum.text = User.instace.userInfo.power + '';
        this.ui.actionView.btnAddPower.visible = User.instace.userInfo.power < 30;
        this.ui.actionView.btnUserInfo.skin = User.instace.userInfo.avatarUrl;
    };
    // 更新关卡对应的信息
    HomeView.prototype.updateGameStatus = function (mode) {
        if (!mode.id) {
            this.ui.actionView.conditionLabel.text = "";
            this.ui.actionView.conditionStar.visible = false;
            this.ui.actionView.btnStart.visible = false;
            this.ui.actionView.btnInvite.visible = false;
            this.ui.actionView.modeLabel.text = "敬请期待";
            return;
        }
    };
    // lifecycle
    HomeView.prototype.onResume = function () {
        this.updateTopUi();
        this.showMoveStar();
        this.ui.actionView.chapList.refresh();
        this.checkCurrentModeStatus();
    };
    // 背景星星
    HomeView.prototype.showMoveStar = function () {
        Star.shine(30, this.ui.bgView);
    };
    return HomeView;
}(xframe.XWindow));
