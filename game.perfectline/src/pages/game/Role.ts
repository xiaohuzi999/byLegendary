//小球
class Role extends Laya.Sprite{
    private $image:Laya.Image;
    private $shadow:Laya.Image;
    //影子
    private _shadows:Laya.Image[] = [];
    //
    private _posArr:{x:number, y:number}[] = [];
    private _id:any;
    private _needAni:boolean = false;
    //渲染指数；
    private _renderIndex:number;
    private _maxNode:number = 40;
    private _roleData:RoleVo;
    private static ROTATE:number = 6;
    constructor(){
        super();
        this.init();
    }
    
    
    private init():void{
        this.$shadow = new Laya.Image();
        this.$shadow.anchorX = 0.5;
        this.$shadow.anchorY = 0.477;
        this.addChild(this.$shadow);

        this.$image = new Laya.Image();
        this.$image.anchorX = 0.5;
        this.$image.anchorY = 0.46;
        this.addChild(this.$image);
    }

    /**设定皮肤 */
    public setSkin(id:any, speed:number):void{
        //if(this._id != id){
            var info:RoleVo = DBGame.getRole(id)
            trace("roleInfo::::::::::::::::::", info)
            this._roleData = info;
            if(info){
                this.$image.skin = "res/ic_role/"+info.img+".png";
                this._needAni = info.rotate > 0;
                if(speed <= 0.3){
                    this._roleData.rendFrame = 10;
                }else if(speed < 0.5){
                    this._roleData.rendFrame = 8;
                }else{
                    this._roleData.rendFrame = 6;
                }

                this.shadow(info.child, this.$image.skin)
                this._maxNode = info.rendFrame*(this._shadows.length+2) - 3;
            }
        //}
        this._needAni && this.play();
    }
    
    public reset():void{
        for(let i=0; i<this._shadows.length; i++){
            this._shadows[i].visible = false;   
        }
        this._posArr.length = 0;
    }

    public play():void{
        this.frameLoop(2, this, this.onPlay)
    }

    public stop():void{
        this.clearTimer(this, this.onPlay)
    }

    private onPlay():void{
        this.$image.rotation += Role.ROTATE;
    }

    public flash():void{
        Laya.timer.frameLoop(3, this, this.doFlash)
    }

    public removeFlash():void{
        this.alpha = 1;
        Laya.timer.clear(this, this.doFlash);
    }

    private doFlash():void{
        if(this.alpha == 1){
            this.alpha = 0.5;
        }else{
            this.alpha = 1;
        }
    }

    public update():void{
        if(this._shadows.length == 0){
            return;
        }

        this._posArr.push({x:Math.floor(this.x),y:Math.floor(this.y)});
        while(this._posArr.length > this._maxNode){
            this._posArr.shift();
        }

        var index:number;
        var shadow:Laya.Image;
        for(let i=this._roleData.rendFrame; i<this._posArr.length; i++){
            if(this._posArr[i]){
                if((i-1) % this._roleData.rendFrame == 0){
                    index = (i-1)/this._roleData.rendFrame-1;
                    shadow = this._shadows[index];
                    if(shadow){
                        shadow.visible = true;
                        shadow.pos(this._posArr[i].x, this._posArr[i].y)
                        if(!shadow.parent){
                            this.parent.addChildAt(shadow, this.parent.getChildIndex(this));
                        }
                    }
                }
            }
        }
        for(let i=index; i<this._shadows.length-1; i++){
            this._shadows[i].visible = false;   
        }
    }

    /**影子效果 */
    public shadow(showNum:number, skin:string):void{
        for(let i=0;i<this._shadows.length; i++){
            this._shadows[i].removeSelf();
        }
        this._shadows.length = 0;
        this._renderIndex = 0;
        this._posArr.length = 0;
        let img:Laya.Image;
        for(let i=0;i<showNum; i++){
            img = new Laya.Image(skin);
            img.anchorX = img.anchorY = 0.5;
            img.scale(0.5, 0.5);
            this._shadows.push(img);
        }
    }
}