/*
* name;
*/
class BagView extends xframe.XMWindow{
    public ui:ui.bag.BagUI = new ui.bag.BagUI();
    constructor(){
        super();
    }

    public show():void{
        super.show();
        this.ui.itemList.array = Bag.getInstance().items;
    }

    private onClick(e:Laya.Event):void{
        switch(e.target){
            case this.ui.btnClose:
            this.close();
            break;
        }
    }

    protected createUI():void{
        super.createUI();
        this.ui.itemList.vScrollBarSkin = "";
    }

    protected initEvent():void{
        super.initEvent();
        this.ui.on(Laya.Event.CLICK, this, this.onClick);
    }

    protected removeEvent():void{
        this.ui.off(Laya.Event.CLICK, this, this.onClick);
    }
}