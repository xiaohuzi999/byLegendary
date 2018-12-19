/*
* name;
*/
class DBSkill{
    private static _data:any;
    constructor(){

    }

    /** */
    public static getSkill(skillId:any):SkillVo{
        return this.data[skillId];
    }
    
    private static get data():any{
        if(!this._data){
            this._data = Laya.loader.getRes("res/cfg/skill.json")
        }
        return this._data
    }
}