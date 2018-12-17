class MusicFriendRank extends xframe.XMWindow {

    ui = new ui.pages.MusicRankPageUI();
    private musicName: string;
    private author: string;
    private musicId: string;

    onCreate() {
        this.ui.backBtn.on(Laya.Event.CLICK, null, () => {
            this.back();
        });

        var _self = this;
        this.ui.groupBtn.on(Laya.Event.CLICK, null, () => {
            yxmp.report.event('2000_2005_click');
            wx.shareAppMessage(Object.assign(yxmp.asset.getShareMessage("2000_2005_click", "1002"), {
                query: "action=musicRank&id=" + this.musicId + "&author=" + this.author + "&musicName=" + this.musicName,
                success: (res) => {
                    if (res && res.shareTickets) {
                        if (res.shareTickets.length > 0) {
                            _self.showRankView(res.shareTickets[0]);
                        }
                    }
                }
            }))
        });

        if (this.params.query) {
            this.musicName = this.params.query.musicName;
            this.author = this.params.query.author;
            this.musicId = this.params.query.id;
        } else {
            this.musicName = this.params.name;
            this.author = this.params.author;
            this.musicId = this.params.id;
        }
        this.ui.musicAuthor.text = this.author;
        this.ui.musicName.text = this.musicName;
        this.ui.rankBox.addChild(RankPop.createSharedCanvasView());

        this.ui.groupBtn.visible = (this.params || {}).shareTicket ? false : true;
        var key = "music_" + this.musicId;
        var sortKey = "data." + key + ".wxgame.score";
        Tape.MiniRank.showRank(ui.rank.MusicRankOpenUI.uiView, {
            shareTicket: (this.params || {}).shareTicket,
            keyList: [key],
            sortList: [sortKey],
            whereList: ['score'],
            mapList: [{ from: sortKey, key: "score" }]
        }, false);
    }

    onDestroy() {
        this.showSelfRank();
    }

    /** 分享到群后，展示群排行榜 */
    showRankView(shareTicket) {
        this.ui.groupBtn.visible = false;
        var key = "music_" + this.musicId;
        var sortKey = "data." + key + ".wxgame.score";
        Tape.MiniRank.showRank(ui.rank.MusicRankOpenUI.uiView, {
            shareTicket: shareTicket,
            keyList: [key],
            sortList: [sortKey],
            whereList: ['score'],
            mapList: [{ from: sortKey, key: "score" }]
        }, false);
    }

    /** 再次展示结果页面的 */
    showSelfRank() {
        if (!this.params.query) {
            var key = "music_" + this.musicId;
            var sortKey = "data." + key + ".wxgame.score";
            Tape.MiniRank.showRank(ui.rank.ResultOpenUI.uiView, {
                shareTicket: "",
                keyList: [key],
                sortList: [sortKey],
                whereList: ['score'],
                mapList: [{ from: sortKey, key: "score" }]
            }, false);
        }
    }
}