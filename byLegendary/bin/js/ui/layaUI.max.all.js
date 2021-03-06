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
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var bag;
    (function (bag) {
        var BagUI = /** @class */ (function (_super) {
            __extends(BagUI, _super);
            function BagUI() {
                return _super.call(this) || this;
            }
            BagUI.prototype.createChildren = function () {
                View.regComponent("BagItem", BagItem);
                _super.prototype.createChildren.call(this);
                this.createView(ui.bag.BagUI.uiView);
            };
            BagUI.uiView = { "type": "View", "props": { "width": 700, "height": 800 }, "child": [{ "type": "Box", "props": { "y": 0, "x": 0 }, "child": [{ "type": "Image", "props": { "y": 30, "width": 700, "skin": "share/winFrame1.png", "sizeGrid": "66,49,50,37", "height": 770 } }, { "type": "Image", "props": { "x": 116, "width": 467, "skin": "share/winTitle.png", "sizeGrid": "0,205,0,204", "height": 80 } }, { "type": "Label", "props": { "y": 19, "x": 250, "width": 200, "var": "tfTitle", "text": "背包", "height": 24, "fontSize": 24, "color": "#ffffff", "align": "center" } }, { "type": "Button", "props": { "y": 23, "x": 638, "var": "btnClose", "stateNum": 1, "skin": "share/btn_close.png" } }] }, { "type": "List", "props": { "y": 99, "x": 30, "width": 640, "var": "itemList", "spaceY": 10, "height": 648 }, "child": [{ "type": "BagItem", "props": { "runtime": "BagItem", "name": "render" } }] }] };
            return BagUI;
        }(View));
        bag.BagUI = BagUI;
    })(bag = ui.bag || (ui.bag = {}));
})(ui || (ui = {}));
(function (ui) {
    var bag;
    (function (bag) {
        var BagItemUI = /** @class */ (function (_super) {
            __extends(BagItemUI, _super);
            function BagItemUI() {
                return _super.call(this) || this;
            }
            BagItemUI.prototype.createChildren = function () {
                View.regComponent("Item", Item);
                _super.prototype.createChildren.call(this);
                this.createView(ui.bag.BagItemUI.uiView);
            };
            BagItemUI.uiView = { "type": "View", "props": { "width": 640, "height": 120 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 640, "skin": "share/itemBG.png", "sizeGrid": "0,127,0,87", "height": 120 } }, { "type": "Item", "props": { "y": 1, "x": 6, "var": "item", "runtime": "Item" } }, { "type": "Label", "props": { "y": 14, "x": 127, "width": 271, "var": "tfName", "height": 30, "fontSize": 24, "color": "#ffffff", "align": "left" } }, { "type": "Label", "props": { "y": 52, "x": 130, "width": 271, "var": "tfDesc", "height": 30, "fontSize": 24, "color": "#ffffff", "align": "left" } }, { "type": "Button", "props": { "y": 13, "x": 486, "width": 131, "var": "btnUser", "stateNum": 1, "skin": "share/btn_green.png", "sizeGrid": "0,39,0,37", "labelSize": 24, "labelColors": "#ffffff,#ffffff,#ffffff", "label": "使用", "height": 70 } }] };
            return BagItemUI;
        }(View));
        bag.BagItemUI = BagItemUI;
    })(bag = ui.bag || (ui.bag = {}));
})(ui || (ui = {}));
(function (ui) {
    var bag;
    (function (bag) {
        var ItemUI = /** @class */ (function (_super) {
            __extends(ItemUI, _super);
            function ItemUI() {
                return _super.call(this) || this;
            }
            ItemUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.bag.ItemUI.uiView);
            };
            ItemUI.uiView = { "type": "View", "props": { "width": 120, "height": 120 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "var": "pic", "skin": "item/2.png" } }, { "type": "Image", "props": { "y": 0, "x": 0, "width": 120, "var": "frame", "skin": "share/frame.png", "sizeGrid": "13,13,18,13", "height": 120 } }, { "type": "Label", "props": { "y": 90, "x": 56, "width": 57, "var": "tfNum", "height": 20, "fontSize": 20, "color": "#ffffff", "align": "right" } }] };
            return ItemUI;
        }(View));
        bag.ItemUI = ItemUI;
    })(bag = ui.bag || (ui.bag = {}));
})(ui || (ui = {}));
(function (ui) {
    var fight;
    (function (fight) {
        var FightUI = /** @class */ (function (_super) {
            __extends(FightUI, _super);
            function FightUI() {
                return _super.call(this) || this;
            }
            FightUI.prototype.createChildren = function () {
                View.regComponent("Fighter", Fighter);
                _super.prototype.createChildren.call(this);
                this.createView(ui.fight.FightUI.uiView);
            };
            FightUI.uiView = { "type": "View", "props": { "width": 700, "height": 660 }, "child": [{ "type": "Box", "props": { "y": 0, "x": 0 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 700, "skin": "share/winFrame1.png", "sizeGrid": "66,49,50,37", "height": 660 } }] }, { "type": "Fighter", "props": { "y": 230, "x": 60, "var": "home_0", "runtime": "Fighter" } }, { "type": "Fighter", "props": { "y": 230, "x": 439, "var": "away_0", "runtime": "Fighter" } }, { "type": "Label", "props": { "y": 39, "x": 247, "width": 164, "var": "tfRnd", "height": 24, "fontSize": 24, "color": "#000000", "align": "center" } }] };
            return FightUI;
        }(View));
        fight.FightUI = FightUI;
    })(fight = ui.fight || (ui.fight = {}));
})(ui || (ui = {}));
(function (ui) {
    var fight;
    (function (fight) {
        var FighterUI = /** @class */ (function (_super) {
            __extends(FighterUI, _super);
            function FighterUI() {
                return _super.call(this) || this;
            }
            FighterUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.fight.FighterUI.uiView);
            };
            FighterUI.uiView = { "type": "View", "props": { "width": 200, "height": 200 }, "child": [{ "type": "Image", "props": { "y": 1, "x": 19, "width": 159, "skin": "pet/1.png", "height": 190 } }] };
            return FighterUI;
        }(View));
        fight.FighterUI = FighterUI;
    })(fight = ui.fight || (ui.fight = {}));
})(ui || (ui = {}));
(function (ui) {
    var gift;
    (function (gift) {
        var GiftUI = /** @class */ (function (_super) {
            __extends(GiftUI, _super);
            function GiftUI() {
                return _super.call(this) || this;
            }
            GiftUI.prototype.createChildren = function () {
                View.regComponent("TraineeGiftItem", TraineeGiftItem);
                _super.prototype.createChildren.call(this);
                this.createView(ui.gift.GiftUI.uiView);
            };
            GiftUI.uiView = { "type": "View", "props": { "width": 600, "height": 630 }, "child": [{ "type": "Box", "props": { "y": 0, "x": 0 }, "child": [{ "type": "Image", "props": { "y": 30, "width": 600, "skin": "share/winFrame1.png", "sizeGrid": "66,49,50,37", "height": 600 } }, { "type": "Image", "props": { "y": 0, "x": 56, "width": 467, "skin": "share/winTitle.png", "sizeGrid": "0,205,0,204", "height": 80 } }, { "type": "Label", "props": { "y": 19, "x": 190, "width": 200, "var": "tfTitle", "text": "新手礼包", "height": 24, "fontSize": 24, "color": "#ffffff", "align": "center" } }, { "type": "Button", "props": { "y": 23, "x": 538, "var": "btnClose", "stateNum": 1, "skin": "share/btn_close.png" } }] }, { "type": "GiftItem", "props": { "y": 138, "x": 78, "var": "item_0", "runtime": "TraineeGiftItem", "mouseEnabled": true } }, { "type": "GiftItem", "props": { "y": 138, "x": 335, "var": "item_1", "runtime": "TraineeGiftItem", "mouseEnabled": true } }, { "type": "GiftItem", "props": { "y": 358, "x": 87, "var": "item_2", "runtime": "TraineeGiftItem", "mouseEnabled": true } }] };
            return GiftUI;
        }(View));
        gift.GiftUI = GiftUI;
    })(gift = ui.gift || (ui.gift = {}));
})(ui || (ui = {}));
(function (ui) {
    var gift;
    (function (gift) {
        var GiftItemUI = /** @class */ (function (_super) {
            __extends(GiftItemUI, _super);
            function GiftItemUI() {
                return _super.call(this) || this;
            }
            GiftItemUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.gift.GiftItemUI.uiView);
            };
            GiftItemUI.uiView = { "type": "View", "props": { "width": 170, "height": 174 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "share/frame3.png" } }, { "type": "Image", "props": { "y": 27, "x": 25, "var": "pic", "skin": "item/2.png" } }, { "type": "Label", "props": { "y": 20, "x": 37, "width": 96, "var": "tfDay", "height": 23, "fontSize": 24, "color": "#ffffff", "align": "center" } }, { "type": "Label", "props": { "y": 130, "x": 37, "width": 96, "var": "tfName", "height": 23, "fontSize": 24, "color": "#000000", "align": "center" } }, { "type": "Image", "props": { "y": 49, "x": 41, "width": 92, "var": "flagGet", "skin": "share/picGet.png", "height": 81 } }] };
            return GiftItemUI;
        }(View));
        gift.GiftItemUI = GiftItemUI;
    })(gift = ui.gift || (ui.gift = {}));
})(ui || (ui = {}));
(function (ui) {
    var loading;
    (function (loading) {
        var LoadingUI = /** @class */ (function (_super) {
            __extends(LoadingUI, _super);
            function LoadingUI() {
                return _super.call(this) || this;
            }
            LoadingUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.loading.LoadingUI.uiView);
            };
            LoadingUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Label", "props": { "y": 674, "x": 320, "var": "tfPro", "text": "loading", "color": "#ffffff" } }] };
            return LoadingUI;
        }(View));
        loading.LoadingUI = LoadingUI;
    })(loading = ui.loading || (ui.loading = {}));
})(ui || (ui = {}));
(function (ui) {
    var main;
    (function (main) {
        var MainUI = /** @class */ (function (_super) {
            __extends(MainUI, _super);
            function MainUI() {
                return _super.call(this) || this;
            }
            MainUI.prototype.createChildren = function () {
                View.regComponent("Player", Player);
                _super.prototype.createChildren.call(this);
                this.createView(ui.main.MainUI.uiView);
            };
            MainUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "main/bg.jpg" } }, { "type": "Player", "props": { "y": 476, "x": 219, "var": "player", "runtime": "Player" } }, { "type": "Image", "props": { "y": 28, "x": 13, "width": 195, "skin": "share/bgWord.png", "height": 40 }, "child": [{ "type": "Image", "props": { "y": -9, "x": -2, "width": 55, "skin": "icon/jinbi.png", "height": 57 } }, { "type": "Label", "props": { "y": 6, "x": 57, "width": 129, "var": "tfGold", "height": 31, "fontSize": 24, "color": "#ffffff", "align": "center" } }] }, { "type": "Image", "props": { "y": 29, "x": 270, "width": 195, "skin": "share/bgWord.png", "height": 40 }, "child": [{ "type": "Image", "props": { "y": -12, "x": -11, "width": 55, "skin": "icon/diamond.png", "height": 57 } }, { "type": "Label", "props": { "y": 5, "x": 58, "width": 112, "var": "tfDiamond", "height": 31, "fontSize": 24, "color": "#ffffff", "align": "center" } }, { "type": "Button", "props": { "y": -4, "x": 170, "var": "btnAdd", "stateNum": 1, "skin": "share/btn_add.png" } }] }, { "type": "Button", "props": { "y": 1242, "x": 39, "width": 135, "var": "btnPlayer", "stateNum": 1, "skin": "share/btn_green.png", "sizeGrid": "0,39,0,36", "labelColors": "#ffffff,#ffffff,#ffffff", "label": "角色", "height": 70 } }, { "type": "Button", "props": { "y": 1242, "x": 177, "width": 135, "var": "btnFight", "stateNum": 1, "skin": "share/btn_green.png", "sizeGrid": "0,39,0,36", "labelColors": "#ffffff,#ffffff,#ffffff", "label": "战斗", "height": 70 } }, { "type": "Button", "props": { "y": 1242, "x": 315, "width": 135, "var": "btnTask", "stateNum": 1, "skin": "share/btn_green.png", "sizeGrid": "0,39,0,36", "labelColors": "#ffffff,#ffffff,#ffffff", "label": "事件", "height": 70 } }, { "type": "Button", "props": { "y": 1242, "x": 452, "width": 135, "var": "btnBag", "stateNum": 1, "skin": "share/btn_green.png", "sizeGrid": "0,39,0,36", "labelColors": "#ffffff,#ffffff,#ffffff", "label": "背包", "height": 70 } }, { "type": "Button", "props": { "y": 1242, "x": 590, "width": 135, "var": "btnShop", "stateNum": 1, "skin": "share/btn_green.png", "sizeGrid": "0,39,0,36", "labelColors": "#ffffff,#ffffff,#ffffff", "label": "商店", "height": 70 } }] };
            return MainUI;
        }(View));
        main.MainUI = MainUI;
    })(main = ui.main || (ui.main = {}));
})(ui || (ui = {}));
(function (ui) {
    var main;
    (function (main) {
        var PlayerUI = /** @class */ (function (_super) {
            __extends(PlayerUI, _super);
            function PlayerUI() {
                return _super.call(this) || this;
            }
            PlayerUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.main.PlayerUI.uiView);
            };
            PlayerUI.uiView = { "type": "View", "props": { "width": 264, "height": 320 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "var": "pic", "skin": "pet/1.png" } }, { "type": "Label", "props": { "y": 287, "x": 78, "width": 130, "var": "tfName", "text": "label", "height": 23, "fontSize": 20, "color": "#ffffff", "align": "center" } }] };
            return PlayerUI;
        }(View));
        main.PlayerUI = PlayerUI;
    })(main = ui.main || (ui.main = {}));
})(ui || (ui = {}));
(function (ui) {
    var MiniLLK;
    (function (MiniLLK) {
        var LLKItemUI = /** @class */ (function (_super) {
            __extends(LLKItemUI, _super);
            function LLKItemUI() {
                return _super.call(this) || this;
            }
            LLKItemUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.MiniLLK.LLKItemUI.uiView);
            };
            LLKItemUI.uiView = { "type": "View", "props": { "width": 60, "height": 60 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 60, "var": "pic", "skin": "item/400103.png" } }, { "type": "Image", "props": { "y": 0, "x": 0, "width": 60, "var": "frame", "skin": "share/frame.png", "sizeGrid": "13,13,18,13", "height": 60 } }] };
            return LLKItemUI;
        }(View));
        MiniLLK.LLKItemUI = LLKItemUI;
    })(MiniLLK = ui.MiniLLK || (ui.MiniLLK = {}));
})(ui || (ui = {}));
(function (ui) {
    var MiniLLK;
    (function (MiniLLK) {
        var LLKViewUI = /** @class */ (function (_super) {
            __extends(LLKViewUI, _super);
            function LLKViewUI() {
                return _super.call(this) || this;
            }
            LLKViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.MiniLLK.LLKViewUI.uiView);
            };
            LLKViewUI.uiView = { "type": "View", "props": { "width": 700, "height": 630 }, "child": [{ "type": "Box", "props": { "y": 0, "x": 0 }, "child": [{ "type": "Image", "props": { "y": 30, "width": 700, "skin": "share/winFrame1.png", "sizeGrid": "66,49,50,37", "height": 600 } }, { "type": "Image", "props": { "x": 116, "width": 467, "skin": "share/winTitle.png", "sizeGrid": "0,205,0,204", "height": 80 } }, { "type": "Label", "props": { "y": 19, "x": 250, "width": 200, "var": "tfTitle", "text": "label", "height": 24, "fontSize": 24, "color": "#ffffff", "align": "center" } }, { "type": "Button", "props": { "y": 23, "x": 638, "var": "btnClose", "stateNum": 1, "skin": "share/btn_close.png" } }] }] };
            return LLKViewUI;
        }(View));
        MiniLLK.LLKViewUI = LLKViewUI;
    })(MiniLLK = ui.MiniLLK || (ui.MiniLLK = {}));
})(ui || (ui = {}));
(function (ui) {
    var shop;
    (function (shop) {
        var ShopUI = /** @class */ (function (_super) {
            __extends(ShopUI, _super);
            function ShopUI() {
                return _super.call(this) || this;
            }
            ShopUI.prototype.createChildren = function () {
                View.regComponent("ShopItem", ShopItem);
                _super.prototype.createChildren.call(this);
                this.createView(ui.shop.ShopUI.uiView);
            };
            ShopUI.uiView = { "type": "View", "props": { "width": 700, "height": 660 }, "child": [{ "type": "Box", "props": { "y": 0, "x": 0 }, "child": [{ "type": "Image", "props": { "y": 30, "width": 700, "skin": "share/winFrame1.png", "sizeGrid": "66,49,50,37", "height": 630 } }, { "type": "Image", "props": { "x": 116, "width": 467, "skin": "share/winTitle.png", "sizeGrid": "0,205,0,204", "height": 80 } }, { "type": "Label", "props": { "y": 19, "x": 250, "width": 200, "var": "tfTitle", "text": "商店", "height": 24, "fontSize": 24, "color": "#ffffff", "align": "center" } }, { "type": "Button", "props": { "y": 23, "x": 638, "var": "btnClose", "stateNum": 1, "skin": "share/btn_close.png" } }] }, { "type": "List", "props": { "y": 108, "x": 60, "width": 582, "var": "itemList", "spaceY": 20, "spaceX": 20, "repeatY": 3, "repeatX": 5, "height": 519 }, "child": [{ "type": "ShopItem", "props": { "runtime": "ShopItem", "name": "render" } }] }] };
            return ShopUI;
        }(View));
        shop.ShopUI = ShopUI;
    })(shop = ui.shop || (ui.shop = {}));
})(ui || (ui = {}));
(function (ui) {
    var shop;
    (function (shop) {
        var ShopItemUI = /** @class */ (function (_super) {
            __extends(ShopItemUI, _super);
            function ShopItemUI() {
                return _super.call(this) || this;
            }
            ShopItemUI.prototype.createChildren = function () {
                View.regComponent("Item", Item);
                _super.prototype.createChildren.call(this);
                this.createView(ui.shop.ShopItemUI.uiView);
            };
            ShopItemUI.uiView = { "type": "View", "props": { "width": 100, "height": 160 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 120, "var": "frame", "skin": "share/frame.png", "sizeGrid": "13,13,18,13", "height": 160 } }, { "type": "Item", "props": { "y": 0, "x": 0, "var": "item", "runtime": "Item" } }, { "type": "Image", "props": { "y": 94, "x": 2, "width": 114, "skin": "share/btn_0.png", "height": 60 }, "child": [{ "type": "Image", "props": { "y": 30, "x": 1, "width": 28, "var": "icon", "skin": "icon/jinbi.png", "height": 29 } }, { "type": "Label", "props": { "y": 34, "x": 31, "width": 44, "var": "tfPriece", "height": 20, "fontSize": 20, "color": "#ffffff", "align": "center" } }, { "type": "Label", "props": { "y": 7, "x": 4, "width": 88, "var": "tfName", "height": 20, "fontSize": 20, "color": "#ffffff", "align": "center" } }] }] };
            return ShopItemUI;
        }(View));
        shop.ShopItemUI = ShopItemUI;
    })(shop = ui.shop || (ui.shop = {}));
})(ui || (ui = {}));
(function (ui) {
    var sign;
    (function (sign) {
        var SignUI = /** @class */ (function (_super) {
            __extends(SignUI, _super);
            function SignUI() {
                return _super.call(this) || this;
            }
            SignUI.prototype.createChildren = function () {
                View.regComponent("SignItem", SignItem);
                _super.prototype.createChildren.call(this);
                this.createView(ui.sign.SignUI.uiView);
            };
            SignUI.uiView = { "type": "View", "props": { "width": 600, "height": 630 }, "child": [{ "type": "Box", "props": { "y": 0, "x": 0 }, "child": [{ "type": "Image", "props": { "y": 30, "width": 600, "skin": "share/winFrame1.png", "sizeGrid": "66,49,50,37", "height": 600 } }, { "type": "Image", "props": { "y": 0, "x": 56, "width": 467, "skin": "share/winTitle.png", "sizeGrid": "0,205,0,204", "height": 80 } }, { "type": "Label", "props": { "y": 19, "x": 190, "width": 200, "var": "tfTitle", "text": "签到", "height": 24, "fontSize": 24, "color": "#ffffff", "align": "center" } }, { "type": "Button", "props": { "y": 23, "x": 538, "var": "btnClose", "stateNum": 1, "skin": "share/btn_close.png" } }] }, { "type": "SignItem", "props": { "y": 252, "x": 99, "var": "item1", "runtime": "SignItem" } }, { "type": "SignItem", "props": { "y": 252, "x": 276, "var": "item2", "runtime": "SignItem" } }, { "type": "SignItem", "props": { "y": 255, "x": 453, "var": "item3", "runtime": "SignItem" } }, { "type": "SignItem", "props": { "y": 401, "x": 99, "var": "item4", "runtime": "SignItem" } }, { "type": "SignItem", "props": { "y": 401, "x": 276, "var": "item5", "runtime": "SignItem" } }, { "type": "SignItem", "props": { "y": 404, "x": 453, "var": "item6", "runtime": "SignItem" } }, { "type": "SignItem", "props": { "y": 110, "x": 451, "var": "item0", "runtime": "SignItem" } }, { "type": "Label", "props": { "y": 118, "x": 82, "width": 363, "text": "签到7日，得大礼包", "height": 118, "fontSize": 24, "color": "#000000", "align": "center" } }, { "type": "Button", "props": { "y": 539, "x": 175, "width": 140, "var": "btnSign", "stateNum": 1, "skin": "share/btn_green.png", "sizeGrid": "0,37,0,37", "labelSize": 20, "labelColors": "#ffffff,#ffffff,#ffffff", "label": "领取", "height": 70 } }, { "type": "Button", "props": { "y": 540, "x": 333, "width": 140, "var": "btnDouble", "stateNum": 1, "skin": "share/btn_red.png", "sizeGrid": "0,35,0,38", "labelSize": 20, "labelColors": "#ffffff,#ffffff,#ffffff", "label": "双倍领取" } }] };
            return SignUI;
        }(View));
        sign.SignUI = SignUI;
    })(sign = ui.sign || (ui.sign = {}));
})(ui || (ui = {}));
(function (ui) {
    var sign;
    (function (sign) {
        var SignItemUI = /** @class */ (function (_super) {
            __extends(SignItemUI, _super);
            function SignItemUI() {
                return _super.call(this) || this;
            }
            SignItemUI.prototype.createChildren = function () {
                View.regComponent("Item", Item);
                _super.prototype.createChildren.call(this);
                this.createView(ui.sign.SignItemUI.uiView);
            };
            SignItemUI.uiView = { "type": "View", "props": { "width": 120, "height": 130 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 120, "var": "frame", "skin": "share/frame.png", "sizeGrid": "13,13,18,13", "height": 130 } }, { "type": "Item", "props": { "y": 0, "x": 0, "var": "item", "runtime": "Item" } }, { "type": "Image", "props": { "y": 94, "x": 2, "width": 114, "skin": "share/btn_0.png", "height": 30 }, "child": [{ "type": "Label", "props": { "y": 6, "x": 6, "width": 84, "var": "tfDay", "height": 20, "fontSize": 20, "color": "#ffffff", "align": "center" } }] }, { "type": "Label", "props": { "y": 7, "x": 6, "width": 88, "var": "tfName", "height": 20, "fontSize": 20, "color": "#ffffff", "align": "center" } }, { "type": "Image", "props": { "y": 16, "x": 13, "width": 92, "var": "flag", "skin": "share/picGet.png", "height": 81 } }] };
            return SignItemUI;
        }(View));
        sign.SignItemUI = SignItemUI;
    })(sign = ui.sign || (ui.sign = {}));
})(ui || (ui = {}));
(function (ui) {
    var task;
    (function (task) {
        var TaskViewUI = /** @class */ (function (_super) {
            __extends(TaskViewUI, _super);
            function TaskViewUI() {
                return _super.call(this) || this;
            }
            TaskViewUI.prototype.createChildren = function () {
                View.regComponent("Item", Item);
                _super.prototype.createChildren.call(this);
                this.createView(ui.task.TaskViewUI.uiView);
            };
            TaskViewUI.uiView = { "type": "View", "props": { "width": 700, "height": 630 }, "child": [{ "type": "Box", "props": { "y": 0, "x": 0 }, "child": [{ "type": "Image", "props": { "y": 30, "width": 700, "skin": "share/winFrame1.png", "sizeGrid": "66,49,50,37", "height": 600 } }, { "type": "Image", "props": { "x": 116, "width": 467, "skin": "share/winTitle.png", "sizeGrid": "0,205,0,204", "height": 80 } }, { "type": "Label", "props": { "y": 19, "x": 250, "width": 200, "var": "tfTitle", "text": "事件", "height": 24, "fontSize": 24, "color": "#ffffff", "align": "center" } }, { "type": "Button", "props": { "y": 23, "x": 638, "var": "btnClose", "stateNum": 1, "skin": "share/btn_close.png" } }] }, { "type": "Label", "props": { "y": 172, "x": 51, "width": 603, "var": "tfDesc", "text": "label", "height": 134, "fontSize": 24, "color": "#000000", "align": "left" } }, { "type": "Label", "props": { "y": 107, "x": 48, "width": 603, "var": "tfName", "text": "label", "height": 42, "fontSize": 28, "color": "#000000", "align": "center" } }, { "type": "Button", "props": { "y": 469, "x": 184, "width": 135, "var": "btnDrop", "stateNum": 1, "skin": "share/btn_yellow.png", "sizeGrid": "0,36,0,38", "labelColors": "#ffffff,#ffffff,#ffffff", "label": "放弃", "height": 70 } }, { "type": "Button", "props": { "y": 469, "x": 375, "width": 135, "var": "btnDone", "stateNum": 1, "skin": "share/btn_green.png", "sizeGrid": "0,37,0,37", "labelColors": "#ffffff,#ffffff,#ffffff", "label": "完成" } }, { "type": "List", "props": { "y": 342, "x": 78, "width": 544, "var": "itemList", "spaceX": 10, "height": 100 }, "child": [{ "type": "Item", "props": { "runtime": "Item", "name": "render" } }] }] };
            return TaskViewUI;
        }(View));
        task.TaskViewUI = TaskViewUI;
    })(task = ui.task || (ui.task = {}));
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map