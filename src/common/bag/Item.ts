/*
* name;
*/
class Item extends ui.bag.ItemUI{
    private _vo:UItemVo;
    private _itemVo:ItemVo;

    constructor(vo?:UItemVo){
        super();
        this.dataSource = vo;
    }

    public set dataSource(vo:UItemVo){
        this._vo = vo;
        if(vo){
            if(vo.itemId){
                this._itemVo = DBItem.getItemVo(vo.itemId);
            }else{
                this.pic.skin = "";
            }
        }else{
            this._itemVo = null;
        }
    }

    public get dataSource():UItemVo{
        return this._vo;
    }

    public get ItemVo():ItemVo{
        return this._itemVo;
    }
}