/*
* name;
*/
var Role = /** @class */ (function () {
    function Role(data) {
        if (data === void 0) { data = null; }
        /**角色名*/
        this.name = "by001";
        /**头像*/
        this.pic = "";
        /**经验*/
        this.exp = 0;
        /**升级经验*/
        this.lvExp = 1;
        /**等级*/
        this.lv = 1;
        /**技能列表*/
        this.skills = [];
        //一级属性===================================================
        /**HP*/
        this.hp = 1;
        /**最大HP*/
        this.maxHp = 1;
        /**攻击*/
        this.attack = 1;
        /**闪避*/
        this.dodge = 0;
        /**暴击*/
        this.crit = 0;
        //二级属性==================================================
        /**体质*/
        this.physique = 0;
        /**敏捷*/
        this.agility = 0;
        //
        this.strength = 0;
        /**攻击成长*/
        this.strengthGrow = 1;
        /**体质成长*/
        this.physiqueGrow = 0;
        /**敏捷成长*/
        this.agilityGrow = 0;
        /**速度*/
        this.speed = 0;
        //装备=============================================
        this.weapon = null;
        if (data) {
            this.setValue(data);
        }
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
}());
//# sourceMappingURL=Role.js.map