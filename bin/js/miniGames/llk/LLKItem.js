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
var LLKItem = /** @class */ (function (_super) {
    __extends(LLKItem, _super);
    function LLKItem() {
        var _this = _super.call(this) || this;
        _this.position = new Laya.Point();
        return _this;
    }
    Object.defineProperty(LLKItem.prototype, "dataSource", {
        get: function () {
            return this._data;
        },
        set: function (vo) {
            this._data = vo;
            if (this._data) {
                this.visible = true;
                this.pic.skin = "item/" + vo.skin + ".png";
            }
            else {
                this.visible = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LLKItem.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (b) {
            this._selected = b;
            if (this._selected) {
                this.frame.skin = "share/frame2.png";
            }
            else {
                this.frame.skin = "share/frame.png";
            }
        },
        enumerable: true,
        configurable: true
    });
    return LLKItem;
}(ui.MiniLLK.LLKItemUI));
//# sourceMappingURL=LLKItem.js.map