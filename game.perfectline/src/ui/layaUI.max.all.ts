
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.bag {
    export class BagUI extends View {
		public tfTitle:Laya.Label;
		public btnClose:Laya.Button;
		public itemList:Laya.List;

        public static  uiView:any ={"type":"View","props":{"width":700,"height":800},"child":[{"type":"Box","props":{"y":0,"x":0},"child":[{"type":"Image","props":{"y":30,"width":700,"skin":"share/winFrame1.png","sizeGrid":"66,49,50,37","height":770}},{"type":"Image","props":{"x":116,"width":467,"skin":"share/winTitle.png","sizeGrid":"0,205,0,204","height":80}},{"type":"Label","props":{"y":19,"x":250,"width":200,"var":"tfTitle","text":"背包","height":24,"fontSize":24,"color":"#ffffff","align":"center"}},{"type":"Button","props":{"y":23,"x":638,"var":"btnClose","stateNum":1,"skin":"share/btn_close.png"}}]},{"type":"List","props":{"y":99,"x":30,"width":640,"var":"itemList","spaceY":10,"height":648},"child":[{"type":"BagItem","props":{"runtime":"BagItem","name":"render"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("BagItem",BagItem);

            super.createChildren();
            this.createView(ui.bag.BagUI.uiView);

        }

    }
}

module ui.bag {
    export class BagItemUI extends View {
		public item:Item;
		public tfName:Laya.Label;
		public tfDesc:Laya.Label;
		public btnUser:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":120},"child":[{"type":"Image","props":{"y":0,"x":0,"width":640,"skin":"share/itemBG.png","sizeGrid":"0,127,0,87","height":120}},{"type":"Item","props":{"y":1,"x":6,"var":"item","runtime":"Item"}},{"type":"Label","props":{"y":14,"x":127,"width":271,"var":"tfName","height":30,"fontSize":24,"color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":52,"x":130,"width":271,"var":"tfDesc","height":30,"fontSize":24,"color":"#ffffff","align":"left"}},{"type":"Button","props":{"y":13,"x":486,"width":131,"var":"btnUser","stateNum":1,"skin":"share/btn_green.png","sizeGrid":"0,39,0,37","labelSize":24,"labelColors":"#ffffff,#ffffff,#ffffff","label":"使用","height":70}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Item",Item);

            super.createChildren();
            this.createView(ui.bag.BagItemUI.uiView);

        }

    }
}

module ui.bag {
    export class ItemUI extends View {
		public pic:Laya.Image;
		public frame:Laya.Image;
		public tfNum:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":120,"height":120},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"pic","skin":"item/2.png"}},{"type":"Image","props":{"y":0,"x":0,"width":120,"var":"frame","skin":"share/frame.png","sizeGrid":"13,13,18,13","height":120}},{"type":"Label","props":{"y":90,"x":56,"width":57,"var":"tfNum","height":20,"fontSize":20,"color":"#ffffff","align":"right"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.bag.ItemUI.uiView);

        }

    }
}

module ui.common {
    export class HomeViewUI extends View {
		public bg:Laya.Image;
		public roleBtn:Laya.Image;
		public btnSignin:Laya.Image;
		public chapList:Laya.List;
		public btnUserInfo:Laya.Image;
		public starNum:Laya.Label;
		public coinNum:Laya.Label;
		public heartNum:Laya.Label;
		public btnAddPower:Laya.Button;
		public btnDev:Laya.Label;
		public tfName:Laya.Label;
		public star:Laya.Box;
		public star_0:Laya.Image;
		public star_1:Laya.Image;
		public star_2:Laya.Image;
		public condBox:Laya.Box;
		public icon:Laya.Image;
		public tfItemNum:Laya.Label;
		public btnUnlock:Laya.Button;
		public btnPlay:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"bg","skin":"res/main/bj_homepage@2x.png"}},{"type":"Image","props":{"y":1178,"x":50,"var":"roleBtn","skin":"res/main/btn_role.png"},"child":[{"type":"Label","props":{"y":120,"x":20,"text":"角色","fontSize":25,"color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":244,"x":24,"var":"btnSignin","skin":"res/main/btn_sign.png"}},{"type":"List","props":{"y":519,"x":-86,"width":921,"var":"chapList","spaceX":10,"height":300},"child":[{"type":"ChapterItem","props":{"y":0,"x":0,"runtime":"ChaperItem","name":"render"}}]},{"type":"Image","props":{"y":116,"x":20,"width":88,"var":"btnUserInfo","skin":"res/main/ic_add_power.png","height":88},"child":[{"type":"Sprite","props":{"y":0,"x":0,"width":88,"renderType":"mask","height":88},"child":[{"type":"Circle","props":{"y":44,"x":44,"radius":44,"lineWidth":1,"fillColor":"#d12424"}}]}]},{"type":"Box","props":{"y":28,"x":20},"child":[{"type":"Image","props":{"y":14,"x":30,"skin":"res/main/ic_bg.png"}},{"type":"Label","props":{"y":21,"x":64,"width":76,"var":"starNum","text":"11","height":24,"fontSize":24,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"width":60,"skin":"res/main/ic_star.png"}}]},{"type":"Box","props":{"y":28,"x":362},"child":[{"type":"Image","props":{"y":14,"x":30,"skin":"res/main/ic_bg.png"}},{"type":"Label","props":{"y":21,"x":64,"width":76,"var":"coinNum","text":"56","height":24,"fontSize":24,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"skin":"res/main/ic_coin.png"}}]},{"type":"Box","props":{"y":31,"x":190},"child":[{"type":"Image","props":{"y":14,"x":30,"skin":"res/main/ic_bg.png"}},{"type":"Image","props":{"width":60,"skin":"res/main/ic_power.png","height":60}},{"type":"Label","props":{"y":21,"x":64,"width":52,"var":"heartNum","text":"99","height":24,"fontSize":24,"color":"#ffffff","align":"center"}}]},{"type":"Button","props":{"y":45,"x":304,"var":"btnAddPower","stateNum":1,"skin":"res/main/btn_add.png"}},{"type":"Label","props":{"y":324,"x":36,"text":"签到","fontSize":25,"color":"#ffffff"}},{"type":"Label","props":{"y":15,"x":507,"var":"btnDev","text":"打开调试面板","fontSize":40,"color":"#ffffff"}},{"type":"Label","props":{"y":844,"x":267,"width":216,"var":"tfName","height":25,"fontSize":30,"color":"#ff3300","bold":true,"align":"center"}},{"type":"Box","props":{"y":880,"x":314,"var":"star"},"child":[{"type":"Image","props":{"y":0,"x":-6,"var":"star_0","skin":"res/common/star.png","scaleY":0.8,"scaleX":0.8}},{"type":"Image","props":{"x":38,"var":"star_1","skin":"res/common/star.png","scaleY":0.8,"scaleX":0.8}},{"type":"Image","props":{"y":0,"x":82,"var":"star_2","skin":"res/common/star.png","scaleY":0.8,"scaleX":0.8}}]},{"type":"Box","props":{"y":883,"x":312,"var":"condBox"},"child":[{"type":"Image","props":{"var":"icon","skin":"res/common/3.png","scaleY":0.5,"scaleX":0.5}},{"type":"Label","props":{"y":7,"x":53,"width":91,"var":"tfItemNum","text":"1/10","height":25,"fontSize":30,"color":"#000000","bold":true,"align":"left"}}]},{"type":"Button","props":{"y":956,"x":253,"var":"btnUnlock","stateNum":1,"skin":"res/common/btn_yellow2.png","labelStrokeColor":"#dddddd","labelStroke":2,"labelSize":32,"labelColors":"#ffffff,#ffffff,#ffffff","label":"解锁"}},{"type":"Button","props":{"y":956,"x":253,"var":"btnPlay","stateNum":1,"skin":"res/common/btn_yellow2.png","labelStrokeColor":"#dddddd","labelStroke":2,"labelSize":32,"labelColors":"#ffffff,#ffffff,#ffffff","label":"开始"}}]};
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

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"y":0,"x":0,"width":750,"var":"bg","height":1334}},{"type":"Image","props":{"y":56,"x":40,"var":"btnPause","skin":"res/game/btn_pause.png"}},{"type":"Box","props":{"y":932,"x":18,"var":"selectBox","height":400},"child":[{"type":"Rect","props":{"y":110,"x":165,"width":380,"lineWidth":1,"height":60,"fillColor":"#3A4B63"}},{"type":"Image","props":{"skin":"res/game/bj_play_tc.png"}},{"type":"Button","props":{"y":210,"x":222,"var":"btnStart","stateNum":1,"skin":"res/game/btn_go.png"}},{"type":"Label","props":{"y":121,"x":151,"width":407,"var":"tfName","text":"第1首","height":40,"fontSize":36,"font":"Arial","color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":329,"x":304,"skin":"res/game/ic_power1.png"}},{"type":"Label","props":{"y":342,"x":371,"width":154,"text":"-1","height":32,"fontSize":24,"font":"PingFangSC-Semibold","color":"#ffffff","align":"left"}}]},{"type":"Box","props":{"y":166,"x":64,"width":35,"var":"proBox","height":259},"child":[{"type":"ProgressBar","props":{"y":252,"x":14,"width":240,"var":"bar","value":0,"skin":"res/game/progress.png","rotation":-90}},{"type":"Image","props":{"y":-7,"x":0,"var":"star_2","skin":"res/game/star_b.png"}},{"type":"Image","props":{"y":78,"x":0,"var":"star_1","skin":"res/game/star_b.png"}},{"type":"Image","props":{"y":157,"x":0,"var":"star_0","skin":"res/game/star_b.png"}},{"type":"Image","props":{"y":237,"x":6,"skin":"res/game/origin.png"}}]},{"type":"Label","props":{"y":100,"x":536,"width":189,"var":"tfScore","valign":"middle","text":"0","height":96,"fontSize":76,"font":"Arial","color":"#ffffff","align":"right"}},{"type":"Image","props":{"y":51,"x":39,"var":"backBtn","skin":"res/game/btn_home.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.pages.GamePageUI.uiView);

        }

    }
}

module ui.pages {
    export class LoadingPageUI extends View {
		public loading:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"res/main/bj_homepage@2x.png"}},{"type":"Image","props":{"y":298,"x":119,"skin":"res/main/ic_ear.png"}},{"type":"Image","props":{"y":1031,"x":375,"var":"loading","skin":"res/main/loading.png","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":787,"x":153,"width":444,"text":"佩戴耳机体验更好哦~","height":54,"fontSize":36,"font":"PingFangSC-Semibold","color":"#825201","align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.pages.LoadingPageUI.uiView);

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
		public btnHome:Laya.Image;
		public btnRestart:Laya.Image;
		public btnResume:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":936},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"res/role/bj_ranking_tc.png"}},{"type":"Image","props":{"y":67,"x":54,"var":"btnHome","skin":"res/game/btn_home.png"}},{"type":"Image","props":{"y":432,"x":343,"var":"btnRestart","skin":"res/game/btn_again.png"}},{"type":"Button","props":{"y":432,"x":37,"var":"btnResume","stateNum":1,"skin":"res/game/btn_continue.png"}},{"type":"Label","props":{"y":7,"x":169,"width":301,"text":"暂停","height":66,"fontSize":48,"color":"#ffffff","align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
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

        public static  uiView:any ={"type":"View","props":{"width":640,"height":936},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"res/role/bj_ranking_tc.png"}},{"type":"Image","props":{"y":51,"x":39,"var":"homebtn","skin":"res/game/btn_home.png"}},{"type":"Image","props":{"y":339,"x":170,"var":"star1","skin":"res/game/ic_star_result_b.png","rotation":-30,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":340,"x":502,"var":"star3","skin":"res/game/ic_star_result_gray_b.png","rotation":30,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":147,"x":265,"var":"star2","skin":"res/game/ic_star_result_gray_b.png"}},{"type":"Label","props":{"y":543,"x":67,"width":301,"var":"scorelabel","text":"14分","height":66,"fontSize":60,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":7,"x":207,"width":226,"var":"tip","text":"加油哦","height":46,"fontSize":48,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":527,"x":369,"skin":"res/game/ic_coin.png"}},{"type":"Label","props":{"y":558,"x":476,"var":"coinLabel","text":"X10","fontSize":40,"color":"#ffffff"}},{"type":"Image","props":{"y":628,"x":0,"skin":"res/game/bj_single.png"},"child":[{"type":"Label","props":{"y":35,"x":172,"var":"musicname","text":"天空之城","fontSize":32,"color":"#666666","bold":true,"align":"left"}},{"type":"Label","props":{"y":88,"x":172,"var":"authname","text":"久石让","fontSize":26,"color":"#999999"}}]},{"type":"Image","props":{"y":801,"x":212,"var":"restartbtn","skin":"res/game/btn_again.png"}},{"type":"Image","props":{"y":801,"x":208,"visible":false,"var":"nextBtn","skin":"res/game/btn_next.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.views.GameResultViewUI.uiView);

        }

    }
}

module ui.views {
    export class GameReviveUI extends View {
		public btnConfirm:Laya.Image;
		public btnBack:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":936},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"res/role/bj_ranking_tc.png"}},{"type":"Image","props":{"y":678,"x":181,"var":"btnConfirm","skin":"res/game/btn_sure.png"}},{"type":"Label","props":{"y":7,"x":157,"width":301,"text":"复活","height":66,"fontSize":48,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":442,"x":89,"width":160,"text":"使用","height":66,"fontSize":48,"color":"#ffffff","align":"right"}},{"type":"Image","props":{"y":441,"x":263,"skin":"res/main/ic_power.png"}},{"type":"Label","props":{"y":443,"x":375,"width":160,"text":"复活","height":66,"fontSize":48,"color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":447,"x":332,"width":59,"text":"-1","height":52,"fontSize":36,"color":"#ffffff","align":"left"}},{"type":"Image","props":{"y":50,"x":590,"var":"btnBack","skin":"res/main/btn_close.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.views.GameReviveUI.uiView);

        }

    }
}

module ui.views.home {
    export class AddPowerUI extends View {
		public btnClose:Laya.Button;
		public btnWatch:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1134},"child":[{"type":"Image","props":{"y":287,"x":55,"width":642,"skin":"res/main/bj_power_tc.png","sizeGrid":"150,50,50,50","height":577}},{"type":"Label","props":{"y":316,"x":269,"width":211,"text":"获取体力","height":54,"fontSize":38,"font":"PingFangSC-Semibold","color":"#ffffff","align":"center"}},{"type":"Button","props":{"y":302,"x":641,"var":"btnClose","stateNum":1,"skin":"res/main/btn_close.png"}},{"type":"Button","props":{"y":723,"x":260,"var":"btnWatch","stateNum":1,"skin":"res/main/btn_watch.png"}},{"type":"Image","props":{"y":428,"x":271,"skin":"res/main/ic_add_power.png"}},{"type":"Label","props":{"y":668,"x":220,"width":211,"text":"看视频增加体力","height":39,"fontSize":28,"font":"PingFangSC-Semibold","color":"#666666","align":"right"}},{"type":"Image","props":{"y":654,"x":438,"skin":"res/main/ic_power1.png"}},{"type":"Label","props":{"y":668,"x":500,"width":211,"text":"x1","height":39,"fontSize":28,"font":"PingFangSC-Semibold","color":"#666666","align":"left"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.views.home.AddPowerUI.uiView);

        }

    }
}

module ui.views.home {
    export class ChapterItemUI extends View {
		public box:Laya.Box;
		public pic:Laya.Image;
		public lock:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":300,"height":300},"child":[{"type":"Box","props":{"y":150,"x":150,"var":"box","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":0,"x":0,"width":300,"var":"pic","skin":"res/icon/1.png","height":300}}]},{"type":"Image","props":{"y":119,"x":113,"var":"lock","skin":"res/common/lock.png","scaleY":1.5,"scaleX":1.5}}]};
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
    export class RoleItemRenderUI extends View {
		public roleimg:Laya.Image;
		public rolename:Laya.Label;
		public tip:Laya.Label;
		public useBtn:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":120},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"skin":"res/common/bg_white.png","sizeGrid":"20,20,20,20","height":120}},{"type":"Image","props":{"y":10,"x":14,"width":100,"var":"roleimg","skin":"res/ic_role/xhj.png","height":100}},{"type":"Label","props":{"y":23,"x":134,"var":"rolename","text":"角色","fontSize":30,"color":"#404040"}},{"type":"Label","props":{"y":69,"x":134,"var":"tip","text":"连续签到七天可以解锁","fontSize":20,"color":"#999999"}},{"type":"Button","props":{"y":28,"x":471,"var":"useBtn","stateNum":1,"skin":"res/role/btn_use.png","labelSize":24,"labelBold":true,"label":"使用"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.views.RoleItemRenderUI.uiView);

        }

    }
}

module ui.views {
    export class RoleViewUI extends View {
		public closebtn:Laya.Image;
		public rolelist:Laya.List;

        public static  uiView:any ={"type":"View","props":{"width":650,"height":960},"child":[{"type":"Image","props":{"y":12,"x":5,"skin":"res/role/bj_role_tc.png"},"child":[{"type":"Label","props":{"y":14,"x":280,"width":80,"text":"角色","height":40,"fontSize":40,"color":"#ffffff","bold":true}},{"type":"Image","props":{"y":57,"x":587,"var":"closebtn","skin":"res/main/btn_close.png"}},{"type":"List","props":{"y":135,"x":20,"width":600,"var":"rolelist","spaceY":12,"repeatX":1,"height":785},"child":[{"type":"RoleItemRender","props":{"runtime":"RoleItem","name":"render"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("RoleItem",RoleItem);

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

module ui.views {
    export class XAlertUIUI extends View {
		public tfTitle:Laya.Label;
		public tfMsg:Laya.Label;
		public btnYes:Laya.Button;
		public btnNo:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":642,"height":434},"child":[{"type":"Image","props":{"y":0,"x":0,"width":642,"skin":"res/main/bj_power_tc.png","sizeGrid":"124,0,75,0","height":434},"child":[{"type":"Label","props":{"y":29,"x":151,"width":337,"var":"tfTitle","text":"体力不足","height":54,"fontSize":42,"font":"PingFangSC-Semibold","color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":181,"x":120,"wordWrap":true,"width":400,"var":"tfMsg","text":"   今天的体力用完了， 明天再来宠幸我吧~","leading":10,"height":98,"fontSize":36,"font":"PingFangSC-Semibold","color":"#666666","align":"center"}},{"type":"Button","props":{"y":313,"x":158,"var":"btnYes","stateNum":1,"skin":"res/common/btn_yellow.png","labelSize":32}},{"type":"Button","props":{"y":313,"x":350,"var":"btnNo","stateNum":1,"skin":"res/common/btn_red.png","labelSize":32,"label":"label"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.views.XAlertUIUI.uiView);

        }

    }
}
