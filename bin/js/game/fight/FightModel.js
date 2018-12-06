/*
* name;
*/
var FightModel = /** @class */ (function () {
    function FightModel() {
    }
    /**初始化 */
    FightModel.init = function (home, away) {
        this._home.length = this._away.length = this._all.length = 0;
        for (var i = 0; i < home.length; i++) {
            this._home.push(DBRole.calcRolePro(home[i]));
        }
        for (var i = 0; i < away.length; i++) {
            this._away.push(DBRole.calcNpcPro(away[i]));
        }
        this._all = this._home.concat(this._away);
        this._all.sort(this.sortOnSpeed);
        this._wait = this._all.slice(0, this._all.length);
    };
    /**
     * 开始战斗
     */
    FightModel.startFight = function () {
        //console.log("startFight============================")
        var role = this._wait.shift();
        this.excuteAI(role);
    };
    /**
     * 执行AI逻辑*
     */
    FightModel.excuteAI = function (role) {
        var vo = new FightVo();
        vo.nowId = this._currentRole.uid;
        var list;
        //1，判定对象，可能受技能影响--------------------------
        if (!target) {
            if (this._home.indexOf(role) != -1) { //主队//改成第一个目标了
                target = this._away[0];
                //target = xframe.XUtils.arrRandomValue(this._away);
            }
            else {
                target = this._home[0];
                //target = xframe.XUtils.arrRandomValue(this._home);
            }
        }
        //2,操作------------------------------------------------
        if (action) { //指定操作
            if (action == FightVo.ATTACK) {
                this.exAttack(this._currentRole, target, vo);
            }
            else if (action == FightVo.SKILL) {
                list = this.exSkill(this._currentRole, vo);
                //console.log(list.length,JSON.stringify(list))
            }
        }
        else { //AI托管,自动
            list = this.exSkill(this._currentRole, vo);
        }
        //3，操作结果------------------------------------------------
        if (list && list.length > 0) {
            //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxo",list.length);
            var len = list.length;
            var ids = [];
            for (var i = 0; i < len; i++) {
                ids.push(list[i].uid);
            }
            for (var i = 0; i < len; i++) {
                target = this.getRole(ids[i]);
                if (target.hp <= 0) {
                    delete this._buffInfo[target.uid];
                    //console.log("xxxxxxxxxxxxxxxxx",i)
                    xframe.XUtils.delArrItem(this._fightList, target);
                    xframe.XUtils.delArrItem(this._waitList, target);
                    xframe.XUtils.delArrItem(this._home, target);
                    xframe.XUtils.delArrItem(this._away, target);
                }
            }
        }
        else {
            if (target.hp <= 0) {
                delete this._buffInfo[target.uid];
                xframe.XUtils.delArrItem(this._fightList, target);
                xframe.XUtils.delArrItem(this._waitList, target);
                xframe.XUtils.delArrItem(this._home, target);
                xframe.XUtils.delArrItem(this._away, target);
            }
        }
        //4,小回合结束，派发事件
        vo.rId = FightModel._currentRnd;
        if (FightModel._waitList.length == 0) { //回合结束
            vo.isRndOver = true;
            FightModel._currentRnd++;
        }
        xframe.XEvent.instance.event(FightModel.UPDATEINFO, vo);
        //console.log("excuteAI=====================================")
    };
    /***/
    FightModel.sortOnSpeed = function (roleA, roleB) {
        if (roleA.speed > roleB.speed) {
            return 1;
        }
        return -1;
    };
    FightModel._home = [];
    FightModel._away = [];
    FightModel._all = [];
    FightModel._wait = [];
    return FightModel;
}());
//# sourceMappingURL=FightModel.js.map