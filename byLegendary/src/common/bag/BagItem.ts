/*
* name;
*/
class BagItem extends ui.bag.BagItemUI{
    private _vo:UItemVo;
    constructor(){
        super();
    }

    public set dataSource(vo:UItemVo){
        this._vo = vo;
        this.item.dataSource = vo;
        if(vo){
            let itemVo:ItemVo = DBItem.getItemVo(vo.itemId);
            this.tfName.text = itemVo.name+"";
            this.tfDesc.text = itemVo.desc+"";
        }
    }

    public get dataSource():UItemVo{
        return this._vo;
    }
}