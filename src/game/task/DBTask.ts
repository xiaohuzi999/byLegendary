/*
* name;
*/
class DBTask{
    private static _data:any;
    constructor(){

    }


    /** */
    public static getTaskVo(id:any):TaskVo{
        return this.data[id];
    }

    private static get data():any{
        if(!this._data){
            this._data = Laya.loader.getRes("res/cfg/task.json");
            trace(this._data)
        }
        return this._data;
    }
}