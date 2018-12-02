/*
* name;
*/
class ShopItem extends ui.shop.ShopItemUI{
    private _vo:ShopItemVo;
    constructor(){
        super();
    }

    public set dataSource(vo:ShopItemVo){
        this._vo = vo;
        this.item.dataSource =  vo;
        if(this._vo){
            let itemVo:ItemVo = DBItem.getItemVo(vo.itemId);
            this.tfPriece.text = vo.price+"";
            this.tfName.text  = itemVo.name+"";
            if(this._vo.priceType == 1){
                this.icon.skin = "icon/jinbi.png"
            }else{
                this.icon.skin = "icon/diamond.png"
            }
        }
    }

    public get dataSource():ShopItemVo{
        return this._vo;
    }
}