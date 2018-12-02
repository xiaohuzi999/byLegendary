/*
* name;
*/
class DBShop{
    private static _data:any;
    constructor(){

    }

    //
    public static getShopItemVo(id:number):ShopItemVo{
        return this.data[id];
    }

    /**获取所有列表 */
    public static getShopList():ShopItemVo[]{
        let items:ShopItemVo[] = [];
        for(let i in this.data){
            items.push(this.data[i]);
        }
        return items;
    }

    private static get data():any{
        if(!this._data){
            this._data = Laya.loader.getRes("res/cfg/shop.json");
        }
        return this._data;
    }
}