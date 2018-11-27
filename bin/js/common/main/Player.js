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
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super.call(this) || this;
        _this.dataSource;
        return _this;
    }
    /**更新表现 */
    Player.prototype.update = function () {
        this.dataSource = this._vo;
    };
    Object.defineProperty(Player.prototype, "dataSource", {
        get: function () {
            return this._vo;
        },
        set: function (r) {
            this._vo = r;
            this.tfName.text = this._vo.name + " Lv" + this._vo.lv;
            this.pic.skin = "pet/" + this._vo.lv + ".png";
        },
        enumerable: true,
        configurable: true
    });
    return Player;
}(ui.main.PlayerUI));
//# sourceMappingURL=Player.js.map