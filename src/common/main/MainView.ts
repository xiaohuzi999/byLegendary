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
    }

    private onPlayerClick(e:Laya.Event):void{
        if(User.getInstance().role.lv == 1){
            this._index++;
            if(this._index > 3){
                this._index = 0;
                User.getInstance().role.lv ++;
                this.ui.player.update();
            }
        }else{
            //
        }
    }

    protected initEvent():void{
        this.ui.player.on(Laya.Event.CLICK, this, this.onPlayerClick);
    }

    protected removeEvent():void{
        this.ui.player.off(Laya.Event.CLICK, this, this.onPlayerClick);
    }

    protected createUI():void{
        this.ui = new ui.main.MainUI();
        this.addChild(this.ui);
    }
}