class HomeView extends xframe.XWindow {

    public ui = new ui.common.HomeViewUI();
    private recommendApp = null;
    //选中的ITEM
    private _selectedItem: any;
    /**选中ITEM是否锁定 */
    private _isLocked;

    /**图标列表 */
    private _btns:Laya.Sprite[] = [];

    public show():void{
        super.show();
        this.updateUserInfo();
        this.ui.chapList.refresh();
        this.onStageResize();
       
        let data:any = this.ui.chapList.array;
        for(let i=0; i<data.length; i++){
            if(data[i] && data[i].id == User.instace.curId){
                this.ui.chapList.selectedIndex = i;
                this.selectedItem = this.ui.chapList.getCell(i);
                this.scrollToIndex(i-1);
                break;
            }
        }
    }

    public onStageResize():void{
        let sx = Math.max(Laya.stage.width/AppConfig.AppWidth, Laya.stage.height/AppConfig.AppHeight);
        this.ui.bg.scale(sx,sx);
    }

    public close():void{
        Star.destroy();
        super.close();
    }

    private showBtns():void{
        let index:number = 0;
        const BtnWidth:number = 110
        for(let i=0; i<this._btns.length; i++){
            if(this._btns[i].visible){
                this._btns[i].x = index*BtnWidth
                index++;
            }
        }
    }

    private format(data:ChapterVo):void{
        this.ui.tfName.text = data.name+"";
        this._isLocked = User.instace.starInfo[data.id] == undefined;
        if(User.instace.starInfo[data.id] != undefined){
            this.ui.star.visible  = true;
            this.ui.condBox.visible = false;
            this.ui.btnPlay.visible = true;
            this.ui.btnUnlock.visible = false;
            this.ui.tfScore.text = User.instace.starInfo[data.id]+"%"
        }else{
            this.ui.star.visible  = false;
            this.ui.condBox.visible = true;
            this.ui.btnPlay.visible = false;
            this.ui.btnUnlock.visible = true;
            this.ui.tfItemNum.text = Bag.getInstance().getItemNum(data.cond[0])+"/"+data.cond[1]
        }
    }
    

    private onBtnClick(e:Laya.Event):void{
        e.stopPropagation();
        switch(e.target){
            case this.ui.btnDev:
                XFacade.instance.showModule(DevView)
            break;
            case this.ui.btnSignin:
            // wx.shareAppMessage({
            //     title: '一起来玩呀'
            // })
            XFacade.instance.showModule(SignInView)
            break;
            case this.ui.roleBtn:
                XFacade.instance.showModule(RoleView)
            break;
            case this.ui.btnAddPower:
                XFacade.instance.showModule(PopAddPower);
            break;
            case this.ui.btnUserInfo:
                XFacade.instance.showModule(UserInfoView);
            break;
            case this.ui.btnPlay:
                if(User.instace.power > 0){
                    XFacade.instance.showModule(GameView, this.ui.chapList.selectedItem);
                    User.instace.curId = this.ui.chapList.selectedItem.id;
                }else{
                    XFacade.instance.showModule(PopAddPower);
                }
            break;
            case this.ui.btnUnlock:
                this.unlock();
            break;
        }
    }

    private showTip(e:Laya.Event):void{
        e.stopPropagation();
        switch(e.target){
            case this.ui.diaMC:
                xframe.XTipManager.showTip(DBItem.getItemVo(ItemVo.DIAMOND), Tip)
            break;
            case this.ui.goldMC:
                xframe.XTipManager.showTip(DBItem.getItemVo(ItemVo.GOLD), Tip)
            break;
            case this.ui.powerMC:
                xframe.XTipManager.showTip(DBItem.getItemVo(ItemVo.POWER), Tip)
            break;
        }
    }

    private unlock():void{
        let id:any = this._selectedItem.dataSource.id
        let vo:ChapterVo = DBChapter.getChapInfo(id);
        if(DBChapter.canUnlock(id)){
            User.instace.starInfo[id] = 0;
            //User.instace.save();
            this.ui.chapList.refresh();
            this.format(this._selectedItem.dataSource)
            //扣道具
            Bag.getInstance().delItem(vo.cond[0], vo.cond[1]);
            XTip.showTip("《"+vo.name+"》解锁成功，赶紧去挑战吧")
        }else{
            let itemVo:ItemVo = DBItem.getItemVo(vo.cond[0]);
            let delNum:number = vo.cond[1] - Bag.getInstance().getItemNum(itemVo.id);
            let str:string = "解锁《"+vo.name+"》需要"+itemVo.name+"x"+vo.cond[1]+",您当前拥有"+Bag.getInstance().getItemNum(itemVo.id);
            str += "，还需要支付"+delNum*10+"钻石";
            XAlert.showAlert(str, Laya.Handler.create(this, this.doUnlock,[id, itemVo.id, vo.cond[1]]), null, true, true, "解锁",  "取消")
            //XTip.showTip(str)
        }
    }

    private doUnlock(id:number, itemId:number, needNum:number):void{
        let vo:ChapterVo = DBChapter.getChapInfo(id);
        let myNum:number = Bag.getInstance().getItemNum(itemId);
        let delNum = needNum - myNum;
        let diamond:number = delNum*10;
        if(User.instace.diamond < diamond){
            XTip.showTip("哎呀~钻石不够了呢");
        }else{
            User.instace.starInfo[id] = 0;
            User.instace.diamond -= diamond;
            Bag.getInstance().delItem(itemId, myNum);
            this.ui.chapList.refresh();
            this.format(this._selectedItem.dataSource)
            XTip.showTip("《"+vo.name+"》解锁成功，赶紧去挑战吧")
        }
    }

    private onItemClick(e: Laya.Event, index: number):void{
        if (e.type == Laya.Event.CLICK) {
            if (index == this.ui.chapList.selectedIndex) {
                if(this._isLocked){
                    this.unlock();
                }else{
                    XFacade.instance.showModule(GameView, this.ui.chapList.selectedItem)
                }
            } else {
                this.scrollToIndex(index - 1);
            }
        }
    }
    

    private onScroll():void{
        var index: number = Math.round(this.ui.chapList.scrollBar.value / 300);
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

        this._btns.push(this.ui.roleBtn, this.ui.btnSignin);
        this.ui.roleBtn.visible = AppConfig.openShop;
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
                this.format(this._selectedItem.dataSource)
            }
        }
    }

    // 更新用户数据展示
    private updateUserInfo() {
        this.ui.coinNum.text = User.instace.gold + '';
        this.ui.starNum.text = User.instace.diamond + '';
        this.ui.heartNum.text = User.instace.power + '';
        this.ui.btnAddPower.visible = User.instace.power < 30;
        this.ui.btnUserInfo.skin = User.instace.avatar;
        if(this._selectedItem.dataSource){
            this.ui.tfScore.text = User.instace.starInfo[this._selectedItem.dataSource.id]+"%"
        }
        this.ui.btnSignin.visible = User.instace.canSign;

        //显示按钮
        this.showBtns();
    }

    protected initEvent():void{
        this.ui.btnDev.on(Laya.Event.CLICK, this, this.onBtnClick);
        this.ui.btnSignin.on(Laya.Event.CLICK, this, this.onBtnClick);
        this.ui.roleBtn.on(Laya.Event.CLICK, this, this.onBtnClick);
        this.ui.btnAddPower.on(Laya.Event.CLICK, this, this.onBtnClick);
        this.ui.btnUserInfo.on(Laya.Event.CLICK, this, this.onBtnClick);
        this.ui.btnPlay.on(Laya.Event.CLICK, this, this.onBtnClick);
        this.ui.btnUnlock.on(Laya.Event.CLICK, this, this.onBtnClick);
        this.ui.diaMC.on(Laya.Event.CLICK, this, this.showTip);
        this.ui.goldMC.on(Laya.Event.CLICK, this, this.showTip);
        this.ui.powerMC.on(Laya.Event.CLICK, this, this.showTip);

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
        this.ui.btnPlay.off(Laya.Event.CLICK, this, this.onBtnClick);
        this.ui.btnUnlock.off(Laya.Event.CLICK, this, this.onBtnClick);
        this.ui.diaMC.off(Laya.Event.CLICK, this, this.showTip);
        this.ui.goldMC.off(Laya.Event.CLICK, this, this.showTip);
        this.ui.powerMC.off(Laya.Event.CLICK, this, this.showTip);

        XEvent.instance.off(User.UPDATE, this, this.updateUserInfo)
        this.ui.chapList.mouseHandler.recover();
        this.ui.chapList.mouseHandler = null;
        this.ui.chapList.scrollBar.off(Laya.Event.END, this, this.onScroll);
    }
}
