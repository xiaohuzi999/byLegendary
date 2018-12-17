/*
* name;
*/
class PopGamePause extends xframe.XMWindow{
    private _view:ui.views.GamePauseUI;
    public static resumeHandler:Laya.Handler;
    public static restartHandler:Laya.Handler;
    constructor(){
        super();
        this.createUI();
    }

    private createUI():void{
        this._view = new ui.views.GamePauseUI();
        this.addChild(this._view);
        //
        this._view.btnHome.on(Laya.Event.CLICK, null, ()=>{
            XEvent.instance.event(GameEvent.BACK);
             Tape.PopManager.hidePop(PopGamePause);
        })

        this._view.btnRestart.on(Laya.Event.CLICK, null, ()=>{
            PopGamePause.restartHandler.run();
            Tape.PopManager.hidePop(PopGamePause);
        })

        this._view.btnResume.on(Laya.Event.CLICK, null, (e:Laya.Event)=>{
            e.stopPropagation();
            PopGamePause.resumeHandler.run();
            Tape.PopManager.hidePop(PopGamePause);
        })

    }

    

    /** */
    public static show( force:boolean= false, opt:any = null):void{
        this.resumeHandler = opt[0];
        this.restartHandler = opt[1];
        Tape.PopManager.showPop(PopGamePause);
    }
}