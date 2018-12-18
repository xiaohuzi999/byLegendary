const usedRoleKey = "nowUseRole";
    
class RoleList extends xframe.XMWindow {
    ui = new ui.views.RoleViewUI();
    constructor () {
        super();
        this.bgAlpha = 0.8;
        this.init();
    }

    init() {
        this.ui.closebtn.on(Laya.Event.CLICK, null, () => {
            this.close();
        });
        this.ui.rolelist.renderHandler = Laya.Handler.create(this, (item, index) => {
            this.renderItem(item, index);
        }, null ,false);
        this.ui.rolelist.vScrollBarSkin = null;
        this.ui.rolelist.scrollBar.elasticBackTime = 200;
        this.ui.rolelist.scrollBar.elasticDistance = 200;
        this.ui.rolelist.array = GameDataManager.instance.roleLIst; 

        Laya.stage.on(refreshRoleList, this, () => {
            this.ui.rolelist.array = GameDataManager.instance.roleLIst; 
        });
    }

    renderItem(item, index) {
        var data = GameDataManager.instance.roleLIst[index];
        var cell = item as ui.views.RoleItemRenderUI;
        cell.useBtn.offAll(Laya.Event.CLICK);
        if(data.id == Laya.LocalStorage.getItem(usedRoleKey)) {
            cell.useBtn.skin = "res/role/ic_used.png";
        } else if(User.instace.checkIsOwnRoleById(data.id)) {
            cell.useBtn.skin = "res/role/btn_use.png";
            cell.useBtn.on(Laya.Event.CLICK, null, () => {
                this.userRole(data);
            });
        } else if(data.type == 1) {
            cell.useBtn.skin = "res/role/btn_use.png";
            cell.useBtn.on(Laya.Event.CLICK, null, () => {
                this.userRole(data);
            });
        } else {
            cell.useBtn.skin = "res/role/btn_release.png";
            cell.useBtn.on(Laya.Event.CLICK, null, () => {
                this.releaseRole(data, index);
            });
        }
        
        var tip = "";
        if(data.type == 1) {
            tip = "免费使用";
        } else if(data.type == 2) {
            tip = "花费" + data.cost + "个金币解锁";
        } else if(data.type == 3) {
            tip = "连续签到七天可解锁";
        }
        cell.roleimg.skin = "res/ic_role/" + data.img + ".png";
        cell.rolename.text = data.name
        cell.tip.text = tip;
        
    }

    // 解锁角色
    releaseRole(data, index) {
        if(data.type == 2) { //购买
            if(User.instace.gold >= data.cost) {
                wx.showModal({
                    title: '提示',
                    content: '获取当前角色需要消耗' + data.cost + "金币",
                    showCancel: true,
                    cancelText: '取消',
                    confirmText: '确定',
                    success: (res) => {
                        if (res.confirm) {
                            this.getRole(data);
                        }
                        if (res.cancel) {
                        
                        }
                    }
                });
            } else {
                wx.showToast({
                    icon: 'none',
                    title: '金币不够'
                });
            }
         } else if(data.type == 3) { // 签到
            Tape.PopManager.showPop(SignInView);
        } 
    }

    getRole(data) {
        wx.showToast({
            icon: 'none',
            title: '解锁成功'
        });
        // 记录金币
        User.instace.gold -= data.cost;
        GameDataManager.instance.recordUserGameData();
        // 记录角色
        GameDataManager.instance.recordUserRolesData(data)

        // 更改按钮状态
        this.ui.rolelist.refresh();
    }

    userRole(data) {
         Laya.LocalStorage.setItem(usedRoleKey, data.id);
         this.ui.rolelist.refresh()
    }

    onShow() {

    }

}