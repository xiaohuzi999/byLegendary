/*
* name;
*/
class ChaperItem extends ui.views.home.ChapterItemUI{

    private _selected:boolean = false;

    constructor(){
        super();
        this.box.scaleX = this.box.scaleY = 0.8
        this.bg.visible = false;
    }

    public set dataSource(data:any){
        if(data){
            this.visible = true;
            this.pic.skin = data.cover+"";
        }else{
            this.visible = false;
        }
    }

    public set selected(v:boolean){
        if(this._selected != v) {
            this._selected = v;
            if(this._selected) {
                this.bg.visible = true;
                Laya.Tween.to(this.box, {scaleX:1, scaleY:1},200);
            } else {
                this.bg.visible = false;
                Laya.Tween.to(this.box, {scaleX:0.8, scaleY:0.8},200);
            }
        }
    }

    public get selected():boolean{
        return this._selected;
    }
}