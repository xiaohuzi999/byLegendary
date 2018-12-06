/*
* name;
*/
class BuffVo{
    //组成格式：类型+增减(0增，1减)+编号
    public id:number; 
    public name:string;
    public target:number; 
    public type:number; 
    //lastRnd 持续回合
    public lastRnd:number;
    //
    public value:any

    //target 0-本人 ,1-本方全队，2-攻击目标，3-对方全队
    public static readonly TargetMe:number = 0
    public static readonly TargetHome:number = 1;
    public static readonly TargetAttackOne:number = 2;
    public static readonly TargetAttackAll:number = 2;

    //type 类型 1，HP增减, 2,attack增减 3，defend增减 4，speed增减, 5，dodge增减， 6，crit增减 7眩晕类 8，混乱类， 9 吸血
    public static readonly TypeHp:number = 1;
    public static readonly TypeAttack:number = 2;
    public static readonly TypeDefend:number = 3;
    public static readonly TypeSpeed:number = 4;
    public static readonly TypeDodge:number = 5;
    public static readonly TypeCrit:number = 6;
    public static readonly TypeDizzy:number = 7;
    public static readonly TypeChaos:number = 8;
    public static readonly TypeGreedy:number = 9;

    constructor(){
    }
}