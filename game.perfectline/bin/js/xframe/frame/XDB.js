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
        //============================单机===
        if (AppConfig.platfrom == AppConfig.Plat4399 || AppConfig.platfrom == AppConfig.Debug) {
            var data = Laya.LocalStorage.getItem(XDB.NAME);
            onFetchHandler.runWith(data);
        }
        else {
            wx.login({
                success: function (res) {
                    if (res.code) {
                        xframe.HttpCmd.callServer(onFetchHandler, "srv", "login", { appid: AppConfig.AppID, code: res.code, });
                    }
                    else {
                        XAlert.showAlert('登录失败！' + res.errMsg);
                    }
                },
                initLocal: function () {
                    trace("XDB::未与远程数据同步, 使用本地数据----------------------");
                    var data = Laya.LocalStorage.getItem(XDB.NAME);
                    onFetchHandler.runWith(data);
                }
            });
        }
        //=======================================
    };
    /**init with data*/
    XDB.init = function (data) {
        if (typeof data == "string") {
            if (data.length > 0) {
                this._data = JSON.parse(data);
            }
        }
        else {
            this._data = data || {};
        }
        //格式化服务端返回数据
        if (this._data.code == 0) {
            User.instace.id = this._data.data.id;
            User.instace.openid = this._data.data.openid;
            if (this._data.data.kv.length > 0) {
                this._data = JSON.parse(this._data.data.kv);
            }
            else {
                this._data = {};
            }
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
        trace("getData::::::::::::::", this.data);
        return this.data[key];
    };
    /**save */
    XDB.save = function (key, value) {
        this.data[key] = value;
        //save to local
        Laya.LocalStorage.setItem(this.NAME, JSON.stringify(this.data));
        //save to srv
        if (!this._pending && AppConfig.platfrom != AppConfig.Plat4399) {
            this._pending = true;
            Laya.timer.once(500, this, this.push2Srv);
        }
    };
    XDB.push2Srv = function () {
        this._pending = false;
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
    /**是否数据发送中 */
    XDB._pending = false;
    /**local save key */
    XDB.NAME = "xdb";
    return XDB;
}());
