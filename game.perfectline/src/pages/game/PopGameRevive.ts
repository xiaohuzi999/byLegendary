/*
* name;
*/
class PopGameRevive extends xframe.XMWindow{
    public ui:ui.views.GameReviveUI = new ui.views.GameReviveUI();
    public params:any;
    constructor(){
        super();
        this.createUI();
    }

    private onBtnClick(e:Laya.Event):void{
        switch(e.target){
            case this.ui.btnConfirm:
                this.params.yes.run();
                this.close();
            break
            case this.ui.btnBack:
                this.params.no.run();
                this.close();
            break;
        }
    }

    public show(...args):void{
        super.show();
        this.params = args[0];
        xframe.AniUtil.flowIn(this);
    }

    public close():void{
        xframe.AniUtil.flowOut(this, Laya.Handler.create(this, super.close));
    }

    protected initEvent():void{
        super.initEvent();
        this.ui.btnBack.on(Laya.Event.CLICK, this, this.onBtnClick);
        this.ui.btnConfirm.on(Laya.Event.CLICK, this, this.onBtnClick);
    }

    protected removeEvent():void{
        super.removeEvent();
        this.ui.btnBack.off(Laya.Event.CLICK, this, this.onBtnClick);
        this.ui.btnConfirm.off(Laya.Event.CLICK, this, this.onBtnClick);
    }
}