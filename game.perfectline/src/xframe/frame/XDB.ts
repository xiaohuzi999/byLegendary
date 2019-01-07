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
    /** */
    private static _cb:Handler;
    /**local save key */
    private static readonly NAME:string = "xdb";
    constructor(){

    }

    /**获取服务端数据 */
    public static fetchSrvData(cb:Handler):void{
        this._cb = cb;
        let onFetchHandler:Handler = Handler.create(this, this.init);
        wx.login({
            success(res) {
                if (res.code) {
                    xframe.HttpCmd.callServer(onFetchHandler, "srv", "login", {name:"petmusician", code:res.code, })
                } else {
                    XAlert.showAlert('登录失败！' + res.errMsg)
                }
            },
            initLocal(){
                XTip.showTip("未与远程数据同步~~")
                let data:any = Laya.LocalStorage.getItem(this.NAME);
                onFetchHandler.runWith(data);
            }
        })
    }

    /**init with data*/
    public static init(data:any):void{
        if(typeof data === "string"){
            trace("data:::::::",data)
            this._data = JSON.parse(data);
        }else{
            this._data = data;
        }
        if(this._cb){
            this._cb.run();
            this._cb = null;
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
        xframe.HttpCmd.callServer(Handler.create(null, (data)=>{trace("save::",data)}), "srv", "save", {openid:User.instace.openid, kv:JSON.stringify(this.data)})
    }

    private static get data():any{
        if(!this._data){
            this._data = {};
        }
        return this._data;
    }
}