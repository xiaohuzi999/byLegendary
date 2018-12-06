/*
* name;
*/
class DBBuff{
    private static _db:any;
    
    constructor(){

    }

    /** */
    public static getBuff(buffId:any):BuffVo{
        return this.data[buffId];
    }
    
    private static get data():any{
        if(!this._db){
            this._db = JSON.parse(Laya.loader.getRes("cfgs/buff.txt")+"");
            Laya.loader.clearRes("cfgs/buff.txt");
        }
        return this._db
    }
}