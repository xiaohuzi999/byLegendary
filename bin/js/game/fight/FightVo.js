/**
 * Created by Administrator on 15-6-2.
 */
var FightVo = /** @class */ (function () {
    function FightVo() {
        //表现类型=FightVo(NORMAL,CRIT,MISS)
        this.showType = 0;
        //结果，哈希,{目标角色UID:{属性：值}},形如{1:{hp:30}};
        this.fightInfo = {};
        /**是否回合结束*/
        this.rndOver = false;
    }
    /**动作类型-普通攻击*/
    FightVo.ATTACK = 1;
    /**动作类型-技能*/
    FightVo.SKILL = 2;
    /**动作类型-防御*/
    FightVo.DEFEND = 3;
    /**动作类型-回复*/
    FightVo.RECOVER = 4;
    /**表现类型*/
    FightVo.NORMAL = 0;
    /**表现类型-暴击*/
    FightVo.CRIT = 1;
    /**表现类型-未命中*/
    FightVo.MISS = 2;
    return FightVo;
}());
//# sourceMappingURL=FightVo.js.map