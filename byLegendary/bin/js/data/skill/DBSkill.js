/*
* name;
*/
var DBSkill = /** @class */ (function () {
    function DBSkill() {
    }
    /** */
    DBSkill.getSkill = function (skillId) {
        return this.data[skillId];
    };
    Object.defineProperty(DBSkill, "data", {
        get: function () {
            if (!this._data) {
                this._data = Laya.loader.getRes("res/cfg/skill.json");
            }
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    return DBSkill;
}());
//# sourceMappingURL=DBSkill.js.map