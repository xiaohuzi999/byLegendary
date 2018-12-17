
const ossGameVersion = "/1.0.0";  
    
/**
 * 获取游戏模式列表
 */
const  fetchGameModeList = () => {
    let path = ossGameVersion + "/game.json";
    return yxmp.asset.fetch(path, 5*60);
}

/**
 * 拉取当前模式游戏详情
 */
const fetchModeDetail = (modeId) => {
    let path = "";
    return yxmp.asset.fetch(path, 5*60);   
}

/**
 * 获取角色列表
 */
const fetchRoleList = () => {
    let path = ossGameVersion + "/role.json";
    return yxmp.asset.fetch(path, 5*60);
}

/**
 *  获取签到配置表
 */
const fetchSignList = () => {
    let path = ossGameVersion + "/sign.json";
    return yxmp.asset.fetch(path, 5*60);
}   