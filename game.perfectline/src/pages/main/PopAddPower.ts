/*
* name;
*/
class PopAddPower extends xframe.XMWindow {

    ui = new ui.views.home.AddPowerUI();
    //
    private _flag:number = 1;
    private readonly NeedGold:number = 188;
    constructor() {
        super();
        this.ui.btnClose.on(Laya.Event.CLICK, null, () => {
            this.close()
        });
        
        this.ui.btnWatch.on(Laya.Event.CLICK, null, () => {
            //watch
            if(this._flag == 1){
                if(User.instace.gold >= this.NeedGold){
                    User.instace.gold -= this.NeedGold;
                    User.instace.power ++;
                    User.instace.save();
                    User.instace.dispatchEvent();
                    this.close();
                    XTip.showTip("购买成功，体力+1");
                }else{
                    XTip.showTip("您的金币不足了哟~");
                }
            }else{

            }
        });
    }

    

    public show(...args):void{
        super.show();
    }

    protected createUI():void{
        super.createUI();
        this.ui.btnWatch.label = "购买";
        this.ui.tfTip.text = "消费"+this.NeedGold+"金币购买"
        //需要做标志判定
    }
}