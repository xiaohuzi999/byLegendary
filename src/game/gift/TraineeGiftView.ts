/*
* name;
*/
class TraineeGiftView extends xframe.XMWindow{
    public ui:ui.gift.GiftUI = new ui.gift.GiftUI();
    constructor(){
        super();
    }   

    public show():void{
        super.show();
        this.format();
    }

    private format():void{
        this.ui.item_0.dataSource = DBTraineeGift.getTraineeGiftVo(0);
        this.ui.item_1.dataSource = DBTraineeGift.getTraineeGiftVo(1);
        this.ui.item_2.dataSource = DBTraineeGift.getTraineeGiftVo(2);
        
        for(let i=User.getInstance().traineeGift.length-1; i>-1; i--){
            this.ui["item_"+i].updateState(User.getInstance().traineeGift[i]);
        }
    }

    private onClick(e:Laya.Event):void{
        switch(e.target){
            case this.ui.btnClose:
                this.close();
            break;
            case this.ui.item_0:
                this.getGift(this.ui.item_0.dataSource);
            break
            case this.ui.item_1:
                this.getGift(this.ui.item_1.dataSource);
            break;
            case this.ui.item_2:
                this.getGift(this.ui.item_2.dataSource);
            break;
        }
    }

    private getGift(data:{id:number, name:string, reward:any[],day:string}):void{
        trace("getGift-------------------",User.getInstance().traineeGift)
        let id:number = data.id;
        let canGet:boolean = !User.getInstance().traineeGift[id];
        if(canGet && id>0){
            canGet = User.getInstance().traineeGift[id-1] > 0;
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
            User.getInstance().traineeGift[id] = 1;
            User.getInstance().save();
            this.format();
        }
    }

    protected initEvent():void{
        super.initEvent();
        this.ui.on(Laya.Event.CLICK, this, this.onClick);
    }

    protected removeEvent():void{
        super.removeEvent();
        this.ui.off(Laya.Event.CLICK, this, this.onClick);
    }
}