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
        for(let i=0; i<this.ItemNum; i++){
            this.ui["item"+i].dataSource = DBSign.getSignVo(i);
        }
    }

    private onClick(e:Laya.Event):void{
        switch(e.target){
            case this.ui.btnClose:
                this.close();
            break;
            case this.ui.btnSign:
            break;
            case this.ui.btnDouble:
            break;
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