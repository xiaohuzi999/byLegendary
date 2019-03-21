/*
* name;
*/
class App implements IApp{
    constructor(){
        
    }

    public start():void{
        this.initEvet();

        let data:any = Laya.loader.getRes("res/cfg/appCfg.json");
        for(let i in data){
            AppConfig[i] = data[i];
        }

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