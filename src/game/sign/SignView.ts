/*
* name;
*/
class SignView extends xframe.XMWindow{
    public ui:ui.sign.SignUI;
    private readonly ItemNum:number = 7;
    constructor(){
        super();
    }

    public show():void{
        super.show();
        //同步
        let now = Laya.Browser.now();
        if(now - User.getInstance().sign.end > 0){
            let date:Date = new Date();
            let delDay:number = 6-date.getDay();
            let tDate:Date = new Date(date.getFullYear(), date.getMonth(),date.getDate()+1)
            let delTime = tDate.getTime() - date.getTime();
            delTime += 3600*1000*24*delDay
            User.getInstance().sign.end = now+delTime;
            trace(User.getInstance().sign.end)
            //trace(date.getMonth())
            //trace(date.getDate())
            User.getInstance().sign.info.length = 0;
        }
        //
        for(let i=0; i<this.ItemNum; i++){
            this.ui["item"+i].dataSource = DBSign.getSignVo(i);
            //this.ui["item"+i].update(User.getInstance().sign[i]);
        }
    }

    private onClick(e:Laya.Event):void{
        switch(e.target){
            case this.ui.btnClose:
                this.close();
            break;
            case this.ui.btnSign:
                this.sign();
            break;
            case this.ui.btnDouble:
            break;
        }
    }

    private sign():void{
        let date:Date = new Date();
        /*
        date.getDay();
        if(User.ge)
        let ts:number = User.getInstance().traineeGift[id];
        xframe.XUtils
        if(ts > 0){
             canGet = xframe.XUtils.checkDate(ts, Laya.Browser.now());
        }else{
            canGet = (id == 0);
        }
        trace(canGet,"xxxxxxxxxxxxxxxxxx")
        if(canGet){
            //发东西
            let items:any[] = data.reward;
            for(let i=0; i<items.length; i++){
                let tmp:number = items[i];
                Bag.getInstance().addItem(tmp[0], tmp[1])
            }
            //存数据
            User.getInstance().traineeGift[id] = Laya.Browser.now();
            User.getInstance().save();
            this.format();
        }
        */
    }

    protected createUI():void{
        this.ui = new ui.sign.SignUI();
        this.addChild(this.ui);
    }

    protected initEvent():void{
        this.ui.on(Laya.Event.CLICK, this, this.onClick);
    }

    protected removeEvent():void{
        this.ui.off(Laya.Event.CLICK, this, this.onClick);
    }
}