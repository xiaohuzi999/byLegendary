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
var usedRoleKey = "nowUseRole";
var RoleList = /** @class */ (function (_super) {
    __extends(RoleList, _super);
    function RoleList() {
        var _this = _super.call(this) || this;
        _this.ui = new ui.views.RoleViewUI();
        _this.bgAlpha = 0.8;
        _this.init();
        return _this;
    }
    RoleList.prototype.init = function () {
        var _this = this;
        this.ui.closebtn.on(Laya.Event.CLICK, null, function () {
            _this.close();
        });
        this.ui.rolelist.renderHandler = Laya.Handler.create(this, function (item, index) {
            _this.renderItem(item, index);
        }, null, false);
        this.ui.rolelist.vScrollBarSkin = null;
        this.ui.rolelist.scrollBar.elasticBackTime = 200;
        this.ui.rolelist.scrollBar.elasticDistance = 200;
        this.ui.rolelist.array = DBGame.roleInfo;
    };
    RoleList.prototype.renderItem = function (item, index) {
        var data = DBGame.roleInfo[index];
        var cell = item;
        cell.roleimg.skin = "res/ic_role/" + data.img + ".png";
        cell.rolename.text = data.name;
        cell.tip.text = data.name;
        if (User.instace.roleInfo[data.id] == 1) {
            cell.useBtn.label = "使用中";
        }
        else if (User.instace.roleInfo[data.id] == 0) {
            cell.useBtn.label = "使用";
        }
        else {
            cell.useBtn.label = "购买";
        }
    };
    return RoleList;
}(xframe.XMWindow));
