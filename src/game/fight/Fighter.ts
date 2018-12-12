/*
* name;
*/
class Fighter extends ui.fight.FighterUI{
    private _vo:Role;
    constructor(){
        super();
        this.dataSource;
    }

    public attack(cb?:Laya.Handler):void{
        Laya.Tween.to(this, {scaleX:1.2, scaleY:1.2}, 150, null, Laya.Handler.create(null, ()=>{
            Laya.Tween.to(this, {scaleX:1, scaleY:1}, 150, null, Laya.Handler.create(null, ()=>{
                Laya.Tween.to(this, {x:this.x}, 300, null, cb);
            }));
        }))
    }

    public beAttacked():void{
        Laya.Tween.to(this, {scaleX:0.8, scaleY:0.8}, 150, null, Laya.Handler.create(null, ()=>{
            Laya.Tween.to(this, {scaleX:1, scaleY:1}, 150);
        }))
    }

    public set dataSource(v:Role){
        this._vo = v;
        if(this._vo){

        }
    }

    public get dataSource():Role{
        return this._vo;
    }
}