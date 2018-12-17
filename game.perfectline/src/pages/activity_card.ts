class MusicCard extends xframe.XWindow {
    ui = new ui.pages.MusicCardUI();
    private  months: Array<string> = ["JANUARY", "FEBURARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
    onCreate() {
        this.ui.backBtn.on(Laya.Event.CLICK, null, () => {
           this.back();
        });

        this.ui.topImg.on(Laya.Event.CLICK, null, () => {
            
        });

        if(User.instace.cards.length > 0) {
            this.ui.tipsLabel.visible = false;
        } else {
            this.ui.tipsLabel.visible = true;
        }
        this.ui.cardList.array = User.instace.cards;
        this.ui.cardList.itemRender = ui.views.CardRenderItemUI;
        this.ui.cardList.vScrollBarSkin = null;
        this.ui.cardList.scrollBar.elasticBackTime = 200;
        this.ui.cardList.scrollBar.elasticDistance = 200;
        this.ui.cardList.renderHandler = Laya.Handler.create(this, (item, index) => {
            this.renderItem(item, index);
        }, null, false);
        this.ui.cardList.mouseHandler = Laya.Handler.create(this, (event, index) => {
            this.mouseItem(event, index);
        }, null, false);
    }

    renderItem(item, index) {
        var data = this.ui.cardList.array[index];
        var cell = item as ui.views.CardRenderItemUI;
        cell.cover.skin =  "https://s.xiuwu.me/perfectline/res/map/" + data.card + ".png";

        var time = data.timeTemp;
        var date = new Date(time);
        cell.dayLabel.text = date.getDate().toString();
        cell.yearLabel.text = date.getFullYear().toString();
        cell.mounthLabel.text = this.months[date.getMonth()];

        var positions = GameDataManager.instance.cardConfig[data.cid];
        if(positions.length > 0) {
            cell.roleImg.skin = GameDataManager.instance.currentUserRoleImg();
            cell.roleImg.x = positions[0] * 346/750 - 4;
            cell.roleImg.y = positions[1] * 346/750 - 4;
        }
    }

    mouseItem(event, index) {
        if(event && event.type == Laya.Event.CLICK) {
            var data = this.ui.cardList.array[index];  
            Tape.PopManager.showPop(BigCardView, data);
        }
    }

    onResume() {

    }

}