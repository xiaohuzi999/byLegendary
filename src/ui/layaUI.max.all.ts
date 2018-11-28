
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
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

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"main/bg.jpg"}},{"type":"Player","props":{"y":476,"x":219,"var":"player","runtime":"Player"}},{"type":"Image","props":{"y":28,"x":13,"width":195,"skin":"share/bgWord.png","height":40},"child":[{"type":"Image","props":{"y":-9,"x":-2,"width":55,"skin":"icons/jinbi.png","height":57}},{"type":"Label","props":{"y":6,"x":57,"width":129,"var":"tfGold","height":31,"fontSize":24,"color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":29,"x":270,"width":195,"skin":"share/bgWord.png","height":40},"child":[{"type":"Image","props":{"y":-12,"x":-11,"width":80,"skin":"icons/diamond.png","height":62}},{"type":"Label","props":{"y":5,"x":58,"width":112,"var":"tfDiamond","height":31,"fontSize":24,"color":"#ffffff","align":"center"}},{"type":"Button","props":{"y":-4,"x":170,"var":"btnAdd","stateNum":1,"skin":"share/btn_add.png"}}]}]};
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
