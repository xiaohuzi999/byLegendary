class HomeView extends xframe.XWindow {

    public ui = new ui.common.HomeViewUI();
    private recommendApp = null;
    //选中的ITEM
    private _selectedItem: any;

    public show():void{
        super.show();
        this.updateUserInfo();
        this.showMoveStar();
        this.ui.chapList.refresh();
    }

    public close():void{
        Star.destroy();
        super.close();
    }
    

    private onBtnClick(e:Laya.Event):void{
        trace("onBtnClick______")
        switch(e.target){
            case this.ui.btnDev:
                XFacade.instance.showModule(DevView)
            break;
            case this.ui.btnSignin:
                XFacade.instance.showModule(SignInView)
            break;
            case this.ui.roleBtn:
                Tape.PopManager.showPop(RoleList);
            break;
            case this.ui.btnAddPower:
                XFacade.instance.showModule(PopAddPower);
            break;
            case this.ui.btnUserInfo:
                XFacade.instance.showModule(UserInfoView);
            break;
        }
    }

    private onItemClick(e: Laya.Event, index: number):void{
        if (e.type == Laya.Event.CLICK) {
            if (index == this.ui.chapList.selectedIndex) {
                XFacade.instance.showModule(GameView, this.ui.chapList.selectedItem)
            } else {
                this.scrollToIndex(index - 1);
            }
        }
    }

    private onScroll():void{
        var index: number = Math.round(this.ui.chapList.scrollBar.value / 480);
        this.scrollToIndex(index);
    }

    protected createUI() {
        super.createUI();
        //暂时注释
        wx.showShareMenu({ withShareTicket: true });
        this.ui.chapList.array = [null, ...DBChapter.chapList,  null];
        this.ui.chapList.hScrollBarSkin = "";
        this.ui.chapList.scrollBar.elasticBackTime = 100;
        this.ui.chapList.scrollBar.rollRatio = 0.7
        this.ui.chapList.selectedIndex = 1;

        this.selectedItem = this.ui.chapList.getCell(1);
    }

    //滑动到指定位置
    private scrollToIndex(index) {
        this.ui.chapList.tweenTo(index);
        this.ui.chapList.selectedIndex = index + 1;
        this.selectedItem = this.ui.chapList.getCell(index + 1);
    }

    //
    private set selectedItem(item: any) {
        if (this._selectedItem != item) {
            if (this._selectedItem) {
                this._selectedItem.selected = false;
            }
            this._selectedItem = item;
            if (this._selectedItem) {
                this._selectedItem.selected = true;
            }
        }
    }

    // 更新用户数据展示
    private updateUserInfo() {
        this.ui.coinNum.text = User.instace.gold + '';
        this.ui.starNum.text = User.instace.star + '';
        this.ui.heartNum.text = User.instace.power + '';
        this.ui.btnAddPower.visible = User.instace.power < 30;
        this.ui.btnUserInfo.skin = User.instace.avatar;
    }

    // 背景星星
    private showMoveStar() {
        Star.shine(30, this.ui.bg);
    }
    protected initEvent():void{
        this.ui.btnDev.on(Laya.Event.CLICK, this, this.onBtnClick);
        this.ui.btnSignin.on(Laya.Event.CLICK, this, this.onBtnClick);
        this.ui.roleBtn.on(Laya.Event.CLICK, this, this.onBtnClick);
        this.ui.btnAddPower.on(Laya.Event.CLICK, this, this.onBtnClick);
        this.ui.btnUserInfo.on(Laya.Event.CLICK, this, this.onBtnClick);
        XEvent.instance.on(User.UPDATE, this, this.updateUserInfo);
        this.ui.chapList.mouseHandler = Laya.Handler.create(this, this.onItemClick,null, false)
        this.ui.chapList.scrollBar.on(Laya.Event.END, this, this.onScroll);
    }

    protected removeEvent():void{
        this.ui.btnDev.off(Laya.Event.CLICK, this, this.onBtnClick);
        this.ui.btnSignin.off(Laya.Event.CLICK, this, this.onBtnClick);
        this.ui.roleBtn.off(Laya.Event.CLICK, this, this.onBtnClick);
        this.ui.btnAddPower.off(Laya.Event.CLICK, this, this.onBtnClick);
        this.ui.btnUserInfo.off(Laya.Event.CLICK, this, this.onBtnClick);
        XEvent.instance.off(User.UPDATE, this, this.updateUserInfo)
        this.ui.chapList.mouseHandler.recover();
        this.ui.chapList.mouseHandler = null;
        this.ui.chapList.scrollBar.off(Laya.Event.END, this, this.onScroll);
    }
}
