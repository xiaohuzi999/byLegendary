/*
* name;
*/
class DBChapter{
    private static _data:ChapterVo[];
    constructor(){

    }

    /**判断是否满足解锁条件 */
    public static canUnlock(id:any):boolean{
        let vo:ChapterVo = this.getChapInfo(id);
        return Bag.getInstance().getItemNum(vo.cond[0]) >= vo.cond[1];
    }
    //
    public static getChapInfo(id:any):ChapterVo{
        for(let i in this.chapList){
            if(this.chapList[i].id == id){
                return this.chapList[i];
            }
        }
        return null;
    }
            
    public static get chapList():ChapterVo[]{
        if(!this._data){
            this._data = Laya.loader.getRes("res/cfg/stage.json");
        }
        return this._data;
    }
    
}