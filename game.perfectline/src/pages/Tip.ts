/*
* name;
*/
class Tip extends xframe.XWindow{
    public ui:ui.views.TipUI = new ui.views.TipUI();
    constructor(){
        super();
        this._layer = xframe.LayerManager.LAYER_TIP;
    }

    public show(...args):void{
        super.show();
        let vo:{name:string, desc:string} = args[0];
        this.ui.tfName.text = vo.name+"";
        this.ui.tfDesc.text = vo.desc+"";
    }

    private onClose():void{
        if(!xframe.XUtils.checkHit(this)){
            this.close();
        }
    }

    protected initEvent():void{
        super.initEvent();
        Laya.stage.on(Laya.Event.CLICK, this, this.onClose);
    }

    protected removeEvent():void{
        super.removeEvent();
        Laya.stage.off(Laya.Event.CLICK, this, this.onClose);
    }
}