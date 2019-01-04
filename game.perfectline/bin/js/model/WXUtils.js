var WXUtils = /** @class */ (function () {
    function WXUtils() {
    }
    /**
     * 分享
     * @param title	string		否	转发标题，不传则默认使用当前小游戏的昵称。
     * @param imageUrl	string		否	转发显示图片的链接，可以是网络图片路径或本地图片文件路径或相对代码包根目录的图片文件路径。显示图片长宽比是 5:4
     * @param query	string		否	查询字符串，从这条转发消息进入后，可通过 wx.getLaunchInfoSync() 或 wx.onShow() 获取启动参数中的 query。必须是 key1=val1&key2=val2 的格式。
    */
    WXUtils.share = function (title, imageUrl, query) {
        if (query === void 0) { query = ''; }
        var obj = {
            title: title,
            imageUrl: imageUrl,
            query: query
        };
        wx.shareAppMessage(obj);
    };
    return WXUtils;
}());
