var Label = Laya.Label;
var Handler = Laya.Handler;
var Loader = Laya.Loader;
var WebGL = Laya.WebGL;
var XFacade = xframe.XFacade;
var XTip = xframe.XTip;
var XAlert = xframe.XAlert;
//初始化微信小游戏
Laya.MiniAdpter.init();
//程序入口
Laya.init(750, 1334, WebGL);
Laya.stage.scaleMode = "showall";
Laya.MiniAdpter["getUrlEncode"] = function (url, type) {
    if (url.indexOf(".fnt") != -1)
        return "utf8";
    else if (type == "arraybuffer")
        return "";
    return "utf8";
};
/**
 * 1,wx.login()
 * 2,to Srv，登陆/创建角色/获取信息
 * 3,返回用户信息；
 */
//激活资源版本控制
Laya.ResourceVersion.enable("version.json", Handler.create(null, beginLoad), Laya.ResourceVersion.FILENAME_VERSION);
function beginLoad() {
    Laya.loader.load("res/atlas/comp.atlas", Handler.create(null, onLoaded));
}
function onLoaded() {
    xframe.XFacade.instance.init(new App());
}
//# sourceMappingURL=Main.js.map