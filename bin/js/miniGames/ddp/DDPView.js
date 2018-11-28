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
var DDPView = /** @class */ (function (_super) {
    __extends(DDPView, _super);
    function DDPView() {
        return _super.call(this) || this;
    }
    DDPView.prototype.onClick = function (e) {
        switch (e.target) {
            case this.ui.btnClose:
                this.close();
                break;
        }
    };
    DDPView.prototype.createUI = function () {
        this.ui = new ui.MiniDDP.DDPViewUI();
        this.addChild(this.ui);
        this.closeOnBlank = true;
    };
    DDPView.prototype.initEvent = function () {
        _super.prototype.initEvent.call(this);
        this.ui.on(Laya.Event.CLICK, this, this.onClick);
    };
    DDPView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this.ui.off(Laya.Event.CLICK, this, this.onClick);
    };
    return DDPView;
}(xframe.XMWindow));
//# sourceMappingURL=DDPView.js.map