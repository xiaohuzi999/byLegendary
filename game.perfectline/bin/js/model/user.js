var User = /** @class */ (function () {
    function User() {
        this.avatar = "res/ic_role/ppx.png";
        this.id = "";
        this.nickname = "";
        this.gold = 0;
        //public star:number = 0;
        this.power = 10;
        this.diamond = 0;
        //登录记录
        this.loginDay = -1;
        /**当前歌曲ID */
        this.curId = 1;
        /**记录{id:星数(undefined未开启; 否者已开启)} ,改成进度了*/
        this.starInfo = { 1: 0 };
        /**角色状态 {id:state---number(-1/undefind未激活,0未使用,1使用中)}*/
        this.roleInfo = { 1: 1 };
        /**签到信息 end，结束时间戳 info,存签到的时间参数*/
        this.sign = { end: 0, info: [] };
    }
    User.prototype.initdData = function () {
        var val = XDB.getData(XDB.USER);
        if (val) {
            for (var i in val) {
                this[i] = val[i];
            }
        }
        //同步体力---
        var date = new Date();
        if (date.getDay() != this.loginDay) {
            this.loginDay = date.getDay();
            this.power = User.MaxPower;
        }
        //同步签到
        var now = Laya.Browser.now();
        if (now - this.sign.end > 0) {
            var date_1 = new Date();
            var delDay = 6 - date_1.getDay();
            var tDate = new Date(date_1.getFullYear(), date_1.getMonth(), date_1.getDate() + 1);
            var delTime = tDate.getTime() - date_1.getTime();
            delTime += 3600 * 1000 * 24 * delDay;
            this.sign.end = now + delTime;
            trace("end::::::::::::::", this.sign.end);
            this.sign.info.length = 0;
        }
    };
    Object.defineProperty(User.prototype, "curRole", {
        get: function () {
            for (var i in this.roleInfo) {
                if (this.roleInfo[i] == 1) {
                    return parseInt(i);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "canSign", {
        /**判断是否已经签到过 */
        get: function () {
            var date = new Date();
            var day = date.getDay();
            return this.sign.info.indexOf(day) == -1;
        },
        enumerable: true,
        configurable: true
    });
    User.prototype.dispatchEvent = function () {
        XEvent.instance.event(User.UPDATE);
    };
    User.prototype.save = function () {
        XDB.save(XDB.USER, this);
    };
    Object.defineProperty(User, "instace", {
        get: function () {
            if (!this._instace) {
                this._instace = new User();
            }
            return this._instace;
        },
        enumerable: true,
        configurable: true
    });
    /** */
    User.UPDATE = "update";
    //最大体力
    User.MaxPower = 10;
    return User;
}());
