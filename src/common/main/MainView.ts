/*
* name;
*/
class MainView extends xframe.XWindow{
    public ui:ui.main.MainUI;
    private _index:number = 0;
    constructor(){
        super();
    }

    public show():void{
        super.show();
        this.ui.player.dataSource = User.getInstance().role;
        this.updateInfo();
    }

    private onClick(e:Laya.Event):void{
        switch(e.target){
            case this.ui.player:
                this.onPlayerClick();
            break;
            case this.ui.btnAdd:
                XTip.showTip("coming soon~~~~")
            break;
            case this.ui.btnFight:
                XFacade.instance.showModule(LLKView);
            break;
            case this.ui.btnTask:
                XFacade.instance.showModule(TaskView);
            break;
        }
    }

    private onPlayerClick():void{
        if(User.getInstance().role.lv == 1){
            this._index++;
            if(this._index > 3){
                this._index = 0;
                User.getInstance().role.lv ++;
                this.ui.player.update();
                User.getInstance().save();
            }
        }else{
            //
        }
    }

    private updateInfo():void{
        this.ui.tfGold.text = User.getInstance().gold+"";
        this.ui.tfDiamond.text = User.getInstance().diamond+"";
    }

    protected initEvent():void{
        this.ui.on(Laya.Event.CLICK, this, this.onClick);
        XEvent.instance.on(User.UPDATE,  this, this.updateInfo)
    }

    protected removeEvent():void{
        this.ui.off(Laya.Event.CLICK, this, this.onClick);
        XEvent.instance.off(User.UPDATE,  this, this.updateInfo)
    }

    protected createUI():void{
        this.ui = new ui.main.MainUI();
        this.addChild(this.ui);
        this.ui.player.mouseEnabled = true;
    }
}