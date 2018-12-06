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
/*
* name;
*/
var TraineeGiftView = /** @class */ (function (_super) {
    __extends(TraineeGiftView, _super);
    function TraineeGiftView() {
        var _this = _super.call(this) || this;
        _this.ui = new ui.gift.GiftUI();
        return _this;
    }
    TraineeGiftView.prototype.show = function () {
        _super.prototype.show.call(this);
        this.format();
    };
    TraineeGiftView.prototype.format = function () {
        this.ui.item_0.dataSource = DBTraineeGift.getTraineeGiftVo(0);
        this.ui.item_1.dataSource = DBTraineeGift.getTraineeGiftVo(1);
        this.ui.item_2.dataSource = DBTraineeGift.getTraineeGiftVo(2);
        for (var i = User.getInstance().traineeGift.length - 1; i > -1; i--) {
            this.ui["item_" + i].updateState(User.getInstance().traineeGift[i]);
        }
    };
    TraineeGiftView.prototype.onClick = function (e) {
        switch (e.target) {
            case this.ui.btnClose:
                this.close();
                break;
            case this.ui.item_0:
                this.getGift(this.ui.item_0.dataSource);
                break;
            case this.ui.item_1:
                this.getGift(this.ui.item_1.dataSource);
                break;
            case this.ui.item_2:
                this.getGift(this.ui.item_2.dataSource);
                break;
        }
    };
    TraineeGiftView.prototype.getGift = function (data) {
        trace("getGift-------------------", User.getInstance().traineeGift);
        var id = data.id;
        var canGet = !User.getInstance().traineeGift[id];
        if (canGet && id > 0) {
            canGet = User.getInstance().traineeGift[id - 1] > 0;
        }
        trace(canGet, "xxxxxxxxxxxxxxxxxx");
        if (canGet) {
            //发东西
            var items = data.reward;
            for (var i = 0; i < items.length; i++) {
                var tmp = items[i];
                Bag.getInstance().addItem(tmp[0], tmp[1]);
            }
            //存数据
            User.getInstance().traineeGift[id] = 1;
            User.getInstance().save();
            this.format();
        }
    };
    TraineeGiftView.prototype.initEvent = function () {
        _super.prototype.initEvent.call(this);
        this.ui.on(Laya.Event.CLICK, this, this.onClick);
    };
    TraineeGiftView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this.ui.off(Laya.Event.CLICK, this, this.onClick);
    };
    return TraineeGiftView;
}(xframe.XMWindow));
//# sourceMappingURL=TraineeGiftView.js.map