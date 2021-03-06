import XFacade = xframe.XFacade;
import XTip = xframe.XTip;
import XAlert = xframe.XAlert;
import Handler = Laya.Handler;
// 游戏入口
class Main {
    constructor() {
        //初始化微信小游戏
        Laya.MiniAdpter.init();
        //程序入口
        Laya.init(AppConfig.AppWidth, AppConfig.AppHeight, Laya.WebGL);

        //Laya.stage.scaleMode = "noscale";
        if(Laya.Browser.onPC){
            Laya.stage.scaleMode = "showall";
            Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        }else{
            Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
        }
        
        this.init();
    }

    init() {
        /*
        Laya.URL.version = {
            "res/cfg/appCfg.json":Math.random()
        }
        */
        //Laya.URL.basePath = "https://s.xiuwu.me/perfectline/2.0/";
        //加载本地资源
        let urlList:any[] = [
            { url: 'res/atlas/res/common.atlas', type: Laya.Loader.ATLAS },
            { url: 'res/atlas/res/main.atlas', type: Laya.Loader.ATLAS },
            { url: 'res/atlas/res/signin.atlas', type: Laya.Loader.ATLAS },
            { url: 'res/atlas/res/role.atlas', type: Laya.Loader.ATLAS },
            { url: 'res/atlas/res/game.atlas', type: Laya.Loader.ATLAS },
            { url: 'res/atlas/res/ic_role.atlas', type: Laya.Loader.ATLAS },
            { url: 'res/atlas/res/icon.atlas', type: Laya.Loader.ATLAS },
            { url: 'res/cfg/stage.json', type: Laya.Loader.JSON },
            { url: 'res/cfg/role.json', type: Laya.Loader.JSON },
            { url: 'res/cfg/item.json', type: Laya.Loader.JSON },
            { url: 'res/cfg/sign.json', type: Laya.Loader.JSON },
            { url: 'res/cfg/appCfg.json', type: Laya.Loader.JSON },
		]

        Laya.loader.load(urlList, Handler.create(null, ()=>{
            xframe.XFacade.instance.init(new App());
        }));
    }
}

Laya.MiniAdpter["getUrlEncode"] = function (url, type) {
    if (url.indexOf(".fnt") != -1)
        return "utf8";
    else if (type == "arraybuffer")
        return "";
    return "utf8";
}

Laya.MiniAdpter["nativefiles"] = 
[
    'res/main/bj_homepage.png',
    "res/atlas/res/common.atlas",
    "res/atlas/res/common.png",
    "res/atlas/res/main.atlas",
    "res/atlas/res/main.png",
    "res/atlas/res/signin.atlas",
    "res/atlas/res/signin.png",
    "res/atlas/comp.atlas",
    "res/atlas/comp.png",
    'res/atlas/res/role.atlas',
    'res/atlas/res/role.png',
    'res/atlas/res/game.atlas',
    'res/atlas/res/game.png',
    'res/atlas/res/ic_role.atlas',
    'res/atlas/res/ic_role.png',
    'res/cfg/role.json',
];

new Main();

