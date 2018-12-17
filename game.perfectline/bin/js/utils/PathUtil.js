/*
* name;
*/
var PathUtil = /** @class */ (function () {
    function PathUtil() {
    }
    /**
     * 将策划端时间配置节点转换成数组；
     * @param str [0:01.655][0:01.995]
    */
    PathUtil.convert = function (str) {
        str = str.replace(/\]\[/g, ",");
        str = str.replace("[", "");
        str = str.replace("]", "");
        var arr = str.split(",");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = this.node2Num(arr[i]);
        }
        return arr;
    };
    PathUtil.convert2Pos = function (timeArr, speed, angle, startX, startY, randomAngle, speedType) {
        if (startX === void 0) { startX = 0; }
        if (startY === void 0) { startY = 0; }
        if (randomAngle === void 0) { randomAngle = false; }
        if (speedType === void 0) { speedType = 0; }
        var curTime = 0;
        var delTime = 0;
        var curX = startX;
        var curY = startY;
        var posArr = [curX, curY];
        var dir = 1;
        var posInfo = [];
        var speedx = 0;
        var speedy = 0;
        for (var i = 0; i < timeArr.length; i++) {
            //临时随机
            if (randomAngle) {
                if (i % 4 == 0) {
                    angle = Math.PI / 4;
                }
                else if (i % 4 == 3) {
                    angle = Math.PI / 3;
                }
                else if (i % 4 == 2) {
                    angle = Math.PI / 3;
                }
                else if (i % 4 == 1) {
                    angle = Math.PI / 4;
                }
            }
            delTime = timeArr[i] - curTime;
            if (i == 0) {
                speedx = 0;
                speedy = speed;
            }
            else {
                //方案1，无视角度，保持Y速度不变
                if (speedType == 0) {
                    speedx = speed / Math.tan(angle) * dir;
                    speedy = speed;
                }
                else if (speedType == 1) {
                    //方案2，角度对XY速度均有影响
                    speedx = speed * Math.cos(angle) * dir;
                    speedy = speed * Math.sin(angle);
                }
            }
            if (i == 0) {
                posInfo.push({ x: curX, y: curY, sx: speedx, sy: speedy, t: 0 });
            }
            else {
                posInfo.push({ x: curX, y: curY, sx: speedx, sy: speedy, t: timeArr[i - 1] });
            }
            curX += speedx * delTime;
            curY -= speedy * delTime;
            posArr.push(curX, curY);
            curTime = timeArr[i];
            dir *= -1;
        }
        this.posInfo = posInfo;
        return posArr;
    };
    /**将节点数据转换成数值型 */
    PathUtil.node2Num = function (str) {
        var tmp = str.split(":");
        //minute
        var time = parseInt(tmp[0]) * 60000;
        time += parseFloat(tmp[1]) * 1000;
        return time;
    };
    return PathUtil;
}());
