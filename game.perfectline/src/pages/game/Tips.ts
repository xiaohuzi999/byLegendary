/*
* name;
*/
class Tips extends xframe.XMWindow{
    protected _view:ui.views.NoPowerTipUI;
    constructor(){
        super();
        this.createUI();
    }

    private createUI():void{
        this._view = new ui.views.NoPowerTipUI();
        this.addChild(this._view);
        this._view.btnClose.on(Laya.Event.CLICK, null, ()=>{
            Tape.PopManager.hidePop(Tips);
            Tape.PopManager.hidePop(GameLoading);
            this.params.handle.run();
        })
    }

    protected onShow():void{
        //
        this._view.tfTitle.text = this.params.title+"";
        this._view.tfContent.text = this.params.msg+"";
    }

    public static showTip(title:string, msg:string, handle:Laya.Handler):void{
        Tape.PopManager.showPop(Tips, {title:title, msg:msg, handle:handle});
    }
}