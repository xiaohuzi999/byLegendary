
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
		public btns:Laya.Box;
		public btnSignin:Laya.Image;
		public roleBtn:Laya.Image;
		public btnUserInfo:Laya.Image;
		public diaMC:Laya.Box;
		public starNum:Laya.Label;
		public goldMC:Laya.Box;
		public coinNum:Laya.Label;
		public powerMC:Laya.Box;
		public heartNum:Laya.Label;
		public btnAddPower:Laya.Button;
		public chapList:Laya.List;
		public btnDev:Laya.Label;
		public tfName:Laya.Label;
		public star:Laya.Box;
		public tfScore:Laya.Label;
		public condBox:Laya.Box;
		public icon:Laya.Image;
		public tfItemNum:Laya.Label;
		public btnUnlock:Laya.Button;
		public btnPlay:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"bg","skin":"res/main/bj_homepage.png"}},{"type":"Box","props":{"y":68,"x":10,"var":"btns"},"child":[{"type":"Image","props":{"y":92,"x":26,"var":"btnSignin","skin":"res/main/btn_sign.png"}},{"type":"Image","props":{"y":92,"x":134,"visible":true,"var":"roleBtn","skin":"res/main/btn_mall.png"}},{"type":"Image","props":{"y":98,"x":238,"width":88,"visible":false,"var":"btnUserInfo","skin":"res/main/ic_add_power.png","height":88},"child":[{"type":"Sprite","props":{"y":0,"x":0,"width":88,"name":"mask","height":88},"child":[{"type":"Circle","props":{"y":44,"x":44,"radius":44,"lineWidth":1,"fillColor":"#d12424"}}]}]},{"type":"Box","props":{"var":"diaMC"},"child":[{"type":"Image","props":{"y":14,"x":30,"skin":"res/main/ic_bg.png"}},{"type":"Label","props":{"y":21,"x":64,"width":76,"var":"starNum","text":"11","height":24,"fontSize":24,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"width":60,"skin":"res/common/2.png"}}]},{"type":"Box","props":{"x":170,"var":"goldMC"},"child":[{"type":"Image","props":{"y":14,"x":30,"skin":"res/main/ic_bg.png"}},{"type":"Label","props":{"y":21,"x":64,"width":76,"var":"coinNum","text":"56","height":24,"fontSize":24,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"skin":"res/main/ic_coin.png"}}]},{"type":"Box","props":{"y":3,"x":342,"var":"powerMC"},"child":[{"type":"Image","props":{"y":14,"x":30,"skin":"res/main/ic_bg.png"}},{"type":"Image","props":{"width":60,"skin":"res/main/ic_power.png","height":60}},{"type":"Label","props":{"y":21,"x":64,"width":52,"var":"heartNum","text":"99","height":24,"fontSize":24,"color":"#ffffff","align":"center"}}]},{"type":"Button","props":{"y":17,"x":456,"var":"btnAddPower","stateNum":1,"skin":"res/main/btn_add.png"}}]},{"type":"List","props":{"y":519,"x":-86,"width":921,"var":"chapList","spaceX":10,"height":300},"child":[{"type":"ChapterItem","props":{"y":0,"x":0,"runtime":"ChaperItem","name":"render"}}]},{"type":"Label","props":{"y":15,"x":507,"visible":false,"var":"btnDev","text":"打开调试面板","fontSize":40,"color":"#ffffff"}},{"type":"Label","props":{"y":844,"x":267,"width":216,"var":"tfName","height":25,"fontSize":30,"color":"#ff3300","bold":true,"align":"center"}},{"type":"Box","props":{"y":887,"x":326,"var":"star"},"child":[{"type":"Label","props":{"width":97,"var":"tfScore","text":"1/10","height":25,"fontSize":30,"color":"#ff6600","bold":true,"align":"center"}}]},{"type":"Box","props":{"y":883,"x":312,"var":"condBox"},"child":[{"type":"Image","props":{"var":"icon","skin":"res/common/3.png","scaleY":0.6,"scaleX":0.6}},{"type":"Label","props":{"y":7,"x":53,"width":91,"var":"tfItemNum","text":"1/10","height":25,"fontSize":30,"color":"#000000","bold":true,"align":"left"}}]},{"type":"Button","props":{"y":956,"x":253,"var":"btnUnlock","stateNum":1,"skin":"res/common/btn_yellow2.png","labelStrokeColor":"#dddddd","labelStroke":2,"labelSize":32,"labelColors":"#6f5638,#6f5638,#6f5638","label":"解锁"}},{"type":"Button","props":{"y":956,"x":253,"var":"btnPlay","stateNum":1,"skin":"res/common/btn_yellow2.png","labelStrokeColor":"#dddddd","labelStroke":2,"labelSize":32,"labelColors":"#6f5638,#6f5638,#6f5638","label":"开始"}},{"type":"Label","props":{"y":21,"x":16,"width":352,"text":"Powered By LayaAir Engine","height":40,"fontSize":24,"color":"#6e6e6e","align":"left"}}]};
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

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Panel","props":{"y":355,"x":65,"width":620,"var":"panelOutput","height":900},"child":[{"type":"Rect","props":{"width":620,"lineWidth":1,"lineColor":"#333333","height":900,"fillColor":"#eeeeee"}},{"type":"Label","props":{"y":0,"x":0,"wordWrap":true,"width":620,"var":"labelOutput","fontSize":40}}]},{"type":"Box","props":{"y":235,"x":65},"child":[{"type":"Label","props":{"y":0,"x":0,"width":300,"var":"btnClearLocalData","valign":"middle","text":"清空本地数据","height":100,"fontSize":40,"color":"#ffffff","bgColor":"#3399ff","align":"center"}},{"type":"Label","props":{"y":0,"x":320,"width":300,"var":"btnClearRemoteData","valign":"middle","text":"清空远程数据","height":100,"fontSize":40,"color":"#ffffff","bgColor":"#3399ff","align":"center"}}]},{"type":"Box","props":{"y":115,"x":65},"child":[{"type":"Label","props":{"y":0,"x":0,"width":300,"var":"btnAddCoin","valign":"middle","text":"1000金币10体力","height":100,"fontSize":40,"color":"#ffffff","bgColor":"#3399ff","align":"center"}},{"type":"Label","props":{"y":0,"x":320,"width":300,"var":"btnExit","valign":"middle","text":"退出小游戏","height":100,"fontSize":40,"color":"#ffffff","bgColor":"#3399ff","align":"center"}}]},{"type":"Image","props":{"y":24,"x":24,"var":"btnBack","skin":"res/game/btn_home.png"}}]};
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
		public backBtn:Laya.Image;
		public selectBox:Laya.Box;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"y":0,"x":0,"width":750,"var":"bg","height":1334}},{"type":"Image","props":{"y":20,"x":20,"var":"btnPause","skin":"res/game/btn_pause.png"}},{"type":"Image","props":{"y":30,"x":20,"var":"backBtn","skin":"res/game/btn_home.png"}},{"type":"Box","props":{"y":932,"x":18,"var":"selectBox","height":400},"child":[{"type":"Image","props":{"y":196,"x":317,"skin":"res/game/hand.png"}},{"type":"Label","props":{"y":138,"x":165,"width":337,"text":"点击开始","height":54,"fontSize":42,"font":"PingFangSC-Semibold","color":"#ffffff","align":"center"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.pages.GamePageUI.uiView);

        }

    }
}

module ui.pages {
    export class LoadingPageUI extends View {
		public bg:Laya.Image;
		public loading:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"bg","skin":"res/main/bj_homepage.png"}},{"type":"Image","props":{"y":298,"x":119,"skin":"res/main/ic_ear.png"}},{"type":"Image","props":{"y":1031,"x":375,"var":"loading","skin":"res/main/loading.png","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":787,"x":153,"width":444,"text":"佩戴耳机体验更好哦~","height":54,"fontSize":36,"font":"PingFangSC-Semibold","color":"#825201","align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.pages.LoadingPageUI.uiView);

        }

    }
}

module ui.plugins {
    export class SignInUI extends View {
		public sign1:SignItem;
		public sign3:SignItem;
		public sign2:SignItem;
		public sign4:SignItem;
		public sign6:SignItem;
		public sign5:SignItem;
		public sign8:View;
		public sevenRoleLabel:Laya.Label;
		public sign7:SignItem;
		public btnReceice:Laya.Image;
		public btnClose:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":646,"height":1140},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"res/signin/bj_sign_tc.png"},"child":[{"type":"Image","props":{"y":113,"x":37,"width":571,"skin":"res/signin/item_bg3.png","sizeGrid":"55,48,47,42","height":801}},{"type":"Box","props":{"y":145,"x":70,"width":500,"height":600},"child":[{"type":"Box","props":{"y":0,"x":0},"child":[{"type":"SignInItem","props":{"y":0,"x":0,"var":"sign1","runtime":"SignItem"}},{"type":"SignInItem","props":{"y":0,"x":353,"var":"sign3","runtime":"SignItem"}},{"type":"SignInItem","props":{"y":0,"x":176,"var":"sign2","runtime":"SignItem"}}]},{"type":"Box","props":{"y":262,"x":0},"child":[{"type":"SignInItem","props":{"y":0,"x":0,"var":"sign4","runtime":"SignItem"}},{"type":"SignInItem","props":{"y":0,"x":353,"var":"sign6","runtime":"SignItem"}},{"type":"SignInItem","props":{"y":0,"x":176,"var":"sign5","runtime":"SignItem"}}]},{"type":"Box","props":{"y":511,"x":-18},"child":[{"type":"View","props":{"y":8,"x":-1,"width":546,"visible":false,"var":"sign8","height":211},"child":[{"type":"Rect","props":{"y":0,"x":-2,"width":550,"lineWidth":1,"height":47,"fillColor":"#e67178"}},{"type":"Label","props":{"y":10,"x":134,"width":277,"var":"sevenRoleLabel","text":"第七天","height":25,"fontSize":25,"color":"#ffffff","align":"center"}}]},{"type":"SignInItem","props":{"y":12,"x":25,"var":"sign7","runtime":"SignItem"}}]}]},{"type":"Image","props":{"y":1022,"x":309,"visible":true,"var":"btnReceice","skin":"res/signin/btn_get.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":72,"x":607,"var":"btnClose","skin":"res/game/btn_close.png","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":9,"x":214,"width":211,"text":"每日签到","height":53,"fontSize":40,"font":"PingFangSC-Semibold","color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Label","props":{"y":770,"x":298,"wordWrap":true,"width":309,"text":"奖励每周重置","height":82,"fontSize":36,"color":"#717171","align":"left"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("SignItem",SignItem);

            super.createChildren();
            this.createView(ui.plugins.SignInUI.uiView);

        }

    }
}

module ui.plugins {
    export class SignInItemUI extends View {
		public rewardImg:Laya.Image;
		public flag:Laya.Image;
		public tfDay:Laya.Label;
		public tfName:Laya.Label;
		public tfNum:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":146,"height":230},"child":[{"type":"Image","props":{"y":48,"x":13,"var":"rewardImg","skin":"res/signin/ic_coin.png"}},{"type":"Image","props":{"y":108,"x":104,"visible":false,"var":"flag","skin":"res/signin/btn_choose.png"}},{"type":"Image","props":{"y":0,"x":13,"skin":"res/signin/item_bg1.png"}},{"type":"Image","props":{"y":154,"x":16,"width":114,"skin":"res/signin/item_bg2.png","sizeGrid":"0,0,0,0","height":37}},{"type":"Label","props":{"y":212,"x":73,"width":146,"var":"tfDay","text":"第1天","height":25,"fontSize":25,"color":"#FF6788","bold":false,"anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Label","props":{"y":21,"x":73,"width":78,"var":"tfName","text":"体力","height":29,"fontSize":25,"color":"#ffffff","bold":false,"anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Label","props":{"y":172,"x":73,"width":146,"var":"tfNum","text":"x50","height":25,"fontSize":25,"color":"#4A74C3","bold":false,"anchorY":0.5,"anchorX":0.5,"align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.plugins.SignInItemUI.uiView);

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
		public iconDiamond:Laya.Image;
		public iconItem:Laya.Image;
		public iconGold:Laya.Image;
		public homebtn:Laya.Image;
		public btnRevive:Laya.Image;
		public tip:Laya.Label;
		public tfGold:Laya.Label;
		public tfDiamond:Laya.Label;
		public tfItem:Laya.Label;
		public tfScore:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":936},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"res/role/bj_ranking_tc.png"}},{"type":"Image","props":{"y":389,"x":196,"var":"iconDiamond","skin":"res/common/2.png"}},{"type":"Image","props":{"y":480,"x":196,"var":"iconItem","skin":"res/common/3.png"}},{"type":"Image","props":{"y":298,"x":196,"var":"iconGold","skin":"res/common/1.png"}},{"type":"Image","props":{"y":730,"x":334,"var":"homebtn","skin":"res/common/btn_yellow2.png"},"child":[{"type":"Label","props":{"y":31,"x":77,"width":108,"text":"返回","height":40,"fontSize":42,"color":"#6f5638","align":"center"}}]},{"type":"Image","props":{"y":731,"x":55,"var":"btnRevive","skin":"res/common/btn_yellow2.png"},"child":[{"type":"Label","props":{"y":8,"x":128,"width":46,"text":"-1","height":40,"fontSize":32,"color":"#6f5638"}},{"type":"Image","props":{"y":10,"x":86,"width":36,"skin":"res/common/ic_power1.png","height":36}},{"type":"Label","props":{"y":41,"x":74,"width":108,"text":"复活","height":40,"fontSize":42,"color":"#6f5638","align":"center"}}]},{"type":"Label","props":{"y":7,"x":207,"width":226,"var":"tip","text":"加油哦","height":46,"fontSize":48,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":305,"x":292,"width":156,"var":"tfGold","text":"X10","height":40,"fontSize":40,"color":"#ffffff"}},{"type":"Label","props":{"y":402,"x":292,"width":134,"var":"tfDiamond","text":"X10","height":40,"fontSize":40,"color":"#ffffff"}},{"type":"Label","props":{"y":492,"x":292,"width":165,"var":"tfItem","text":"X10","height":40,"fontSize":40,"color":"#ffffff"}},{"type":"Label","props":{"y":135,"x":175,"width":289,"var":"tfScore","text":"得分111","height":65,"fontSize":60,"color":"#ffffff","align":"center"}}]};
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
		public tfTip:Laya.Label;
		public btnWatch:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1134},"child":[{"type":"Image","props":{"y":287,"x":55,"width":642,"skin":"res/main/bj_power_tc.png","sizeGrid":"150,50,50,50","height":577}},{"type":"Button","props":{"y":302,"x":641,"var":"btnClose","stateNum":1,"skin":"res/main/btn_close.png"}},{"type":"Image","props":{"y":428,"x":271,"skin":"res/main/ic_add_power.png"}},{"type":"Image","props":{"y":654,"x":438,"skin":"res/main/ic_power1.png"}},{"type":"Label","props":{"y":316,"x":269,"width":211,"text":"获取体力","height":54,"fontSize":38,"font":"PingFangSC-Semibold","color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":668,"x":150,"width":281,"var":"tfTip","text":"看视频增加体力","height":39,"fontSize":28,"font":"PingFangSC-Semibold","color":"#666666","align":"right"}},{"type":"Label","props":{"y":668,"x":500,"width":211,"text":"x1","height":39,"fontSize":28,"font":"PingFangSC-Semibold","color":"#666666","align":"left"}},{"type":"Button","props":{"y":726,"x":268,"width":226,"var":"btnWatch","stateNum":1,"skin":"res/common/btn_yellow.png","sizeGrid":"25,48,40,49","labelSize":36,"labelPadding":"-5","labelColors":"#6F5638,#6F5638,#6F5638","labelBold":true,"label":"观看","height":93}}]};
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

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1134},"child":[{"type":"Image","props":{"y":287,"x":55,"skin":"res/main/bj_user_tc.png"}},{"type":"Button","props":{"y":302,"x":641,"var":"btnClose","stateNum":1,"skin":"res/main/btn_close.png"}},{"type":"Image","props":{"y":624,"x":569,"skin":"res/main/ic_user_coin.png"}},{"type":"Image","props":{"y":624,"x":337,"skin":"res/main/ic_user_power.png"}},{"type":"Image","props":{"y":631,"x":106,"width":65,"skin":"res/common/2.png","height":65}},{"type":"Label","props":{"y":479,"x":269,"width":211,"var":"nickLabel","text":"我本有心向明月","height":39,"fontSize":28,"font":"PingFangSC-Regular","color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":718,"x":78,"width":121,"var":"starLabel","text":"44","height":39,"fontSize":28,"font":"PingFangSC-Regular","color":"#484848","align":"center"}},{"type":"Label","props":{"y":718,"x":315,"width":121,"var":"heartLabel","text":"55","height":39,"fontSize":28,"font":"PingFangSC-Regular","color":"#484848","align":"center"}},{"type":"Label","props":{"y":718,"x":551,"width":121,"var":"musicLabel","text":"77","height":39,"fontSize":28,"font":"PingFangSC-Regular","color":"#484848","align":"center"}},{"type":"Label","props":{"y":528,"x":269,"width":211,"var":"userId","text":"ID 9527","height":39,"fontSize":28,"font":"PingFangSC-Regular","color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":317,"x":305,"width":140,"var":"avatar","height":140},"child":[{"type":"Sprite","props":{"width":140,"renderType":"mask","height":140},"child":[{"type":"Circle","props":{"y":70,"x":70,"radius":70,"lineWidth":1,"fillColor":"#ff0000"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.views.home.UserInfoUI.uiView);

        }

    }
}

module ui.views {
    export class LoadingViewUI extends View {
		public bg:Laya.Image;
		public loading:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1134},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"bg","skin":"res/main/bj_homepage.png"}},{"type":"Image","props":{"y":298,"x":119,"skin":"res/main/ic_ear.png"}},{"type":"Image","props":{"y":1031,"x":375,"var":"loading","skin":"res/main/loading.png","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":787,"x":153,"width":444,"text":"佩戴耳机体验更好哦~","height":54,"fontSize":36,"font":"PingFangSC-Semibold","color":"#FFAB20","align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.views.LoadingViewUI.uiView);

        }

    }
}

module ui.views {
    export class RoleItemRenderUI extends View {
		public useBtn:Laya.Button;
		public roleimg:Laya.Image;
		public rolename:Laya.Label;
		public tip:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":120},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"skin":"res/common/bg_white.png","sizeGrid":"20,20,20,20","height":120}},{"type":"Button","props":{"y":30,"x":461,"width":118,"var":"useBtn","stateNum":1,"skin":"res/common/btn_yellow.png","labelSize":24,"labelPadding":"-4","labelBold":true,"label":"使用","height":63}},{"type":"Image","props":{"y":10,"x":14,"width":100,"var":"roleimg","skin":"res/ic_role/xhj.png","height":100}},{"type":"Label","props":{"y":23,"x":134,"var":"rolename","text":"角色","fontSize":30,"color":"#404040"}},{"type":"Label","props":{"y":69,"x":134,"var":"tip","text":"连续签到七天可以解锁","fontSize":20,"color":"#999999"}}]};
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

        public static  uiView:any ={"type":"View","props":{"width":650,"height":960},"child":[{"type":"Image","props":{"y":12,"x":5,"skin":"res/role/bj_role_tc.png"},"child":[{"type":"Label","props":{"y":14,"x":280,"width":80,"text":"商店","height":40,"fontSize":40,"color":"#ffffff","bold":true}},{"type":"Image","props":{"y":57,"x":587,"var":"closebtn","skin":"res/main/btn_close.png"}},{"type":"List","props":{"y":135,"x":20,"width":600,"var":"rolelist","spaceY":12,"repeatX":1,"height":785},"child":[{"type":"RoleItemRender","props":{"runtime":"RoleItem","name":"render"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("RoleItem",RoleItem);

            super.createChildren();
            this.createView(ui.views.RoleViewUI.uiView);

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
    export class TipUI extends View {
		public tfName:Laya.Label;
		public tfDesc:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":316,"height":300},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"res/main/itemStrBG.png"}},{"type":"Label","props":{"y":15,"x":23,"width":270,"var":"tfName","text":"看视频增加体力","height":39,"fontSize":26,"color":"#6F5638","bold":true,"align":"center"}},{"type":"Label","props":{"y":65,"x":34,"wordWrap":true,"width":248,"var":"tfDesc","text":"看视频增加体力","height":193,"fontSize":24,"color":"#6F5638","align":"left"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.views.TipUI.uiView);

        }

    }
}

module ui.views {
    export class TipsUI extends View {
		public tfTitle:Laya.Label;
		public tfContent:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":606,"height":280},"child":[{"type":"Image","props":{"y":0,"x":0,"width":604,"skin":"res/main/bj_power_tc.png","height":275}},{"type":"Label","props":{"y":16,"x":197,"width":211,"var":"tfTitle","text":"提示","height":54,"fontSize":42,"font":"PingFangSC-Semibold","color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":116,"x":42,"wordWrap":true,"width":521,"var":"tfContent","text":"哎呀，服务器在打盹儿，等会再来吧~","leading":10,"height":98,"fontSize":36,"font":"PingFangSC-Semibold","color":"#666666","align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.views.TipsUI.uiView);

        }

    }
}

module ui.views {
    export class XAlertUIUI extends View {
		public tfTitle:Laya.Label;
		public tfMsg:Laya.Label;
		public btnYes:Laya.Button;
		public btnNo:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":642,"height":434},"child":[{"type":"Image","props":{"y":0,"x":0,"width":642,"skin":"res/main/bj_power_tc.png","sizeGrid":"124,0,75,0","height":434},"child":[{"type":"Label","props":{"y":29,"x":151,"width":337,"var":"tfTitle","text":"温馨提示","height":54,"fontSize":42,"font":"PingFangSC-Semibold","color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":181,"x":61,"wordWrap":true,"width":520,"var":"tfMsg","text":"   今天的体力用完了， 明天再来宠幸我吧~","leading":10,"height":98,"fontSize":36,"font":"PingFangSC-Semibold","color":"#666666","align":"center"}},{"type":"Button","props":{"y":313,"x":158,"var":"btnYes","stateNum":1,"skin":"res/common/btn_yellow.png","labelSize":32,"labelPadding":"-4"}},{"type":"Button","props":{"y":313,"x":350,"var":"btnNo","stateNum":1,"skin":"res/common/btn_red.png","labelSize":32,"labelPadding":"-4","label":"label"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.views.XAlertUIUI.uiView);

        }

    }
}
