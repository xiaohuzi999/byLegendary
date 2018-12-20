/*
* name;数据管理
*/
var XDB = /** @class */ (function () {
    function XDB() {
    }
    /**获取服务端数据 */
    XDB.fetchSrvData = function (cb) {
        //todo 获取远程数据
        //xframe.HttpCmd.callServer()
        //测试用，读取本地数据
        var data = Laya.LocalStorage.getItem(this.NAME);
        this.init(data);
        cb.run();
    };
    /**init with data*/
    XDB.init = function (data) {
        if (typeof data === "string") {
            trace("data:::::::", data);
            this._data = JSON.parse(data);
        }
        else {
            this._data = data;
        }
    };
    /**del local data */
    XDB.delLocalData = function () {
        Laya.LocalStorage.removeItem(this.NAME);
    };
    /**get value by key */
    XDB.getData = function (key) {
        return this.data[key];
    };
    /**save */
    XDB.save = function (key, value) {
        this.data[key] = value;
        //save to local
        Laya.LocalStorage.setItem(this.NAME, JSON.stringify(this.data));
        //todo：save to srv
    };
    XDB.push2Srv = function () {
        xframe.HttpCmd.callServer(Handler.create(null, function (data) { trace("save::", data); }), "srv", "save", { openid: User.getInstance().openid, kv: JSON.stringify(this.data) });
    };
    Object.defineProperty(XDB, "data", {
        get: function () {
            if (!this._data) {
                this._data = {};
            }
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    /**KEY-USER INFO */
    XDB.USER = "user";
    /**KEY-BAG */
    XDB.BAG = "bag";
    /**local save key */
    XDB.NAME = "xdb";
    return XDB;
}());
//# sourceMappingURL=XDB.js.map