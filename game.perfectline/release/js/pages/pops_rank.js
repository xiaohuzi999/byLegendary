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
var RankPop = /** @class */ (function (_super) {
    __extends(RankPop, _super);
    function RankPop() {
        var _this = _super.call(this) || this;
        _this.ui = new ui.pages.RankPageUI();
        _this.bgAlpha = 0.8;
        _this.isTranslucent = false;
        _this.ui.btnBack.on(Laya.Event.CLICK, null, function () {
            _this.finish();
        });
        var _self = _this;
        _this.ui.btnRankGroup.on(Laya.Event.CLICK, null, function () {
            yxmp.report.event('1000_1008_click');
            wx.shareAppMessage(Object.assign(yxmp.asset.getShareMessage('1000_1008_click', "1001"), {
                query: 'action=GroupRank',
                success: function (res) {
                    if (res && res.shareTickets) {
                        if (res.shareTickets.length > 0) {
                            _self.showRankView(res.shareTickets[0]);
                        }
                    }
                }
            }));
        });
        // this.ui.rankBox.addChild(Tape.MiniRank.createRankView(0,0,750,1334));
        _this.ui.rankBox.addChild(RankPop.createSharedCanvasView());
        return _this;
    }
    RankPop.show = function (force, options) {
        if (force === void 0) { force = false; }
        if (options === void 0) { options = null; }
        if (force) {
            Tape.PopManager.showPop(RankPop);
            return;
        }
        if (options && options.query && options.query.action == 'GroupRank') {
            Tape.PopManager.showPop(RankPop, options);
        }
    };
    RankPop.prototype.onShow = function () {
        this.ui.btnRankGroup.visible = (this.params || {}).shareTicket ? false : true;
        Tape.MiniRank.showRank(ui.rank.RankOpenUI.uiView, {
            shareTicket: (this.params || {}).shareTicket,
            keyList: ['star_score'],
            sortList: ['data.star_score.wxgame.score']
        }, false);
    };
    /** 分享到群 拿到shareticket 展示群排行 */
    RankPop.prototype.showRankView = function (shareTicket) {
        this.ui.btnRankGroup.visible = false;
        Tape.MiniRank.showRank(ui.rank.RankOpenUI.uiView, {
            shareTicket: shareTicket,
            keyList: ['star_score'],
            sortList: ['data.star_score.wxgame.score']
        }, false);
    };
    RankPop.createSharedCanvasView = function () {
        var sharedCanvasView = new Laya.Sprite();
        if (window.hasOwnProperty('sharedCanvas')) {
            var sharedCanvas = window['sharedCanvas'];
            sharedCanvas.width = Laya.stage.width;
            sharedCanvas.height = Laya.stage.height;
            if (!sharedCanvas.hasOwnProperty('_addReference')) {
                sharedCanvas['_addReference'] = function () {
                };
            }
            var rankTexture = new Laya.Texture(sharedCanvas);
            rankTexture.bitmap.alwaysChange = true;
            var rankSprite = new Laya.Sprite();
            rankSprite.width = Laya.stage.width;
            rankSprite.height = Laya.stage.height;
            rankSprite.graphics.drawTexture(rankTexture, 0, 0, rankTexture.width, rankTexture.height);
            sharedCanvasView.addChild(rankSprite);
        }
        return sharedCanvasView;
    };
    return RankPop;
}(xframe.XMWindow));
