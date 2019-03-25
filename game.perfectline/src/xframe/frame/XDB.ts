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
    /**是否数据发送中 */
    private static _pending:boolean = false;
    /**local save key */
    private static readonly NAME:string = "xdb";
    constructor(){

    }

    /**获取服务端数据 */
    public static fetchSrvData(cb:Handler):void{
        this._cb = cb;
        let onFetchHandler:Handler = Handler.create(this, this.init);

        //============================单机===
        if(AppConfig.platfrom == AppConfig.Plat4399 || AppConfig.platfrom == AppConfig.Debug){
            let data:any = Laya.LocalStorage.getItem(XDB.NAME);
            onFetchHandler.runWith(data);
        }else{
            wx.login({
                success(res) {
                    if (res.code) {
                        xframe.HttpCmd.callServer(onFetchHandler, "srv", "login", {appid:AppConfig.AppID, code:res.code, })
                    } else {
                        XAlert.showAlert('登录失败！' + res.errMsg)
                    }
                },
                initLocal(){
                    trace("XDB::未与远程数据同步, 使用本地数据----------------------")
                    let data:any = Laya.LocalStorage.getItem(XDB.NAME);
                    onFetchHandler.runWith(data);
                }
            })
        }
        //=======================================
    }

    /**init with data*/
    public static init(data:any):void{
        if(typeof data == "string"){
            if(data.length > 0){
                this._data = JSON.parse(data);
            }
        }else{
            this._data = data || {};
        }

        //格式化服务端返回数据
        if(this._data.code == 0){
            User.instace.id = this._data.data.id;
            User.instace.openid = this._data.data.openid;
            if(this._data.data.kv.length > 0){
                this._data = JSON.parse(this._data.data.kv);
            }else{
                this._data = {};
            }
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
        trace("getData::::::::::::::", this.data);
        return this.data[key];
    }

    /**save */
    public static save(key:string, value:any):void{
        this.data[key] = value;
        //save to local
        Laya.LocalStorage.setItem(this.NAME, JSON.stringify(this.data));
        //save to srv
        if(!this._pending && AppConfig.platfrom != AppConfig.Plat4399){
            this._pending = true;
            Laya.timer.once(500, this, this.push2Srv)
        }
    }

    public static push2Srv():void{
        this._pending = false;
        xframe.HttpCmd.callServer(Handler.create(null, (data)=>{trace("save::",data)}), "srv", "save", {openid:User.instace.openid, kv:JSON.stringify(this.data)})
    }

    private static get data():any{
        if(!this._data){
            this._data = {};
        }
        return this._data;
    }
}