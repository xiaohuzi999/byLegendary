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
var Star = /** @class */ (function (_super) {
    __extends(Star, _super);
    function Star() {
        var _this = _super.call(this) || this;
        _this.MaxAlpha = 1;
        _this.MinAlpha = 0.5;
        _this.skin = "res/game/dot.png";
        var rnd = Math.random();
        _this._sleepTime = rnd * 4000 + 2000;
        _this._offsetY = rnd * 150 + 600;
        if (rnd < 0.7) {
            _this.alpha = _this.MaxAlpha;
            if (rnd < 0.15) {
                _this.MaxAlpha = 0.6;
                _this.MinAlpha = 0.4;
                _this.scale(0.5, 0.5);
            }
            else {
                _this.MaxAlpha = 0.75;
                _this.scale(0.7, 0.7);
            }
        }
        _this.visible = false;
        Laya.timer.once(rnd * 2000, _this, _this.reborn);
        return _this;
    }
    /**闪烁 */
    Star.prototype.flash = function () {
        var _this = this;
        Laya.Tween.to(this, { alphp: this.MinAlpha }, 200, null, Laya.Handler.create(null, function () {
            Laya.Tween.to(_this, { alphp: _this.MaxAlpha }, 200, null, Laya.Handler.create(null, function () {
                Laya.Tween.to(_this, { alpha: _this.MinAlpha }, 1000, null, Laya.Handler.create(null, function () {
                    Laya.timer.once(500, null, function () {
                        _this.visible = false;
                    });
                    Laya.Tween.to(_this, { x: _this.x }, 1, null, Handler.create(_this, _this.reborn), _this._sleepTime);
                }));
            }));
        }));
    };
    Star.prototype.move = function () {
        if (!Star._sleep) {
            this._moveTween = Laya.Tween.to(this, { y: this.y + this._offsetY }, 2200);
        }
    };
    /**生成 */
    Star.prototype.reborn = function () {
        this.visible = true;
        this.alpha = this.MaxAlpha;
        this.x = Math.floor(Math.random() * Laya.stage.width);
        this.y = Math.floor(Math.random() * (Laya.stage.height - 200)) - 200;
        this.flash();
        this.move();
    };
    Star.prototype.__sleep = function () {
        Laya.Tween.clear(this._moveTween);
    };
    Star.prototype.die = function () {
        Laya.Tween.clearAll(this);
        this.removeSelf();
    };
    Star.shine = function (num, disc) {
        this.destroy();
        for (var i = 0; i < num; i++) {
            this._stars.push(new Star());
            disc.addChild(this._stars[i]);
        }
    };
    /**休眠 */
    Star.sleep = function () {
        if (!this._sleep) {
            this._sleep = true;
            for (var i = 0; i < this._stars.length; i++) {
                this._stars[i].__sleep();
            }
        }
    };
    /**激活 */
    Star.active = function () {
        if (this._sleep) {
            this._sleep = false;
            for (var i = 0; i < this._stars.length; i++) {
                this._stars[i].move();
            }
        }
    };
    /**销毁 */
    Star.destroy = function () {
        for (var i = 0; i < this._stars.length; i++) {
            this._stars[i].die();
        }
        this._stars.length = 0;
    };
    Star._sleep = true;
    /**闪烁 */
    Star._stars = [];
    return Star;
}(Laya.Image));
