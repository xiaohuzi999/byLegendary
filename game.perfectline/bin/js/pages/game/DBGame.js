/*
* name 角色数据配置
*/
var DBGame = /** @class */ (function () {
    function DBGame() {
    }
    Object.defineProperty(DBGame, "roleInfo", {
        get: function () {
            if (!this._roleInfo) {
                var data = Laya.loader.getRes("res/cfg/role.json");
                this._roleInfo = data.list;
            }
            return this._roleInfo;
        },
        enumerable: true,
        configurable: true
    });
    DBGame.getRole = function (id) {
        for (var i = 0; i < this.roleInfo.length; i++) {
            if (this._roleInfo[i].id == id) {
                return this._roleInfo[i];
            }
        }
        return null;
    };
    /**获取关卡信息 */
    DBGame.getStageInfo = function (id) {
        var source = Laya.loader.getRes("res/cfg/stage.json");
        for (var i in source) {
            if (source[i].id == id) {
                return source[i];
            }
        }
    };
    /**计算进度*/
    DBGame.calcPro = function (nowTime, arr) {
        return { pro: 1, stars: 2 };
        var pro;
        var stars = 0;
        if (nowTime < arr[0]) {
            pro = nowTime * 0.333 / arr[0];
        }
        else if (nowTime < arr[1]) {
            pro = 0.333;
            pro += (nowTime - arr[0]) * 0.333 / (arr[1] - arr[0]);
            stars = 1;
        }
        else if (nowTime < arr[2]) {
            pro = 0.666;
            pro += (nowTime - arr[1]) * 0.333 / (arr[2] - arr[1]);
            stars = 2;
        }
        else {
            pro = 1;
            stars = 3;
        }
        return { pro: pro, stars: stars };
    };
    /**暂停-复活倒计时 */
    DBGame.countdown = function (time, callback, updateHander) {
        var countView = new ui.views.CountDownViewUI();
        countView.countLabel.text = time + "";
        Laya.stage.addChild(countView);
        Laya.timer.loop(1000, null, update);
        function update() {
            time--;
            countView.countLabel.text = time + "";
            !updateHander || updateHander.run();
            if (time <= 0) {
                Laya.timer.clear(null, update);
                callback.run();
                countView.removeSelf();
            }
        }
    };
    /**常量-最大复活次数 */
    DBGame.ReviveTimes = 1;
    return DBGame;
}());
