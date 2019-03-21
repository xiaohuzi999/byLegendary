
class SignInView extends xframe.XMWindow {

    ui = new ui.plugins.SignInUI();

    constructor() {
        super();
        this.bgAlpha = 0.3;
        this.closeOnBlank = true;
    }

    private onClick(e:Laya.Event):void{
        switch(e.target){
            case this.ui.btnClose:
                this.close();
            break;
            case this.ui.btnReceice:
                if(User.instace.canSign){
                    let date:Date = new Date();
                    let day:number = date.getDay();
                    User.instace.sign.info.push(day);

                    let vo:SignVo = DBSign.getSignVo(User.instace.sign.info.length);
                    trace("vo----------------------", vo)
                    let str:string = "获得";
                    for(let i=0; i<vo.reward.length; i++){
                        let info:number[] = vo.reward[i];
                        Bag.getInstance().addItem(info[0], info[1]);
                        let itemVo:ItemVo = DBItem.getItemVo(info[0]);
                        if(i > 0){
                            str += "、"   
                        }
                        str += itemVo.name + "x"+info[1];
                    }
                    XTip.showTip(str);
                    //User.instace.save();
                    User.instace.dispatchEvent();
                    this.update();
                    this.ui.btnReceice.visible = User.instace.canSign;
                }
                
            break;
        }
    }

    public show(...ags):void{
        super.show();
        xframe.AniUtil.flowIn(this);
        
        for(let i=0; i<7; i++){
            this.ui["sign"+(i+1)].dataSource = DBSign.getSignVo(i+1);
        }
        this.update();
        this.ui.btnReceice.visible = User.instace.canSign
    }

    public close():void{
        xframe.AniUtil.flowOut(this, Laya.Handler.create(this, super.close));
    }

    private update():void{
        let len:number = User.instace.sign.info.length;
        for(let i=0; i<7; i++){
            if(i<len){
                this.ui["sign"+(i+1)].update(1)
            }else{
                this.ui["sign"+(i+1)].update(0);
            }
        }
    }

    protected initEvent():void{
        super.initEvent();
        this.ui.btnClose.on(Laya.Event.CLICK, this, this.onClick);
        this.ui.btnReceice.on(Laya.Event.CLICK, this, this.onClick);
    }

    protected removeEvent():void{
        super.removeEvent();
        this.ui.btnClose.off(Laya.Event.CLICK, this, this.onClick);
        this.ui.btnClose.off(Laya.Event.CLICK, this, this.onClick);
    }
}