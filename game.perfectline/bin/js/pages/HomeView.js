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
        _this.ui = new ui.common.HomeViewUI();
        _this.recommendApp = null;
        return _this;
    }
    HomeView.prototype.show = function () {
        _super.prototype.show.call(this);
        this.updateUserInfo();
        this.showMoveStar();
        this.ui.chapList.refresh();
        var sx = Math.max(Laya.stage.width / AppConfig.AppWidth, Laya.stage.height / AppConfig.AppHeight);
        this.ui.bg.scale(sx, sx);
        this.ui.x = (this.ui.bg.width - AppConfig.AppWidth) / 2;
    };
    HomeView.prototype.close = function () {
        Star.destroy();
        _super.prototype.close.call(this);
    };
    HomeView.prototype.format = function (data) {
        this.ui.tfName.text = data.name + "";
        this._isLocked = User.instace.starInfo[data.id] == undefined;
        if (User.instace.starInfo[data.id] != undefined) {
            this.ui.star.visible = true;
            this.ui.condBox.visible = false;
            this.ui.btnPlay.visible = true;
            this.ui.btnUnlock.visible = false;
            var starNum = User.instace.starInfo[data.id];
            for (var i = 0; i < 3; i++) {
                if (starNum > i) {
                    this.ui["star_" + i].gray = false;
                }
                else {
                    this.ui["star_" + i].gray = true;
                }
            }
        }
        else {
            this.ui.star.visible = false;
            this.ui.condBox.visible = true;
            this.ui.btnPlay.visible = false;
            this.ui.btnUnlock.visible = true;
            this.ui.tfItemNum.text = Bag.getInstance().getItemNum(data.cond[0]) + "/" + data.cond[1];
        }
    };
    HomeView.prototype.onBtnClick = function (e) {
        switch (e.target) {
            case this.ui.btnDev:
                XFacade.instance.showModule(DevView);
                break;
            case this.ui.btnSignin:
                XFacade.instance.showModule(SignInView);
                break;
            case this.ui.roleBtn:
                XFacade.instance.showModule(RoleView);
                break;
            case this.ui.btnAddPower:
                XFacade.instance.showModule(PopAddPower);
                break;
            case this.ui.btnUserInfo:
                XFacade.instance.showModule(UserInfoView);
                break;
            case this.ui.btnPlay:
                XFacade.instance.showModule(GameView, this.ui.chapList.selectedItem);
                break;
            case this.ui.btnUnlock:
                this.unlock();
                break;
        }
    };
    HomeView.prototype.unlock = function () {
        if (DBChapter.canUnlock(this._selectedItem.dataSource.id)) {
            User.instace.starInfo[this._selectedItem.dataSource.id] = 0;
            //User.instace.save();
            this.ui.chapList.refresh();
            this.format(this._selectedItem.dataSource);
        }
        else {
            XTip.showTip("不满足条件");
        }
    };
    HomeView.prototype.onItemClick = function (e, index) {
        if (e.type == Laya.Event.CLICK) {
            if (index == this.ui.chapList.selectedIndex) {
                if (this._isLocked) {
                    //this.unlock();
                }
                else {
                    XFacade.instance.showModule(GameView, this.ui.chapList.selectedItem);
                }
            }
            else {
                this.scrollToIndex(index - 1);
            }
        }
    };
    HomeView.prototype.onScroll = function () {
        var index = Math.round(this.ui.chapList.scrollBar.value / 300);
        this.scrollToIndex(index);
    };
    HomeView.prototype.createUI = function () {
        _super.prototype.createUI.call(this);
        //暂时注释
        wx.showShareMenu({ withShareTicket: true });
        this.ui.chapList.array = [null].concat(DBChapter.chapList, [null]);
        this.ui.chapList.hScrollBarSkin = "";
        this.ui.chapList.scrollBar.elasticBackTime = 100;
        this.ui.chapList.scrollBar.rollRatio = 0.7;
        this.ui.chapList.selectedIndex = 1;
        this.selectedItem = this.ui.chapList.getCell(1);
    };
    //滑动到指定位置
    HomeView.prototype.scrollToIndex = function (index) {
        this.ui.chapList.tweenTo(index);
        this.ui.chapList.selectedIndex = index + 1;
        this.selectedItem = this.ui.chapList.getCell(index + 1);
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
                    this.format(this._selectedItem.dataSource);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    // 更新用户数据展示
    HomeView.prototype.updateUserInfo = function () {
        this.ui.coinNum.text = User.instace.gold + '';
        this.ui.starNum.text = User.instace.star + '';
        this.ui.heartNum.text = User.instace.power + '';
        this.ui.btnAddPower.visible = User.instace.power < 30;
        this.ui.btnUserInfo.skin = User.instace.avatar;
    };
    // 背景星星
    HomeView.prototype.showMoveStar = function () {
        Star.shine(30, this.ui.bg);
    };
    HomeView.prototype.initEvent = function () {
        this.ui.btnDev.on(Laya.Event.CLICK, this, this.onBtnClick);
        this.ui.btnSignin.on(Laya.Event.CLICK, this, this.onBtnClick);
        this.ui.roleBtn.on(Laya.Event.CLICK, this, this.onBtnClick);
        this.ui.btnAddPower.on(Laya.Event.CLICK, this, this.onBtnClick);
        this.ui.btnUserInfo.on(Laya.Event.CLICK, this, this.onBtnClick);
        this.ui.btnPlay.on(Laya.Event.CLICK, this, this.onBtnClick);
        this.ui.btnUnlock.on(Laya.Event.CLICK, this, this.onBtnClick);
        XEvent.instance.on(User.UPDATE, this, this.updateUserInfo);
        this.ui.chapList.mouseHandler = Laya.Handler.create(this, this.onItemClick, null, false);
        this.ui.chapList.scrollBar.on(Laya.Event.END, this, this.onScroll);
    };
    HomeView.prototype.removeEvent = function () {
        this.ui.btnDev.off(Laya.Event.CLICK, this, this.onBtnClick);
        this.ui.btnSignin.off(Laya.Event.CLICK, this, this.onBtnClick);
        this.ui.roleBtn.off(Laya.Event.CLICK, this, this.onBtnClick);
        this.ui.btnAddPower.off(Laya.Event.CLICK, this, this.onBtnClick);
        this.ui.btnUserInfo.off(Laya.Event.CLICK, this, this.onBtnClick);
        this.ui.btnPlay.off(Laya.Event.CLICK, this, this.onBtnClick);
        this.ui.btnUnlock.off(Laya.Event.CLICK, this, this.onBtnClick);
        XEvent.instance.off(User.UPDATE, this, this.updateUserInfo);
        this.ui.chapList.mouseHandler.recover();
        this.ui.chapList.mouseHandler = null;
        this.ui.chapList.scrollBar.off(Laya.Event.END, this, this.onScroll);
    };
    return HomeView;
}(xframe.XWindow));
