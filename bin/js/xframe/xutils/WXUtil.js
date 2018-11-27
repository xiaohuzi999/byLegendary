/*
* name;
*/
var WXUtil = /** @class */ (function () {
    function WXUtil() {
    }
    /**初始化 */
    WXUtil.init = function () {
        try {
            wx.getNetworkType();
        }
        catch (e) {
            this._inWX = false;
        }
    };
    WXUtil.showLoading = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        wx.showLoading(args);
    };
    /*setUserCloudStorage */
    WXUtil.setUserCloudStorage = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._inWX && wx.setUserCloudStorage(args);
    };
    WXUtil._inWX = true;
    return WXUtil;
}());
//# sourceMappingURL=WXUtil.js.map