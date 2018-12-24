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
    var common;
    (function (common) {
        var HomeViewUI = /** @class */ (function (_super) {
            __extends(HomeViewUI, _super);
            function HomeViewUI() {
                return _super.call(this) || this;
            }
            HomeViewUI.prototype.createChildren = function () {
                View.regComponent("ChaperItem", ChaperItem);
                _super.prototype.createChildren.call(this);
                this.createView(ui.common.HomeViewUI.uiView);
            };
            HomeViewUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "var": "bg", "skin": "res/main/bj_homepage@2x.png" } }, { "type": "Image", "props": { "y": 1159, "x": 330, "var": "roleBtn", "skin": "res/main/btn_role.png" } }, { "type": "Image", "props": { "y": 1159, "x": 64, "var": "btnRank", "skin": "res/main/btn_ranking.png" } }, { "type": "Image", "props": { "y": 1041, "x": 520, "visible": false, "var": "btnMore", "skin": "res/common/ic_more.png" } }, { "type": "Image", "props": { "y": 244, "x": 24, "var": "btnSignin", "skin": "res/main/btn_sign.png" } }, { "type": "List", "props": { "y": 519, "x": -78, "width": 901, "var": "chapList", "height": 295 }, "child": [{ "type": "ChapterItem", "props": { "y": 0, "x": 0, "runtime": "ChaperItem", "name": "render" } }] }, { "type": "Image", "props": { "y": 116, "x": 20, "width": 88, "var": "btnUserInfo", "skin": "res/main/ic_add_power.png", "height": 88 }, "child": [{ "type": "Sprite", "props": { "y": 0, "x": 0, "width": 88, "renderType": "mask", "height": 88 }, "child": [{ "type": "Circle", "props": { "y": 44, "x": 44, "radius": 44, "lineWidth": 1, "fillColor": "#d12424" } }] }] }, { "type": "Box", "props": { "y": 28, "x": 20 }, "child": [{ "type": "Image", "props": { "y": 14, "x": 30, "skin": "res/main/ic_bg.png" } }, { "type": "Label", "props": { "y": 21, "x": 64, "width": 76, "var": "starNum", "text": "11", "height": 24, "fontSize": 24, "color": "#ffffff", "align": "center" } }, { "type": "Image", "props": { "width": 60, "skin": "res/main/ic_star.png" } }] }, { "type": "Box", "props": { "y": 28, "x": 362 }, "child": [{ "type": "Image", "props": { "y": 14, "x": 30, "skin": "res/main/ic_bg.png" } }, { "type": "Label", "props": { "y": 21, "x": 64, "width": 76, "var": "coinNum", "text": "56", "height": 24, "fontSize": 24, "color": "#ffffff", "align": "center" } }, { "type": "Image", "props": { "skin": "res/main/ic_coin.png" } }] }, { "type": "Box", "props": { "y": 31, "x": 190 }, "child": [{ "type": "Image", "props": { "y": 14, "x": 30, "skin": "res/main/ic_bg.png" } }, { "type": "Image", "props": { "width": 60, "skin": "res/main/ic_power.png", "height": 60 } }, { "type": "Label", "props": { "y": 21, "x": 64, "width": 52, "var": "heartNum", "text": "99", "height": 24, "fontSize": 24, "color": "#ffffff", "align": "center" } }] }, { "type": "Button", "props": { "y": 45, "x": 304, "var": "btnAddPower", "stateNum": 1, "skin": "res/main/btn_add.png" } }, { "type": "Image", "props": { "y": 1159, "x": 605, "var": "cardBtn", "skin": "res/main/btn_card.png" } }, { "type": "Label", "props": { "y": 1279, "x": 71, "text": "排行榜", "fontSize": 25, "color": "#ffffff", "align": "center" } }, { "type": "Label", "props": { "y": 1279, "x": 350, "text": "角色", "fontSize": 25, "color": "#ffffff", "align": "center" } }, { "type": "Label", "props": { "y": 1279, "x": 600, "text": "音乐卡片", "fontSize": 25, "color": "#ffffff", "align": "center" } }, { "type": "Label", "props": { "y": 324, "x": 36, "text": "签到", "fontSize": 25, "color": "#ffffff" } }, { "type": "Label", "props": { "y": 15, "x": 507, "var": "btnDev", "text": "打开调试面板", "fontSize": 40, "color": "#ffffff" } }] };
            return HomeViewUI;
        }(View));
        common.HomeViewUI = HomeViewUI;
    })(common = ui.common || (ui.common = {}));
})(ui || (ui = {}));
(function (ui) {
    var dialogs;
    (function (dialogs) {
        var SigninDialogUI = /** @class */ (function (_super) {
            __extends(SigninDialogUI, _super);
            function SigninDialogUI() {
                return _super.call(this) || this;
            }
            SigninDialogUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.dialogs.SigninDialogUI.uiView);
            };
            SigninDialogUI.uiView = { "type": "Dialog", "props": { "width": 750, "height": 1334 } };
            return SigninDialogUI;
        }(Dialog));
        dialogs.SigninDialogUI = SigninDialogUI;
    })(dialogs = ui.dialogs || (ui.dialogs = {}));
})(ui || (ui = {}));
(function (ui) {
    var pages;
    (function (pages) {
        var DevPageUI = /** @class */ (function (_super) {
            __extends(DevPageUI, _super);
            function DevPageUI() {
                return _super.call(this) || this;
            }
            DevPageUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.pages.DevPageUI.uiView);
            };
            DevPageUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Panel", "props": { "y": 355, "x": 65, "width": 620, "var": "panelOutput", "height": 900 }, "child": [{ "type": "Rect", "props": { "width": 620, "lineWidth": 1, "lineColor": "#333333", "height": 900, "fillColor": "#eeeeee" } }, { "type": "Label", "props": { "y": 0, "x": 0, "wordWrap": true, "width": 620, "var": "labelOutput", "fontSize": 40 } }] }, { "type": "Box", "props": { "y": 235, "x": 65 }, "child": [{ "type": "Label", "props": { "y": 0, "x": 0, "width": 300, "var": "btnClearLocalData", "valign": "middle", "text": "清空本地数据", "height": 100, "fontSize": 40, "color": "#ffffff", "bgColor": "#3399ff", "align": "center" } }, { "type": "Label", "props": { "y": 0, "x": 320, "width": 300, "var": "btnClearRemoteData", "valign": "middle", "text": "清空远程数据", "height": 100, "fontSize": 40, "color": "#ffffff", "bgColor": "#3399ff", "align": "center" } }] }, { "type": "Box", "props": { "y": 115, "x": 65 }, "child": [{ "type": "Label", "props": { "y": 0, "x": 0, "width": 300, "var": "btnAddCoin", "valign": "middle", "text": "1000金币10体力", "height": 100, "fontSize": 40, "color": "#ffffff", "bgColor": "#3399ff", "align": "center" } }, { "type": "Label", "props": { "y": 0, "x": 320, "width": 300, "var": "btnExit", "valign": "middle", "text": "退出小游戏", "height": 100, "fontSize": 40, "color": "#ffffff", "bgColor": "#3399ff", "align": "center" } }] }, { "type": "Image", "props": { "y": 24, "x": 24, "var": "btnBack", "skin": "res/common/ic_back.png" } }] };
            return DevPageUI;
        }(View));
        pages.DevPageUI = DevPageUI;
    })(pages = ui.pages || (ui.pages = {}));
})(ui || (ui = {}));
(function (ui) {
    var pages;
    (function (pages) {
        var GamePageUI = /** @class */ (function (_super) {
            __extends(GamePageUI, _super);
            function GamePageUI() {
                return _super.call(this) || this;
            }
            GamePageUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.pages.GamePageUI.uiView);
            };
            GamePageUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 750, "var": "bg", "height": 1334 } }, { "type": "Image", "props": { "y": 56, "x": 40, "var": "btnPause", "skin": "res/game/btn_pause.png" } }, { "type": "Box", "props": { "y": 932, "x": 18, "var": "selectBox" }, "child": [{ "type": "Rect", "props": { "y": 110, "x": 165, "width": 380, "lineWidth": 1, "height": 60, "fillColor": "#3A4B63" } }, { "type": "Image", "props": { "skin": "res/game/bj_play_tc.png" } }, { "type": "Button", "props": { "y": 210, "x": 222, "var": "btnStart", "stateNum": 1, "skin": "res/game/btn_go.png" } }, { "type": "Label", "props": { "y": 121, "x": 151, "width": 407, "var": "tfName", "text": "第1首", "height": 40, "fontSize": 36, "font": "Arial", "color": "#ffffff", "align": "center" } }, { "type": "Image", "props": { "y": 329, "x": 304, "skin": "res/game/ic_power1.png" } }, { "type": "Label", "props": { "y": 342, "x": 371, "width": 154, "text": "-1", "height": 32, "fontSize": 24, "font": "PingFangSC-Semibold", "color": "#ffffff", "align": "left" } }] }, { "type": "Box", "props": { "y": 166, "x": 64, "width": 35, "var": "proBox", "height": 259 }, "child": [{ "type": "ProgressBar", "props": { "y": 252, "x": 14, "width": 240, "var": "bar", "value": 0, "skin": "res/game/progress.png", "rotation": -90 } }, { "type": "Image", "props": { "y": -7, "x": 0, "var": "star_2", "skin": "res/game/star_b.png" } }, { "type": "Image", "props": { "y": 78, "x": 0, "var": "star_1", "skin": "res/game/star_b.png" } }, { "type": "Image", "props": { "y": 157, "x": 0, "var": "star_0", "skin": "res/game/star_b.png" } }, { "type": "Image", "props": { "y": 237, "x": 6, "skin": "res/game/origin.png" } }] }, { "type": "Label", "props": { "y": 100, "x": 536, "width": 189, "var": "tfScore", "valign": "middle", "text": "0", "height": 96, "fontSize": 76, "font": "Arial", "color": "#ffffff", "align": "right" } }, { "type": "Image", "props": { "y": 51, "x": 39, "var": "backBtn", "skin": "res/game/btn_home.png" } }] };
            return GamePageUI;
        }(View));
        pages.GamePageUI = GamePageUI;
    })(pages = ui.pages || (ui.pages = {}));
})(ui || (ui = {}));
(function (ui) {
    var pages;
    (function (pages) {
        var LoadingPageUI = /** @class */ (function (_super) {
            __extends(LoadingPageUI, _super);
            function LoadingPageUI() {
                return _super.call(this) || this;
            }
            LoadingPageUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.pages.LoadingPageUI.uiView);
            };
            LoadingPageUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "res/main/bj_homepage@2x.png" } }, { "type": "Image", "props": { "y": 298, "x": 119, "skin": "res/main/ic_ear.png" } }, { "type": "Image", "props": { "y": 1031, "x": 375, "var": "loading", "skin": "res/main/loading.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Label", "props": { "y": 787, "x": 153, "width": 444, "text": "佩戴耳机体验更好哦~", "height": 54, "fontSize": 36, "font": "PingFangSC-Semibold", "color": "#FFAB20", "align": "center" } }] };
            return LoadingPageUI;
        }(View));
        pages.LoadingPageUI = LoadingPageUI;
    })(pages = ui.pages || (ui.pages = {}));
})(ui || (ui = {}));
(function (ui) {
    var plugins;
    (function (plugins) {
        var SignInUI = /** @class */ (function (_super) {
            __extends(SignInUI, _super);
            function SignInUI() {
                return _super.call(this) || this;
            }
            SignInUI.prototype.createChildren = function () {
                View.regComponent("ui.plugins.SignInItemUI", ui.plugins.SignInItemUI);
                View.regComponent("runtime.btn_img", runtime.btn_img);
                _super.prototype.createChildren.call(this);
                this.createView(ui.plugins.SignInUI.uiView);
            };
            SignInUI.uiView = { "type": "View", "props": { "y": 667, "x": 375, "width": 750, "height": 1334, "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Image", "props": { "y": 608, "x": 381, "skin": "res/signin/bj_sign_tc.png", "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Image", "props": { "y": 113, "x": 37, "width": 571, "skin": "res/signin/item_bg3.png", "sizeGrid": "55,48,47,42", "height": 801 } }, { "type": "Box", "props": { "y": 145, "x": 70, "width": 500, "height": 600 }, "child": [{ "type": "Box", "props": { "y": 0, "x": 0 }, "child": [{ "type": "SignInItem", "props": { "y": 0, "x": 0, "var": "sign1", "runtime": "ui.plugins.SignInItemUI" } }, { "type": "SignInItem", "props": { "y": 0, "x": 353, "var": "sign3", "runtime": "ui.plugins.SignInItemUI" } }, { "type": "SignInItem", "props": { "y": 0, "x": 176, "var": "sign2", "runtime": "ui.plugins.SignInItemUI" } }] }, { "type": "Box", "props": { "y": 262, "x": 0 }, "child": [{ "type": "SignInItem", "props": { "y": 0, "x": 0, "var": "sign4", "runtime": "ui.plugins.SignInItemUI" } }, { "type": "SignInItem", "props": { "y": 0, "x": 353, "var": "sign6", "runtime": "ui.plugins.SignInItemUI" } }, { "type": "SignInItem", "props": { "y": 0, "x": 176, "var": "sign5", "runtime": "ui.plugins.SignInItemUI" } }] }, { "type": "Box", "props": { "y": 511, "x": -18 }, "child": [{ "type": "View", "props": { "y": 8, "x": -1, "width": 546, "visible": false, "var": "sign8", "height": 211 }, "child": [{ "type": "Rect", "props": { "y": 0, "x": -2, "width": 550, "lineWidth": 1, "height": 47, "fillColor": "#e67178" } }, { "type": "Image", "props": { "y": 47, "x": -3, "skin": "res/ic_role/ic_signRole.png" } }, { "type": "Label", "props": { "y": 10, "x": 134, "width": 277, "var": "sevenRoleLabel", "text": "第七天", "height": 25, "fontSize": 25, "color": "#ffffff", "align": "center" } }] }, { "type": "SignInItem", "props": { "y": 11, "x": 177, "var": "sign7", "runtime": "ui.plugins.SignInItemUI" } }] }] }, { "type": "Image", "props": { "y": 1022, "x": 309, "visible": false, "var": "btnReceice", "skin": "res/signin/btn_get.png", "runtime": "runtime.btn_img", "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Label", "props": { "y": 127, "x": -99, "width": 491, "text": "连续签到可以获得更多奖励！", "height": 26, "fontSize": 24, "font": "PingFangSC-Semibold", "color": "#ffffff", "align": "center" } }] }, { "type": "Image", "props": { "y": 72, "x": 607, "var": "btnClose", "skin": "res/game/btn_close.png", "runtime": "runtime.btn_img", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Label", "props": { "y": 9, "x": 214, "width": 211, "text": "每日签到", "height": 53, "fontSize": 40, "font": "PingFangSC-Semibold", "color": "#ffffff", "bold": true, "align": "center" } }] }] };
            return SignInUI;
        }(View));
        plugins.SignInUI = SignInUI;
    })(plugins = ui.plugins || (ui.plugins = {}));
})(ui || (ui = {}));
(function (ui) {
    var plugins;
    (function (plugins) {
        var SignInItemUI = /** @class */ (function (_super) {
            __extends(SignInItemUI, _super);
            function SignInItemUI() {
                return _super.call(this) || this;
            }
            SignInItemUI.prototype.createChildren = function () {
                View.regComponent("runtime.btn_img", runtime.btn_img);
                _super.prototype.createChildren.call(this);
                this.createView(ui.plugins.SignInItemUI.uiView);
            };
            SignInItemUI.uiView = { "type": "View", "props": { "width": 146, "height": 230 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 13, "skin": "res/signin/item_bg1.png" }, "child": [{ "type": "Label", "props": { "y": 21, "x": 60, "width": 78, "var": "tfType", "text": "体力", "height": 29, "fontSize": 25, "color": "#ffffff", "bold": false, "anchorY": 0.5, "anchorX": 0.5, "align": "center" } }] }, { "type": "Label", "props": { "y": 212, "x": 73, "width": 146, "var": "dayLabel", "text": "第1天", "height": 25, "fontSize": 25, "color": "#FF6788", "bold": false, "anchorY": 0.5, "anchorX": 0.5, "align": "center" } }, { "type": "Image", "props": { "y": 48, "x": 13, "var": "rewardImg", "skin": "res/signin/ic_coin.png" } }, { "type": "Image", "props": { "y": 108, "x": 104, "visible": false, "var": "stateImg", "skin": "res/signin/btn_choose.png" } }, { "type": "Image", "props": { "y": 154, "x": 16, "width": 114, "skin": "res/signin/item_bg2.png", "sizeGrid": "0,0,0,0", "height": 37 }, "child": [{ "type": "Label", "props": { "y": 18, "x": 57, "width": 146, "var": "rewardCountLabel", "text": "x50", "height": 25, "fontSize": 25, "color": "#4A74C3", "bold": false, "anchorY": 0.5, "anchorX": 0.5, "align": "center" } }] }, { "type": "Image", "props": { "y": 175, "x": 74, "visible": false, "var": "buqianBtn", "skin": "res/signin/supplement.png", "runtime": "runtime.btn_img", "anchorY": 0.5, "anchorX": 0.5 } }] };
            return SignInItemUI;
        }(View));
        plugins.SignInItemUI = SignInItemUI;
    })(plugins = ui.plugins || (ui.plugins = {}));
})(ui || (ui = {}));
(function (ui) {
    var plugins;
    (function (plugins) {
        var SignResultUI = /** @class */ (function (_super) {
            __extends(SignResultUI, _super);
            function SignResultUI() {
                return _super.call(this) || this;
            }
            SignResultUI.prototype.createChildren = function () {
                View.regComponent("runtime.btn_img", runtime.btn_img);
                _super.prototype.createChildren.call(this);
                this.createView(ui.plugins.SignResultUI.uiView);
            };
            SignResultUI.uiView = { "type": "View", "props": { "y": 667, "x": 375, "width": 750, "height": 1334, "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Image", "props": { "y": 325, "x": 220, "skin": "res/signin/bj_get.png" }, "child": [{ "type": "Label", "props": { "y": 18, "x": 55, "text": "恭喜你获得", "fontSize": 40, "color": "#ffffff" } }] }, { "type": "Label", "props": { "y": 962, "x": 195, "text": "连续签到可以获得更多奖励", "fontSize": 30, "color": "#ffffff" } }, { "type": "Image", "props": { "y": 436, "x": 135, "var": "rewardImg", "skin": "res/signin/ic_power_get.png" } }, { "type": "Image", "props": { "y": 1077, "x": 242, "var": "getBtn", "skin": "res/signin/btn_sure.png", "runtime": "runtime.btn_img" } }, { "type": "Label", "props": { "y": 806, "x": 339, "var": "rewardLabel", "text": "X10", "fontSize": 40, "color": "#ffffff", "align": "center" } }] };
            return SignResultUI;
        }(View));
        plugins.SignResultUI = SignResultUI;
    })(plugins = ui.plugins || (ui.plugins = {}));
})(ui || (ui = {}));
(function (ui) {
    var views;
    (function (views) {
        var CountDownViewUI = /** @class */ (function (_super) {
            __extends(CountDownViewUI, _super);
            function CountDownViewUI() {
                return _super.call(this) || this;
            }
            CountDownViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.views.CountDownViewUI.uiView);
            };
            CountDownViewUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Sprite", "props": { "width": 750, "height": 1334, "alpha": 0.8 }, "child": [{ "type": "Rect", "props": { "width": 750, "lineWidth": 1, "height": 1334, "fillColor": "#000000" } }, { "type": "Label", "props": { "y": 473, "x": 187, "width": 376, "var": "countLabel", "valign": "middle", "text": "3", "height": 388, "fontSize": 200, "color": "#ffffff", "align": "center" } }] }] };
            return CountDownViewUI;
        }(View));
        views.CountDownViewUI = CountDownViewUI;
    })(views = ui.views || (ui.views = {}));
})(ui || (ui = {}));
(function (ui) {
    var views;
    (function (views) {
        var GamePauseUI = /** @class */ (function (_super) {
            __extends(GamePauseUI, _super);
            function GamePauseUI() {
                return _super.call(this) || this;
            }
            GamePauseUI.prototype.createChildren = function () {
                View.regComponent("runtime.btn_img", runtime.btn_img);
                _super.prototype.createChildren.call(this);
                this.createView(ui.views.GamePauseUI.uiView);
            };
            GamePauseUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Image", "props": { "y": 67, "x": 54, "var": "btnHome", "skin": "res/game/btn_home.png", "runtime": "runtime.btn_img" } }, { "type": "Image", "props": { "y": 945, "x": 420, "var": "btnRestart", "skin": "res/game/btn_again.png", "runtime": "runtime.btn_img" } }, { "type": "Button", "props": { "y": 945, "x": 87, "var": "btnResume", "stateNum": 1, "skin": "res/game/btn_continue.png" } }, { "type": "Label", "props": { "y": 546, "x": 224, "width": 301, "text": "暂停", "height": 66, "fontSize": 76, "color": "#ffffff", "align": "center" } }] };
            return GamePauseUI;
        }(View));
        views.GamePauseUI = GamePauseUI;
    })(views = ui.views || (ui.views = {}));
})(ui || (ui = {}));
(function (ui) {
    var views;
    (function (views) {
        var GameResultViewUI = /** @class */ (function (_super) {
            __extends(GameResultViewUI, _super);
            function GameResultViewUI() {
                return _super.call(this) || this;
            }
            GameResultViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.views.GameResultViewUI.uiView);
            };
            GameResultViewUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Image", "props": { "y": 51, "x": 39, "var": "homebtn", "skin": "res/game/btn_home.png" } }, { "type": "Image", "props": { "y": 379, "x": 210, "var": "star1", "skin": "res/game/ic_star_result_b.png", "rotation": -30, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 380, "x": 542, "var": "star3", "skin": "res/game/ic_star_result_gray_b.png", "rotation": 30, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 187, "x": 305, "var": "star2", "skin": "res/game/ic_star_result_gray_b.png" } }, { "type": "Label", "props": { "y": 478, "x": 224, "width": 301, "var": "scorelabel", "text": "14分", "height": 66, "fontSize": 60, "color": "#ffffff", "align": "center" } }, { "type": "Label", "props": { "y": 598, "x": 219, "var": "tip", "text": "加油哦", "fontSize": 40, "color": "#ffffff" } }, { "type": "Image", "props": { "y": 567, "x": 369, "skin": "res/game/ic_coin.png" } }, { "type": "Label", "props": { "y": 598, "x": 476, "var": "coinLabel", "text": "X10", "fontSize": 40, "color": "#ffffff" } }, { "type": "Image", "props": { "y": 684, "x": 55, "skin": "res/game/bj_single.png" }, "child": [{ "type": "Label", "props": { "y": 35, "x": 172, "var": "musicname", "text": "天空之城", "fontSize": 32, "color": "#666666", "bold": true, "align": "left" } }, { "type": "Label", "props": { "y": 88, "x": 172, "var": "authname", "text": "久石让", "fontSize": 26, "color": "#999999" } }] }, { "type": "Image", "props": { "y": 1011, "x": 242, "var": "restartbtn", "skin": "res/game/btn_again.png" } }, { "type": "Image", "props": { "y": 1011, "x": 238, "visible": false, "var": "nextBtn", "skin": "res/game/btn_next.png" } }] };
            return GameResultViewUI;
        }(View));
        views.GameResultViewUI = GameResultViewUI;
    })(views = ui.views || (ui.views = {}));
})(ui || (ui = {}));
(function (ui) {
    var views;
    (function (views) {
        var GameReviveUI = /** @class */ (function (_super) {
            __extends(GameReviveUI, _super);
            function GameReviveUI() {
                return _super.call(this) || this;
            }
            GameReviveUI.prototype.createChildren = function () {
                View.regComponent("runtime.btn_img", runtime.btn_img);
                _super.prototype.createChildren.call(this);
                this.createView(ui.views.GameReviveUI.uiView);
            };
            GameReviveUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Image", "props": { "y": 945, "x": 242, "var": "btnConfirm", "skin": "res/game/btn_sure.png", "runtime": "runtime.btn_img" } }, { "type": "Label", "props": { "y": 546, "x": 224, "width": 301, "text": "复活", "height": 66, "fontSize": 76, "color": "#ffffff", "align": "center" } }, { "type": "Label", "props": { "y": 709, "x": 150, "width": 160, "text": "使用", "height": 66, "fontSize": 48, "color": "#ffffff", "align": "right" } }, { "type": "Image", "props": { "y": 708, "x": 324, "skin": "res/main/ic_power.png" } }, { "type": "Label", "props": { "y": 710, "x": 436, "width": 160, "text": "复活", "height": 66, "fontSize": 48, "color": "#ffffff", "align": "left" } }, { "type": "Label", "props": { "y": 714, "x": 393, "width": 59, "text": "-1", "height": 52, "fontSize": 36, "color": "#ffffff", "align": "left" } }, { "type": "Image", "props": { "y": 24, "x": 22, "var": "btnBack", "skin": "res/role/btn_return.png", "runtime": "runtime.btn_img" } }] };
            return GameReviveUI;
        }(View));
        views.GameReviveUI = GameReviveUI;
    })(views = ui.views || (ui.views = {}));
})(ui || (ui = {}));
(function (ui) {
    var views;
    (function (views) {
        var home;
        (function (home) {
            var AddPowerUI = /** @class */ (function (_super) {
                __extends(AddPowerUI, _super);
                function AddPowerUI() {
                    return _super.call(this) || this;
                }
                AddPowerUI.prototype.createChildren = function () {
                    View.regComponent("runtime.btn", runtime.btn);
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.views.home.AddPowerUI.uiView);
                };
                AddPowerUI.uiView = { "type": "View", "props": { "width": 750, "height": 1134 }, "child": [{ "type": "Image", "props": { "y": 287, "x": 55, "width": 642, "skin": "res/main/bj_power_tc.png", "sizeGrid": "150,50,50,50", "height": 577 } }, { "type": "Label", "props": { "y": 316, "x": 269, "width": 211, "text": "获取体力", "height": 54, "fontSize": 38, "font": "PingFangSC-Semibold", "color": "#ffffff", "align": "center" } }, { "type": "Button", "props": { "y": 302, "x": 641, "var": "btnClose", "stateNum": 1, "skin": "res/main/btn_close.png" } }, { "type": "Button", "props": { "y": 723, "x": 260, "var": "btnWatch", "stateNum": 1, "skin": "res/main/btn_watch.png", "runtime": "runtime.btn" } }, { "type": "Image", "props": { "y": 428, "x": 271, "skin": "res/main/ic_add_power.png" } }, { "type": "Label", "props": { "y": 668, "x": 220, "width": 211, "text": "看视频增加体力", "height": 39, "fontSize": 28, "font": "PingFangSC-Semibold", "color": "#666666", "align": "right" } }, { "type": "Image", "props": { "y": 654, "x": 438, "skin": "res/main/ic_power1.png" } }, { "type": "Label", "props": { "y": 668, "x": 500, "width": 211, "text": "x1", "height": 39, "fontSize": 28, "font": "PingFangSC-Semibold", "color": "#666666", "align": "left" } }] };
                return AddPowerUI;
            }(View));
            home.AddPowerUI = AddPowerUI;
        })(home = views.home || (views.home = {}));
    })(views = ui.views || (ui.views = {}));
})(ui || (ui = {}));
(function (ui) {
    var views;
    (function (views) {
        var home;
        (function (home) {
            var ChapterItemUI = /** @class */ (function (_super) {
                __extends(ChapterItemUI, _super);
                function ChapterItemUI() {
                    return _super.call(this) || this;
                }
                ChapterItemUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.views.home.ChapterItemUI.uiView);
                };
                ChapterItemUI.uiView = { "type": "View", "props": { "width": 300, "height": 300 }, "child": [{ "type": "Box", "props": { "y": 150, "x": 150, "var": "box", "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 300, "var": "pic", "skin": "res/main/bj_piece.png", "height": 300 } }, { "type": "Label", "props": { "y": 8, "x": 75, "width": 149, "var": "tfName", "height": 25, "fontSize": 25, "color": "#ffffff", "align": "center" } }] }] };
                return ChapterItemUI;
            }(View));
            home.ChapterItemUI = ChapterItemUI;
        })(home = views.home || (views.home = {}));
    })(views = ui.views || (ui.views = {}));
})(ui || (ui = {}));
(function (ui) {
    var views;
    (function (views) {
        var home;
        (function (home) {
            var UserInfoUI = /** @class */ (function (_super) {
                __extends(UserInfoUI, _super);
                function UserInfoUI() {
                    return _super.call(this) || this;
                }
                UserInfoUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.views.home.UserInfoUI.uiView);
                };
                UserInfoUI.uiView = { "type": "View", "props": { "width": 750, "height": 1134 }, "child": [{ "type": "Image", "props": { "y": 287, "x": 55, "skin": "res/main/bj_user_tc.png" } }, { "type": "Button", "props": { "y": 302, "x": 641, "var": "btnClose", "stateNum": 1, "skin": "res/main/btn_close.png" } }, { "type": "Label", "props": { "y": 479, "x": 269, "width": 211, "var": "nickLabel", "text": "我本有心向明月", "height": 39, "fontSize": 28, "font": "PingFangSC-Regular", "color": "#ffffff", "align": "center" } }, { "type": "Image", "props": { "y": 624, "x": 569, "skin": "res/main/ic_user_coin.png" } }, { "type": "Image", "props": { "y": 624, "x": 337, "skin": "res/main/ic_user_power.png" } }, { "type": "Image", "props": { "y": 624, "x": 104, "skin": "res/main/ic_user_star.png" } }, { "type": "Label", "props": { "y": 718, "x": 78, "width": 121, "var": "starLabel", "text": "44", "height": 39, "fontSize": 28, "font": "PingFangSC-Regular", "color": "#484848", "align": "center" } }, { "type": "Label", "props": { "y": 718, "x": 315, "width": 121, "var": "heartLabel", "text": "55", "height": 39, "fontSize": 28, "font": "PingFangSC-Regular", "color": "#484848", "align": "center" } }, { "type": "Label", "props": { "y": 718, "x": 551, "width": 121, "var": "musicLabel", "text": "77", "height": 39, "fontSize": 28, "font": "PingFangSC-Regular", "color": "#484848", "align": "center" } }, { "type": "Label", "props": { "y": 528, "x": 269, "width": 211, "var": "userId", "text": "ID 9527", "height": 39, "fontSize": 28, "font": "PingFangSC-Regular", "color": "#ffffff", "align": "center" } }, { "type": "Image", "props": { "y": 317, "x": 305, "width": 140, "var": "avatar", "height": 140 }, "child": [{ "type": "Sprite", "props": { "width": 140, "renderType": "mask", "height": 140 }, "child": [{ "type": "Circle", "props": { "y": 70, "x": 70, "radius": 70, "lineWidth": 1, "fillColor": "#ff0000" } }] }] }] };
                return UserInfoUI;
            }(View));
            home.UserInfoUI = UserInfoUI;
        })(home = views.home || (views.home = {}));
    })(views = ui.views || (ui.views = {}));
})(ui || (ui = {}));
(function (ui) {
    var views;
    (function (views) {
        var LoadingViewUI = /** @class */ (function (_super) {
            __extends(LoadingViewUI, _super);
            function LoadingViewUI() {
                return _super.call(this) || this;
            }
            LoadingViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.views.LoadingViewUI.uiView);
            };
            LoadingViewUI.uiView = { "type": "View", "props": { "width": 750, "height": 1134 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "res/main/bj_homepage@2x.png" } }, { "type": "Image", "props": { "y": 298, "x": 119, "skin": "res/main/ic_ear.png" } }, { "type": "Image", "props": { "y": 1031, "x": 375, "var": "loading", "skin": "res/main/loading.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Label", "props": { "y": 787, "x": 153, "width": 444, "text": "佩戴耳机体验更好哦~", "height": 54, "fontSize": 36, "font": "PingFangSC-Semibold", "color": "#FFAB20", "align": "center" } }] };
            return LoadingViewUI;
        }(View));
        views.LoadingViewUI = LoadingViewUI;
    })(views = ui.views || (ui.views = {}));
})(ui || (ui = {}));
(function (ui) {
    var views;
    (function (views) {
        var NoPowerTipUI = /** @class */ (function (_super) {
            __extends(NoPowerTipUI, _super);
            function NoPowerTipUI() {
                return _super.call(this) || this;
            }
            NoPowerTipUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.views.NoPowerTipUI.uiView);
            };
            NoPowerTipUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Image", "props": { "y": 423, "x": 55, "width": 642, "skin": "res/main/bj_power_tc.png", "sizeGrid": "124,0,75,0", "height": 434 } }, { "type": "Label", "props": { "y": 452, "x": 269, "width": 211, "var": "tfTitle", "text": "体力不足", "height": 54, "fontSize": 42, "font": "PingFangSC-Semibold", "color": "#ffffff", "align": "center" } }, { "type": "Label", "props": { "y": 604, "x": 175, "wordWrap": true, "width": 400, "var": "tfContent", "text": "   今天的体力用完了， 明天再来宠幸我吧~", "leading": 10, "height": 98, "fontSize": 36, "font": "PingFangSC-Semibold", "color": "#666666", "align": "center" } }, { "type": "Button", "props": { "y": 735, "x": 260, "var": "btnClose", "stateNum": 1, "skin": "res/game/btn_sure2.png" } }] };
            return NoPowerTipUI;
        }(View));
        views.NoPowerTipUI = NoPowerTipUI;
    })(views = ui.views || (ui.views = {}));
})(ui || (ui = {}));
(function (ui) {
    var views;
    (function (views) {
        var RoleItemRenderUI = /** @class */ (function (_super) {
            __extends(RoleItemRenderUI, _super);
            function RoleItemRenderUI() {
                return _super.call(this) || this;
            }
            RoleItemRenderUI.prototype.createChildren = function () {
                View.regComponent("runtime.btn_img", runtime.btn_img);
                _super.prototype.createChildren.call(this);
                this.createView(ui.views.RoleItemRenderUI.uiView);
            };
            RoleItemRenderUI.uiView = { "type": "View", "props": { "width": 600, "height": 120 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 600, "skin": "res/common/bg_white.png", "sizeGrid": "20,20,20,20", "height": 120 } }, { "type": "Image", "props": { "y": 10, "x": 14, "width": 100, "var": "roleimg", "skin": "res/ic_role/xhj.png", "height": 100 } }, { "type": "Label", "props": { "y": 23, "x": 134, "var": "rolename", "text": "角色", "fontSize": 30, "color": "#404040" } }, { "type": "Label", "props": { "y": 69, "x": 134, "var": "tip", "text": "连续签到七天可以解锁", "fontSize": 20, "color": "#999999" } }, { "type": "Image", "props": { "y": 27, "x": 487, "var": "useBtn", "skin": "res/role/btn_use.png", "runtime": "runtime.btn_img" } }] };
            return RoleItemRenderUI;
        }(View));
        views.RoleItemRenderUI = RoleItemRenderUI;
    })(views = ui.views || (ui.views = {}));
})(ui || (ui = {}));
(function (ui) {
    var views;
    (function (views) {
        var RoleViewUI = /** @class */ (function (_super) {
            __extends(RoleViewUI, _super);
            function RoleViewUI() {
                return _super.call(this) || this;
            }
            RoleViewUI.prototype.createChildren = function () {
                View.regComponent("runtime.btn_img", runtime.btn_img);
                View.regComponent("ui.views.RoleItemRenderUI", ui.views.RoleItemRenderUI);
                _super.prototype.createChildren.call(this);
                this.createView(ui.views.RoleViewUI.uiView);
            };
            RoleViewUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Image", "props": { "y": 199, "x": 55, "skin": "res/role/bj_role_tc.png" }, "child": [{ "type": "Label", "props": { "y": 14, "x": 280, "width": 80, "text": "角色", "height": 40, "fontSize": 40, "color": "#ffffff", "bold": true } }, { "type": "Image", "props": { "y": 57, "x": 587, "var": "closebtn", "skin": "res/main/btn_close.png", "runtime": "runtime.btn_img" } }, { "type": "List", "props": { "y": 135, "x": 20, "width": 600, "var": "rolelist", "spaceY": 12, "repeatX": 1, "height": 785 }, "child": [{ "type": "RoleItemRender", "props": { "name": "render", "runtime": "ui.views.RoleItemRenderUI" } }] }] }] };
            return RoleViewUI;
        }(View));
        views.RoleViewUI = RoleViewUI;
    })(views = ui.views || (ui.views = {}));
})(ui || (ui = {}));
(function (ui) {
    var views;
    (function (views) {
        var SettingComUI = /** @class */ (function (_super) {
            __extends(SettingComUI, _super);
            function SettingComUI() {
                return _super.call(this) || this;
            }
            SettingComUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.views.SettingComUI.uiView);
            };
            SettingComUI.uiView = { "type": "View", "props": { "width": 600, "height": 600 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 600, "skin": "res/signin/item_bg3.png", "sizeGrid": "20,12,14,14", "height": 600 } }, { "type": "Label", "props": { "y": 21, "x": 16, "fontSize": 24, "color": "#000000" } }, { "type": "Label", "props": { "y": 129, "x": 16, "width": 75, "text": "动画表现", "height": 18, "fontSize": 24, "color": "#000000" } }, { "type": "Label", "props": { "y": 195, "x": 16, "text": "旋转角度", "fontSize": 24, "color": "#000000" } }, { "type": "Label", "props": { "y": 308, "x": 16, "text": "滚屏速度", "fontSize": 24, "color": "#000000" } }, { "type": "Tab", "props": { "y": 28, "x": 117, "width": 211, "visible": false, "var": "tabSong", "skin": "res/common/tab.png", "selectedIndex": 1, "scaleY": 2, "scaleX": 2.2, "labels": "狐狸小姐,钢琴块,G小调", "height": 26 } }, { "type": "Tab", "props": { "y": 107, "x": 117, "width": 145, "var": "tabAni", "skin": "res/common/tab.png", "selectedIndex": 0, "scaleY": 2, "scaleX": 2.2, "labels": "线条,小球", "height": 26 } }, { "type": "Tab", "props": { "y": 177, "x": 117, "width": 145, "var": "tabRotate", "skin": "res/common/tab.png", "selectedIndex": 0, "scaleY": 2, "scaleX": 2.2, "labels": "固定角度,变化角度", "height": 26 } }, { "type": "Tab", "props": { "y": 241, "x": 117, "width": 80, "var": "tabSpeed", "skin": "res/common/tab.png", "selectedIndex": 0, "scaleY": 2, "scaleX": 2.2, "labels": "4,5,6", "height": 80, "direction": "vertical" } }, { "type": "Button", "props": { "y": 530, "x": 185, "width": 169, "var": "btnStart", "stateNum": 1, "skin": "res/signin/item_bg1.png", "sizeGrid": "18,14,12,20", "labelSize": 32, "labelColors": "#ffffff,#ffffff,#ffffff", "label": "start", "height": 50 } }, { "type": "Label", "props": { "y": 435, "x": 16, "text": "其他", "fontSize": 24, "color": "#000000" } }, { "type": "Tab", "props": { "y": 417, "x": 117, "width": 145, "var": "tabSpeedType", "skin": "res/common/tab.png", "selectedIndex": 0, "scaleY": 2, "scaleX": 2.2, "labels": "垂直速不变,速度不变", "height": 26 } }] };
            return SettingComUI;
        }(View));
        views.SettingComUI = SettingComUI;
    })(views = ui.views || (ui.views = {}));
})(ui || (ui = {}));
(function (ui) {
    var views;
    (function (views) {
        var ShareMenuUI = /** @class */ (function (_super) {
            __extends(ShareMenuUI, _super);
            function ShareMenuUI() {
                return _super.call(this) || this;
            }
            ShareMenuUI.prototype.createChildren = function () {
                View.regComponent("runtime.btn_img", runtime.btn_img);
                _super.prototype.createChildren.call(this);
                this.createView(ui.views.ShareMenuUI.uiView);
            };
            ShareMenuUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "View", "props": { "y": 1038, "x": 0, "width": 750, "var": "bottomView", "height": 296 }, "child": [{ "type": "Sprite", "props": { "y": 0, "x": 0, "width": 750, "height": 296, "alpha": 0.88 }, "child": [{ "type": "Rect", "props": { "width": 750, "lineWidth": 1, "height": 296, "fillColor": "#00000000" } }] }, { "type": "Image", "props": { "y": 115, "x": 168, "var": "pyq", "skin": "res/common/pyq.png", "runtime": "runtime.btn_img" } }, { "type": "Image", "props": { "y": 115, "x": 481, "var": "wxBtn", "skin": "res/common/wechat.png", "runtime": "runtime.btn_img" } }, { "type": "Label", "props": { "y": 51, "x": 330, "text": "分享到", "fontSize": 30, "color": "#ffffff" } }, { "type": "Label", "props": { "y": 238, "x": 177, "text": "朋友圈", "fontSize": 28, "color": "#ffffff" } }, { "type": "Label", "props": { "y": 240, "x": 476, "text": "微信好友", "fontSize": 28, "color": "#ffffff" } }, { "type": "Image", "props": { "y": 17, "x": 698, "var": "closeBtn", "skin": "res/game/btn_close.png", "runtime": "runtime.btn_img" } }, { "type": "Label", "props": { "y": 66, "x": 202, "width": 96, "height": 1, "bgColor": "#e1e1e1" } }, { "type": "Label", "props": { "y": 66, "x": 452, "width": 96, "height": 1, "bgColor": "#e1e1e1" } }] }] };
            return ShareMenuUI;
        }(View));
        views.ShareMenuUI = ShareMenuUI;
    })(views = ui.views || (ui.views = {}));
})(ui || (ui = {}));
(function (ui) {
    var views;
    (function (views) {
        var StarUI = /** @class */ (function (_super) {
            __extends(StarUI, _super);
            function StarUI() {
                return _super.call(this) || this;
            }
            StarUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.views.StarUI.uiView);
            };
            StarUI.uiView = { "type": "View", "props": { "width": 20, "height": 20 }, "child": [{ "type": "Sprite", "props": { "width": 20, "height": 20 }, "child": [{ "type": "Circle", "props": { "y": 10, "x": 10, "radius": 10, "lineWidth": 0, "fillColor": "#ffffff" } }] }] };
            return StarUI;
        }(View));
        views.StarUI = StarUI;
    })(views = ui.views || (ui.views = {}));
})(ui || (ui = {}));
(function (ui) {
    var views;
    (function (views) {
        var TipsUI = /** @class */ (function (_super) {
            __extends(TipsUI, _super);
            function TipsUI() {
                return _super.call(this) || this;
            }
            TipsUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.views.TipsUI.uiView);
            };
            TipsUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Image", "props": { "y": 423, "x": 55, "width": 642, "skin": "res/main/bj_power_tc.png", "sizeGrid": "138,0,63,0", "height": 439 } }, { "type": "Label", "props": { "y": 452, "x": 269, "width": 211, "var": "tfTitle", "text": "出错了", "height": 54, "fontSize": 42, "font": "PingFangSC-Semibold", "color": "#ffffff", "align": "center" } }, { "type": "Label", "props": { "y": 599, "x": 175, "wordWrap": true, "width": 400, "var": "tfContent", "text": "哎呀，服务器在打盹儿，等会再来吧~", "leading": 10, "height": 98, "fontSize": 36, "font": "PingFangSC-Semibold", "color": "#666666", "align": "center" } }, { "type": "Button", "props": { "y": 738, "x": 260, "var": "btnClose", "stateNum": 1, "skin": "res/game/btn_sure2.png" } }] };
            return TipsUI;
        }(View));
        views.TipsUI = TipsUI;
    })(views = ui.views || (ui.views = {}));
})(ui || (ui = {}));
(function (ui) {
    var views;
    (function (views) {
        var TopToastViewUI = /** @class */ (function (_super) {
            __extends(TopToastViewUI, _super);
            function TopToastViewUI() {
                return _super.call(this) || this;
            }
            TopToastViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.views.TopToastViewUI.uiView);
            };
            TopToastViewUI.uiView = { "type": "View", "props": { "width": 750, "height": 60 }, "child": [{ "type": "Sprite", "props": { "width": 750, "height": 60, "alpha": 0.8 }, "child": [{ "type": "Rect", "props": { "width": 750, "lineWidth": 1, "height": 60, "fillColor": "#000000" } }] }, { "type": "Label", "props": { "y": 15, "x": 102, "width": 545, "text": "下一篇章已经解锁", "height": 30, "fontSize": 30, "color": "#666666", "align": "center" } }] };
            return TopToastViewUI;
        }(View));
        views.TopToastViewUI = TopToastViewUI;
    })(views = ui.views || (ui.views = {}));
})(ui || (ui = {}));
