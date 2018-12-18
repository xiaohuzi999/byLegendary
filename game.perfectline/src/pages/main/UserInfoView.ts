/*
* name;
*/
class UserInfoView extends xframe.XMWindow{
   ui = new ui.views.home.UserInfoUI();
    constructor(){
        super();
        this.closeOnBlank = true;
    }

    public show():void{
        this.ui.avatar.skin = User.instace.avatar;
        this.ui.nickLabel.text = User.instace.nickname;
        this.ui.userId.text = "ID：" +  User.instace.id;
        this.ui.heartLabel.text = User.instace.power + '';
        this.ui.starLabel.text = User.instace.star + '';;
        this.ui.musicLabel.text = User.instace.gold + '';
        super.show();
        xframe.AniUtil.flowIn(this);
    }

    public close():void{
        xframe.AniUtil.flowOut(this, Handler.create(null, ()=>{super.close()}))
    }

    private onClick(e:Laya.Event):void{
        switch(e.target){
            case this.ui.btnClose:
                this.close();
            break;
        }
    }

    protected initEvent():void{
        super.initEvent();
        this.on(Laya.Event.CLICK, this, this.onClick);
    }

    protected removeEvent():void{
        super.removeEvent();
        this.off(Laya.Event.CLICK, this, this.onClick);
    }
}