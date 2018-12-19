/*
* name;
*/
class Bag{
    /**编号 */
    public index:number = 1;
    /**道具列表 */
    public items:UItemVo[] = [];
    /**事件-道具变化 */
    public static readonly CHANGE:string = "change";
    /**单例 */
    private static _instance:Bag;
    constructor(){

    }
    /**初始化 */
    public init():void{
        let val:any = XDB.getData(XDB.BAG);
        if(val){
            if(typeof val === "string"){
                val = JSON.parse(val);
            }
            trace("initBag::", val)
            this.update(val);
        }
    }

    /**生成一个道具 */
    public createItem(itemId:any, itemNum:number = 1):UItemVo{
        let vo:any;
        if(DBItem.getItemVo(itemId)){
            vo = {uid:this.index++, itemId:itemId, num:Math.floor(itemNum)}
        }
        XTip.showTip("道具Id"+itemId+"不存在");
        return vo;
    }

    /**加入道具 */
    public addItem(itemId:any, itemNum:number = 1):void{
        let vo:ItemVo = DBItem.getItemVo(itemId);
        if(!vo){
            XTip.showTip("无效道具ID:"+itemId);
            return;
        }

        //如果是货币
        if(itemId == ItemVo.GOLD){
            User.getInstance().gold += Math.floor(itemNum);
            User.getInstance().dispatchEvent();
            User.getInstance().save();
            return;
        }else if(itemId == ItemVo.DIAMOND){
            User.getInstance().diamond += Math.floor(itemNum);
            User.getInstance().dispatchEvent();
            User.getInstance().save();
            return;
        }

        if(vo.max == 1){//不叠加
            this.items.push(this.createItem(itemId, itemNum))
        }else{
            let hasIt:boolean = false;
            for(let i=0; i<this.items.length; i++){
                if(this.items[i].itemId == itemId ){
                    this.items[i].num += Math.floor(itemNum);
                    hasIt = true;
                    break;
                }
            }
            if(!hasIt){
                this.items.push(this.createItem(itemId, itemNum))
            }
        }
        this.dispatchEvent();
        this.save();
    }

    /**根据道具ID返回 */
    public getItemById(itemId:any):UItemVo{
        for(let i=0; i<this.items.length; i++){
            if(this.items[i].itemId == itemId ){
                return this.items[i];
            }
        }
        return null;
    }

    /**根据唯一ID返回 */
    public getItemByUid(uid:any):UItemVo{
        for(let i=0; i<this.items.length; i++){
            if(this.items[i].uid == uid ){
                return this.items[i];
            }
        }
        return null;
    }

    /**获取道具数量 */
    public getItemNum(itemId:any):number{
        if(itemId == ItemVo.GOLD){
            return User.getInstance().gold;
        }else if(itemId == ItemVo.DIAMOND){
            return User.getInstance().diamond;
        }
        let num:number = 0;
        for(let i=0; i<this.items.length; i++){
            if(this.items[i].itemId == itemId ){
                num += Math.floor(this.items[i].num);
            }
        }
        return num;
    }


    /**随机扣除道具 */
    public delItem(itemId:any, itemNum:number):void{
        if(itemId == ItemVo.GOLD){
            User.getInstance().gold -= itemNum;
            return;
        }else if(itemId == ItemVo.DIAMOND){
            User.getInstance().diamond -= itemNum;
            return;
        }
        for(let i=0; i<this.items.length; i++){
            if(this.items[i].itemId == itemId ){
                this.items[i].num -= Math.floor(itemNum);
                if(this.items[i].num < 1){
                    this.items.splice(i, 1);
                }
                break;
            }
        }
        this.dispatchEvent();
        this.save();
    }

    /**扣除指定道具 */
    public delItemByUid(uid:any, itemNum:number):void{
        for(let i=0; i<this.items.length; i++){
            if(this.items[i].uid == uid ){
                this.items[i].num -= Math.floor(itemNum);
                if(this.items[i].num < 1){
                    this.items.splice(i, 1);
                }
                break;
            }
        }
        this.dispatchEvent();
        this.save();
    }


    //更新
    public update(value:any):void{
        for(var i in value){
            this[i] = value[i];
        }
    }

    /**保存 */
    public save():void{
        XDB.save(XDB.BAG, this);
    }

    //变化之后手动调用；
    public dispatchEvent():void{
        XEvent.instance.event(User.UPDATE);
    }

    /** */
    public static getInstance():Bag{
        if(!this._instance){
            this._instance = new Bag();
        }
        return this._instance;
    }
}