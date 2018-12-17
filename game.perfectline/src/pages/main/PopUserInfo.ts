/*
* name;
*/
class PopUserInfo extends xframe.XMWindow{
   ui = new ui.views.home.UserInfoUI();
    constructor(){
        super();
        this.createUI();
    }

    private createUI():void {
        this.ui.avatar.skin = User.instace.userInfo.avatarUrl;
        this.ui.nickLabel.text = User.instace.userInfo.nickName;
        this.ui.userId.text = "ID：" +  User.instace.userInfo.id;
        this.ui.heartLabel.text = User.instace.userInfo.power + '';
        this.ui.starLabel.text = User.instace.userInfo.star + '';;
        this.ui.musicLabel.text = User.instace.userInfo.coin + '';
        this.ui.btnClose.on(Laya.Event.CLICK, null, ()=>{
            this.finish();
        });
    }

    public static show():void{
        Tape.PopManager.showPop(PopUserInfo);
    }
}