/*
* name;
*/
class SignItem extends ui.plugins.SignInItemUI{
    private _vo:SignVo;
    constructor(){
        super();
        this.flag.visible = false;
    }

    public update(state:number):void{
        if(state > 0){
            this.flag.visible = true;
        }
    }

    public set dataSource(vo:SignVo){
        this._vo = vo;
        if(this._vo){
            this.tfDay.text = this._vo.day;
            this.tfName.text = this._vo.name+"";
            this.tfNum.text = "X"+this._vo.num;
            this.rewardImg.skin = "res/signin/"+this._vo.icon+".png"
        }
    }

    public get dataSource():SignVo{
        return this._vo;
    }
}