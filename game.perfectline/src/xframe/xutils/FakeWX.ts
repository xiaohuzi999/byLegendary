/*
* name;
*/
class FakeWX{
    constructor(){

    }
    public login(cb:any):void{
        cb.initLocal()
    }
    public showShareMenu():void{};
    public onHide():void{};

    public shareAppMessage():void{}
}