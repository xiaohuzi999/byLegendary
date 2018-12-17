class LoginPop extends xframe.XMWindow {
    static check(success) {
        Tape.MiniButton.checkGetUserInfo((userRes) => {
            wx.showLoading({
                title: '登录中...'
            });
          
            yxmp.api.setUserInfo(userRes.encryptedData, userRes.iv).then(res => {
                success && success(userRes);
                wx.hideLoading();
            }).catch(err => {
                success && success(userRes);
                wx.hideLoading();
            });
        }, () => {
            wx.showModal({
                title: '　提示',
                content: `为了查看排行榜及好友信息，您需要您允许游戏使用用户信息`,
                showCancel: false,
                confirmText: '去授权',
                success: (res) => {
                    LoginPop.show({ success })
                }
            });
        });
    }

    onShow() {
        Tape.MiniButton.showGetUserInfoButton('res/main/bj_homepage@2x.png', 0, 0, 750, 1334, (userRes) => {
            wx.showLoading({
                title: '登录中...'
            });
            
            yxmp.api.setUserInfo(userRes.encryptedData, userRes.iv).then(res => {
                this.params.success && this.params.success(userRes);
                Tape.MiniButton.hideGetUserInfoButton();
                wx.hideLoading();
                this.finish();
            }).catch(err => {
                this.params.success && this.params.success(userRes);
                wx.hideLoading();
            });
        }, () => {
            wx.showModal({
                title: '　提示',
                content: `为了查看排行榜及好友信息，您需要您允许游戏使用用户信息`,
                showCancel: false,
                confirmText: '去授权',
                success: (res) => {
                }
            });
        });
    }
}
