/*
* name 角色数据配置
*/
var DBGame = /** @class */ (function () {
    function DBGame() {
    }
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
    DBGame.roleInfo = {
        1: { skin: "game_xhj", shadow: "yy_xhj", rotate: true },
        2: { skin: "ppx" },
        3: { skin: "hbd" },
        4: { skin: "game_mmq", shadow: "yy_mmq", rotate: true },
        5: { skin: "xq" },
        6: { skin: "game_qklq", shadow: "yy_qklq", rotate: true },
        7: { skin: "ppc" },
        8: { skin: "mmj" },
        9: { skin: "xfq" },
        10: { skin: "game_8b", shadow: "yy_8b", rotate: true }
    };
    return DBGame;
}());
