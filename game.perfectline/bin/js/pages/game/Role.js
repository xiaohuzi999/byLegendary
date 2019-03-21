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
//小球
var Role = /** @class */ (function (_super) {
    __extends(Role, _super);
    function Role() {
        var _this = _super.call(this) || this;
        //影子
        _this._shadows = [];
        //
        _this._posArr = [];
        _this._needAni = false;
        _this._maxNode = 40;
        _this.init();
        return _this;
    }
    Role.prototype.init = function () {
        this.$shadow = new Laya.Image();
        this.$shadow.anchorX = 0.5;
        this.$shadow.anchorY = 0.477;
        this.addChild(this.$shadow);
        this.$image = new Laya.Image();
        this.$image.anchorX = 0.5;
        this.$image.anchorY = 0.46;
        this.addChild(this.$image);
    };
    /**设定皮肤 */
    Role.prototype.setSkin = function (id, speed) {
        //if(this._id != id){
        var info = DBGame.getRole(id);
        trace("roleInfo::::::::::::::::::", info);
        this._roleData = info;
        if (info) {
            this.$image.skin = "res/ic_role/" + info.img + ".png";
            this._needAni = info.rotate > 0;
            if (speed <= 0.3) {
                this._roleData.rendFrame = 10;
            }
            else if (speed < 0.5) {
                this._roleData.rendFrame = 8;
            }
            else {
                this._roleData.rendFrame = 6;
            }
            this.shadow(info.child, this.$image.skin);
            this._maxNode = info.rendFrame * (this._shadows.length + 2) - 3;
        }
        //}
        this._needAni && this.play();
    };
    Role.prototype.reset = function () {
        for (var i = 0; i < this._shadows.length; i++) {
            this._shadows[i].visible = false;
        }
        this._posArr.length = 0;
    };
    Role.prototype.play = function () {
        this.frameLoop(2, this, this.onPlay);
    };
    Role.prototype.stop = function () {
        this.clearTimer(this, this.onPlay);
    };
    Role.prototype.onPlay = function () {
        this.$image.rotation += Role.ROTATE;
    };
    Role.prototype.flash = function () {
        Laya.timer.frameLoop(3, this, this.doFlash);
    };
    Role.prototype.removeFlash = function () {
        this.alpha = 1;
        Laya.timer.clear(this, this.doFlash);
    };
    Role.prototype.doFlash = function () {
        if (this.alpha == 1) {
            this.alpha = 0.5;
        }
        else {
            this.alpha = 1;
        }
    };
    Role.prototype.update = function () {
        if (this._shadows.length == 0) {
            return;
        }
        this._posArr.push({ x: Math.floor(this.x), y: Math.floor(this.y) });
        while (this._posArr.length > this._maxNode) {
            this._posArr.shift();
        }
        var index;
        var shadow;
        for (var i = this._roleData.rendFrame; i < this._posArr.length; i++) {
            if (this._posArr[i]) {
                if ((i - 1) % this._roleData.rendFrame == 0) {
                    index = (i - 1) / this._roleData.rendFrame - 1;
                    shadow = this._shadows[index];
                    if (shadow) {
                        shadow.visible = true;
                        shadow.pos(this._posArr[i].x, this._posArr[i].y);
                        if (!shadow.parent) {
                            this.parent.addChildAt(shadow, this.parent.getChildIndex(this));
                        }
                    }
                }
            }
        }
        for (var i = index; i < this._shadows.length - 1; i++) {
            this._shadows[i].visible = false;
        }
    };
    /**影子效果 */
    Role.prototype.shadow = function (showNum, skin) {
        for (var i = 0; i < this._shadows.length; i++) {
            this._shadows[i].removeSelf();
        }
        this._shadows.length = 0;
        this._renderIndex = 0;
        this._posArr.length = 0;
        var img;
        for (var i = 0; i < showNum; i++) {
            img = new Laya.Image(skin);
            img.anchorX = img.anchorY = 0.5;
            img.scale(0.5, 0.5);
            this._shadows.push(img);
        }
    };
    Role.ROTATE = 6;
    return Role;
}(Laya.Sprite));
