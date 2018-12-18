class DevView extends xframe.XMWindow {
    ui = new ui.pages.DevPageUI();

    protected createUI() {
        super.createUI();
        this.ui.btnBack.on(Laya.Event.CLICK, null, () => {
            this.close();
        });
        this.ui.panelOutput.vScrollBarSkin = null;
        this.ui.btnAddCoin.on(Laya.Event.CLICK, null, () => {
            // TODO:添加1000金币
            User.instace.gold += 1000;
            User.instace.power += 10;
            User.instace.dispatchEvent();
            User.instace.save();
        });
        this.ui.btnClearLocalData.on(Laya.Event.CLICK, null, () => {
            XDB.delLocalData();
            this.ui.labelOutput.text = '本地数据清除成功\n';
        });
        this.ui.btnClearRemoteData.on(Laya.Event.CLICK, null, () => {
            XTip.showTip("开发中~~")
        });
        this.ui.btnExit.on(Laya.Event.CLICK, null, () => {
            XTip.showTip("开发中~~")
        });
    }
}
