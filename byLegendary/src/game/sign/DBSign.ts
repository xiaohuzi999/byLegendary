/*
* name;
*/
class DBSign{
    private static _data:any;
    constructor(){

    }

    //
    public static getSignVo(id:number):SignVo{
        return this.data[id];
    }

    private static get data():any{
        if(!this._data){
            this._data = Laya.loader.getRes("res/cfg/sign.json");
        }
        return this._data;
    }
}