class RoleView extends xframe.XMWindow {
    ui = new ui.views.RoleViewUI();
    constructor () {
        super();
        this.bgAlpha = 0.2;
        this.ui.rolelist.vScrollBarSkin = null;
        this.ui.rolelist.scrollBar.elasticBackTime = 200;
        this.ui.rolelist.scrollBar.elasticDistance = 200;
        this.closeOnBlank = true;
    }

    public show():void{
        User.instace.diamond = 1000;
        super.show();
        this.ui.rolelist.array = DBGame.roleInfo; 
        xframe.AniUtil.flowIn(this);
    }

    public close():void{
        xframe.AniUtil.flowOut(this, Laya.Handler.create(this, super.close));
    }

    private update():void{
        trace("update");
        this.ui.rolelist.refresh();
    }

    protected initEvent():void{
        super.initEvent();
        this.ui.closebtn.on(Laya.Event.CLICK, this, this.close);
        XEvent.instance.on(User.UPDATE, this, this.update);

    }

    protected removeEvent():void{
        super.removeEvent();
        this.ui.closebtn.off(Laya.Event.CLICK, this, this.close);
        XEvent.instance.off(User.UPDATE, this, this.update);
    }
}