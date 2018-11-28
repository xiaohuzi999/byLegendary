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
var LLKView = /** @class */ (function (_super) {
    __extends(LLKView, _super);
    function LLKView() {
        var _this = _super.call(this) || this;
        _this._items = [];
        _this._map = [
            [2, 0, 2, 1, 3],
            [1, 2, 0, 2, 3],
            [1, 1, 0, 2, 2],
            [2, 3, 2, 2, 4],
            [3, 2, 2, 2, 4],
        ];
        return _this;
    }
    LLKView.prototype.show = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        _super.prototype.show.call(this);
        this.initMap(this._map);
    };
    LLKView.prototype.initMap = function (map) {
        this.clear();
        var len;
        var item;
        for (var i = 0; i < map.length; i++) {
            len = map[i].length;
            for (var j = 0; j < len; j++) {
                if (map[i][j] > 0) {
                    item = new LLKItem();
                    item.dataSource = DBLLK.getVo(map[i][j]);
                    this._items.push(item);
                    this._itemSp.addChild(item);
                    item.x = item.width * j;
                    item.y = item.height * i;
                    item.position.x = i;
                    item.position.y = j;
                    item.on(Laya.Event.CLICK, this, this.onItemClick);
                }
            }
        }
        this._itemSp.width = map.length * item.width;
        this._itemSp.height = len * item.height;
        this._itemSp.x = (this.ui.width - this._itemSp.width) / 2;
        this._itemSp.y = (this.ui.height - this._itemSp.height) / 2;
    };
    LLKView.prototype.onClick = function (e) {
        switch (e.target) {
            case this.ui.btnClose:
                this.close();
                break;
        }
    };
    LLKView.prototype.onItemClick = function (e) {
        var item = e.currentTarget;
        if (this.selectedItem) {
            if (this.selectedItem.dataSource.id == item.dataSource.id) {
                if (LLKLogic.checkLink(this.selectedItem.position, item.position, this._map)) {
                    this.delItem(this.selectedItem);
                    this.delItem(item);
                }
                this.selectedItem = null;
            }
            else {
                this.selectedItem = item;
            }
        }
        else {
            this.selectedItem = item;
        }
    };
    LLKView.prototype.delItem = function (item) {
        for (var i = this._items.length - 1; i > -1; i--) {
            if (this._items[i] == item) {
                this._items[i].off(Laya.Event.CLICK, this, this.onItemClick);
                //do sth;
                this._items[i].removeSelf();
                this._items.splice(i, 1);
                this._map[item.position.x][item.position.y] = 0;
                break;
            }
        }
        if (this._items.length == 0) {
            trace("done===========================");
        }
    };
    LLKView.prototype.clear = function () {
        for (var i = this._items.length - 1; i > -1; i--) {
            this._items[i].off(Laya.Event.CLICK, this, this.onItemClick);
            this._items[i].removeSelf();
        }
        this._items.length = 0;
    };
    Object.defineProperty(LLKView.prototype, "selectedItem", {
        get: function () {
            return this._selectedItem;
        },
        set: function (item) {
            if (this._selectedItem != item) {
                if (this._selectedItem) {
                    this._selectedItem.selected = false;
                }
                this._selectedItem = item;
                if (this._selectedItem) {
                    this._selectedItem.selected = true;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    LLKView.prototype.createUI = function () {
        this.ui = new ui.MiniLLK.LLKViewUI();
        this.addChild(this.ui);
        this.closeOnBlank = true;
        this._itemSp = new Laya.Sprite();
        this.ui.addChild(this._itemSp);
    };
    LLKView.prototype.initEvent = function () {
        _super.prototype.initEvent.call(this);
        this.ui.on(Laya.Event.CLICK, this, this.onClick);
    };
    LLKView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this.ui.off(Laya.Event.CLICK, this, this.onClick);
    };
    return LLKView;
}(xframe.XMWindow));
//# sourceMappingURL=LLKView.js.map