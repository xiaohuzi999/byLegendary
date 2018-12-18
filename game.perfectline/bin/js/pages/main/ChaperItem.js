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
/*
* name;
*/
var ChaperItem = /** @class */ (function (_super) {
    __extends(ChaperItem, _super);
    function ChaperItem() {
        var _this = _super.call(this) || this;
        _this._selected = false;
        _this.box.scaleX = _this.box.scaleY = 0.8;
        return _this;
    }
    Object.defineProperty(ChaperItem.prototype, "dataSource", {
        get: function () {
            return this._data;
        },
        set: function (data) {
            this._data = data;
            if (data) {
                this.visible = true;
                //this.pic.skin = data.cover+"";
                this.tfName.text = data.name + "";
            }
            else {
                this.visible = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChaperItem.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (v) {
            if (this._selected != v) {
                this._selected = v;
                if (this._selected) {
                    Laya.Tween.to(this.box, { scaleX: 1, scaleY: 1 }, 200);
                }
                else {
                    Laya.Tween.to(this.box, { scaleX: 0.8, scaleY: 0.8 }, 200);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    return ChaperItem;
}(ui.views.home.ChapterItemUI));
