/*
* name;
*/
class DBTraineeGift{
    //id	reward	name	day
    private static readonly dic:any = {
        0:{id:0,name:"1*5",reward:[[1,5]], day:"第1天"},
        1:{id:1,name:"2*5",reward:[[2,5]], day:"第2天"},
        2:{id:2,name:"1*5*3*1",reward:[[1,5],[3,1]], day:"第3天"}
    }
    constructor(){

    }

    /** */
    public static getTraineeGiftVo(id:number):{id:number, name:string, reward:any[],day:string}{
        return this.dic[id];
    }
}