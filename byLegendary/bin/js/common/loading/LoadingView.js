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
var LoadingView = /** @class */ (function (_super) {
    __extends(LoadingView, _super);
    function LoadingView() {
        return _super.call(this) || this;
    }
    //step 1
    LoadingView.prototype.show = function () {
        XDB.delLocalData();
        _super.prototype.show.call(this);
        //加载本地资源
        //let urlList:any[] = []
        var urlList = [
            "res/atlas/share.atlas",
            "res/atlas/item.atlas",
            "res/atlas/icon.atlas",
            "res/atlas/pet.atlas",
            "res/cfg/task.json",
            "res/cfg/shop.json",
            "res/cfg/sign.json",
            "res/cfg/item.json",
            "res/cfg/hero.json",
            "res/cfg/npc.json",
            "res/cfg/skill.json"
        ];
        if (urlList.length) {
            Laya.loader.load(urlList, Handler.create(this, this.fetchSrvData));
        }
        else {
            this.fetchSrvData();
        }
    };
    //step 2.获取远程存储数据
    LoadingView.prototype.fetchSrvData = function () {
        var fun = this.onFetchSrvData;
        var $this = this;
        wx.login({
            success: function (res) {
                if (res.code) {
                    xframe.HttpCmd.callServer(Handler.create($this, fun), "srv", "login", { code: res.code });
                }
                else {
                    console.log('登录失败！' + res.errMsg);
                }
            }
        });
        //XDB.fetchSrvData(Laya.Handler.create(this, this.onFetchSrvData))
    };
    //step 3.已获取服务端数据
    LoadingView.prototype.onFetchSrvData = function (data) {
        //角色初始化；
        User.getInstance().init();
        //道具初始化；
        Bag.getInstance().init();
        User.getInstance().save();
        Bag.getInstance().save();
        User.getInstance().openid = data.data.openid;
        XDB.push2Srv();
        return;
        XEvent.instance.event(LoadingView.RDY);
        this.close();
    };
    LoadingView.prototype.createUI = function () {
        this.ui = new ui.loading.LoadingUI();
        this.addChild(this.ui);
    };
    /** */
    LoadingView.RDY = "rdy";
    return LoadingView;
}(xframe.XWindow));
//# sourceMappingURL=LoadingView.js.map