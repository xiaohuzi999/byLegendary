/*
* name;
*/
class DBItem{
    private static _data:any;
    constructor(){

    }

    /** */
    public static getItemVo(id:any):ItemVo{
        return this.data[id];
    }

    private static get data():any{
        if(!this._data){
            this._data  = Laya.loader.getRes("res/cfg/item.json")
        }
        return this._data;
    }
}