/*
* name;
*/
class TraineeGiftItem extends ui.gift.GiftItemUI{
    private _vo:{id:number, name:string, reward:number[],day:string};
    constructor(){
        super();
    }

    public set dataSource(vo:{id:number, name:string, reward:number[],day:string}){
        this._vo = vo;
    }

    public get dataSource():{id:number, name:string, reward:number[],day:string}{
        return this._vo;
    }
}