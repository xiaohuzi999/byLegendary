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
            User.getInstance().sign.info.length = 0;
        }
        this.update();
    }

    private update():void{
        for(let i=0; i<this.ItemNum; i++){
            this.ui["item"+i].dataSource = DBSign.getSignVo(i);
            this.ui["item"+i].update(User.getInstance().sign.info[i], (new Date()).getDay());
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
        trace("sign----------------")
        let date:Date = new Date();
        let day:number = date.getDay();
        if(User.getInstance().sign.info[day]){
            XTip.showTip("done~~~~~~~~~~")
        }else{
            let vo:SignVo = DBSign.getSignVo(day)
            trace("sign----------------", vo)
            let item:number[] = vo.reward;
            Bag.getInstance().addItem(item[0], item[1])
            //存数据
            User.getInstance().sign.info[day] = 1;
            User.getInstance().save();
            this.update();
        }
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