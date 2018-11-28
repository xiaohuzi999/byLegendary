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
//激活资源版本控制
Laya.ResourceVersion.enable("version.json", Handler.create(null, beginLoad), Laya.ResourceVersion.FILENAME_VERSION);
function beginLoad() {
    Laya.loader.load("res/atlas/comp.atlas", Handler.create(null, onLoaded));
}
function onLoaded() {
    xframe.XFacade.instance.init(new App());
}
//# sourceMappingURL=Main.js.map