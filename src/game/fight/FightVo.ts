/**
 * Created by Administrator on 15-6-2.
 */
class FightVo{
    //出手方id
    public nowId:string;
    //操作-常数如FightVo(ATTACK,SKILL, DEFEND, RECOVER);
    public action:number;
    //技能ID
    public skillId:string;
    //表现类型=FightVo(NORMAL,CRIT,MISS)
    public showType:number = 0;
    //结果，哈希,{目标角色UID:{属性：值}},形如{1:{hp:30}};
    public fightInfo:any = {};
    //回合ID
    public rndId:number;

    /**动作类型-普通攻击*/
    public static ATTACK:number = 1;
    /**动作类型-技能*/
    public static SKILL:number = 2;
    /**动作类型-防御*/
    public static DEFEND:number = 3;
    /**动作类型-回复*/
    public static RECOVER:number = 4;

    /**表现类型*/
    public static NORMAL:number = 0;
    /**表现类型-暴击*/
    public static CRIT:number = 1;
    /**表现类型-未命中*/
    public static MISS:number = 2
}