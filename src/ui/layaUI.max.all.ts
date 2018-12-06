
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.bag {
    export class BagUI extends View {
		public tfTitle:Laya.Label;
		public btnClose:Laya.Button;
		public itemList:Laya.List;

        public static  uiView:any ={"type":"View","props":{"width":700,"height":800},"child":[{"type":"Box","props":{"y":0,"x":0},"child":[{"type":"Image","props":{"y":30,"width":700,"skin":"share/winFrame1.png","sizeGrid":"66,49,50,37","height":770}},{"type":"Image","props":{"x":116,"width":467,"skin":"share/winTitle.png","sizeGrid":"0,205,0,204","height":80}},{"type":"Label","props":{"y":19,"x":250,"width":200,"var":"tfTitle","text":"背包","height":24,"fontSize":24,"color":"#ffffff","align":"center"}},{"type":"Button","props":{"y":23,"x":638,"var":"btnClose","stateNum":1,"skin":"share/btn_close.png"}}]},{"type":"List","props":{"y":96,"x":30,"width":640,"var":"itemList","spaceY":10,"height":654},"child":[{"type":"BagItem","props":{"runtime":"BagItem","name":"render"}}]}]};
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

        public static  uiView:any ={"type":"View","props":{"width":640,"height":100},"child":[{"type":"Image","props":{"y":0,"x":0,"width":640,"skin":"share/itemBG.png","sizeGrid":"0,127,0,87","height":100}},{"type":"Item","props":{"y":1,"x":6,"var":"item","runtime":"Item"}},{"type":"Label","props":{"y":14,"x":127,"width":271,"var":"tfName","height":30,"fontSize":24,"color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":52,"x":130,"width":271,"var":"tfDesc","height":30,"fontSize":24,"color":"#ffffff","align":"left"}},{"type":"Button","props":{"y":13,"x":486,"width":131,"var":"btnUser","stateNum":1,"skin":"share/btn_green.png","sizeGrid":"0,39,0,37","labelSize":24,"labelColors":"#ffffff,#ffffff,#ffffff","label":"使用","height":70}}]};
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

        public static  uiView:any ={"type":"View","props":{"width":100,"height":100},"child":[{"type":"Image","props":{"y":20,"x":20,"width":60,"var":"pic","skin":"item/400103.png"}},{"type":"Image","props":{"y":0,"x":0,"width":100,"var":"frame","skin":"share/frame.png","sizeGrid":"13,13,18,13","height":100}},{"type":"Label","props":{"y":71,"x":36,"width":57,"var":"tfNum","height":20,"fontSize":20,"color":"#ffffff","align":"right"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.bag.ItemUI.uiView);

        }

    }
}

module ui.fight {
    export class FightUI extends View {
		public home_0:Fighter;
		public away_0:Fighter;

        public static  uiView:any ={"type":"View","props":{"width":700,"height":660},"child":[{"type":"Box","props":{"y":0,"x":0},"child":[{"type":"Image","props":{"y":0,"x":0,"width":700,"skin":"share/winFrame1.png","sizeGrid":"66,49,50,37","height":660}}]},{"type":"Fighter","props":{"y":230,"x":60,"var":"home_0","runtime":"Fighter"}},{"type":"Fighter","props":{"y":230,"x":439,"var":"away_0","runtime":"Fighter"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Fighter",Fighter);

            super.createChildren();
            this.createView(ui.fight.FightUI.uiView);

        }

    }
}

module ui.fight {
    export class FighterUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":200,"height":200},"child":[{"type":"Image","props":{"y":1,"x":19,"width":159,"skin":"pet/1.png","height":190}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.fight.FighterUI.uiView);

        }

    }
}

module ui.gift {
    export class GiftUI extends View {
		public tfTitle:Laya.Label;
		public btnClose:Laya.Button;
		public item_0:TraineeGiftItem;
		public item_1:TraineeGiftItem;
		public item_2:TraineeGiftItem;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":630},"child":[{"type":"Box","props":{"y":0,"x":0},"child":[{"type":"Image","props":{"y":30,"width":600,"skin":"share/winFrame1.png","sizeGrid":"66,49,50,37","height":600}},{"type":"Image","props":{"y":0,"x":56,"width":467,"skin":"share/winTitle.png","sizeGrid":"0,205,0,204","height":80}},{"type":"Label","props":{"y":19,"x":190,"width":200,"var":"tfTitle","text":"新手礼包","height":24,"fontSize":24,"color":"#ffffff","align":"center"}},{"type":"Button","props":{"y":23,"x":538,"var":"btnClose","stateNum":1,"skin":"share/btn_close.png"}}]},{"type":"GiftItem","props":{"y":138,"x":78,"var":"item_0","runtime":"TraineeGiftItem","mouseEnabled":true}},{"type":"GiftItem","props":{"y":138,"x":335,"var":"item_1","runtime":"TraineeGiftItem","mouseEnabled":true}},{"type":"GiftItem","props":{"y":358,"x":87,"var":"item_2","runtime":"TraineeGiftItem","mouseEnabled":true}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("TraineeGiftItem",TraineeGiftItem);

            super.createChildren();
            this.createView(ui.gift.GiftUI.uiView);

        }

    }
}

module ui.gift {
    export class GiftItemUI extends View {
		public pic:Laya.Image;
		public tfDay:Laya.Label;
		public tfName:Laya.Label;
		public flagGet:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":170,"height":174},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"share/frame3.png"}},{"type":"Image","props":{"y":75,"x":59,"width":60,"var":"pic","skin":"item/400103.png"}},{"type":"Label","props":{"y":20,"x":37,"width":96,"var":"tfDay","height":23,"fontSize":24,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":130,"x":37,"width":96,"var":"tfName","height":23,"fontSize":24,"color":"#000000","align":"center"}},{"type":"Image","props":{"y":49,"x":41,"width":92,"var":"flagGet","skin":"share/picGet.png","height":81}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gift.GiftItemUI.uiView);

        }

    }
}

module ui.loading {
    export class LoadingUI extends View {
		public tfPro:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Label","props":{"y":674,"x":320,"var":"tfPro","text":"loading","color":"#ffffff"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.loading.LoadingUI.uiView);

        }

    }
}

module ui.main {
    export class MainUI extends View {
		public player:Player;
		public tfGold:Laya.Label;
		public tfDiamond:Laya.Label;
		public btnAdd:Laya.Button;
		public btnPlayer:Laya.Button;
		public btnFight:Laya.Button;
		public btnTask:Laya.Button;
		public btnBag:Laya.Button;
		public btnShop:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"main/bg.jpg"}},{"type":"Player","props":{"y":476,"x":219,"var":"player","runtime":"Player"}},{"type":"Image","props":{"y":28,"x":13,"width":195,"skin":"share/bgWord.png","height":40},"child":[{"type":"Image","props":{"y":-9,"x":-2,"width":55,"skin":"icon/jinbi.png","height":57}},{"type":"Label","props":{"y":6,"x":57,"width":129,"var":"tfGold","height":31,"fontSize":24,"color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":29,"x":270,"width":195,"skin":"share/bgWord.png","height":40},"child":[{"type":"Image","props":{"y":-12,"x":-11,"width":55,"skin":"icon/diamond.png","height":57}},{"type":"Label","props":{"y":5,"x":58,"width":112,"var":"tfDiamond","height":31,"fontSize":24,"color":"#ffffff","align":"center"}},{"type":"Button","props":{"y":-4,"x":170,"var":"btnAdd","stateNum":1,"skin":"share/btn_add.png"}}]},{"type":"Button","props":{"y":1242,"x":39,"width":135,"var":"btnPlayer","stateNum":1,"skin":"share/btn_green.png","sizeGrid":"0,39,0,36","labelColors":"#ffffff,#ffffff,#ffffff","label":"角色","height":70}},{"type":"Button","props":{"y":1242,"x":177,"width":135,"var":"btnFight","stateNum":1,"skin":"share/btn_green.png","sizeGrid":"0,39,0,36","labelColors":"#ffffff,#ffffff,#ffffff","label":"战斗","height":70}},{"type":"Button","props":{"y":1242,"x":315,"width":135,"var":"btnTask","stateNum":1,"skin":"share/btn_green.png","sizeGrid":"0,39,0,36","labelColors":"#ffffff,#ffffff,#ffffff","label":"事件","height":70}},{"type":"Button","props":{"y":1242,"x":452,"width":135,"var":"btnBag","stateNum":1,"skin":"share/btn_green.png","sizeGrid":"0,39,0,36","labelColors":"#ffffff,#ffffff,#ffffff","label":"背包","height":70}},{"type":"Button","props":{"y":1242,"x":590,"width":135,"var":"btnShop","stateNum":1,"skin":"share/btn_green.png","sizeGrid":"0,39,0,36","labelColors":"#ffffff,#ffffff,#ffffff","label":"商店","height":70}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Player",Player);

            super.createChildren();
            this.createView(ui.main.MainUI.uiView);

        }

    }
}

module ui.main {
    export class PlayerUI extends View {
		public pic:Laya.Image;
		public tfName:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":264,"height":320},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"pic","skin":"pet/1.png"}},{"type":"Label","props":{"y":287,"x":78,"width":130,"var":"tfName","text":"label","height":23,"fontSize":20,"color":"#ffffff","align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.main.PlayerUI.uiView);

        }

    }
}

module ui.MiniLLK {
    export class LLKItemUI extends View {
		public pic:Laya.Image;
		public frame:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":60,"height":60},"child":[{"type":"Image","props":{"y":0,"x":0,"width":60,"var":"pic","skin":"item/400103.png"}},{"type":"Image","props":{"y":0,"x":0,"width":60,"var":"frame","skin":"share/frame.png","sizeGrid":"13,13,18,13","height":60}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.MiniLLK.LLKItemUI.uiView);

        }

    }
}

module ui.MiniLLK {
    export class LLKViewUI extends View {
		public tfTitle:Laya.Label;
		public btnClose:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":700,"height":630},"child":[{"type":"Box","props":{"y":0,"x":0},"child":[{"type":"Image","props":{"y":30,"width":700,"skin":"share/winFrame1.png","sizeGrid":"66,49,50,37","height":600}},{"type":"Image","props":{"x":116,"width":467,"skin":"share/winTitle.png","sizeGrid":"0,205,0,204","height":80}},{"type":"Label","props":{"y":19,"x":250,"width":200,"var":"tfTitle","text":"label","height":24,"fontSize":24,"color":"#ffffff","align":"center"}},{"type":"Button","props":{"y":23,"x":638,"var":"btnClose","stateNum":1,"skin":"share/btn_close.png"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.MiniLLK.LLKViewUI.uiView);

        }

    }
}

module ui.shop {
    export class ShopUI extends View {
		public tfTitle:Laya.Label;
		public btnClose:Laya.Button;
		public itemList:Laya.List;

        public static  uiView:any ={"type":"View","props":{"width":700,"height":660},"child":[{"type":"Box","props":{"y":0,"x":0},"child":[{"type":"Image","props":{"y":30,"width":700,"skin":"share/winFrame1.png","sizeGrid":"66,49,50,37","height":630}},{"type":"Image","props":{"x":116,"width":467,"skin":"share/winTitle.png","sizeGrid":"0,205,0,204","height":80}},{"type":"Label","props":{"y":19,"x":250,"width":200,"var":"tfTitle","text":"商店","height":24,"fontSize":24,"color":"#ffffff","align":"center"}},{"type":"Button","props":{"y":23,"x":638,"var":"btnClose","stateNum":1,"skin":"share/btn_close.png"}}]},{"type":"List","props":{"y":108,"x":60,"width":582,"var":"itemList","spaceY":20,"spaceX":20,"repeatY":3,"repeatX":5,"height":519},"child":[{"type":"ShopItem","props":{"runtime":"ShopItem","name":"render"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ShopItem",ShopItem);

            super.createChildren();
            this.createView(ui.shop.ShopUI.uiView);

        }

    }
}

module ui.shop {
    export class ShopItemUI extends View {
		public frame:Laya.Image;
		public item:Item;
		public icon:Laya.Image;
		public tfPriece:Laya.Label;
		public tfName:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":100,"height":160},"child":[{"type":"Image","props":{"y":0,"x":0,"width":100,"var":"frame","skin":"share/frame.png","sizeGrid":"13,13,18,13","height":160}},{"type":"Item","props":{"y":0,"x":0,"var":"item","runtime":"Item"}},{"type":"Image","props":{"y":94,"x":2,"width":96,"skin":"share/btn_0.png","height":60},"child":[{"type":"Image","props":{"y":30,"x":1,"width":28,"var":"icon","skin":"icon/jinbi.png","height":29}},{"type":"Label","props":{"y":34,"x":31,"width":44,"var":"tfPriece","height":20,"fontSize":20,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":7,"x":4,"width":88,"var":"tfName","height":20,"fontSize":20,"color":"#ffffff","align":"center"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Item",Item);

            super.createChildren();
            this.createView(ui.shop.ShopItemUI.uiView);

        }

    }
}

module ui.sign {
    export class SignUI extends View {
		public tfTitle:Laya.Label;
		public btnClose:Laya.Button;
		public item1:SignItem;
		public item2:SignItem;
		public item3:SignItem;
		public item4:SignItem;
		public item5:SignItem;
		public item6:SignItem;
		public item0:SignItem;
		public btnSign:Laya.Button;
		public btnDouble:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":630},"child":[{"type":"Box","props":{"y":0,"x":0},"child":[{"type":"Image","props":{"y":30,"width":600,"skin":"share/winFrame1.png","sizeGrid":"66,49,50,37","height":600}},{"type":"Image","props":{"y":0,"x":56,"width":467,"skin":"share/winTitle.png","sizeGrid":"0,205,0,204","height":80}},{"type":"Label","props":{"y":19,"x":190,"width":200,"var":"tfTitle","text":"签到","height":24,"fontSize":24,"color":"#ffffff","align":"center"}},{"type":"Button","props":{"y":23,"x":538,"var":"btnClose","stateNum":1,"skin":"share/btn_close.png"}}]},{"type":"SignItem","props":{"y":252,"x":99,"var":"item1","runtime":"SignItem"}},{"type":"SignItem","props":{"y":252,"x":276,"var":"item2","runtime":"SignItem"}},{"type":"SignItem","props":{"y":255,"x":453,"var":"item3","runtime":"SignItem"}},{"type":"SignItem","props":{"y":401,"x":99,"var":"item4","runtime":"SignItem"}},{"type":"SignItem","props":{"y":401,"x":276,"var":"item5","runtime":"SignItem"}},{"type":"SignItem","props":{"y":404,"x":453,"var":"item6","runtime":"SignItem"}},{"type":"SignItem","props":{"y":110,"x":451,"var":"item0","runtime":"SignItem"}},{"type":"Label","props":{"y":118,"x":82,"width":363,"text":"签到7日，得大礼包","height":118,"fontSize":24,"color":"#000000","align":"center"}},{"type":"Button","props":{"y":539,"x":175,"width":140,"var":"btnSign","stateNum":1,"skin":"share/btn_green.png","sizeGrid":"0,37,0,37","labelSize":20,"labelColors":"#ffffff,#ffffff,#ffffff","label":"领取","height":70}},{"type":"Button","props":{"y":540,"x":333,"width":140,"var":"btnDouble","stateNum":1,"skin":"share/btn_red.png","sizeGrid":"0,35,0,38","labelSize":20,"labelColors":"#ffffff,#ffffff,#ffffff","label":"双倍领取"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("SignItem",SignItem);

            super.createChildren();
            this.createView(ui.sign.SignUI.uiView);

        }

    }
}

module ui.sign {
    export class SignItemUI extends View {
		public frame:Laya.Image;
		public item:Item;
		public tfDay:Laya.Label;
		public tfName:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":100,"height":130},"child":[{"type":"Image","props":{"y":0,"x":0,"width":100,"var":"frame","skin":"share/frame.png","sizeGrid":"13,13,18,13","height":130}},{"type":"Item","props":{"y":0,"x":0,"var":"item","runtime":"Item"}},{"type":"Image","props":{"y":94,"x":2,"width":96,"skin":"share/btn_0.png","height":30},"child":[{"type":"Label","props":{"y":6,"x":6,"width":84,"var":"tfDay","height":20,"fontSize":20,"color":"#ffffff","align":"center"}}]},{"type":"Label","props":{"y":7,"x":6,"width":88,"var":"tfName","height":20,"fontSize":20,"color":"#ffffff","align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Item",Item);

            super.createChildren();
            this.createView(ui.sign.SignItemUI.uiView);

        }

    }
}

module ui.task {
    export class TaskViewUI extends View {
		public tfTitle:Laya.Label;
		public btnClose:Laya.Button;
		public tfDesc:Laya.Label;
		public tfName:Laya.Label;
		public itemList:Laya.List;

        public static  uiView:any ={"type":"View","props":{"width":700,"height":630},"child":[{"type":"Box","props":{"y":0,"x":0},"child":[{"type":"Image","props":{"y":30,"width":700,"skin":"share/winFrame1.png","sizeGrid":"66,49,50,37","height":600}},{"type":"Image","props":{"x":116,"width":467,"skin":"share/winTitle.png","sizeGrid":"0,205,0,204","height":80}},{"type":"Label","props":{"y":19,"x":250,"width":200,"var":"tfTitle","text":"事件","height":24,"fontSize":24,"color":"#ffffff","align":"center"}},{"type":"Button","props":{"y":23,"x":638,"var":"btnClose","stateNum":1,"skin":"share/btn_close.png"}}]},{"type":"Label","props":{"y":172,"x":51,"width":603,"var":"tfDesc","text":"label","height":134,"fontSize":24,"color":"#000000","align":"left"}},{"type":"Label","props":{"y":107,"x":48,"width":603,"var":"tfName","text":"label","height":42,"fontSize":28,"color":"#000000","align":"center"}},{"type":"Button","props":{"y":469,"x":184,"width":135,"stateNum":1,"skin":"share/btn_yellow.png","sizeGrid":"0,36,0,38","labelColors":"#ffffff,#ffffff,#ffffff","label":"放弃","height":70}},{"type":"Button","props":{"y":469,"x":375,"width":135,"stateNum":1,"skin":"share/btn_green.png","sizeGrid":"0,37,0,37","labelColors":"#ffffff,#ffffff,#ffffff","label":"完成"}},{"type":"List","props":{"y":342,"x":78,"width":544,"var":"itemList","spaceX":10,"height":100},"child":[{"type":"Item","props":{"runtime":"Item","name":"render"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Item",Item);

            super.createChildren();
            this.createView(ui.task.TaskViewUI.uiView);

        }

    }
}
