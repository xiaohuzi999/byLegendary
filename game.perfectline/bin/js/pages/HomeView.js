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
        this.ui.chapList.refresh();
        this.onStageResize();
        var data = this.ui.chapList.array;
        for (var i = 0; i < data.length; i++) {
            if (data[i] && data[i].id == User.instace.curId) {
                this.ui.chapList.selectedIndex = i;
                this.selectedItem = this.ui.chapList.getCell(i);
                this.scrollToIndex(i - 1);
                break;
            }
        }
    };
    HomeView.prototype.onStageResize = function () {
        var sx = Math.max(Laya.stage.width / AppConfig.AppWidth, Laya.stage.height / AppConfig.AppHeight);
        this.ui.bg.scale(sx, sx);
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
            this.ui.tfScore.text = User.instace.starInfo[data.id] + "%";
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
        e.stopPropagation();
        switch (e.target) {
            case this.ui.btnDev:
                XFacade.instance.showModule(DevView);
                break;
            case this.ui.btnSignin:
                // wx.shareAppMessage({
                //     title: '一起来玩呀'
                // })
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
                if (User.instace.power > 0) {
                    XFacade.instance.showModule(GameView, this.ui.chapList.selectedItem);
                    User.instace.curId = this.ui.chapList.selectedItem.id;
                }
                else {
                    XFacade.instance.showModule(PopAddPower);
                }
                break;
            case this.ui.btnUnlock:
                this.unlock();
                break;
        }
    };
    HomeView.prototype.showTip = function (e) {
        e.stopPropagation();
        switch (e.target) {
            case this.ui.diaMC:
                xframe.XTipManager.showTip(DBItem.getItemVo(ItemVo.DIAMOND), Tip);
                break;
            case this.ui.goldMC:
                xframe.XTipManager.showTip(DBItem.getItemVo(ItemVo.GOLD), Tip);
                break;
            case this.ui.powerMC:
                xframe.XTipManager.showTip(DBItem.getItemVo(ItemVo.POWER), Tip);
                break;
        }
    };
    HomeView.prototype.unlock = function () {
        var id = this._selectedItem.dataSource.id;
        var vo = DBChapter.getChapInfo(id);
        if (DBChapter.canUnlock(id)) {
            User.instace.starInfo[id] = 0;
            //User.instace.save();
            this.ui.chapList.refresh();
            this.format(this._selectedItem.dataSource);
            //扣道具
            Bag.getInstance().delItem(vo.cond[0], vo.cond[1]);
            XTip.showTip("解锁成功");
        }
        else {
            var itemVo = DBItem.getItemVo(vo.cond[0]);
            var str = "解锁当前关卡需要" + itemVo.name + "x" + vo.cond[1] + ",您当前拥有" + Bag.getInstance().getItemNum(itemVo.id);
            str += "(" + itemVo.name + "游戏中获得)";
            XTip.showTip(str);
        }
    };
    HomeView.prototype.onItemClick = function (e, index) {
        if (e.type == Laya.Event.CLICK) {
            if (index == this.ui.chapList.selectedIndex) {
                if (this._isLocked) {
                    this.unlock();
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
        this.ui.starNum.text = User.instace.diamond + '';
        this.ui.heartNum.text = User.instace.power + '';
        this.ui.btnAddPower.visible = User.instace.power < 30;
        this.ui.btnUserInfo.skin = User.instace.avatar;
        if (this._selectedItem.dataSource) {
            this.ui.tfScore.text = User.instace.starInfo[this._selectedItem.dataSource.id] + "%";
        }
        this.ui.btnSignin.visible = User.instace.canSign;
    };
    HomeView.prototype.initEvent = function () {
        this.ui.btnDev.on(Laya.Event.CLICK, this, this.onBtnClick);
        this.ui.btnSignin.on(Laya.Event.CLICK, this, this.onBtnClick);
        this.ui.roleBtn.on(Laya.Event.CLICK, this, this.onBtnClick);
        this.ui.btnAddPower.on(Laya.Event.CLICK, this, this.onBtnClick);
        this.ui.btnUserInfo.on(Laya.Event.CLICK, this, this.onBtnClick);
        this.ui.btnPlay.on(Laya.Event.CLICK, this, this.onBtnClick);
        this.ui.btnUnlock.on(Laya.Event.CLICK, this, this.onBtnClick);
        this.ui.diaMC.on(Laya.Event.CLICK, this, this.showTip);
        this.ui.goldMC.on(Laya.Event.CLICK, this, this.showTip);
        this.ui.powerMC.on(Laya.Event.CLICK, this, this.showTip);
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
        this.ui.diaMC.off(Laya.Event.CLICK, this, this.showTip);
        this.ui.goldMC.off(Laya.Event.CLICK, this, this.showTip);
        this.ui.powerMC.off(Laya.Event.CLICK, this, this.showTip);
        XEvent.instance.off(User.UPDATE, this, this.updateUserInfo);
        this.ui.chapList.mouseHandler.recover();
        this.ui.chapList.mouseHandler = null;
        this.ui.chapList.scrollBar.off(Laya.Event.END, this, this.onScroll);
    };
    return HomeView;
}(xframe.XWindow));
