/*
* name;
*/
class DBTraineeGift{
    //id	reward	name	day
    private static readonly dic:any = {
        1:{id:1,name:"",reward:[], day:""},
        2:{id:2,name:"",reward:[], day:""},
        3:{id:3,name:"",reward:[], day:""}
    }
    constructor(){

    }

    /** */
    public static getTraineeGiftVo(id:number):{id:number, name:string, reward:number[],day:string}{
        return this.dic[id];
    }
}