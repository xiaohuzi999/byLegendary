var SignKey = "signrecord";
var HadRole = "haveGetRole";
var SigninManager;
(function (SigninManager) {
    var __dateTimeLong__ = 0;
    var __signinState__ = {};
    /**
     * 签到状态
     * (-2:将来未签到；-1：过去可补签；0：当天未签到；1：过去已签到；2：当天已签到)
     */
    function signinState(day, cb) {
        checkLoginTime(false, function () {
            if (day <= 0) {
                day = getWeekDay(__dateTimeLong__);
            }
            checkSigninState(function () {
                var nowDay = getWeekDay(__dateTimeLong__);
                if (__signinState__[day]) {
                    cb && cb(nowDay == day ? 2 : 1);
                }
                else {
                    cb && cb(nowDay == day ? 0 : (nowDay < day ? -2 : -1));
                }
            });
        });
    }
    SigninManager.signinState = signinState;
    /**
     * 签到
     */
    function signin(day, cb) {
        checkLoginTime(false, function () {
            var sundayDate = getSundayDate(__dateTimeLong__);
            if (day <= 0) {
                day = getWeekDay(__dateTimeLong__);
            }
            signinState(day, function (state) {
                if (state == -1 || state == 0) {
                    __signinState__[day] = 1;
                    DataManager.setData("signin-" + sundayDate, JSON.stringify(__signinState__));
                    cb && cb(true, day);
                }
                else {
                    cb && cb(false);
                }
            });
        });
    }
    SigninManager.signin = signin;
    function checkSigninState(onFinish) {
        checkLoginTime(false, function () {
            var sundayDate = getSundayDate(__dateTimeLong__);
            // DataManager.getData(`signin-${sundayDate}`).then(value => {
            //     try {
            //         __signinState__ = JSON.parse(value);
            //     } catch (error) {
            //         __signinState__ = {};
            //     }
            //     onFinish && onFinish();
            // });
            DataManager.getData("signin-" + sundayDate);
        });
    }
    /** 检测登录时间 */
    function checkLoginTime(useLocalTime, onFinish) {
        if (__dateTimeLong__ > 0) {
            onFinish && onFinish();
            return;
        }
        if (useLocalTime) {
            var dateTime = new Date();
            __dateTimeLong__ = dateTime.getTime();
            onFinish && onFinish();
        }
        else {
            yxmp.api.getServerTime().then(function (res) {
                if (res.data && res.data && res.data.time) {
                    __dateTimeLong__ = res.data.time * 1000;
                    onFinish && onFinish();
                }
                else {
                    checkLoginTime(true, onFinish);
                }
            }).catch(function (err) {
                checkLoginTime(true, onFinish);
            });
        }
    }
    /** 返回星期几 */
    function getWeekDay(dateTimeLong) {
        var dateTime = new Date(dateTimeLong);
        var day = dateTime.getDay();
        if (day == 0) {
            day = 7;
        }
        return day;
    }
    /** 返回本周日日期 */
    function getSundayDate(dateTimeLong) {
        var nowTime = dateTimeLong;
        var oneDayLong = 24 * 60 * 60 * 1000;
        var day = getWeekDay(dateTimeLong);
        var sunday = new Date(nowTime + (7 - day) * oneDayLong);
        var sundayDate = sunday.getFullYear() + "-" + (sunday.getMonth() + 1) + "-" + sunday.getDate();
        return sundayDate;
    }
    //------------------------------------------------------//////////////////////////////////////////////-------------------------------------------
    /**
     *
     * @param data 签到
     */
    function sign(data) {
        var signObj = new Object();
        var list = DataManager.getData(SignKey);
        if (!list) {
            list = [];
        }
        var timeString = GameDataManager.instance.serverTime;
        var signId = data.id;
        signObj.time = timeString;
        signObj.signId = signId;
        list.push(signObj);
        DataManager.setData(SignKey, list);
        if (list.length >= 7 && !DataManager.getData(HadRole)) {
            if (data.type == 3) {
                DataManager.setData(HadRole, data);
                // 角色列表更新 保存角色id
                GameDataManager.instance.recordUserRolesData({ id: data.target });
            }
        }
    }
    SigninManager.sign = sign;
    /**
     *  判断今天距离最后一次签到是否断签
     */
    function checkSignBreak() {
        var list = DataManager.getData(SignKey);
        if (!list || list.length == 0) {
            return true;
        }
        if (hadSign()) {
            return false;
        }
        var lastSign = list[list.length - 1];
        var lastTime = parseInt(lastSign.time);
        var serverTime = GameDataManager.instance.serverTime;
        var isBreak = compareDifferentDaysByMillisecond(serverTime, lastTime);
        if (isBreak) {
            DataManager.setData(SignKey, []);
        }
        else {
            if (list.length == 7) {
                DataManager.setData(SignKey, []);
            }
        }
        return isBreak;
    }
    SigninManager.checkSignBreak = checkSignBreak;
    /**
     * 通过时间秒毫秒数判断两个时间的间隔
     * @param currentTime 当前时间
     * @param lastTime 最后一次签到时间
     * @return
     */
    function compareDifferentDaysByMillisecond(currentTime, lastTime) {
        var days = (currentTime - lastTime) / (1000 * 3600 * 24);
        // 大于两天可能断签了
        if (days >= 2) {
            return true;
        }
        var newTimeTemp = lastTime + (1000 * 3600 * 24);
        if (isToday(currentTime, newTimeTemp)) {
            //昨天签到
            return false;
        }
        //前天签到
        return true;
    }
    /**
     * 判断是否是同一天
     * @param currentTime
     * @param lastTime
     */
    function isToday(currentTime, lastTime) {
        var time1 = new Date(currentTime).toDateString();
        var time2 = new Date(lastTime).toDateString();
        if (time1 === time2) {
            return true;
        }
        return false;
    }
    SigninManager.isToday = isToday;
    /**
     * 判断今天是否已经签到
     */
    function hadSign() {
        var list = DataManager.getData(SignKey);
        if (list && list.length > 0) {
            var lastSign = list[list.length - 1];
            var lastTime = parseInt(lastSign.time);
            var serverTime = GameDataManager.instance.serverTime;
            if (isToday(serverTime, lastTime)) {
                return true;
            }
        }
        return false;
    }
    SigninManager.hadSign = hadSign;
    /**
     * 签到第几天
     */
    function signIndex() {
        var list = DataManager.getData(SignKey);
        if (!list || list.length == 0) {
            return 0;
        }
        return list.length;
    }
    SigninManager.signIndex = signIndex;
})(SigninManager || (SigninManager = {}));
