/*
* name;
*/
class TraineeGiftItem extends ui.gift.GiftItemUI{
    private _vo:{id:number, name:string, reward:any[],day:string};
    constructor(){
        super();
        this.flagGet.visible = false;
        this.mouseEnabled = true;
    }

    public updateState(state:number):void{
        this.flagGet.visible = (state > 0)
    }

    public set dataSource(vo:{id:number, name:string, reward:any[],day:string}){
        this._vo = vo;
        trace("gogogo", vo)
        if(this._vo){
            this.tfDay.text = this._vo.day+"";
            this.tfName.text = this._vo.name+"";
        }
    }

    public get dataSource():{id:number, name:string, reward:any[],day:string}{
        return this._vo;
    }
}