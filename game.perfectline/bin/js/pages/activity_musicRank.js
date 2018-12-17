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
var MusicRank = /** @class */ (function (_super) {
    __extends(MusicRank, _super);
    function MusicRank() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ui = new ui.pages.MusicRankUI();
        return _this;
    }
    MusicRank.prototype.onCreate = function () {
        var _this = this;
        this.ui.groupbtn.on(Laya.Event.CLICK, null, function () {
        });
        this.ui.backbtn.on(Laya.Event.CLICK, null, function () {
            _this.back();
        });
        this.ui.musicname.text = this.params.music.name;
        this.ui.musicauth.text = this.params.music.author;
        this.ui.musiclist.array = this.params.list;
        this.ui.musiclist.vScrollBarSkin = null;
        this.ui.musiclist.itemRender = ui.views.MusicRankRenderUI;
        this.ui.musiclist.renderHandler = Laya.Handler.create(this, function (item, index) {
            _this.renderItem(item, index);
        }, null, false);
        if (this.params && this.params.myData) {
            this.ui.myrank.text = this.params.myData.rank + "";
            this.ui.myscore.text = this.params.myData.score + "分";
        }
        else {
            this.ui.myrank.text = "---";
            this.ui.myscore.text = "---";
        }
        this.ui.myavatar.skin = User.instace.userInfo.avatarUrl;
        this.ui.mynick.text = User.instace.userInfo.nickName;
    };
    MusicRank.prototype.renderItem = function (item, index) {
        var data = this.ui.musiclist.array[index];
        item.avatarImg.skin = data.avatar;
        item.nickLabel.text = data.nickname;
        item.scoreLabel.text = data.score + "分";
        if (data.rank == 1) {
            item.rankImg.skin = "res/role/ic_1.png";
            item.rankLabel.text = "";
        }
        else if (data.rank == 2) {
            item.rankLabel.text = "";
            item.rankImg.skin = "res/role/ic_2.png";
        }
        else if (data.rank == 3) {
            item.rankImg.skin = "res/role/ic_3.png";
            item.rankLabel.text = "";
        }
        else {
            item.rankImg.skin = "";
            item.rankLabel.text = data.rank + "";
        }
    };
    MusicRank.prototype.onResume = function () {
    };
    return MusicRank;
}(xframe.XWindow));
