/*
* name;
*/
class App implements IApp{
    constructor(){
        
    }

    public start():void{
        this.initEvet();

        if(window && window.location && window.location.href){
            let url:string = window.location.href;
            if(url.indexOf(AppConfig.Plat4399) != -1){
                AppConfig.platfrom = AppConfig.Plat4399;
                AppConfig.urlRoot = "";
            }
        }

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