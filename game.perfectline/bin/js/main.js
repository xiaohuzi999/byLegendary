var XFacade = xframe.XFacade;
var XTip = xframe.XTip;
var XAlert = xframe.XAlert;
// 游戏入口
var Main = /** @class */ (function () {
    function Main() {
        //初始化微信小游戏
        Laya.MiniAdpter.init();
        //程序入口
        Laya.init(750, 1334, Laya.WebGL);
        Laya.stage.scaleMode = "noscale";
        //this.initSubpackage();
        this.init();
    }
    Main.prototype.init = function () {
        //加载本地资源
        var urlList = [
            { url: 'res/bg.png', type: Laya.Loader.IMAGE },
            { url: 'res/atlas/res/common.atlas', type: Laya.Loader.ATLAS },
            { url: 'res/atlas/res/rank.atlas', type: Laya.Loader.ATLAS },
            { url: 'res/atlas/res/main.atlas', type: Laya.Loader.ATLAS },
            { url: 'res/atlas/res/signin.atlas', type: Laya.Loader.ATLAS },
            { url: 'res/atlas/res/card.atlas', type: Laya.Loader.ATLAS },
            { url: 'res/atlas/res/role.atlas', type: Laya.Loader.ATLAS },
            { url: 'res/atlas/res/game.atlas', type: Laya.Loader.ATLAS },
            { url: 'res/atlas/res/ic_role.atlas', type: Laya.Loader.ATLAS },
            { url: 'res/cfg/stage.json', type: Laya.Loader.JSON },
        ];
        Laya.loader.load(urlList, Handler.create(null, function () {
            xframe.XFacade.instance.init(new App());
        }));
        /*
        Tape.Navigator.init({
            mainPage: LoadingActivity,
            commonRes: [
                { url: 'res/bg.png', type: Laya.Loader.IMAGE },
                { url: 'res/atlas/res/common.atlas', type: Laya.Loader.ATLAS },
                { url: 'res/atlas/res/rank.atlas', type: Laya.Loader.ATLAS },
                { url: 'res/atlas/res/main.atlas', type: Laya.Loader.ATLAS },
                { url: 'res/atlas/res/signin.atlas', type: Laya.Loader.ATLAS },
                //图片压缩过
                { url: 'res/atlas/res/card.atlas', type: Laya.Loader.ATLAS },
                { url: 'res/atlas/res/role.atlas', type: Laya.Loader.ATLAS },
                { url: 'res/atlas/res/game.atlas', type: Laya.Loader.ATLAS },
                { url: 'res/atlas/res/ic_role.atlas', type: Laya.Loader.ATLAS },
                { url: 'res/cfg/stage.json', type: Laya.Loader.JSON},
                // { url: 'res/common/ic_qrcode.jpg', type: Laya.Loader.IMAGE}
            ]
        });
        */
    };
    //初始化分包配置;
    Main.prototype.initSubpackage = function () {
        Laya.URL.version = {
            "res/cfg/stage.json": Math.random()
        };
        Laya.URL.basePath = "https://s.xiuwu.me/perfectline/";
        Laya.MiniAdpter["nativefiles"] = [
            'res/bg.png',
            'res/map/bj11.jpg',
            'res/map/bj31.jpg',
            'res/main/bj_homepage@2x.png',
            "res/atlas/res/common.atlas",
            "res/atlas/res/common.png",
            "res/atlas/res/rank.atlas",
            "res/atlas/res/rank.png",
            "res/atlas/res/main.atlas",
            "res/atlas/res/main.png",
            "res/atlas/res/signin.atlas",
            "res/atlas/res/signin.png",
            "res/atlas/comp.atlas",
            "res/atlas/comp.png",
            'res/atlas/res/card.atlas',
            'res/atlas/res/card.png',
            'res/atlas/res/role.atlas',
            'res/atlas/res/role.png',
            'res/atlas/res/game.atlas',
            'res/atlas/res/game.png',
            'res/atlas/res/ic_role.atlas',
            'res/atlas/res/ic_role.png',
            'res/snd/lx.json',
            'res/snd/gxddbh.json',
            'res/snd/jd.json',
            'res/snd/hlxj.json',
            'res/snd/kldnf.json'
        ];
        //歌曲配置。。备份用
        ['res/snd/about that oldie.json',
            'res/snd/adlms.json',
            'res/snd/adlz.json',
            'res/snd/azh.json',
            'res/snd/beat your competition.json',
            'res/snd/cy.json',
            'res/snd/fdc.json',
            'res/snd/gddxbwq.json',
            'res/snd/greenery.json',
            'res/snd/gxddbh.json',
            'res/snd/hbnlwq.json',
            'res/snd/hlxj.json',
            'res/snd/jd.json',
            'res/snd/jswd.json',
            'res/snd/jwtwq.json',
            'res/snd/kldnf.json',
            'res/snd/kn.json',
            'res/snd/llwq.json',
            'res/snd/lx.json',
            'res/snd/qmyzb.json',
            'res/snd/qn.json',
            'res/snd/sdjdx.json',
            'res/snd/sgxb.json',
            'res/snd/slkxq.json',
            'res/snd/sophomore makeout.json',
            'res/snd/spring in my step.json',
            'res/snd/sslg.json',
            'res/snd/teqjxq.json',
            'res/snd/wxdhd.json',
            'res/snd/xbwq.json',
            'res/snd/xfdh.json',
            'res/snd/xwh.json',
            'res/snd/xxzg.json',
            'res/snd/xylwqdwh.json',
            'res/snd/ybzy.json',
            'res/snd/yhczw.json',
            'res/snd/yntz.json',
            'res/snd/yyxj.json',
            'res/snd/zm.json',
            'res/snd/zytg.json'];
    };
    return Main;
}());
Laya.MiniAdpter["getUrlEncode"] = function (url, type) {
    if (url.indexOf(".fnt") != -1)
        return "utf8";
    else if (type == "arraybuffer")
        return "";
    return "utf8";
};
new Main();
