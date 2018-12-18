/*
* name;
*/
class DBChapter{
    private static _data:ChapterVo[];
    constructor(){

    }

    //
    public static getChapInfo(id:any):ChapterVo{
        return this.chapList[id];
    }
            
    public static get chapList():ChapterVo[]{
        if(!this._data){
            this._data = Laya.loader.getRes("res/cfg/stage.json");
        }
        return this._data;
    }
}