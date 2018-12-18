/*
* name;
*/
class ChaperItem extends ui.views.home.ChapterItemUI{
    private _selected:boolean = false;
    private _data:ChapterVo;
    constructor(){
        super();
        this.box.scaleX = this.box.scaleY = 0.8
    }

    public set dataSource(data:ChapterVo){
        this._data = data;
        if(data){
            this.visible = true;
            //this.pic.skin = data.cover+"";
            this.tfName.text = data.name+"";
        }else{
            this.visible = false;
        }
    }

    public get dataSource():ChapterVo{
        return this._data;
    }

    public set selected(v:boolean){
        if(this._selected != v) {
            this._selected = v;
            if(this._selected) {
                Laya.Tween.to(this.box, {scaleX:1, scaleY:1},200);
            } else {
                Laya.Tween.to(this.box, {scaleX:0.8, scaleY:0.8},200);
            }
        }
    }

    public get selected():boolean{
        return this._selected;
    }
}