/*
* name;
*/
class PopGamePause extends xframe.XMWindow{
    private _view:ui.views.GamePauseUI;
    private _resumeHandler:Laya.Handler;
    private _restartHandler:Laya.Handler;
    constructor(){
        super();
    }

    protected createUI():void{
        this._view = new ui.views.GamePauseUI();
        this.addChild(this._view);
        //
        this._view.btnHome.on(Laya.Event.CLICK, null, ()=>{
            XEvent.instance.event(GameEvent.BACK);
            XFacade.instance.closeModule(PopGamePause)
        })

        this._view.btnRestart.on(Laya.Event.CLICK, null, ()=>{
            this._restartHandler.run();
            XFacade.instance.closeModule(PopGamePause)
        })

        this._view.btnResume.on(Laya.Event.CLICK, null, (e:Laya.Event)=>{
            e.stopPropagation();
            this._resumeHandler.run();
            XFacade.instance.closeModule(PopGamePause)
        })
    }

    public show(...args):void{
        super.show();
        this._restartHandler = args[1];
        this._resumeHandler = args[0];
    }

    public close():void{
        super.close();
        this._restartHandler = this._resumeHandler = null;
    }
}