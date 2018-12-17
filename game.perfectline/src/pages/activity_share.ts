class ShareEnter extends xframe.XWindow {
    ui = new ui.pages.ShareEnterUI();
    private  months: Array<string> = ["JANUARY", "FEBURARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
    onCreate() {
    
        this.ui.getBtn.on(Laya.Event.CLICK, null ,() => {
            this.back();
        });

        this.init()
    }

    init() {
        var lanunch = GameDataManager.instance.lanuchInfo;
        var cid = lanunch.cid;
        // var id = lanunch.id;
        var bgImg = lanunch.cover;
        var time = parseInt(lanunch.time);

        var positions = GameDataManager.instance.cardConfig[cid];
        this.ui.cardView.roleImg.skin = GameDataManager.instance.currentUserRoleImg();
        this.ui.cardView.roleImg.x = positions[0] * 50/75 - 4;
        this.ui.cardView.roleImg.y = positions[1] * 50/75 - 4;

        var date = new Date(time);
        this.ui.cardView.dateDay.text = date.getDate().toString();
        this.ui.cardView.dateMonth.text = this.months[date.getMonth()];
        this.ui.cardView.dateYear.text = date.getFullYear().toString();
       
        this.ui.avatar.skin = lanunch.avatar;
        this.ui.cardView.bgImg.skin = "https://s.xiuwu.me/perfectline/res/map/" + bgImg + ".png";
    }
}