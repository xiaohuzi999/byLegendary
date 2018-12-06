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
/*
* name;
*/
var MainView = /** @class */ (function (_super) {
    __extends(MainView, _super);
    function MainView() {
        var _this = _super.call(this) || this;
        _this._index = 0;
        return _this;
    }
    MainView.prototype.show = function () {
        _super.prototype.show.call(this);
        this.ui.player.dataSource = User.getInstance().role;
        this.updateInfo();
        //弹出新手签到
        if (User.getInstance().traineeGift.length < 3) {
            XFacade.instance.showModule(TraineeGiftView);
        }
    };
    MainView.prototype.onClick = function (e) {
        switch (e.target) {
            case this.ui.player:
                this.onPlayerClick();
                break;
            case this.ui.btnAdd:
                XTip.showTip("coming soon~~~~");
                //XFacade.instance.showModule(ShopView);
                XFacade.instance.showModule(SignView);
                break;
            case this.ui.btnFight:
                XFacade.instance.showModule(LLKView);
                break;
            case this.ui.btnTask:
                XFacade.instance.showModule(TaskView);
                break;
            case this.ui.btnBag:
                XFacade.instance.showModule(BagView);
                break;
            case this.ui.btnShop:
                XFacade.instance.showModule(ShopView);
                break;
        }
    };
    MainView.prototype.onPlayerClick = function () {
        if (User.getInstance().role.lv == 1) {
            this._index++;
            if (this._index > 3) {
                this._index = 0;
                User.getInstance().role.lv++;
                this.ui.player.update();
                User.getInstance().save();
            }
        }
        else {
            //
        }
    };
    MainView.prototype.updateInfo = function () {
        this.ui.tfGold.text = User.getInstance().gold + "";
        this.ui.tfDiamond.text = User.getInstance().diamond + "";
    };
    MainView.prototype.initEvent = function () {
        this.ui.on(Laya.Event.CLICK, this, this.onClick);
        XEvent.instance.on(User.UPDATE, this, this.updateInfo);
    };
    MainView.prototype.removeEvent = function () {
        this.ui.off(Laya.Event.CLICK, this, this.onClick);
        XEvent.instance.off(User.UPDATE, this, this.updateInfo);
    };
    MainView.prototype.createUI = function () {
        this.ui = new ui.main.MainUI();
        this.addChild(this.ui);
        this.ui.player.mouseEnabled = true;
    };
    return MainView;
}(xframe.XWindow));
//# sourceMappingURL=MainView.js.map