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
var SignInView = /** @class */ (function (_super) {
    __extends(SignInView, _super);
    function SignInView() {
        var _this = _super.call(this) || this;
        _this.ui = new ui.plugins.SignInUI();
        _this.bgAlpha = 0.3;
        _this.closeOnBlank = true;
        return _this;
    }
    SignInView.prototype.onClick = function (e) {
        switch (e.target) {
            case this.ui.btnClose:
                this.close();
                break;
            case this.ui.btnReceice:
                if (User.instace.canSign) {
                    var date = new Date();
                    var day = date.getDay();
                    User.instace.sign.info.push(day);
                    var vo = DBSign.getSignVo(User.instace.sign.info.length);
                    trace("vo----------------------", vo);
                    var str = "获得";
                    for (var i = 0; i < vo.reward.length; i++) {
                        var info = vo.reward[i];
                        Bag.getInstance().addItem(info[0], info[1]);
                        var itemVo = DBItem.getItemVo(info[0]);
                        if (i > 0) {
                            str += "、";
                        }
                        str += itemVo.name + "x" + info[1];
                    }
                    XTip.showTip(str);
                    //User.instace.save();
                    User.instace.dispatchEvent();
                    this.update();
                    this.ui.btnReceice.visible = User.instace.canSign;
                }
                break;
        }
    };
    SignInView.prototype.show = function () {
        var ags = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            ags[_i] = arguments[_i];
        }
        _super.prototype.show.call(this);
        xframe.AniUtil.flowIn(this);
        for (var i = 0; i < 7; i++) {
            this.ui["sign" + (i + 1)].dataSource = DBSign.getSignVo(i + 1);
        }
        this.update();
        this.ui.btnReceice.visible = User.instace.canSign;
    };
    SignInView.prototype.close = function () {
        xframe.AniUtil.flowOut(this, Laya.Handler.create(this, _super.prototype.close));
    };
    SignInView.prototype.update = function () {
        var len = User.instace.sign.info.length;
        for (var i = 0; i < 7; i++) {
            if (i < len) {
                this.ui["sign" + (i + 1)].update(1);
            }
            else {
                this.ui["sign" + (i + 1)].update(0);
            }
        }
    };
    SignInView.prototype.initEvent = function () {
        _super.prototype.initEvent.call(this);
        this.ui.btnClose.on(Laya.Event.CLICK, this, this.onClick);
        this.ui.btnReceice.on(Laya.Event.CLICK, this, this.onClick);
    };
    SignInView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this.ui.btnClose.off(Laya.Event.CLICK, this, this.onClick);
        this.ui.btnClose.off(Laya.Event.CLICK, this, this.onClick);
    };
    return SignInView;
}(xframe.XMWindow));
