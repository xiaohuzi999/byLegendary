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
var Fighter = /** @class */ (function (_super) {
    __extends(Fighter, _super);
    function Fighter() {
        var _this = _super.call(this) || this;
        _this.dataSource;
        return _this;
    }
    Fighter.prototype.attack = function (cb) {
        var _this = this;
        Laya.Tween.to(this, { scaleX: 1.2, scaleY: 1.2 }, 150, null, Laya.Handler.create(null, function () {
            Laya.Tween.to(_this, { scaleX: 1, scaleY: 1 }, 150, null, Laya.Handler.create(null, function () {
                Laya.Tween.to(_this, { x: _this.x }, 300, null, cb);
            }));
        }));
    };
    Fighter.prototype.beAttacked = function () {
        var _this = this;
        Laya.Tween.to(this, { scaleX: 0.8, scaleY: 0.8 }, 150, null, Laya.Handler.create(null, function () {
            Laya.Tween.to(_this, { scaleX: 1, scaleY: 1 }, 150);
        }));
    };
    Object.defineProperty(Fighter.prototype, "dataSource", {
        get: function () {
            return this._vo;
        },
        set: function (v) {
            this._vo = v;
            if (this._vo) {
            }
        },
        enumerable: true,
        configurable: true
    });
    return Fighter;
}(ui.fight.FighterUI));
//# sourceMappingURL=Fighter.js.map