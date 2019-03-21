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
var RoleItem = /** @class */ (function (_super) {
    __extends(RoleItem, _super);
    function RoleItem() {
        return _super.call(this) || this;
    }
    Object.defineProperty(RoleItem.prototype, "dataSource", {
        get: function () {
            return this._vo;
        },
        set: function (vo) {
            this.useBtn.offAll(Laya.Event.CLICK);
            this._vo = vo;
            if (vo) {
                this.roleimg.skin = "res/ic_role/" + vo.img + ".png";
                this.rolename.text = vo.name;
                this.tip.text = vo.name;
                if (User.instace.roleInfo[vo.id] == 1) {
                    this.useBtn.label = "使用中";
                    this.tip.text = "已获得";
                }
                else if (User.instace.roleInfo[vo.id] == 0) {
                    this.useBtn.label = "使用";
                    this.tip.text = "已获得";
                    this.useBtn.on(Laya.Event.CLICK, this, this.onUse);
                }
                else {
                    this.useBtn.label = "购买";
                    if (vo.cost[0] == 1) {
                        this.tip.text = "消费" + vo.cost[1] + "金币获得";
                    }
                    else {
                        this.tip.text = "消费" + vo.cost[1] + "钻石获得";
                    }
                    this.useBtn.on(Laya.Event.CLICK, this, this.onBuy);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    RoleItem.prototype.onBuy = function () {
        if (this._vo.cost[0] == 1) {
            if (User.instace.gold < this._vo.cost[1]) {
                XTip.showTip("金币不够了~");
            }
            else {
                User.instace.roleInfo[this._vo.id] = 0;
                User.instace.gold -= this._vo.cost[1];
                XTip.showTip("获得" + this._vo.name);
            }
            User.instace.save();
            User.instace.dispatchEvent();
        }
        else {
            if (User.instace.diamond < this._vo.cost[1]) {
                XTip.showTip("钻石不够了~");
            }
            else {
                User.instace.roleInfo[this._vo.id] = 0;
                User.instace.diamond -= this._vo.cost[1];
                XTip.showTip("获得" + this._vo.name);
            }
            User.instace.save();
            User.instace.dispatchEvent();
        }
    };
    RoleItem.prototype.onUse = function () {
        for (var i in User.instace.roleInfo) {
            if (i == this._vo.id + "") {
                User.instace.roleInfo[i] = 1;
            }
            else {
                User.instace.roleInfo[i] = 0;
            }
        }
        User.instace.dispatchEvent();
    };
    RoleItem.prototype.destroy = function () {
        this.useBtn.off(Laya.Event.CLICK, this, this.onBuy);
        this.useBtn.off(Laya.Event.CLICK, this, this.onUse);
        _super.prototype.destroy.call(this);
    };
    return RoleItem;
}(ui.views.RoleItemRenderUI));
