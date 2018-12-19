/*
* name;
*/
class DBRole{
    private static _npcData:any;
    private static _heroData:any;
    constructor(){

    }

    /**获取npc属性 */
    public static getNpc(id:any):BaseRole{
        return this.npcData[id];
    }

    /**hero属性*/
    public static getHero(id:any):BaseHero{
        return this.heroData[id];
    }

    private static get npcData():any{
        if(!this._npcData){
            this._npcData = Laya.loader.getRes("res/cfg/npc.json");
        }
        return this._npcData;
    }

    private static get heroData():any{
        if(!this._heroData){
            this._heroData = Laya.loader.getRes("res/cfg/hero.json")
        }
        return this._heroData;
    }

    /**
     * 计算总属性 ,需要一个公式
    */
    public static calcNpcPro(id:any):Role{
        let role:Role = xframe.XUtils.clone(this.getNpc(id));
        role.attack = role.strength*5;
        role.hp = role.maxHp = role.physique*100;
        role.speed = role.agility*1
        role.crit = role.strength*0.1;
        role.dodge = role.agility*0.2;
        return role;
    }

    /**计算总属性 */
    public static calcRolePro(tRole:Role):Role{
        let role:Role = xframe.XUtils.clone(tRole);
        role.attack = role.attack+role.strength*5;
        role.hp = role.maxHp = role.hp+role.physique*100;
        role.speed = role.speed+role.agility*1
        role.crit = role.crit+role.strength*0.1;
        role.dodge = role.dodge+role.agility*0.2;
        return role;
    }
}