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
var BagView = /** @class */ (function (_super) {
    __extends(BagView, _super);
    function BagView() {
        var _this = _super.call(this) || this;
        _this.ui = new ui.bag.BagUI();
        return _this;
    }
    BagView.prototype.show = function () {
        _super.prototype.show.call(this);
        this.ui.itemList.array = Bag.getInstance().items;
    };
    BagView.prototype.onClick = function (e) {
        switch (e.target) {
            case this.ui.btnClose:
                this.close();
                break;
        }
    };
    BagView.prototype.createUI = function () {
        _super.prototype.createUI.call(this);
        this.ui.itemList.vScrollBarSkin = "";
    };
    BagView.prototype.initEvent = function () {
        _super.prototype.initEvent.call(this);
        this.ui.on(Laya.Event.CLICK, this, this.onClick);
    };
    BagView.prototype.removeEvent = function () {
        this.ui.off(Laya.Event.CLICK, this, this.onClick);
    };
    return BagView;
}(xframe.XMWindow));
//# sourceMappingURL=BagView.js.map