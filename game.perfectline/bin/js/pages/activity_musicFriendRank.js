var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MusicFriendRank = /** @class */ (function (_super) {
    __extends(MusicFriendRank, _super);
    function MusicFriendRank() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ui = new ui.pages.MusicRankPageUI();
        return _this;
    }
    MusicFriendRank.prototype.onCreate = function () {
        var _this = this;
        this.ui.backBtn.on(Laya.Event.CLICK, null, function () {
            _this.back();
        });
        var _self = this;
        this.ui.groupBtn.on(Laya.Event.CLICK, null, function () {
            yxmp.report.event('2000_2005_click');
            wx.shareAppMessage(Object.assign(yxmp.asset.getShareMessage("2000_2005_click", "1002"), {
                query: "action=musicRank&id=" + _this.musicId + "&author=" + _this.author + "&musicName=" + _this.musicName,
                success: function (res) {
                    if (res && res.shareTickets) {
                        if (res.shareTickets.length > 0) {
                            _self.showRankView(res.shareTickets[0]);
                        }
                    }
                }
            }));
        });
        if (this.params.query) {
            this.musicName = this.params.query.musicName;
            this.author = this.params.query.author;
            this.musicId = this.params.query.id;
        }
        else {
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
    };
    MusicFriendRank.prototype.onDestroy = function () {
        this.showSelfRank();
    };
    /** 分享到群后，展示群排行榜 */
    MusicFriendRank.prototype.showRankView = function (shareTicket) {
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
    };
    /** 再次展示结果页面的 */
    MusicFriendRank.prototype.showSelfRank = function () {
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
    };
    return MusicFriendRank;
}(xframe.XMWindow));
