class MusicRank extends xframe.XWindow {
    ui = new ui.pages.MusicRankUI();
    onCreate() {
        this.ui.groupbtn.on(Laya.Event.CLICK, null, () => {

        });
        this.ui.backbtn.on(Laya.Event.CLICK, null, () => {
            this.back();
        });
        this.ui.musicname.text = this.params.music.name;
        this.ui.musicauth.text = this.params.music.author;

        this.ui.musiclist.array = this.params.list;
        this.ui.musiclist.vScrollBarSkin = null;
        this.ui.musiclist.itemRender = ui.views.MusicRankRenderUI;
        this.ui.musiclist.renderHandler = Laya.Handler.create(this, (item, index) => {
            this.renderItem(item, index);
        }, null, false);

        if(this.params && this.params.myData) {
            this.ui.myrank.text = this.params.myData.rank + "";
            this.ui.myscore.text = this.params.myData.score + "分";
        } else {
            this.ui.myrank.text = "---";
            this.ui.myscore.text = "---";
        }
        this.ui.myavatar.skin = User.instace.userInfo.avatarUrl;
        this.ui.mynick.text = User.instace.userInfo.nickName;
       
    }

    renderItem(item, index) {
        var  data = this.ui.musiclist.array[index];
        item.avatarImg.skin = data.avatar;
        item.nickLabel.text = data.nickname;
        item.scoreLabel.text = data.score + "分";
        if(data.rank == 1) {
            item.rankImg.skin = "res/role/ic_1.png";
            item.rankLabel.text = "";
        } else if(data.rank == 2) {
            item.rankLabel.text =  "";
            item.rankImg.skin = "res/role/ic_2.png";
        } else if(data.rank == 3) {
            item.rankImg.skin = "res/role/ic_3.png";
            item.rankLabel.text = "";
        } else {
            item.rankImg.skin = "";
            item.rankLabel.text = data.rank + "";
        }
    }

    onResume() {

    }
}