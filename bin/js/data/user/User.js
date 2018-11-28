/*
* name;
*/
var User = /** @class */ (function () {
    function User() {
        this.power = 0;
        this.gold = 0;
        this.diamond = 0;
        this.role = new Role();
    }
    /**初始化 */
    User.prototype.init = function () {
        var val = XDB.getData(XDB.USER);
        if (val) {
            if (typeof val === "string") {
                val = JSON.parse(val);
            }
            this.update(val);
        }
    };
    //更新
    User.prototype.update = function (value) {
        for (var i in value) {
            this[i] = value[i];
        }
    };
    /**保存 */
    User.prototype.save = function () {
        XDB.save(XDB.USER, this);
    };
    User.getInstance = function () {
        if (!this._instance) {
            this._instance = new User();
        }
        return this._instance;
    };
    //事件-更新;
    User.UPDATE = "update";
    return User;
}());
//# sourceMappingURL=User.js.map