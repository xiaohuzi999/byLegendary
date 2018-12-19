/*
* name;
*/
var DBRole = /** @class */ (function () {
    function DBRole() {
    }
    /**获取npc属性 */
    DBRole.getNpc = function (id) {
        return this.npcData[id];
    };
    /**hero属性*/
    DBRole.getHero = function (id) {
        return this.heroData[id];
    };
    Object.defineProperty(DBRole, "npcData", {
        get: function () {
            if (!this._npcData) {
                this._npcData = Laya.loader.getRes("res/cfg/npc.json");
            }
            return this._npcData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DBRole, "heroData", {
        get: function () {
            if (!this._heroData) {
                this._heroData = Laya.loader.getRes("res/cfg/hero.json");
            }
            return this._heroData;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 计算总属性 ,需要一个公式
    */
    DBRole.calcNpcPro = function (id) {
        var role = xframe.XUtils.clone(this.getNpc(id));
        role.attack = role.strength * 5;
        role.hp = role.maxHp = role.physique * 100;
        role.speed = role.agility * 1;
        role.crit = role.strength * 0.1;
        role.dodge = role.agility * 0.2;
        return role;
    };
    /**计算总属性 */
    DBRole.calcRolePro = function (tRole) {
        var role = xframe.XUtils.clone(tRole);
        role.attack = role.attack + role.strength * 5;
        role.hp = role.maxHp = role.hp + role.physique * 100;
        role.speed = role.speed + role.agility * 1;
        role.crit = role.crit + role.strength * 0.1;
        role.dodge = role.dodge + role.agility * 0.2;
        return role;
    };
    return DBRole;
}());
//# sourceMappingURL=DBRole.js.map