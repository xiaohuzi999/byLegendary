var User = /** @class */ (function () {
    function User() {
        this.roles = [];
        this.cards = [];
    }
    User.prototype.initdData = function () {
    };
    Object.defineProperty(User.prototype, "userInfo", {
        /**
         * 获取用户信息
         */
        get: function () {
            if (!this._userInfo) {
                this._userInfo = {
                    avatar: "",
                    id: "",
                    nickname: "",
                    gold: 0,
                    star: 0,
                    power: 10,
                };
            }
            return this._userInfo;
        },
        /**
         * 保存用户信息
         */
        set: function (user) {
            if (this._userInfo != user) {
                //    this._userInfo = user;
                this._userInfo = Object.assign(this._userInfo, user);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 是否拥有此角色
     * @param roleid 角色id
     */
    User.prototype.checkIsOwnRoleById = function (roleid) {
        var role = this.roles.find(function (item) {
            return item.id == roleid;
        });
        return role ? true : false;
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
    return User;
}());
