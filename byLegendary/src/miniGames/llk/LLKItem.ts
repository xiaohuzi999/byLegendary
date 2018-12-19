/*
* name;
*/
class LLKItem extends ui.MiniLLK.LLKItemUI implements ISelectable{
    private _data:LLKItemVo;
    //
    private _selected:boolean;
    public position:Laya.Point = new Laya.Point();
    constructor(){
        super();
    }

    public set dataSource(vo:LLKItemVo){
        this._data = vo
        if(this._data){
            this.visible = true;
            this.pic.skin = "item/"+vo.skin+".png"
        }else{
            this.visible = false;
        }
    }

    public get dataSource():LLKItemVo{
        return this._data;
    }

    public set selected(b:boolean){
        this._selected = b;
        if(this._selected){
            this.frame.skin = "share/frame2.png";
        }else{
            this.frame.skin = "share/frame.png";
        }
    }

    public get selected():boolean{
        return this._selected;
    }
}
