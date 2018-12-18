
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.common {
    export class BgViewUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Rect","props":{"width":750,"lineWidth":1,"height":1334,"fillColor":"#333333"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.common.BgViewUI.uiView);

        }

    }
}

module ui.common {
    export class HomeViewUI extends View {
		public bg:Laya.Image;
		public roleBtn:Laya.Image;
		public btnRank:Laya.Image;
		public btnMore:Laya.Image;
		public btnSignin:Laya.Image;
		public chapList:Laya.List;
		public btnUserInfo:Laya.Image;
		public starNum:Laya.Label;
		public coinNum:Laya.Label;
		public heartNum:Laya.Label;
		public btnAddPower:Laya.Button;
		public cardBtn:Laya.Image;
		public btnDev:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"bg","skin":"res/main/bj_homepage@2x.png"}},{"type":"Image","props":{"y":1159,"x":330,"var":"roleBtn","skin":"res/main/btn_role.png"}},{"type":"Image","props":{"y":1159,"x":64,"var":"btnRank","skin":"res/main/btn_ranking.png"}},{"type":"Image","props":{"y":1041,"x":520,"visible":false,"var":"btnMore","skin":"res/common/ic_more.png"}},{"type":"Image","props":{"y":244,"x":24,"var":"btnSignin","skin":"res/main/btn_sign.png"}},{"type":"List","props":{"y":519,"x":-78,"width":901,"var":"chapList","height":295},"child":[{"type":"ChapterItem","props":{"y":0,"x":0,"runtime":"ChaperItem","name":"render"}}]},{"type":"Image","props":{"y":116,"x":20,"width":88,"var":"btnUserInfo","skin":"res/main/ic_add_power.png","height":88},"child":[{"type":"Sprite","props":{"y":0,"x":0,"width":88,"renderType":"mask","height":88},"child":[{"type":"Circle","props":{"y":44,"x":44,"radius":44,"lineWidth":1,"fillColor":"#d12424"}}]}]},{"type":"Box","props":{"y":28,"x":20},"child":[{"type":"Image","props":{"y":14,"x":30,"skin":"res/main/ic_bg.png"}},{"type":"Label","props":{"y":21,"x":64,"width":76,"var":"starNum","text":"11","height":24,"fontSize":24,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"width":60,"skin":"res/main/ic_star.png"}}]},{"type":"Box","props":{"y":28,"x":362},"child":[{"type":"Image","props":{"y":14,"x":30,"skin":"res/main/ic_bg.png"}},{"type":"Label","props":{"y":21,"x":64,"width":76,"var":"coinNum","text":"56","height":24,"fontSize":24,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"skin":"res/main/ic_coin.png"}}]},{"type":"Box","props":{"y":31,"x":190},"child":[{"type":"Image","props":{"y":14,"x":30,"skin":"res/main/ic_bg.png"}},{"type":"Image","props":{"width":60,"skin":"res/main/ic_power.png","height":60}},{"type":"Label","props":{"y":21,"x":64,"width":52,"var":"heartNum","text":"99","height":24,"fontSize":24,"color":"#ffffff","align":"center"}}]},{"type":"Button","props":{"y":45,"x":304,"var":"btnAddPower","stateNum":1,"skin":"res/main/btn_add.png"}},{"type":"Image","props":{"y":1159,"x":605,"var":"cardBtn","skin":"res/main/btn_card.png"}},{"type":"Label","props":{"y":1279,"x":71,"text":"排行榜","fontSize":25,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":1279,"x":350,"text":"角色","fontSize":25,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":1279,"x":600,"text":"音乐卡片","fontSize":25,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":324,"x":36,"text":"签到","fontSize":25,"color":"#ffffff"}},{"type":"Label","props":{"y":15,"x":507,"var":"btnDev","text":"打开调试面板","fontSize":40,"color":"#ffffff"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ChaperItem",ChaperItem);

            super.createChildren();
            this.createView(ui.common.HomeViewUI.uiView);

        }

    }
}

module ui.dialogs {
    export class SigninDialogUI extends Dialog {

        public static  uiView:any ={"type":"Dialog","props":{"width":750,"height":1334}};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.dialogs.SigninDialogUI.uiView);

        }

    }
}

module ui.pages {
    export class DevPageUI extends View {
		public panelOutput:Laya.Panel;
		public labelOutput:Laya.Label;
		public btnClearLocalData:Laya.Label;
		public btnClearRemoteData:Laya.Label;
		public btnAddCoin:Laya.Label;
		public btnExit:Laya.Label;
		public btnBack:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Panel","props":{"y":355,"x":65,"width":620,"var":"panelOutput","height":900},"child":[{"type":"Rect","props":{"width":620,"lineWidth":1,"lineColor":"#333333","height":900,"fillColor":"#eeeeee"}},{"type":"Label","props":{"y":0,"x":0,"wordWrap":true,"width":620,"var":"labelOutput","fontSize":40}}]},{"type":"Box","props":{"y":235,"x":65},"child":[{"type":"Label","props":{"y":0,"x":0,"width":300,"var":"btnClearLocalData","valign":"middle","text":"清空本地数据","height":100,"fontSize":40,"color":"#ffffff","bgColor":"#3399ff","align":"center"}},{"type":"Label","props":{"y":0,"x":320,"width":300,"var":"btnClearRemoteData","valign":"middle","text":"清空远程数据","height":100,"fontSize":40,"color":"#ffffff","bgColor":"#3399ff","align":"center"}}]},{"type":"Box","props":{"y":115,"x":65},"child":[{"type":"Label","props":{"y":0,"x":0,"width":300,"var":"btnAddCoin","valign":"middle","text":"1000金币10体力","height":100,"fontSize":40,"color":"#ffffff","bgColor":"#3399ff","align":"center"}},{"type":"Label","props":{"y":0,"x":320,"width":300,"var":"btnExit","valign":"middle","text":"退出小游戏","height":100,"fontSize":40,"color":"#ffffff","bgColor":"#3399ff","align":"center"}}]},{"type":"Image","props":{"y":24,"x":24,"var":"btnBack","skin":"res/common/ic_back.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.pages.DevPageUI.uiView);

        }

    }
}

module ui.pages {
    export class GamePageUI extends View {
		public bg:Laya.Image;
		public btnPause:Laya.Image;
		public selectBox:Laya.Box;
		public btnStart:Laya.Button;
		public tfName:Laya.Label;
		public proBox:Laya.Box;
		public bar:Laya.ProgressBar;
		public star_2:Laya.Image;
		public star_1:Laya.Image;
		public star_0:Laya.Image;
		public tfScore:Laya.Label;
		public backBtn:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"y":0,"x":0,"width":750,"var":"bg","height":1334}},{"type":"Image","props":{"y":56,"x":40,"var":"btnPause","skin":"res/game/btn_pause.png"}},{"type":"Box","props":{"y":932,"x":18,"var":"selectBox"},"child":[{"type":"Rect","props":{"y":110,"x":165,"width":380,"lineWidth":1,"height":60,"fillColor":"#3A4B63"}},{"type":"Image","props":{"skin":"res/game/bj_play_tc.png"}},{"type":"Button","props":{"y":210,"x":222,"var":"btnStart","stateNum":1,"skin":"res/game/btn_go.png"}},{"type":"Label","props":{"y":121,"x":151,"width":407,"var":"tfName","text":"第1首","height":40,"fontSize":36,"font":"Arial","color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":329,"x":304,"skin":"res/game/ic_power1.png"}},{"type":"Label","props":{"y":342,"x":371,"width":154,"text":"-1","height":32,"fontSize":24,"font":"PingFangSC-Semibold","color":"#ffffff","align":"left"}}]},{"type":"Box","props":{"y":166,"x":64,"width":35,"var":"proBox","height":259},"child":[{"type":"ProgressBar","props":{"y":252,"x":14,"width":240,"var":"bar","value":0,"skin":"res/game/progress.png","rotation":-90}},{"type":"Image","props":{"y":-7,"x":0,"var":"star_2","skin":"res/game/star_b.png"}},{"type":"Image","props":{"y":78,"x":0,"var":"star_1","skin":"res/game/star_b.png"}},{"type":"Image","props":{"y":157,"x":0,"var":"star_0","skin":"res/game/star_b.png"}},{"type":"Image","props":{"y":237,"x":6,"skin":"res/game/origin.png"}}]},{"type":"Label","props":{"y":100,"x":536,"width":189,"var":"tfScore","valign":"middle","text":"0","height":96,"fontSize":76,"font":"Arial","color":"#ffffff","align":"right"}},{"type":"Image","props":{"y":51,"x":39,"var":"backBtn","skin":"res/game/btn_home.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.pages.GamePageUI.uiView);

        }

    }
}

module ui.pages {
    export class LoadingPageUI extends View {
		public bgView:ui.common.BgViewUI;
		public loading:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"BgView","props":{"y":0,"x":0,"var":"bgView","runtime":"ui.common.BgViewUI"}},{"type":"Image","props":{"y":298,"x":119,"skin":"res/main/ic_ear.png"}},{"type":"Image","props":{"y":1031,"x":375,"var":"loading","skin":"res/main/loading.png","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":787,"x":153,"width":444,"text":"佩戴耳机体验更好哦~","height":54,"fontSize":36,"font":"PingFangSC-Semibold","color":"#FFAB20","align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.common.BgViewUI",ui.common.BgViewUI);

            super.createChildren();
            this.createView(ui.pages.LoadingPageUI.uiView);

        }

    }
}

module ui.pages {
    export class MusicCardUI extends View {
		public topImg:Laya.Image;
		public cardList:Laya.List;
		public backBtn:runtime.btn_img;
		public tipsLabel:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Sprite","props":{},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":750,"lineWidth":1,"height":1334,"fillColor":"#323445"}}]},{"type":"Image","props":{"y":139,"x":20,"var":"topImg","skin":"res/card/banner.png"}},{"type":"List","props":{"y":366,"x":16,"width":710,"var":"cardList","spaceY":20,"spaceX":19,"repeatX":2,"height":931},"child":[{"type":"CardRenderItem","props":{"name":"render","runtime":"ui.views.CardRenderItemUI"}}]},{"type":"Image","props":{"y":36,"x":22,"var":"backBtn","skin":"res/card/btn_return.png","runtime":"runtime.btn_img"}},{"type":"Label","props":{"y":653,"x":123,"visible":false,"var":"tipsLabel","text":"你还没有获得音乐卡片哦，快去挑战吧～","fontSize":28,"color":"#d6d6d6"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.views.CardRenderItemUI",ui.views.CardRenderItemUI);
			View.regComponent("runtime.btn_img",runtime.btn_img);

            super.createChildren();
            this.createView(ui.pages.MusicCardUI.uiView);

        }

    }
}

module ui.pages {
    export class MusicRankUI extends View {
		public musicname:Laya.Label;
		public musicauth:Laya.Label;
		public myrank:Laya.Label;
		public myavatar:Laya.Image;
		public mynick:Laya.Label;
		public myscore:Laya.Label;
		public musiclist:Laya.List;
		public backbtn:runtime.btn_img;
		public groupbtn:runtime.btn_img;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"res/main/bj_homepage@2x.png"}},{"type":"Image","props":{"y":150,"x":55,"skin":"res/role/bi_single.png"},"child":[{"type":"Label","props":{"y":30,"x":173,"var":"musicname","text":"天空之城","fontSize":32,"color":"#666666","bold":true,"align":"left"}},{"type":"Label","props":{"y":85,"x":173,"var":"musicauth","text":"久石让","fontSize":26,"color":"#999999"}}]},{"type":"Image","props":{"y":362,"x":55,"width":640,"skin":"res/common/bg_white.png","sizeGrid":"20,20,20,20","height":752},"child":[{"type":"Sprite","props":{"y":58,"width":640,"height":120},"child":[{"type":"Rect","props":{"width":640,"lineWidth":1,"height":120,"fillColor":"#646AFF "}},{"type":"Label","props":{"y":45,"x":4,"width":62,"var":"myrank","text":"100","height":30,"fontSize":30,"color":"#ffffff","bold":true,"align":"center"}},{"type":"Image","props":{"y":20,"x":70,"width":80,"var":"myavatar","height":80},"child":[{"type":"Image","props":{"width":80,"skin":"res/common/ic_cricle.png","renderType":"mask","height":80}}]},{"type":"Label","props":{"y":42,"x":162,"width":222,"var":"mynick","text":"讲真的","height":35,"fontSize":35,"color":"#ffffff"}},{"type":"Label","props":{"y":42,"x":456,"width":164,"var":"myscore","text":"54分","right":20,"height":35,"fontSize":32,"color":"#ffffff","bold":true,"align":"right"}}]},{"type":"List","props":{"y":178,"x":0,"width":640,"var":"musiclist","repeatX":1,"height":572}}]},{"type":"Image","props":{"y":314,"x":129,"skin":"res/role/bj_ranking_single.png"},"child":[{"type":"Label","props":{"y":10,"x":146,"width":200,"valign":"middle","text":"单曲排行榜","height":52,"fontSize":40,"color":"#ffffff","bold":true}}]},{"type":"Image","props":{"y":24,"x":22,"var":"backbtn","skin":"res/role/btn_return.png","runtime":"runtime.btn_img"}},{"type":"Image","props":{"y":1146,"x":201,"var":"groupbtn","skin":"res/role/btn_see.png","runtime":"runtime.btn_img"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("runtime.btn_img",runtime.btn_img);

            super.createChildren();
            this.createView(ui.pages.MusicRankUI.uiView);

        }

    }
}

module ui.pages {
    export class MusicRankPageUI extends View {
		public rankBox:Laya.Sprite;
		public rankPreview:ui.rank.MusicRankOpenUI;
		public groupBtn:runtime.btn_img;
		public backBtn:runtime.btn_img;
		public musicName:Laya.Label;
		public musicAuthor:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"res/main/bj_homepage@2x.png"}},{"type":"Sprite","props":{"width":750,"var":"rankBox","height":1334}},{"type":"MusicRankOpen","props":{"y":0,"x":0,"visible":false,"var":"rankPreview","runtime":"ui.rank.MusicRankOpenUI"}},{"type":"Image","props":{"y":1146,"x":204,"var":"groupBtn","skin":"res/role/btn_see.png","runtime":"runtime.btn_img"}},{"type":"Image","props":{"y":23,"x":23,"var":"backBtn","skin":"res/role/btn_return.png","runtime":"runtime.btn_img"}},{"type":"Image","props":{"y":149,"x":55,"skin":"res/role/bi_single.png"},"child":[{"type":"Label","props":{"y":30,"x":173,"var":"musicName","text":"天空之城","fontSize":32,"color":"#666666","bold":true,"align":"left"}},{"type":"Label","props":{"y":85,"x":173,"var":"musicAuthor","text":"久石让","fontSize":26,"color":"#999999"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.rank.MusicRankOpenUI",ui.rank.MusicRankOpenUI);
			View.regComponent("runtime.btn_img",runtime.btn_img);

            super.createChildren();
            this.createView(ui.pages.MusicRankPageUI.uiView);

        }

    }
}

module ui.pages {
    export class RankPageUI extends View {
		public rankBox:Laya.Sprite;
		public rankPreview:ui.rank.RankOpenUI;
		public btnRankGroup:runtime.btn_img;
		public btnBack:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Sprite","props":{"width":750,"var":"rankBox","height":1334}},{"type":"RankOpen","props":{"y":0,"x":0,"visible":false,"var":"rankPreview","runtime":"ui.rank.RankOpenUI"}},{"type":"Image","props":{"y":1123,"x":211,"var":"btnRankGroup","skin":"res/role/btn_see.png","runtime":"runtime.btn_img"}},{"type":"Image","props":{"y":204,"x":645,"var":"btnBack","skin":"res/game/btn_close.png"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.rank.RankOpenUI",ui.rank.RankOpenUI);
			View.regComponent("runtime.btn_img",runtime.btn_img);

            super.createChildren();
            this.createView(ui.pages.RankPageUI.uiView);

        }

    }
}

module ui.plugins {
    export class SignInUI extends View {
		public sign1:ui.plugins.SignInItemUI;
		public sign3:ui.plugins.SignInItemUI;
		public sign2:ui.plugins.SignInItemUI;
		public sign4:ui.plugins.SignInItemUI;
		public sign6:ui.plugins.SignInItemUI;
		public sign5:ui.plugins.SignInItemUI;
		public sign8:View;
		public sevenRoleLabel:Laya.Label;
		public sign7:ui.plugins.SignInItemUI;
		public btnReceice:runtime.btn_img;
		public btnClose:runtime.btn_img;

        public static  uiView:any ={"type":"View","props":{"y":667,"x":375,"width":750,"height":1334,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":608,"x":381,"skin":"res/signin/bj_sign_tc.png","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":113,"x":37,"width":571,"skin":"res/signin/item_bg3.png","sizeGrid":"55,48,47,42","height":801}},{"type":"Box","props":{"y":145,"x":70,"width":500,"height":600},"child":[{"type":"Box","props":{"y":0,"x":0},"child":[{"type":"SignInItem","props":{"y":0,"x":0,"var":"sign1","runtime":"ui.plugins.SignInItemUI"}},{"type":"SignInItem","props":{"y":0,"x":353,"var":"sign3","runtime":"ui.plugins.SignInItemUI"}},{"type":"SignInItem","props":{"y":0,"x":176,"var":"sign2","runtime":"ui.plugins.SignInItemUI"}}]},{"type":"Box","props":{"y":262,"x":0},"child":[{"type":"SignInItem","props":{"y":0,"x":0,"var":"sign4","runtime":"ui.plugins.SignInItemUI"}},{"type":"SignInItem","props":{"y":0,"x":353,"var":"sign6","runtime":"ui.plugins.SignInItemUI"}},{"type":"SignInItem","props":{"y":0,"x":176,"var":"sign5","runtime":"ui.plugins.SignInItemUI"}}]},{"type":"Box","props":{"y":511,"x":-18},"child":[{"type":"View","props":{"y":8,"x":-1,"width":546,"visible":false,"var":"sign8","height":211},"child":[{"type":"Rect","props":{"y":0,"x":-2,"width":550,"lineWidth":1,"height":47,"fillColor":"#e67178"}},{"type":"Image","props":{"y":47,"x":-3,"skin":"res/ic_role/ic_signRole.png"}},{"type":"Label","props":{"y":10,"x":134,"width":277,"var":"sevenRoleLabel","text":"第七天","height":25,"fontSize":25,"color":"#ffffff","align":"center"}}]},{"type":"SignInItem","props":{"y":11,"x":177,"var":"sign7","runtime":"ui.plugins.SignInItemUI"}}]}]},{"type":"Image","props":{"y":1022,"x":309,"visible":false,"var":"btnReceice","skin":"res/signin/btn_get.png","runtime":"runtime.btn_img","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":127,"x":-99,"width":491,"text":"连续签到可以获得更多奖励！","height":26,"fontSize":24,"font":"PingFangSC-Semibold","color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":72,"x":607,"var":"btnClose","skin":"res/game/btn_close.png","runtime":"runtime.btn_img","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":9,"x":214,"width":211,"text":"每日签到","height":53,"fontSize":40,"font":"PingFangSC-Semibold","color":"#ffffff","bold":true,"align":"center"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.plugins.SignInItemUI",ui.plugins.SignInItemUI);
			View.regComponent("runtime.btn_img",runtime.btn_img);

            super.createChildren();
            this.createView(ui.plugins.SignInUI.uiView);

        }

    }
}

module ui.plugins {
    export class SignInItemUI extends View {
		public tfType:Laya.Label;
		public dayLabel:Laya.Label;
		public rewardImg:Laya.Image;
		public stateImg:Laya.Image;
		public rewardCountLabel:Laya.Label;
		public buqianBtn:runtime.btn_img;

        public static  uiView:any ={"type":"View","props":{"width":146,"height":230},"child":[{"type":"Image","props":{"y":0,"x":13,"skin":"res/signin/item_bg1.png"},"child":[{"type":"Label","props":{"y":21,"x":60,"width":78,"var":"tfType","text":"体力","height":29,"fontSize":25,"color":"#ffffff","bold":false,"anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Label","props":{"y":212,"x":73,"width":146,"var":"dayLabel","text":"第1天","height":25,"fontSize":25,"color":"#FF6788","bold":false,"anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Image","props":{"y":48,"x":13,"var":"rewardImg","skin":"res/signin/ic_coin.png"}},{"type":"Image","props":{"y":108,"x":104,"visible":false,"var":"stateImg","skin":"res/signin/btn_choose.png"}},{"type":"Image","props":{"y":154,"x":16,"width":114,"skin":"res/signin/item_bg2.png","sizeGrid":"0,0,0,0","height":37},"child":[{"type":"Label","props":{"y":18,"x":57,"width":146,"var":"rewardCountLabel","text":"x50","height":25,"fontSize":25,"color":"#4A74C3","bold":false,"anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Image","props":{"y":175,"x":74,"visible":false,"var":"buqianBtn","skin":"res/signin/supplement.png","runtime":"runtime.btn_img","anchorY":0.5,"anchorX":0.5}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("runtime.btn_img",runtime.btn_img);

            super.createChildren();
            this.createView(ui.plugins.SignInItemUI.uiView);

        }

    }
}

module ui.plugins {
    export class SignResultUI extends View {
		public rewardImg:Laya.Image;
		public getBtn:runtime.btn_img;
		public rewardLabel:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"y":667,"x":375,"width":750,"height":1334,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":325,"x":220,"skin":"res/signin/bj_get.png"},"child":[{"type":"Label","props":{"y":18,"x":55,"text":"恭喜你获得","fontSize":40,"color":"#ffffff"}}]},{"type":"Label","props":{"y":962,"x":195,"text":"连续签到可以获得更多奖励","fontSize":30,"color":"#ffffff"}},{"type":"Image","props":{"y":436,"x":135,"var":"rewardImg","skin":"res/signin/ic_power_get.png"}},{"type":"Image","props":{"y":1077,"x":242,"var":"getBtn","skin":"res/signin/btn_sure.png","runtime":"runtime.btn_img"}},{"type":"Label","props":{"y":806,"x":339,"var":"rewardLabel","text":"X10","fontSize":40,"color":"#ffffff","align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("runtime.btn_img",runtime.btn_img);

            super.createChildren();
            this.createView(ui.plugins.SignResultUI.uiView);

        }

    }
}

module ui.rank {
    export class MusicRankOpenUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"y":361,"x":55,"width":640,"skin":"res/common/bg_white.png","sizeGrid":"20,20,20,20","height":752}},{"type":"Image","props":{"y":313,"x":129,"skin":"res/role/bj_ranking_single.png"},"child":[{"type":"Label","props":{"y":10,"x":146,"width":200,"valign":"middle","text":"单曲排行榜","height":52,"fontSize":40,"color":"#ffffff","bold":true}}]},{"type":"List","props":{"y":539,"x":55,"width":640,"repeatX":1,"name":"rankList","height":572},"child":[{"type":"Box","props":{"width":640,"name":"render","height":120},"child":[{"type":"Box","props":{"y":34,"x":12,"name":"_index|eq|1"},"child":[{"type":"Image","props":{"skin":"res/role/ic_1.png"}}]},{"type":"Box","props":{"y":34,"x":12,"name":"_index|eq|2"},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"res/role/ic_2.png"}}]},{"type":"Box","props":{"y":34,"x":12,"name":"_index|eq|3"},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"res/role/ic_3.png"}}]},{"type":"Image","props":{"y":20,"x":70,"width":80,"name":"avatarUrl","height":80},"child":[{"type":"Image","props":{"width":80,"skin":"res/common/ic_cricle.png","renderType":"mask","height":80}}]},{"type":"Label","props":{"y":46,"x":162,"width":329,"text":"隔壁泰山","overflow":"hidden","name":"nickname","height":28,"fontSize":28,"color":"#404040"}},{"type":"Label","props":{"y":44,"width":123,"text":"888分","right":20,"name":"score|default|0分|append|分","height":32,"fontSize":32,"color":"#4860EB","bold":true,"align":"right"}},{"type":"Label","props":{"y":119,"x":20,"width":600,"height":1,"bgColor":"#F1F1F1"}},{"type":"Label","props":{"y":44,"x":6,"width":55,"text":"4","name":"_index|gt|3","height":30,"fontSize":30,"color":"#979797","bold":true,"align":"center"}}]}]},{"type":"Box","props":{"y":361,"x":55,"name":"rankSelf"},"child":[{"type":"Label","props":{"y":58,"x":0,"width":640,"height":120,"bgColor":"#646AFF"}},{"type":"Label","props":{"y":103,"x":4,"width":62,"text":"100","name":"_index","height":30,"fontSize":30,"color":"#ffffff","bold":true,"align":"center"}},{"type":"Image","props":{"y":78,"x":70,"width":80,"name":"avatarUrl","height":80},"child":[{"type":"Image","props":{"width":80,"skin":"res/common/ic_cricle.png","renderType":"mask","height":80}}]},{"type":"Label","props":{"y":100,"x":162,"width":356,"text":"讲真的","overflow":"hidden","name":"nickname","height":35,"fontSize":35,"color":"#ffffff"}},{"type":"Label","props":{"y":100,"x":456,"width":164,"text":"54分","right":20,"name":"score|default|0|append|分","height":35,"fontSize":32,"color":"#ffffff","bold":true,"align":"right"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.rank.MusicRankOpenUI.uiView);

        }

    }
}

module ui.rank {
    export class RankOpenUI extends View {
		public star:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"y":149,"x":55,"skin":"res/role/bj_ranking_tc.png"}},{"type":"Label","props":{"y":157,"x":245,"width":260,"valign":"middle","text":"好友排行榜","height":53,"fontSize":40,"color":"#ffffff","bold":true,"align":"center"}},{"type":"Image","props":{"y":262,"x":75,"width":600,"skin":"res/common/bg_white.png","sizeGrid":"20,20,20,20","height":680}},{"type":"List","props":{"y":262,"x":75,"width":600,"name":"rankList","height":680},"child":[{"type":"Box","props":{"width":588,"name":"render","height":116},"child":[{"type":"Box","props":{"y":30,"x":20,"name":"_index|eq|1"},"child":[{"type":"Image","props":{"y":2,"x":11,"skin":"res/role/ic_1.png"}}]},{"type":"Box","props":{"y":28,"x":20,"name":"_index|eq|2"},"child":[{"type":"Image","props":{"y":4,"x":11,"skin":"res/role/ic_2.png"}}]},{"type":"Box","props":{"y":30,"x":20,"name":"_index|eq|3"},"child":[{"type":"Image","props":{"y":2,"x":11,"skin":"res/role/ic_3.png"}}]},{"type":"Label","props":{"y":41,"x":186,"width":271,"text":"昵称","overflow":"hidden","name":"nickname","height":33,"fontSize":33,"font":"SimHei","color":"#404040"}},{"type":"Image","props":{"y":18,"x":92,"width":80,"name":"avatarUrl","height":80},"child":[{"type":"Image","props":{"y":0,"x":0,"width":80,"skin":"res/common/ic_cricle.png","renderType":"mask","height":80}}]},{"type":"Label","props":{"y":38,"x":506,"width":77,"text":"0","name":"data.star_score.wxgame.score|default|0","height":40,"fontSize":40,"color":"#EF7700","align":"right"}},{"type":"Image","props":{"y":37,"x":471,"skin":"res/main/ic_star1.png"}},{"type":"Label","props":{"x":10,"width":580,"height":1,"bottom":0,"bgColor":"#F1F1F1"}},{"type":"Label","props":{"y":36,"x":25,"width":47,"valign":"middle","text":"10","name":"_index|gt|3","height":43,"fontSize":30,"color":"#979797","align":"center"}}]}]},{"type":"Box","props":{"name":"rankSelf"},"child":[{"type":"Image","props":{"y":950,"x":74,"skin":"res/role/bj_own.png"}},{"type":"Label","props":{"y":984,"x":187,"width":262,"valign":"middle","text":"火焰山奶奶","overflow":"hidden","name":"nickname","height":63,"fontSize":32,"color":"#ffffff"}},{"type":"Image","props":{"y":974,"x":90,"width":80,"name":"avatarUrl","height":80},"child":[{"type":"Image","props":{"width":80,"skin":"res/common/ic_cricle.png","renderType":"mask","height":80}}]},{"type":"Image","props":{"y":945,"x":432,"skin":"res/role/ic_placing.png"}},{"type":"Label","props":{"y":955,"x":443,"width":66,"text":"88","name":"_index","height":30,"fontSize":30,"color":"#5e6eaa","align":"center"}},{"type":"Image","props":{"y":992,"x":554,"skin":"res/main/ic_star1.png"}},{"type":"Label","props":{"y":974,"x":569,"width":90,"var":"star","valign":"middle","text":"55","name":"data.star_score.wxgame.score","height":83,"fontSize":32,"color":"#ffffff","align":"right"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.rank.RankOpenUI.uiView);

        }

    }
}

module ui.rank {
    export class ResultOpenUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Box","props":{"width":750,"name":"rankSelf","height":1334},"child":[{"type":"Label","props":{"y":873,"x":123,"name":"_index|default|0|append|名","fontSize":40,"color":"#ffffff","bold":true}},{"type":"Label","props":{"y":873,"x":78,"text":"第","fontSize":40,"color":"#ffffff","bold":true}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.rank.ResultOpenUI.uiView);

        }

    }
}

module ui.views {
    export class CountDownViewUI extends View {
		public countLabel:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Sprite","props":{"width":750,"height":1334,"alpha":0.8},"child":[{"type":"Rect","props":{"width":750,"lineWidth":1,"height":1334,"fillColor":"#000000"}},{"type":"Label","props":{"y":473,"x":187,"width":376,"var":"countLabel","valign":"middle","text":"3","height":388,"fontSize":200,"color":"#ffffff","align":"center"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.views.CountDownViewUI.uiView);

        }

    }
}

module ui.views {
    export class GamePauseUI extends View {
		public btnHome:runtime.btn_img;
		public btnRestart:runtime.btn_img;
		public btnResume:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"y":67,"x":54,"var":"btnHome","skin":"res/game/btn_home.png","runtime":"runtime.btn_img"}},{"type":"Image","props":{"y":945,"x":420,"var":"btnRestart","skin":"res/game/btn_again.png","runtime":"runtime.btn_img"}},{"type":"Button","props":{"y":945,"x":87,"var":"btnResume","stateNum":1,"skin":"res/game/btn_continue.png"}},{"type":"Label","props":{"y":546,"x":224,"width":301,"text":"暂停","height":66,"fontSize":76,"color":"#ffffff","align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("runtime.btn_img",runtime.btn_img);

            super.createChildren();
            this.createView(ui.views.GamePauseUI.uiView);

        }

    }
}

module ui.views {
    export class GameResultViewUI extends View {
		public homebtn:Laya.Image;
		public star1:Laya.Image;
		public star3:Laya.Image;
		public star2:Laya.Image;
		public scorelabel:Laya.Label;
		public tip:Laya.Label;
		public coinLabel:Laya.Label;
		public musicname:Laya.Label;
		public authname:Laya.Label;
		public restartbtn:Laya.Image;
		public nextBtn:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"y":51,"x":39,"var":"homebtn","skin":"res/game/btn_home.png"}},{"type":"Image","props":{"y":379,"x":210,"var":"star1","skin":"res/game/ic_star_result_b.png","rotation":-30,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":380,"x":542,"var":"star3","skin":"res/game/ic_star_result_gray_b.png","rotation":30,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":187,"x":305,"var":"star2","skin":"res/game/ic_star_result_gray_b.png"}},{"type":"Label","props":{"y":478,"x":224,"width":301,"var":"scorelabel","text":"14分","height":66,"fontSize":60,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":598,"x":219,"var":"tip","text":"加油哦","fontSize":40,"color":"#ffffff"}},{"type":"Image","props":{"y":567,"x":369,"skin":"res/game/ic_coin.png"}},{"type":"Label","props":{"y":598,"x":476,"var":"coinLabel","text":"X10","fontSize":40,"color":"#ffffff"}},{"type":"Image","props":{"y":684,"x":55,"skin":"res/game/bj_single.png"},"child":[{"type":"Label","props":{"y":35,"x":172,"var":"musicname","text":"天空之城","fontSize":32,"color":"#666666","bold":true,"align":"left"}},{"type":"Label","props":{"y":88,"x":172,"var":"authname","text":"久石让","fontSize":26,"color":"#999999"}}]},{"type":"Image","props":{"y":1011,"x":242,"var":"restartbtn","skin":"res/game/btn_again.png"}},{"type":"Image","props":{"y":1011,"x":238,"visible":false,"var":"nextBtn","skin":"res/game/btn_next.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.views.GameResultViewUI.uiView);

        }

    }
}

module ui.views {
    export class GameReviveUI extends View {
		public btnConfirm:runtime.btn_img;
		public btnBack:runtime.btn_img;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"y":945,"x":242,"var":"btnConfirm","skin":"res/game/btn_sure.png","runtime":"runtime.btn_img"}},{"type":"Label","props":{"y":546,"x":224,"width":301,"text":"复活","height":66,"fontSize":76,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":709,"x":150,"width":160,"text":"使用","height":66,"fontSize":48,"color":"#ffffff","align":"right"}},{"type":"Image","props":{"y":708,"x":324,"skin":"res/main/ic_power.png"}},{"type":"Label","props":{"y":710,"x":436,"width":160,"text":"复活","height":66,"fontSize":48,"color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":714,"x":393,"width":59,"text":"-1","height":52,"fontSize":36,"color":"#ffffff","align":"left"}},{"type":"Image","props":{"y":24,"x":22,"var":"btnBack","skin":"res/role/btn_return.png","runtime":"runtime.btn_img"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("runtime.btn_img",runtime.btn_img);

            super.createChildren();
            this.createView(ui.views.GameReviveUI.uiView);

        }

    }
}

module ui.views.home {
    export class AddPowerUI extends View {
		public btnClose:Laya.Button;
		public btnWatch:runtime.btn;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1134},"child":[{"type":"Image","props":{"y":287,"x":55,"width":642,"skin":"res/main/bj_power_tc.png","sizeGrid":"150,50,50,50","height":577}},{"type":"Label","props":{"y":316,"x":269,"width":211,"text":"获取体力","height":54,"fontSize":38,"font":"PingFangSC-Semibold","color":"#ffffff","align":"center"}},{"type":"Button","props":{"y":302,"x":641,"var":"btnClose","stateNum":1,"skin":"res/main/btn_close.png"}},{"type":"Button","props":{"y":723,"x":260,"var":"btnWatch","stateNum":1,"skin":"res/main/btn_watch.png","runtime":"runtime.btn"}},{"type":"Image","props":{"y":428,"x":271,"skin":"res/main/ic_add_power.png"}},{"type":"Label","props":{"y":668,"x":220,"width":211,"text":"看视频增加体力","height":39,"fontSize":28,"font":"PingFangSC-Semibold","color":"#666666","align":"right"}},{"type":"Image","props":{"y":654,"x":438,"skin":"res/main/ic_power1.png"}},{"type":"Label","props":{"y":668,"x":500,"width":211,"text":"x1","height":39,"fontSize":28,"font":"PingFangSC-Semibold","color":"#666666","align":"left"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("runtime.btn",runtime.btn);

            super.createChildren();
            this.createView(ui.views.home.AddPowerUI.uiView);

        }

    }
}

module ui.views.home {
    export class ChapterItemUI extends View {
		public box:Laya.Box;
		public pic:Laya.Image;
		public tfName:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":300,"height":300},"child":[{"type":"Box","props":{"y":150,"x":150,"var":"box","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":0,"x":0,"width":300,"var":"pic","skin":"res/main/bj_piece.png","height":300}},{"type":"Label","props":{"y":8,"x":75,"width":149,"var":"tfName","height":25,"fontSize":25,"color":"#ffffff","align":"center"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.views.home.ChapterItemUI.uiView);

        }

    }
}

module ui.views.home {
    export class UserInfoUI extends View {
		public btnClose:Laya.Button;
		public nickLabel:Laya.Label;
		public starLabel:Laya.Label;
		public heartLabel:Laya.Label;
		public musicLabel:Laya.Label;
		public userId:Laya.Label;
		public avatar:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1134},"child":[{"type":"Image","props":{"y":287,"x":55,"skin":"res/main/bj_user_tc.png"}},{"type":"Button","props":{"y":302,"x":641,"var":"btnClose","stateNum":1,"skin":"res/main/btn_close.png"}},{"type":"Label","props":{"y":479,"x":269,"width":211,"var":"nickLabel","text":"我本有心向明月","height":39,"fontSize":28,"font":"PingFangSC-Regular","color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":624,"x":569,"skin":"res/main/ic_user_coin.png"}},{"type":"Image","props":{"y":624,"x":337,"skin":"res/main/ic_user_power.png"}},{"type":"Image","props":{"y":624,"x":104,"skin":"res/main/ic_user_star.png"}},{"type":"Label","props":{"y":718,"x":78,"width":121,"var":"starLabel","text":"44","height":39,"fontSize":28,"font":"PingFangSC-Regular","color":"#484848","align":"center"}},{"type":"Label","props":{"y":718,"x":315,"width":121,"var":"heartLabel","text":"55","height":39,"fontSize":28,"font":"PingFangSC-Regular","color":"#484848","align":"center"}},{"type":"Label","props":{"y":718,"x":551,"width":121,"var":"musicLabel","text":"77","height":39,"fontSize":28,"font":"PingFangSC-Regular","color":"#484848","align":"center"}},{"type":"Label","props":{"y":528,"x":269,"width":211,"var":"userId","text":"ID 9527","height":39,"fontSize":28,"font":"PingFangSC-Regular","color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":317,"x":305,"width":140,"var":"avatar","height":140},"child":[{"type":"Sprite","props":{"width":140,"renderType":"mask","height":140},"child":[{"type":"Circle","props":{"y":70,"x":70,"radius":70,"lineWidth":1,"fillColor":"#ff0000"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.views.home.UserInfoUI.uiView);

        }

    }
}

module ui.views {
    export class LoadingViewUI extends View {
		public loading:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1134},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"res/main/bj_homepage@2x.png"}},{"type":"Image","props":{"y":298,"x":119,"skin":"res/main/ic_ear.png"}},{"type":"Image","props":{"y":1031,"x":375,"var":"loading","skin":"res/main/loading.png","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":787,"x":153,"width":444,"text":"佩戴耳机体验更好哦~","height":54,"fontSize":36,"font":"PingFangSC-Semibold","color":"#FFAB20","align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.views.LoadingViewUI.uiView);

        }

    }
}

module ui.views {
    export class MusicRankRenderUI extends View {
		public rankImg:Laya.Image;
		public avatarImg:Laya.Image;
		public nickLabel:Laya.Label;
		public scoreLabel:Laya.Label;
		public rankLabel:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":116},"child":[{"type":"Image","props":{"y":33,"x":12,"var":"rankImg","skin":"res/role/ic_1.png"}},{"type":"Image","props":{"y":18,"x":70,"width":80,"var":"avatarImg","height":80},"child":[{"type":"Sprite","props":{"width":80,"renderType":"mask","height":80},"child":[{"type":"Circle","props":{"y":40,"x":40,"radius":40,"lineWidth":1,"fillColor":"#ff0000"}}]}]},{"type":"Label","props":{"y":38,"x":162,"width":255,"var":"nickLabel","text":"隔壁泰山","height":40,"fontSize":35,"color":"#404040"}},{"type":"Label","props":{"y":43,"width":150,"var":"scoreLabel","text":"888分","right":20,"height":30,"fontSize":32,"color":"#4860EB","bold":true,"align":"right"}},{"type":"Label","props":{"y":43,"x":4,"width":62,"var":"rankLabel","text":"5","height":30,"fontSize":30,"color":"#979797","bold":true,"align":"center"}},{"type":"Sprite","props":{"y":115,"x":10,"width":620,"height":1},"child":[{"type":"Rect","props":{"width":620,"lineWidth":1,"height":1,"fillColor":"#f1f1f1"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.views.MusicRankRenderUI.uiView);

        }

    }
}

module ui.views {
    export class NoPowerTipUI extends View {
		public tfTitle:Laya.Label;
		public tfContent:Laya.Label;
		public btnClose:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"y":423,"x":55,"width":642,"skin":"res/main/bj_power_tc.png","sizeGrid":"124,0,75,0","height":434}},{"type":"Label","props":{"y":452,"x":269,"width":211,"var":"tfTitle","text":"体力不足","height":54,"fontSize":42,"font":"PingFangSC-Semibold","color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":604,"x":175,"wordWrap":true,"width":400,"var":"tfContent","text":"   今天的体力用完了， 明天再来宠幸我吧~","leading":10,"height":98,"fontSize":36,"font":"PingFangSC-Semibold","color":"#666666","align":"center"}},{"type":"Button","props":{"y":735,"x":260,"var":"btnClose","stateNum":1,"skin":"res/game/btn_sure2.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.views.NoPowerTipUI.uiView);

        }

    }
}

module ui.views {
    export class PopBigCardUI extends View {
		public bigImg:Laya.Image;
		public shareBtn:runtime.btn_img;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"y":136,"x":125,"width":500,"var":"bigImg","height":890}},{"type":"Image","props":{"y":1079,"x":242,"var":"shareBtn","skin":"res/card/btn_share.png","runtime":"runtime.btn_img"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("runtime.btn_img",runtime.btn_img);

            super.createChildren();
            this.createView(ui.views.PopBigCardUI.uiView);

        }

    }
}

module ui.views {
    export class RoleItemRenderUI extends View {
		public roleimg:Laya.Image;
		public rolename:Laya.Label;
		public tip:Laya.Label;
		public useBtn:runtime.btn_img;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":120},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"skin":"res/common/bg_white.png","sizeGrid":"20,20,20,20","height":120}},{"type":"Image","props":{"y":10,"x":14,"width":100,"var":"roleimg","skin":"res/ic_role/xhj.png","height":100}},{"type":"Label","props":{"y":23,"x":134,"var":"rolename","text":"角色","fontSize":30,"color":"#404040"}},{"type":"Label","props":{"y":69,"x":134,"var":"tip","text":"连续签到七天可以解锁","fontSize":20,"color":"#999999"}},{"type":"Image","props":{"y":27,"x":487,"var":"useBtn","skin":"res/role/btn_use.png","runtime":"runtime.btn_img"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("runtime.btn_img",runtime.btn_img);

            super.createChildren();
            this.createView(ui.views.RoleItemRenderUI.uiView);

        }

    }
}

module ui.views {
    export class RoleViewUI extends View {
		public closebtn:runtime.btn_img;
		public rolelist:Laya.List;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"y":199,"x":55,"skin":"res/role/bj_role_tc.png"},"child":[{"type":"Label","props":{"y":14,"x":280,"width":80,"text":"角色","height":40,"fontSize":40,"color":"#ffffff","bold":true}},{"type":"Image","props":{"y":57,"x":587,"var":"closebtn","skin":"res/main/btn_close.png","runtime":"runtime.btn_img"}},{"type":"List","props":{"y":135,"x":20,"width":600,"var":"rolelist","spaceY":12,"repeatX":1,"height":785},"child":[{"type":"RoleItemRender","props":{"name":"render","runtime":"ui.views.RoleItemRenderUI"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("runtime.btn_img",runtime.btn_img);
			View.regComponent("ui.views.RoleItemRenderUI",ui.views.RoleItemRenderUI);

            super.createChildren();
            this.createView(ui.views.RoleViewUI.uiView);

        }

    }
}

module ui.views {
    export class SettingComUI extends View {
		public tabSong:Laya.Tab;
		public tabAni:Laya.Tab;
		public tabRotate:Laya.Tab;
		public tabSpeed:Laya.Tab;
		public btnStart:Laya.Button;
		public tabSpeedType:Laya.Tab;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":600},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"skin":"res/signin/item_bg3.png","sizeGrid":"20,12,14,14","height":600}},{"type":"Label","props":{"y":21,"x":16,"fontSize":24,"color":"#000000"}},{"type":"Label","props":{"y":129,"x":16,"width":75,"text":"动画表现","height":18,"fontSize":24,"color":"#000000"}},{"type":"Label","props":{"y":195,"x":16,"text":"旋转角度","fontSize":24,"color":"#000000"}},{"type":"Label","props":{"y":308,"x":16,"text":"滚屏速度","fontSize":24,"color":"#000000"}},{"type":"Tab","props":{"y":28,"x":117,"width":211,"visible":false,"var":"tabSong","skin":"res/common/tab.png","selectedIndex":1,"scaleY":2,"scaleX":2.2,"labels":"狐狸小姐,钢琴块,G小调","height":26}},{"type":"Tab","props":{"y":107,"x":117,"width":145,"var":"tabAni","skin":"res/common/tab.png","selectedIndex":0,"scaleY":2,"scaleX":2.2,"labels":"线条,小球","height":26}},{"type":"Tab","props":{"y":177,"x":117,"width":145,"var":"tabRotate","skin":"res/common/tab.png","selectedIndex":0,"scaleY":2,"scaleX":2.2,"labels":"固定角度,变化角度","height":26}},{"type":"Tab","props":{"y":241,"x":117,"width":80,"var":"tabSpeed","skin":"res/common/tab.png","selectedIndex":0,"scaleY":2,"scaleX":2.2,"labels":"4,5,6","height":80,"direction":"vertical"}},{"type":"Button","props":{"y":530,"x":185,"width":169,"var":"btnStart","stateNum":1,"skin":"res/signin/item_bg1.png","sizeGrid":"18,14,12,20","labelSize":32,"labelColors":"#ffffff,#ffffff,#ffffff","label":"start","height":50}},{"type":"Label","props":{"y":435,"x":16,"text":"其他","fontSize":24,"color":"#000000"}},{"type":"Tab","props":{"y":417,"x":117,"width":145,"var":"tabSpeedType","skin":"res/common/tab.png","selectedIndex":0,"scaleY":2,"scaleX":2.2,"labels":"垂直速不变,速度不变","height":26}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.views.SettingComUI.uiView);

        }

    }
}

module ui.views {
    export class ShareMenuUI extends View {
		public bottomView:View;
		public pyq:runtime.btn_img;
		public wxBtn:runtime.btn_img;
		public closeBtn:runtime.btn_img;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"View","props":{"y":1038,"x":0,"width":750,"var":"bottomView","height":296},"child":[{"type":"Sprite","props":{"y":0,"x":0,"width":750,"height":296,"alpha":0.88},"child":[{"type":"Rect","props":{"width":750,"lineWidth":1,"height":296,"fillColor":"#00000000"}}]},{"type":"Image","props":{"y":115,"x":168,"var":"pyq","skin":"res/common/pyq.png","runtime":"runtime.btn_img"}},{"type":"Image","props":{"y":115,"x":481,"var":"wxBtn","skin":"res/common/wechat.png","runtime":"runtime.btn_img"}},{"type":"Label","props":{"y":51,"x":330,"text":"分享到","fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":238,"x":177,"text":"朋友圈","fontSize":28,"color":"#ffffff"}},{"type":"Label","props":{"y":240,"x":476,"text":"微信好友","fontSize":28,"color":"#ffffff"}},{"type":"Image","props":{"y":17,"x":698,"var":"closeBtn","skin":"res/game/btn_close.png","runtime":"runtime.btn_img"}},{"type":"Label","props":{"y":66,"x":202,"width":96,"height":1,"bgColor":"#e1e1e1"}},{"type":"Label","props":{"y":66,"x":452,"width":96,"height":1,"bgColor":"#e1e1e1"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("runtime.btn_img",runtime.btn_img);

            super.createChildren();
            this.createView(ui.views.ShareMenuUI.uiView);

        }

    }
}

module ui.views {
    export class StarUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":20,"height":20},"child":[{"type":"Sprite","props":{"width":20,"height":20},"child":[{"type":"Circle","props":{"y":10,"x":10,"radius":10,"lineWidth":0,"fillColor":"#ffffff"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.views.StarUI.uiView);

        }

    }
}

module ui.views {
    export class TipsUI extends View {
		public tfTitle:Laya.Label;
		public tfContent:Laya.Label;
		public btnClose:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"y":423,"x":55,"width":642,"skin":"res/main/bj_power_tc.png","sizeGrid":"138,0,63,0","height":439}},{"type":"Label","props":{"y":452,"x":269,"width":211,"var":"tfTitle","text":"出错了","height":54,"fontSize":42,"font":"PingFangSC-Semibold","color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":599,"x":175,"wordWrap":true,"width":400,"var":"tfContent","text":"哎呀，服务器在打盹儿，等会再来吧~","leading":10,"height":98,"fontSize":36,"font":"PingFangSC-Semibold","color":"#666666","align":"center"}},{"type":"Button","props":{"y":738,"x":260,"var":"btnClose","stateNum":1,"skin":"res/game/btn_sure2.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.views.TipsUI.uiView);

        }

    }
}

module ui.views {
    export class TopToastViewUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":750,"height":60},"child":[{"type":"Sprite","props":{"width":750,"height":60,"alpha":0.8},"child":[{"type":"Rect","props":{"width":750,"lineWidth":1,"height":60,"fillColor":"#000000"}}]},{"type":"Label","props":{"y":15,"x":102,"width":545,"text":"下一篇章已经解锁","height":30,"fontSize":30,"color":"#666666","align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.views.TopToastViewUI.uiView);

        }

    }
}
