/*
* name;
*/
class Star extends Laya.Image{
    /**休眠时间 */
    private _sleepTime:number;
    private _offsetY:number;
    private MaxAlpha:number = 1;
    private MinAlpha:number = 0.5;
    //
    private _moveTween:Laya.Tween;
    private static _sleep:boolean = true;
    constructor(){
        super()
        this.skin = "res/game/dot.png";
        var rnd:number = Math.random();
        this._sleepTime = rnd*4000+2000;
        this._offsetY = rnd*150 + 600;
        if(rnd < 0.7){
            this.alpha = this.MaxAlpha;
            if(rnd < 0.15){
                this.MaxAlpha = 0.6;
                this.MinAlpha = 0.4;
                this.scale(0.5, 0.5)
            }else{
                this.MaxAlpha = 0.75;
                this.scale(0.7, 0.7)
            }
        }
        this.visible = false;
        Laya.timer.once(rnd*2000, this, this.reborn);
    }

    /**闪烁 */
    public flash():void{
        Laya.Tween.to(this, {alphp:this.MinAlpha}, 200, null, Laya.Handler.create(null, ()=>{
            Laya.Tween.to(this, {alphp:this.MaxAlpha}, 200, null, Laya.Handler.create(null, ()=>{
                Laya.Tween.to(this, {alpha:this.MinAlpha}, 1000, null, Laya.Handler.create(null, ()=>{
                    Laya.timer.once(500, null, ()=>{
                        this.visible = false;
                    });
                    Laya.Tween.to(this, {x:this.x}, 1, null, Handler.create(this, this.reborn),this._sleepTime)
                }))
            }))
        }))
    }
    

    private move():void{
        if(!Star._sleep){
            this._moveTween = Laya.Tween.to(this, {y:this.y+this._offsetY}, 2200);
        }
    }

    /**生成 */
    public reborn():void{
        this.visible = true;
        this.alpha = this.MaxAlpha;
        this.x = Math.floor(Math.random()*Laya.stage.width);
        this.y = Math.floor(Math.random()*(Laya.stage.height-200))-200
        this.flash();
        this.move();
    }

    public __sleep():void{
        Laya.Tween.clear(this._moveTween);
    }

    public die():void{
        Laya.Tween.clearAll(this);
        this.removeSelf();
    }

    /**闪烁 */
    private static _stars:Star[] = [];
    public static shine(num:number, disc:Laya.Sprite):void{
        this.destroy();
        for(let i=0; i<num; i++){
            this._stars.push(new Star())
            disc.addChild(this._stars[i]);
        }
    }

    /**休眠 */
    public static sleep():void{
        if(!this._sleep){
            this._sleep = true;
            for(let i=0; i<this._stars.length; i++){
                this._stars[i].__sleep();
            }
        }
    }

    /**激活 */
    public static active():void{
        if(this._sleep){
            this._sleep = false;
            for(let i=0; i<this._stars.length; i++){
                this._stars[i].move();
            }
        }
    }

    /**销毁 */
    public static destroy():void{
        for(let i=0; i<this._stars.length; i++){
            this._stars[i].die();
        }
        this._stars.length = 0;
    }
}