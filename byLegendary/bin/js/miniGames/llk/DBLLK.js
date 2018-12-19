/*
* name;
*/
var DBLLK = /** @class */ (function () {
    function DBLLK() {
    }
    /**获取 */
    DBLLK.getVo = function (id) {
        return this._data[id];
    };
    DBLLK._data = {
        1: { id: 1, skin: "400103" },
        2: { id: 2, skin: "400203" },
        3: { id: 3, skin: "400303" },
        4: { id: 4, skin: "400403" }
    };
    return DBLLK;
}());
//# sourceMappingURL=DBLLK.js.map