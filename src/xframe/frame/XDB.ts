/*
* name;数据管理
*/
class XDB{
    /**KEY-USER INFO */
    public static readonly USER:string = "user";
    /**KEY-BAG */
    public static readonly BAG:string = "bag";
    /** */
    private static _data:any;
    /**local save key */
    private static readonly NAME:string = "xdb";
    constructor(){

    }

    /**获取服务端数据 */
    public static fetchSrvData(cb:Laya.Handler):void{
        //todo 获取远程数据
        //xframe.HttpCmd.callServer()
        //测试用，读取本地数据
        let data:any = Laya.LocalStorage.getItem(this.NAME);
        this.init(data);
        cb.run();
    }

    /**init with data*/
    public static init(data:any):void{
        if(typeof data === "string"){
            trace("data:::::::",data)
            this._data = JSON.parse(data);
        }else{
            this._data = data;
        }
    }

    /**del local data */
    public static delLocalData():void{
        Laya.LocalStorage.removeItem(this.NAME);
    }

    /**get value by key */
    public static getData(key:string):any{
        return this.data[key];
    }

    /**save */
    public static save(key:string, value:any):void{
        this.data[key] = value;
        //save to local
        Laya.LocalStorage.setItem(this.NAME, JSON.stringify(this.data));
        //todo：save to srv
    }

    public static push2Srv():void{
        xframe.HttpCmd.callServer(Handler.create(null, (data)=>{trace("save::",data)}), "srv", "save", {kv:"xxoo"})
    }

    private static get data():any{
        if(!this._data){
            this._data = {};
        }
        return this._data;
    }
}