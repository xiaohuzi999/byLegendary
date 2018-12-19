var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
* name;
*/
var Role = /** @class */ (function (_super) {
    __extends(Role, _super);
    function Role(data) {
        if (data === void 0) { data = null; }
        var _this = _super.call(this) || this;
        /**角色名*/
        _this.name = "by001";
        /**头像*/
        _this.pic = "";
        /**经验*/
        _this.exp = 0;
        /**等级*/
        _this.lv = 1;
        /**技能列表*/
        _this.skills = [];
        //一级属性===================================================
        /**HP*/
        _this.hp = 1;
        /**最大HP*/
        _this.maxHp = 1;
        /**攻击*/
        _this.attack = 1;
        /**闪避*/
        _this.dodge = 0;
        /**暴击*/
        _this.crit = 0;
        //二级属性==================================================
        /**速度*/
        _this.speed = 0;
        //装备=============================================
        _this.weapon = null;
        if (data) {
            _this.setValue(data);
        }
        return _this;
    }
    /**
     *赋值
     * @param valueObj 值对象,JSON格式化对象
     */
    Role.prototype.setValue = function (valueObj) {
        for (var i in valueObj) {
            this[i] = valueObj[i];
        }
    };
    return Role;
}(BaseRole));
//# sourceMappingURL=Role.js.map