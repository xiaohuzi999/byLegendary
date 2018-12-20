/*
* name;
*/
class FakeWX{
    constructor(){

    }
    public login(cb:any):void{
        cb.success({errMsg:"not in wx"})
    }
    public showShareMenu():void{};
    public onHide():void{};
}