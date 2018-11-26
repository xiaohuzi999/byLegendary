/*
* name;
*/
class App implements IApp{
    constructor(){

    }

    public start():void{
        this.initEvent();
        //loading & login
        XFacade.instance.showModule(LoadingView);
    }

    private onRdy():void{
        XFacade.instance.showModule(MainView);
    }

    private initEvent():void{
        XEvent.instance.once(LoadingView.RDY, this, this.onRdy)
    }
}