var ossGameVersion = "/1.0.0";
/**
 * 获取游戏模式列表
 */
var fetchGameModeList = function () {
    var path = ossGameVersion + "/game.json";
    return yxmp.asset.fetch(path, 5 * 60);
};
/**
 * 拉取当前模式游戏详情
 */
var fetchModeDetail = function (modeId) {
    var path = "";
    return yxmp.asset.fetch(path, 5 * 60);
};
/**
 * 获取角色列表
 */
var fetchRoleList = function () {
    var path = ossGameVersion + "/role.json";
    return yxmp.asset.fetch(path, 5 * 60);
};
/**
 *  获取签到配置表
 */
var fetchSignList = function () {
    var path = ossGameVersion + "/sign.json";
    return yxmp.asset.fetch(path, 5 * 60);
};
