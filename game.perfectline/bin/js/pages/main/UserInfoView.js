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
var UserInfoView = /** @class */ (function (_super) {
    __extends(UserInfoView, _super);
    function UserInfoView() {
        var _this = _super.call(this) || this;
        _this.ui = new ui.views.home.UserInfoUI();
        _this.closeOnBlank = true;
        return _this;
    }
    UserInfoView.prototype.show = function () {
        this.ui.avatar.skin = User.instace.avatar;
        this.ui.nickLabel.text = User.instace.nickname;
        this.ui.userId.text = "ID：" + User.instace.id;
        this.ui.heartLabel.text = User.instace.power + '';
        this.ui.starLabel.text = User.instace.diamond + '';
        ;
        this.ui.musicLabel.text = User.instace.gold + '';
        _super.prototype.show.call(this);
        xframe.AniUtil.flowIn(this);
    };
    UserInfoView.prototype.close = function () {
        var _this = this;
        xframe.AniUtil.flowOut(this, Handler.create(null, function () { _super.prototype.close.call(_this); }));
    };
    UserInfoView.prototype.onClick = function (e) {
        switch (e.target) {
            case this.ui.btnClose:
                this.close();
                break;
        }
    };
    UserInfoView.prototype.initEvent = function () {
        _super.prototype.initEvent.call(this);
        this.on(Laya.Event.CLICK, this, this.onClick);
    };
    UserInfoView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this.off(Laya.Event.CLICK, this, this.onClick);
    };
    return UserInfoView;
}(xframe.XMWindow));
