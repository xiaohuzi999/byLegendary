var User = /** @class */ (function () {
    function User() {
        this.avatar = "";
        this.id = "";
        this.nickname = "";
        this.gold = 0;
        this.star = 0;
        this.power = 10;
        this.diamond = 0;
        /**当前歌曲ID */
        this.curId = 1;
        /**记录 */
        this.starInfo = [];
    }
    User.prototype.initdData = function () {
        var val = XDB.getData(XDB.USER);
        if (val) {
            for (var i in val) {
                this[i] = val[i];
            }
        }
    };
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
    return User;
}());
