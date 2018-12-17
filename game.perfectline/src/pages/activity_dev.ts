class DevActivity extends xframe.XMWindow {
    ui = new ui.pages.DevPageUI();

    onCreate() {
        this.onInitView()    
    }

    onInitView() {
        this.ui.btnBack.on(Laya.Event.CLICK, null, () => {
            this.back();
        });
        this.ui.panelOutput.vScrollBarSkin = null;
        this.ui.btnAddCoin.on(Laya.Event.CLICK, null, () => {
            // TODO:添加1000金币
            User.instace.userInfo.coin += 1000;
            User.instace.userInfo.power += 10;
            GameDataManager.instance.recordUserGameData();
        });
        this.ui.btnClearLocalData.on(Laya.Event.CLICK, null, () => {
            this.ui.labelOutput.text = '本地数据清除成功\n';
        });
        this.ui.btnClearRemoteData.on(Laya.Event.CLICK, null, () => {
            wx.showLoading({
                title: '正在清空远程数据',
                mask: true
            });
            yxmp.api.removeCloudData(['*']).then(res => {
                wx.hideLoading()
                this.ui.labelOutput.text = '远程数据清除成功\n' + JSON.stringify(res);
            }).catch(res => {
                this.ui.labelOutput.text = '远程数据清除失败\n' + JSON.stringify(res);
            });
        });
        this.ui.btnExit.on(Laya.Event.CLICK, null, () => {
            Tape.exit();
        });
    }
}
