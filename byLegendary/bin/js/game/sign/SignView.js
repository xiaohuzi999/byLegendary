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
        //同步
        var now = Laya.Browser.now();
        if (now - User.getInstance().sign.end > 0) {
            var date = new Date();
            var delDay = 6 - date.getDay();
            var tDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
            var delTime = tDate.getTime() - date.getTime();
            delTime += 3600 * 1000 * 24 * delDay;
            User.getInstance().sign.end = now + delTime;
            trace(User.getInstance().sign.end);
            User.getInstance().sign.info.length = 0;
        }
        this.update();
    };
    SignView.prototype.update = function () {
        for (var i = 0; i < this.ItemNum; i++) {
            this.ui["item" + i].dataSource = DBSign.getSignVo(i);
            this.ui["item" + i].update(User.getInstance().sign.info[i], (new Date()).getDay());
        }
    };
    SignView.prototype.onClick = function (e) {
        switch (e.target) {
            case this.ui.btnClose:
                this.close();
                break;
            case this.ui.btnSign:
                this.sign();
                break;
            case this.ui.btnDouble:
                break;
        }
    };
    SignView.prototype.sign = function () {
        trace("sign----------------");
        var date = new Date();
        var day = date.getDay();
        if (User.getInstance().sign.info[day]) {
            XTip.showTip("done~~~~~~~~~~");
        }
        else {
            var vo = DBSign.getSignVo(day);
            trace("sign----------------", vo);
            var item = vo.reward;
            Bag.getInstance().addItem(item[0], item[1]);
            //存数据
            User.getInstance().sign.info[day] = 1;
            User.getInstance().save();
            this.update();
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