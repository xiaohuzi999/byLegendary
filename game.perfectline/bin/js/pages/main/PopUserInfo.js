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
var PopUserInfo = /** @class */ (function (_super) {
    __extends(PopUserInfo, _super);
    function PopUserInfo() {
        var _this = _super.call(this) || this;
        _this.ui = new ui.views.home.UserInfoUI();
        _this.createUI();
        return _this;
    }
    PopUserInfo.prototype.createUI = function () {
        var _this = this;
        this.ui.avatar.skin = User.instace.userInfo.avatarUrl;
        this.ui.nickLabel.text = User.instace.userInfo.nickName;
        this.ui.userId.text = "ID：" + User.instace.userInfo.id;
        this.ui.heartLabel.text = User.instace.userInfo.power + '';
        this.ui.starLabel.text = User.instace.userInfo.star + '';
        ;
        this.ui.musicLabel.text = User.instace.userInfo.coin + '';
        this.ui.btnClose.on(Laya.Event.CLICK, null, function () {
            _this.finish();
        });
    };
    PopUserInfo.show = function () {
        Tape.PopManager.showPop(PopUserInfo);
    };
    return PopUserInfo;
}(xframe.XMWindow));
