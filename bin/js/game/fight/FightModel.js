/*
* name;
*/
var FightModel = /** @class */ (function () {
    function FightModel() {
    }
    /**初始化 */
    FightModel.init = function (home, away) {
        this._home.length = this._away.length = this._all.length = 0;
        this._curRnd = 1;
        for (var i = 0; i < home.length; i++) {
            this._home.push(DBRole.calcRolePro(home[i]));
        }
        for (var i = 0; i < away.length; i++) {
            this._away.push(DBRole.calcNpcPro(away[i]));
        }
        this._all = this._home.concat(this._away);
        this._all.sort(this.sortOnSpeed);
        this._wait = this._all.slice(0, this._all.length);
        this.startNewRnd();
    };
    FightModel.fight = function () {
        //如果没有接受
        while (!this.checkEnd()) {
            //
        }
    };
    /**
     * 开始战斗
     */
    FightModel.startNewRnd = function () {
        //console.log("startFight============================")
        while (this._wait.length) {
            this._curRole = this._wait.shift();
            //this.excuteAI(this._curRole);
            trace(this.excuteAI(this._curRole));
        }
    };
    /**
     * 执行AI逻辑*
     */
    FightModel.excuteAI = function (role) {
        var vo = new FightVo();
        vo.nowId = role.uid;
        var list;
        var target;
        //1,操作------------------------------------------------
        list = this.exSkill(role, vo);
        //2，操作结果------------------------------------------------
        if (list && list.length > 0) {
            //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxo",list.length);
            var len = list.length;
            for (var i = 0; i < len; i++) {
                target = list[i];
                if (target.hp <= 0) {
                    xframe.XUtils.delArrItem(this._all, target);
                    xframe.XUtils.delArrItem(this._wait, target);
                    xframe.XUtils.delArrItem(this._home, target);
                    xframe.XUtils.delArrItem(this._away, target);
                }
            }
        }
        else {
            console.warn("Skill Err", role);
        }
        //3,小回合结束，派发事件
        vo.rndId = this._curRnd;
        if (this._wait.length == 0) { //回合结束
            vo.rndOver = true;
            this._curRnd++;
        }
        //XEvent.instance.event(FightModel.UPDATEINFO, vo);
        //console.log("excuteAI=====================================")
        return vo;
    };
    FightModel.exSkill = function (skillRole, vo) {
        //寻找当前能执行的技能；
        var list = skillRole.skills || [];
        var isAway = this._away.indexOf(skillRole) > -1;
        var skillData;
        for (var i = list.length - 1; i > -1; i--) {
            var vo_1 = DBSkill.getSkill(list[i]);
            if (Math.random() <= vo_1.rate) {
                skillData = vo_1;
                break;
            }
        }
        if (!skillData) {
            skillData = DBSkill.getSkill(0);
        }
        //寻找目标==========================================================
        var targets = [];
        var tmp;
        //本方
        if (skillData.target == SkillVo.TargetHome) {
            for (var i = 0; i < skillData.num; i++) {
                if (isAway) {
                    this._away[i] && targets.push(this._away[i]);
                }
                else {
                    this._home[i] && targets.push(this._home[i]);
                }
            }
        }
        //对方
        else if (skillData.target == SkillVo.TargetAway) {
            for (var i = 0; i < skillData.num; i++) {
                if (isAway) {
                    this._home[i] && targets.push(this._home[i]);
                }
                else {
                    this._away[i] && targets.push(this._away[i]);
                }
            }
        }
        //技能效果(伤害)解析==============================================================
        for (var i = 0; i < targets.length; i++) {
            //计算伤害=============
            var hurt = skillRole.attack * skillData.rate;
            //BUFF伤害加成；
            hurt = parseInt(hurt + "");
            if (hurt != 0) {
                //TODO：BUFF减伤；
                targets[i].hp = Math.max(0, targets[i].hp - hurt);
                if (targets[i].hp > targets[i].maxHp) {
                    targets[i].hp = targets[i].maxHp;
                }
                if (vo.fightInfo[targets[i].uid]) {
                    vo.fightInfo[targets[i].uid]["hp"] = targets[i].hp;
                }
                else {
                    vo.fightInfo[targets[i].uid] = { "hp": targets[i].hp };
                }
            }
        }
        //BUFF解析===============================================================
        if (skillData.buff) {
            var makeBuff = Math.random() < skillData.buffRate;
            if (makeBuff) {
                var buffData = DBBuff.getBuff(skillData.buff);
                if (buffData) {
                    var tmp_1;
                    if (buffData.target == BuffVo.TargetMe) {
                        this.addBuff(skillRole, buffData, vo);
                    }
                    else if (buffData.target == BuffVo.TargetHome) {
                        tmp_1 = isAway ? this._away : this._home;
                        for (var i = 0; i < tmp_1.length; i++) {
                            this.addBuff(tmp_1[i], buffData, vo);
                        }
                    }
                    else if (buffData.target == BuffVo.TargetAttackOne) {
                        this.addBuff(targets[0], buffData, vo);
                    }
                    else if (buffData.target == BuffVo.TargetAttackOne) {
                        tmp_1 = isAway ? this._home : this._away;
                        for (var i = 0; i < tmp_1.length; i++) {
                            this.addBuff(tmp_1[i], buffData, vo);
                        }
                    }
                }
            }
        }
        //生成操作列表
        vo.action = FightVo.SKILL;
        vo.skillId = skillData.id + "";
        return targets;
    };
    /**加BUFF */
    FightModel.addBuff = function (role, buff, vo) {
        trace("加BUFF======================", role.uid, buff.id);
        /*
        if(!this._buffInfo[role.uid]){
            this._buffInfo[role.uid] = {};
        }
        //todo同类BUFF重复加的问题
        //格式【当前回合，持续回合, BUFF附加状态】
        let state:number = Role.FS_NORMAL
        if(buff.type == BuffVo.TYPE_DIZZY){
            state = Role.FS_DIZZY;
            role.fightState = state;
        }else if(buff.type == BuffVo.TYPE_CHAOS){
            state = Role.FS_CHAOS
            role.fightState = state;
        }
        this._buffInfo[role.uid][buff.id] = [0, buff.rnd, state];
        if(vo.fightInfo[role.uid]){
            vo.fightInfo[role.uid]["addBuff"] = buff.id
        }else{
            vo.fightInfo[role.uid] = {addBuff:buff.id};
        }
        */
    };
    /**检测是否已经结束 */
    FightModel.checkEnd = function () {
        return this._home.length == 0 || this._away.length == 0;
    };
    /***/
    FightModel.sortOnSpeed = function (roleA, roleB) {
        if (roleA.speed > roleB.speed) {
            return 1;
        }
        return -1;
    };
    //
    FightModel.getRole = function (roleId) {
        for (var i in this._all) {
            if (this._all[i].uid == roleId) {
                return this._all[i];
            }
        }
        return null;
    };
    FightModel._home = [];
    FightModel._away = [];
    FightModel._all = [];
    FightModel._wait = [];
    FightModel._curRnd = 1;
    return FightModel;
}());
//# sourceMappingURL=FightModel.js.map