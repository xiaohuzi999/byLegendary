/*
* name;
*/
class SkillVo{
    //id	名字	描述	作用目标数	作用对象0-不限 ,1-己方，2-对方	策略0-随机，1-HP最少	类型0-攻击，1-辅助	伤害比	触发几率	附带BUFF	BUFF比率
    public id:number;
    public name:string;
    public num:number;
    public target:number;
    public strategy:number;
    public type:number;
    public hurt:number
    public rate:number;
    public buff:number;
    public buffRate:number

    
    //target 作用对象，1-己方，2-对方，0-不限
    public static readonly TargetAll:number = 0;
    public static readonly TargetHome:number = 1;
    public static readonly TargetAway:number = 2;

    //策略0-随机，1-HP最少
    public static readonly StrRandom:number = 0;
    public static readonly StrHp:number = 1;

    constructor(){

    }
}