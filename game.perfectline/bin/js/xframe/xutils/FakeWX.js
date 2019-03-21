/*
* name;
*/
var FakeWX = /** @class */ (function () {
    function FakeWX() {
    }
    FakeWX.prototype.login = function (cb) {
        cb.initLocal();
    };
    FakeWX.prototype.showShareMenu = function () { };
    ;
    FakeWX.prototype.onHide = function () { };
    ;
    FakeWX.prototype.shareAppMessage = function () { };
    return FakeWX;
}());
