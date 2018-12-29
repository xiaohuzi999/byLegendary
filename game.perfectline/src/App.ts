/*
* name;
*/
class App implements IApp{
    constructor(){
        
    }

    public start():void{
        this.initEvet();
        //XAlert.SKIN = ui.views.XAlertUIUI;
        XFacade.instance.showModule(LoadingView)
    }

    private onRdy():void{
        XFacade.instance.showModule(HomeView)
        XFacade.instance.closeModule(LoadingView);
    }

    private initEvet():void{
        XEvent.instance.once(LoadingView.RDY, this, this.onRdy);
    }
}