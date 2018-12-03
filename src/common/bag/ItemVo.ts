/*
* 道具基础数据
*/
class ItemVo{
    //item id
    public id:number;
    // item name;
    public name: string;
    // item price
    public price:number;
    //max number of the item;
    public max:number;
    //
    public quality:number = 0;
    //item property, usally for equipment;
    public property:{hp?:number, attak?:number, dodge?:number, crit?:number, physique?:number, agility?:number, strength?:number};
    //item type
    public type:number;
    // item icon file name;
    public icon:number;
    //item desc;
    public desc:string
    /**特殊道具ID */
    public static readonly GOLD:number = 1;
    public static readonly DIAMOND:number = 2;
    constructor(){

    }
}