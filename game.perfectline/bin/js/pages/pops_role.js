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
            _this.finish();
        });
        this.ui.rolelist.renderHandler = Laya.Handler.create(this, function (item, index) {
            _this.renderItem(item, index);
        }, null, false);
        this.ui.rolelist.vScrollBarSkin = null;
        this.ui.rolelist.scrollBar.elasticBackTime = 200;
        this.ui.rolelist.scrollBar.elasticDistance = 200;
        this.ui.rolelist.array = GameDataManager.instance.roleLIst;
        Laya.stage.on(refreshRoleList, this, function () {
            _this.ui.rolelist.array = GameDataManager.instance.roleLIst;
        });
    };
    RoleList.prototype.renderItem = function (item, index) {
        var _this = this;
        var data = GameDataManager.instance.roleLIst[index];
        var cell = item;
        cell.useBtn.offAll(Laya.Event.CLICK);
        if (data.id == Laya.LocalStorage.getItem(usedRoleKey)) {
            cell.useBtn.skin = "res/role/ic_used.png";
        }
        else if (User.instace.checkIsOwnRoleById(data.id)) {
            cell.useBtn.skin = "res/role/btn_use.png";
            cell.useBtn.on(Laya.Event.CLICK, null, function () {
                _this.userRole(data);
            });
        }
        else if (data.type == 1) {
            cell.useBtn.skin = "res/role/btn_use.png";
            cell.useBtn.on(Laya.Event.CLICK, null, function () {
                _this.userRole(data);
            });
        }
        else {
            cell.useBtn.skin = "res/role/btn_release.png";
            cell.useBtn.on(Laya.Event.CLICK, null, function () {
                _this.releaseRole(data, index);
            });
        }
        var tip = "";
        if (data.type == 1) {
            tip = "免费使用";
        }
        else if (data.type == 2) {
            tip = "花费" + data.cost + "个金币解锁";
        }
        else if (data.type == 3) {
            tip = "连续签到七天可解锁";
        }
        cell.roleimg.skin = "res/ic_role/" + data.img + ".png";
        cell.rolename.text = data.name;
        cell.tip.text = tip;
    };
    // 解锁角色
    RoleList.prototype.releaseRole = function (data, index) {
        var _this = this;
        if (data.type == 2) { //购买
            if (User.instace.userInfo.coin >= data.cost) {
                wx.showModal({
                    title: '提示',
                    content: '获取当前角色需要消耗' + data.cost + "金币",
                    showCancel: true,
                    cancelText: '取消',
                    confirmText: '确定',
                    success: function (res) {
                        if (res.confirm) {
                            _this.getRole(data);
                        }
                        if (res.cancel) {
                        }
                    }
                });
            }
            else {
                wx.showToast({
                    icon: 'none',
                    title: '金币不够'
                });
            }
        }
        else if (data.type == 3) { // 签到
            Tape.PopManager.showPop(SigninPop);
        }
    };
    RoleList.prototype.getRole = function (data) {
        wx.showToast({
            icon: 'none',
            title: '解锁成功'
        });
        // 记录金币
        User.instace.userInfo.coin -= data.cost;
        GameDataManager.instance.recordUserGameData();
        // 记录角色
        GameDataManager.instance.recordUserRolesData(data);
        // 更改按钮状态
        this.ui.rolelist.refresh();
        // 刷新主界面
        XEvent.instance.event(RoleList.UPDATE);
    };
    RoleList.prototype.userRole = function (data) {
        Laya.LocalStorage.setItem(usedRoleKey, data.id);
        this.ui.rolelist.refresh();
    };
    RoleList.prototype.onShow = function () {
    };
    /**事件-更新用户金币 */
    RoleList.UPDATE = "update";
    return RoleList;
}(xframe.XMWindow));
