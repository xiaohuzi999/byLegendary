/*
* name;
*/
class DBTask{
    private static _data:any;
    constructor(){

    }

    /**check task state */
    public static checkFinish(id:number):boolean{
        let vo:TaskVo = DBTask.getTaskVo(id);
        //状态判定
        if(vo.type == TaskVo.TypeItem){
            if(vo.cond && vo.cond.length){
                let itemNum:number = Bag.getInstance().getItemNum(vo.cond[0]);
                if(itemNum >= vo.cond[1]){
                    return true;
                }
            }
        }
        return false;
    }

    /** */
    public static finishTask(id:number):boolean{
        if(this.checkFinish(id)){
            let vo:TaskVo = this.getTaskVo(id);

            if(vo.type == TaskVo.TypeItem){
                Bag.getInstance().delItem(vo.cond[0], vo.cond[1]);
            }
            
            if(vo.reward){
                for(let i=0; i<vo.reward.length; i++){
                    let tmp:number = vo.reward[i]
                    Bag.getInstance().addItem(tmp[0], tmp[1]);
                }
            }
            //todo special
            if(vo.special){
                XAlert.showAlert("doing~~~~~~~~~~~~~~~~~~")
            }
            User.getInstance().taskDone.push(id);
            for(let i=0; i<User.getInstance().task.length; i++){
                if(User.getInstance().task[i].id == id){
                    User.getInstance().task.splice(i,1);
                    break;
                }
            }
            return true;
        }else{
            XTip.showTip("not finish~");
        }
        return false;
    }

    //
    public static dropTask(id:number):void{
        for(let i=0; i<User.getInstance().task.length; i++){
            if(User.getInstance().task[i].id == id){
                User.getInstance().task.splice(i,1);
                break;
            }
        }
    }

    /** */
    public static getTaskVo(id:any):TaskVo{
        return this.data[id];
    }

    private static get data():any{
        if(!this._data){
            this._data = Laya.loader.getRes("res/cfg/task.json");
            trace(this._data)
        }
        return this._data;
    }
}