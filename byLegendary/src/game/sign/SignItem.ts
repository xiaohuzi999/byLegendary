/*
* name;
*/
class SignItem extends ui.sign.SignItemUI{
    private _vo:SignVo;
    constructor(){
        super();
        this.flag.visible = false;
    }

    public update(state:number, day:number):void{
        if(state > 0){
            this.flag.visible = true;
        }
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