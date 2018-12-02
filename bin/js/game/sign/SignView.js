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
var SignView = /** @class */ (function (_super) {
    __extends(SignView, _super);
    function SignView() {
        var _this = _super.call(this) || this;
        _this.ItemNum = 7;
        return _this;
    }
    SignView.prototype.show = function () {
        _super.prototype.show.call(this);
        for (var i = 0; i < this.ItemNum; i++) {
            this.ui["item" + i].dataSource = DBSign.getSignVo(i);
        }
    };
    SignView.prototype.onClick = function (e) {
        switch (e.target) {
            case this.ui.btnClose:
                this.close();
                break;
        }
    };
    SignView.prototype.createUI = function () {
        this.ui = new ui.sign.SignUI();
        this.addChild(this.ui);
    };
    SignView.prototype.initEvent = function () {
        this.ui.on(Laya.Event.CLICK, this, this.onClick);
    };
    SignView.prototype.removeEvent = function () {
        this.ui.off(Laya.Event.CLICK, this, this.onClick);
    };
    return SignView;
}(xframe.XMWindow));
//# sourceMappingURL=SignView.js.map