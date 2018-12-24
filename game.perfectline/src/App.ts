/*
* name;
*/
class App implements IApp{
    constructor(){
        
    }

    public start():void{
        this.initEvet();
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