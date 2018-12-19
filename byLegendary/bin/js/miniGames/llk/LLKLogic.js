/*
* name;
*/
var LLKLogic = /** @class */ (function () {
    function LLKLogic() {
    }
    //
    LLKLogic.checkLink = function (a, b, map) {
        this.mapData = map;
        this.row = map[0].length;
        this.col = map.length;
        if (a.x == b.x && this.horizon(a, b)) {
            return true;
        }
        if (a.y == b.y && this.vertical(a, b)) {
            return true;
        }
        if (this.oneCorner(a, b)) {
            return true;
        }
        else {
            return this.twoCorner(a, b);
        }
    };
    //
    LLKLogic.horizon = function (a, b) {
        if (a.x == b.x && a.y == b.y)
            return false; //如果点击的是同一个图案，直接返回false;
        var x_start = a.y < b.y ? a.y : b.y; //获取a,b中较小的y值
        var x_end = a.y < b.y ? b.y : a.y; //获取a,b中较大的值
        //遍历a,b之间是否通路，如果一个不是就返回false;
        for (var i = x_start + 1; i < x_end; i++) {
            if (this.mapData[a.x][i] != 0) {
                return false;
            }
        }
        return true;
    };
    //
    LLKLogic.vertical = function (a, b) {
        if (a.x == b.x && a.y == b.y)
            return false;
        var y_start = a.x < b.x ? a.x : b.x;
        var y_end = a.x < b.x ? b.x : a.x;
        for (var i = y_start + 1; i < y_end; i++) {
            if (this.mapData[i][a.y] != 0) {
                return false;
            }
        }
        return true;
    };
    //
    LLKLogic.oneCorner = function (a, b) {
        var c = new Laya.Point(b.x, a.y);
        var d = new Laya.Point(a.x, b.y);
        //判断C点是否有元素                 
        if (this.mapData[c.x][c.y] == 0) {
            var path1 = this.horizon(b, c) && this.vertical(a, c);
            return path1;
        }
        //判断D点是否有元素
        if (this.mapData[d.x][d.y] == 0) {
            var path2 = this.horizon(a, d) && this.vertical(b, d);
            return path2;
        }
        else {
            return false;
        }
    };
    //
    LLKLogic.twoCorner = function (a, b) {
        var ll = this.scan(a, b);
        if (ll.length == 0) {
            return false;
        }
        for (var i = 0; i < ll.length; i++) {
            var tmpLine = ll[i];
            if (tmpLine.direct == 1) {
                if (this.vertical(a, tmpLine.a) && this.vertical(b, tmpLine.b)) {
                    return true;
                }
            }
            else if (tmpLine.direct == 0) {
                if (this.horizon(a, tmpLine.a) && this.horizon(b, tmpLine.b)) {
                    return true;
                }
            }
        }
        return false;
    };
    LLKLogic.scan = function (a, b) {
        var linkList = [];
        //检测a点,b点的左侧是否能够垂直直连
        for (var i = a.y; i >= 0; i--) {
            if (this.mapData[a.x][i] == 0 && this.mapData[b.x][i] == 0 && this.vertical(new Laya.Point(a.x, i), new Laya.Point(b.x, i))) {
                linkList.push(new Line(new Laya.Point(a.x, i), new Laya.Point(b.x, i), 0));
            }
        }
        //检测a点,b点的右侧是否能够垂直直连
        for (i = a.y; i < this.col; i++) {
            if (this.mapData[a.x][i] == 0 && this.mapData[b.x][i] == 0 && this.vertical(new Laya.Point(a.x, i), new Laya.Point(b.x, i))) {
                linkList.push(new Line(new Laya.Point(a.x, i), new Laya.Point(b.x, i), 0));
            }
        }
        //检测a点,b点的上侧是否能够水平直连
        for (var j = a.x; j >= 0; j--) {
            if (this.mapData[j][a.y] == 0 && this.mapData[j][b.y] == 0 && this.horizon(new Laya.Point(j, a.y), new Laya.Point(j, b.y))) {
                linkList.push(new Line(new Laya.Point(j, a.y), new Laya.Point(j, b.y), 1));
            }
        }
        //检测a点,b点的下侧是否能够水平直连
        for (j = a.x; j < this.row; j++) {
            if (this.mapData[j][a.y] == 0 && this.mapData[j][b.y] == 0 && this.horizon(new Laya.Point(j, a.y), new Laya.Point(j, b.y))) {
                linkList.push(new Line(new Laya.Point(j, a.y), new Laya.Point(j, b.y), 1));
            }
        }
        return linkList;
    };
    return LLKLogic;
}());
//
var Line = /** @class */ (function () {
    function Line(a, b, direct) {
        this.a = a;
        this.b = b;
        this.direct = direct;
    }
    return Line;
}());
//# sourceMappingURL=LLKLogic.js.map