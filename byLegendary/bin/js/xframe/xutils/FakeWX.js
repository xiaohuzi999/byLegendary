/*
* name;
*/
var FakeWX = /** @class */ (function () {
    function FakeWX() {
    }
    FakeWX.prototype.login = function (cb) {
        cb.success({ errMsg: "not in wx" });
    };
    FakeWX.prototype.showShareMenu = function () { };
    ;
    FakeWX.prototype.onHide = function () { };
    ;
    return FakeWX;
}());
//# sourceMappingURL=FakeWX.js.map