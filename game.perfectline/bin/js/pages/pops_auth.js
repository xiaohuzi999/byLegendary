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
var LoginPop = /** @class */ (function (_super) {
    __extends(LoginPop, _super);
    function LoginPop() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoginPop.check = function (success) {
        Tape.MiniButton.checkGetUserInfo(function (userRes) {
            wx.showLoading({
                title: '登录中...'
            });
            yxmp.api.setUserInfo(userRes.encryptedData, userRes.iv).then(function (res) {
                success && success(userRes);
                wx.hideLoading();
            }).catch(function (err) {
                success && success(userRes);
                wx.hideLoading();
            });
        }, function () {
            wx.showModal({
                title: '　提示',
                content: "\u4E3A\u4E86\u67E5\u770B\u6392\u884C\u699C\u53CA\u597D\u53CB\u4FE1\u606F\uFF0C\u60A8\u9700\u8981\u60A8\u5141\u8BB8\u6E38\u620F\u4F7F\u7528\u7528\u6237\u4FE1\u606F",
                showCancel: false,
                confirmText: '去授权',
                success: function (res) {
                    LoginPop.show({ success: success });
                }
            });
        });
    };
    LoginPop.prototype.onShow = function () {
        var _this = this;
        Tape.MiniButton.showGetUserInfoButton('res/main/bj_homepage@2x.png', 0, 0, 750, 1334, function (userRes) {
            wx.showLoading({
                title: '登录中...'
            });
            yxmp.api.setUserInfo(userRes.encryptedData, userRes.iv).then(function (res) {
                _this.params.success && _this.params.success(userRes);
                Tape.MiniButton.hideGetUserInfoButton();
                wx.hideLoading();
                _this.finish();
            }).catch(function (err) {
                _this.params.success && _this.params.success(userRes);
                wx.hideLoading();
            });
        }, function () {
            wx.showModal({
                title: '　提示',
                content: "\u4E3A\u4E86\u67E5\u770B\u6392\u884C\u699C\u53CA\u597D\u53CB\u4FE1\u606F\uFF0C\u60A8\u9700\u8981\u60A8\u5141\u8BB8\u6E38\u620F\u4F7F\u7528\u7528\u6237\u4FE1\u606F",
                showCancel: false,
                confirmText: '去授权',
                success: function (res) {
                }
            });
        });
    };
    return LoginPop;
}(xframe.XMWindow));
