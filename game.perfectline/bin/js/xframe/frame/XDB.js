/*
* name;数据管理
*/
var XDB = /** @class */ (function () {
    function XDB() {
    }
    /**获取服务端数据 */
    XDB.fetchSrvData = function (cb) {
        this._cb = cb;
        var onFetchHandler = Handler.create(this, this.init);
        //============================
        var data = Laya.LocalStorage.getItem(XDB.NAME);
        onFetchHandler.runWith(data);
        return;
        //=======================================
        wx.login({
            success: function (res) {
                if (res.code) {
                    xframe.HttpCmd.callServer(onFetchHandler, "srv", "login", { name: "petmusician", code: res.code, });
                }
                else {
                    XAlert.showAlert('登录失败！' + res.errMsg);
                }
            },
            initLocal: function () {
                trace("XDB::未与远程数据同步----------------------");
                trace("XDB::使用本地数据--------------------------");
                var data = Laya.LocalStorage.getItem(XDB.NAME);
                onFetchHandler.runWith(data);
            }
        });
    };
    /**init with data*/
    XDB.init = function (data) {
        if (typeof data === "string") {
            if (data.length > 0) {
                trace("data:::::::", data);
                this._data = JSON.parse(data);
            }
        }
        else {
            this._data = data;
        }
        if (this._cb) {
            this._cb.run();
            this._cb = null;
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
        trace("save:::::::::::::::::", key, this.data);
        //save to local
        Laya.LocalStorage.setItem(this.NAME, JSON.stringify(this.data));
        trace("get:::::::::::::::::", Laya.LocalStorage.getItem(this.NAME));
        //todo：save to srv
    };
    XDB.push2Srv = function () {
        xframe.HttpCmd.callServer(Handler.create(null, function (data) { trace("save::", data); }), "srv", "save", { openid: User.instace.openid, kv: JSON.stringify(this.data) });
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
