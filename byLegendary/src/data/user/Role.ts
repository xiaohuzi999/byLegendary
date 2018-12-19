/*
* name; 
*/
class Role extends BaseRole{
    /**唯一ID */
    public uid:any;
    /**角色名*/
    public name:string = "by001";
    /**品阶*/
    public quality:number;
    /**头像*/
    public pic:string = "";
    /**经验*/
    public exp:number = 0;
    /**等级*/
    public lv:number = 1;
    /**技能列表*/
    public skills:number[] = [];
    //一级属性===================================================
    /**HP*/
    public hp:number = 1;
    /**最大HP*/
    public maxHp:number = 1;
    /**攻击*/
    public attack:number = 1;
    /**闪避*/
    public dodge:number = 0;
    /**暴击*/
    public crit:number = 0;
    //二级属性==================================================
    /**速度*/
    public speed:number = 0;
    //装备=============================================
    public weapon:EquipVo = null;

    public constructor(data:any=null) {
        super();
        if(data){
            this.setValue(data);
        }
    }

    /**
     *赋值
     * @param valueObj 值对象,JSON格式化对象
     */
    public setValue(valueObj:any) {
        for(var i in valueObj) {
            this[i] = valueObj[i];
        }
    }
}