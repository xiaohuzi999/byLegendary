/*
* name;
*/
class App implements IApp{
    constructor(){

    }

    public start():void{
        XFacade.instance.showModule(LoadingView)
    }
}