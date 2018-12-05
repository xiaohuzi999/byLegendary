/*
* name;
*/
class TraineeGiftView extends xframe.XWindow{
    public ui:ui.gift.GiftUI = new ui.gift.GiftUI();
    constructor(){
        super();
    }   

    private onClick(e:Laya.Event):void{
        switch(e.target){
            case this.ui.btnClose:
                this.close();
            break;
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