/*
* name;
*/
class TaskVo{
    public id:any
    public name:string
    public lv:number = 0;
    public type:number;
    public desc:string
    public cond:number[];
    public reward:any[];
    public special:string = ''
    //
    public static readonly TypeItem:number = 1;
    //
    public static readonly TypeFight:number = 2;
    constructor(){

    }
}