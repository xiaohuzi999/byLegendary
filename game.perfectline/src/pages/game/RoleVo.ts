/*
* name;
*/
class RoleVo{
    public id: number;
    public img: string;
    //花费[类型，数量]
    public cost: number[];
    public name : string;
    //是否旋转
    public rotate: number;
    //尾巴渲染帧数
    public rendFrame:number;
    public child:number;
    constructor(){

    }
}