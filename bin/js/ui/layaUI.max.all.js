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
        var ItemUI = /** @class */ (function (_super) {
            __extends(ItemUI, _super);
            function ItemUI() {
                return _super.call(this) || this;
            }
            ItemUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.bag.ItemUI.uiView);
            };
            ItemUI.uiView = { "type": "View", "props": { "width": 100, "height": 100 }, "child": [{ "type": "Image", "props": { "y": 20, "x": 20, "width": 60, "var": "pic", "skin": "item/400103.png" } }, { "type": "Image", "props": { "y": 0, "x": 0, "width": 100, "var": "frame", "skin": "share/frame.png", "sizeGrid": "13,13,18,13", "height": 100 } }] };
            return ItemUI;
        }(View));
        bag.ItemUI = ItemUI;
    })(bag = ui.bag || (ui.bag = {}));
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
            MainUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "main/bg.jpg" } }, { "type": "Player", "props": { "y": 476, "x": 219, "var": "player", "runtime": "Player" } }, { "type": "Image", "props": { "y": 28, "x": 13, "width": 195, "skin": "share/bgWord.png", "height": 40 }, "child": [{ "type": "Image", "props": { "y": -9, "x": -2, "width": 55, "skin": "icon/jinbi.png", "height": 57 } }, { "type": "Label", "props": { "y": 6, "x": 57, "width": 129, "var": "tfGold", "height": 31, "fontSize": 24, "color": "#ffffff", "align": "center" } }] }, { "type": "Image", "props": { "y": 29, "x": 270, "width": 195, "skin": "share/bgWord.png", "height": 40 }, "child": [{ "type": "Image", "props": { "y": -12, "x": -11, "width": 80, "skin": "icon/diamond.png", "height": 62 } }, { "type": "Label", "props": { "y": 5, "x": 58, "width": 112, "var": "tfDiamond", "height": 31, "fontSize": 24, "color": "#ffffff", "align": "center" } }, { "type": "Button", "props": { "y": -4, "x": 170, "var": "btnAdd", "stateNum": 1, "skin": "share/btn_add.png" } }] }, { "type": "Button", "props": { "y": 1242, "x": 69, "width": 135, "var": "btnPlayer", "stateNum": 1, "skin": "share/btn_green.png", "sizeGrid": "0,39,0,36", "labelColors": "#ffffff,#ffffff,#ffffff", "label": "角色", "height": 70 } }, { "type": "Button", "props": { "y": 1242, "x": 223, "width": 135, "var": "btnFight", "stateNum": 1, "skin": "share/btn_green.png", "sizeGrid": "0,39,0,36", "labelColors": "#ffffff,#ffffff,#ffffff", "label": "战斗", "height": 70 } }, { "type": "Button", "props": { "y": 1242, "x": 376, "width": 135, "var": "btnTask", "stateNum": 1, "skin": "share/btn_green.png", "sizeGrid": "0,39,0,36", "labelColors": "#ffffff,#ffffff,#ffffff", "label": "事件", "height": 70 } }, { "type": "Button", "props": { "y": 1242, "x": 530, "width": 135, "stateNum": 1, "skin": "share/btn_green.png", "sizeGrid": "0,39,0,36", "labelColors": "#ffffff,#ffffff,#ffffff", "height": 70 } }] };
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
    var task;
    (function (task) {
        var TaskViewUI = /** @class */ (function (_super) {
            __extends(TaskViewUI, _super);
            function TaskViewUI() {
                return _super.call(this) || this;
            }
            TaskViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.task.TaskViewUI.uiView);
            };
            TaskViewUI.uiView = { "type": "View", "props": { "width": 700, "height": 630 }, "child": [{ "type": "Box", "props": { "y": 0, "x": 0 }, "child": [{ "type": "Image", "props": { "y": 30, "width": 700, "skin": "share/winFrame1.png", "sizeGrid": "66,49,50,37", "height": 600 } }, { "type": "Image", "props": { "x": 116, "width": 467, "skin": "share/winTitle.png", "sizeGrid": "0,205,0,204", "height": 80 } }, { "type": "Label", "props": { "y": 19, "x": 250, "width": 200, "var": "tfTitle", "text": "事件", "height": 24, "fontSize": 24, "color": "#ffffff", "align": "center" } }, { "type": "Button", "props": { "y": 23, "x": 638, "var": "btnClose", "stateNum": 1, "skin": "share/btn_close.png" } }] }, { "type": "Label", "props": { "y": 172, "x": 51, "width": 603, "var": "tfDesc", "text": "label", "height": 134, "fontSize": 24, "color": "#000000", "align": "left" } }, { "type": "Label", "props": { "y": 107, "x": 48, "width": 603, "var": "tfName", "text": "label", "height": 42, "fontSize": 28, "color": "#000000", "align": "center" } }, { "type": "Button", "props": { "y": 469, "x": 184, "width": 135, "stateNum": 1, "skin": "share/btn_yellow.png", "sizeGrid": "0,36,0,38", "labelColors": "#ffffff,#ffffff,#ffffff", "label": "放弃", "height": 70 } }, { "type": "Button", "props": { "y": 469, "x": 375, "width": 135, "stateNum": 1, "skin": "share/btn_green.png", "sizeGrid": "0,37,0,37", "labelColors": "#ffffff,#ffffff,#ffffff", "label": "完成" } }] };
            return TaskViewUI;
        }(View));
        task.TaskViewUI = TaskViewUI;
    })(task = ui.task || (ui.task = {}));
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map