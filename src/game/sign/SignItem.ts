/*
* name;
*/
class SignItem extends ui.sign.SignItemUI{
    private _vo:SignVo;
    constructor(){
        super();
        this.dataSource
    }

    public set dataSource(vo:SignVo){
        this._vo = vo;
        if(this._vo){
            this.tfDay.text = this._vo.day;
            this.tfName.text = this._vo.name+"";
        }
    }

    public get dataSource():SignVo{
        return this._vo;
    }
}