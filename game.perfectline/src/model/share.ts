module ShareManager {

    let defaultOptions = {
        title: '默认的分享标题',
        imageUrl: '',
        query: ''
    };

    export function share(entry: string, type?: string) {
        let share = yxmp.asset.getShareMessage(entry, type);
        if (share) {
            // 拿到服务器配置的分享信息
            wx.shareAppMessage(share);
        } else {
            // 使用本地的分享信息
            wx.shareAppMessage(defaultOptions);
        }
    }

}
