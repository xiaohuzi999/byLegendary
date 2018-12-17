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
var PopGameRevive = /** @class */ (function (_super) {
    __extends(PopGameRevive, _super);
    function PopGameRevive() {
        var _this = _super.call(this) || this;
        _this.ui = new ui.views.GameReviveUI();
        _this.createUI();
        return _this;
    }
    PopGameRevive.prototype.onBtnClick = function (e) {
        switch (e.target) {
            case this.ui.btnConfirm:
                this.params.yes.run();
                this.close();
                break;
            case this.ui.btnBack:
                this.params.no.run();
                this.close();
                break;
        }
    };
    PopGameRevive.prototype.show = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        _super.prototype.show.call(this);
        this.params = args[0];
    };
    PopGameRevive.prototype.initEvet = function () {
        _super.prototype.initEvent.call(this);
        this.ui.btnConfirm.on(Laya.Event.CLICK, this, this.onBtnClick);
        this.ui.btnConfirm.on(Laya.Event.CLICK, this, this.onBtnClick);
    };
    PopGameRevive.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this.ui.btnConfirm.off(Laya.Event.CLICK, this, this.onBtnClick);
        this.ui.btnConfirm.off(Laya.Event.CLICK, this, this.onBtnClick);
    };
    return PopGameRevive;
}(xframe.XMWindow));
