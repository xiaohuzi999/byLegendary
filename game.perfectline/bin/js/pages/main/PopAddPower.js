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
var PopAddPower = /** @class */ (function (_super) {
    __extends(PopAddPower, _super);
    function PopAddPower() {
        var _this = _super.call(this) || this;
        _this.ui = new ui.views.home.AddPowerUI();
        //
        _this._flag = 1;
        _this.NeedGold = 188;
        _this.ui.btnClose.on(Laya.Event.CLICK, null, function () {
            _this.close();
        });
        _this.ui.btnWatch.on(Laya.Event.CLICK, null, function () {
            //watch
            if (_this._flag == 1) {
                if (User.instace.gold >= _this.NeedGold) {
                    User.instace.gold -= _this.NeedGold;
                    User.instace.power++;
                    User.instace.save();
                    User.instace.dispatchEvent();
                    _this.close();
                    XTip.showTip("购买成功，体力+1");
                }
                else {
                    XTip.showTip("您的金币不足了哟~");
                }
            }
            else {
            }
        });
        return _this;
    }
    PopAddPower.prototype.show = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        _super.prototype.show.call(this);
    };
    PopAddPower.prototype.createUI = function () {
        _super.prototype.createUI.call(this);
        this.ui.btnWatch.label = "购买";
        this.ui.tfTip.text = "消费" + this.NeedGold + "金币购买";
        //需要做标志判定
    };
    return PopAddPower;
}(xframe.XMWindow));
