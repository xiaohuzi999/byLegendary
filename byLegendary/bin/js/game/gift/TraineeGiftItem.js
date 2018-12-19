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
var TraineeGiftItem = /** @class */ (function (_super) {
    __extends(TraineeGiftItem, _super);
    function TraineeGiftItem() {
        var _this = _super.call(this) || this;
        _this.flagGet.visible = false;
        _this.mouseEnabled = true;
        return _this;
    }
    TraineeGiftItem.prototype.updateState = function (state) {
        this.flagGet.visible = (state > 0);
    };
    Object.defineProperty(TraineeGiftItem.prototype, "dataSource", {
        get: function () {
            return this._vo;
        },
        set: function (vo) {
            this._vo = vo;
            trace("gogogo", vo);
            if (this._vo) {
                this.tfDay.text = this._vo.day + "";
                this.tfName.text = this._vo.name + "";
            }
        },
        enumerable: true,
        configurable: true
    });
    return TraineeGiftItem;
}(ui.gift.GiftItemUI));
//# sourceMappingURL=TraineeGiftItem.js.map