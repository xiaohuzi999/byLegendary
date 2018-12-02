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
var ShopView = /** @class */ (function (_super) {
    __extends(ShopView, _super);
    function ShopView() {
        return _super.call(this) || this;
    }
    ShopView.prototype.show = function () {
        _super.prototype.show.call(this);
        this.ui.itemList.array = DBShop.getShopList();
        User.getInstance().gold += 10000;
        User.getInstance().diamond += 1000;
        User.getInstance().dispatchEvent();
    };
    ShopView.prototype.createUI = function () {
        this.ui = new ui.shop.ShopUI();
        this.addChild(this.ui);
        this.ui.itemList.vScrollBarSkin = "";
    };
    ShopView.prototype.onClick = function (e) {
        switch (e.target) {
            case this.ui.btnClose:
                this.close();
                break;
        }
    };
    ShopView.prototype.onItemClick = function (e, index) {
        if (e.type == Laya.Event.CLICK) {
            var vo = this.ui.itemList.getItem(index);
            if (vo.priceType == 1) {
                if (User.getInstance().gold < vo.price) {
                    XTip.showTip("金币不足~");
                }
                else {
                    User.getInstance().gold -= vo.price;
                    User.getInstance().save();
                    //todo加入道具
                }
            }
            else {
                if (User.getInstance().diamond < vo.price) {
                    XTip.showTip("钻石不足~");
                }
                else {
                    User.getInstance().diamond -= vo.price;
                    User.getInstance().save();
                    //todo加入道具
                }
            }
        }
    };
    ShopView.prototype.initEvent = function () {
        this.ui.on(Laya.Event.CLICK, this, this.onClick);
        this.ui.itemList.mouseHandler = Laya.Handler.create(this, this.onItemClick, null, false);
    };
    ShopView.prototype.removeEvent = function () {
        this.ui.off(Laya.Event.CLICK, this, this.onClick);
        this.ui.itemList.mouseHandler.recover();
        this.ui.itemList.mouseHandler = null;
    };
    return ShopView;
}(xframe.XMWindow));
//# sourceMappingURL=ShopView.js.map