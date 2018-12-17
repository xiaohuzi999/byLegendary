var ShareManager;
(function (ShareManager) {
    var defaultOptions = {
        title: '默认的分享标题',
        imageUrl: '',
        query: ''
    };
    function share(entry, type) {
        var share = yxmp.asset.getShareMessage(entry, type);
        if (share) {
            // 拿到服务器配置的分享信息
            wx.shareAppMessage(share);
        }
        else {
            // 使用本地的分享信息
            wx.shareAppMessage(defaultOptions);
        }
    }
    ShareManager.share = share;
})(ShareManager || (ShareManager = {}));
