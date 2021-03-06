var usercloudInfoKey = "userdata";
var usercloudCardKey = "usercard";
var usercloudRoleKey = "userrole";
var GameDataManager = /** @class */ (function () {
    function GameDataManager() {
        this.roleLIst = []; // 角色配置表
    }
    Object.defineProperty(GameDataManager, "instance", {
        get: function () {
            if (!GameDataManager._instance) {
                GameDataManager._instance = new GameDataManager();
            }
            return GameDataManager._instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameDataManager.prototype, "cardConfig", {
        /** 卡片分享贴图位置 */
        get: function () {
            return {
                "1": [531, 254],
                "2": [375, 379],
                "3": [375, 379],
                "4": [531, 254],
                "5": [519, 446],
                "6": [519, 446],
                "7": [443, 171],
                "8": [443, 171],
            };
        },
        enumerable: true,
        configurable: true
    });
    /**
     * {解锁条件 邀请人数 获得星星数量}
     * @param modeId 判断当前章节是否解锁
     */
    GameDataManager.prototype.checkModeIslock = function (modeId) {
        if (DataManager.hasData(modeId + '')) {
            var data = DataManager.getData(modeId);
            if (data.lock.length > 0) {
                var type = data.lock[0];
                if (type == 1) {
                    // 收集多少星
                    var star = data.lock[1];
                    if (User.instace.star >= star) {
                        data.lock = [];
                        this.recordModeById(modeId, data);
                    }
                }
                else if (type == 2) {
                    var num = data.lock[1];
                    if (data.invite >= num) {
                        data.lock = [];
                        this.recordModeById(modeId, data);
                    }
                }
            }
            return data.lock;
        }
        else {
            var mode = {
                invite: 0,
                lock: [],
                star: 0
            };
            var obj = this.modeList.find(function (item) {
                return item.id == modeId;
            });
            if (obj) {
                if (obj.lock.length > 0) {
                    mode.lock = obj.lock;
                    var type = mode.lock[0];
                    if (type == 1) {
                        // 收集多少星
                        var star = mode.lock[1];
                        if (User.instace.star >= star) {
                            mode.lock = [];
                        }
                    }
                }
            }
            this.recordModeById(modeId, mode);
            return mode.lock;
        }
    };
    /**
     * 记录章节
     * @param modeId 章节id
     * @param value 
     */
    GameDataManager.prototype.recordModeById = function (modeId, value) {
        DataManager.setData(modeId + '', value);
    };
    /**
     * 获取章节信息
     * @param modeId
     */
    GameDataManager.prototype.getModeRecordDataById = function (modeId) {
        return DataManager.getData(modeId + '');
    };
    /**
     * 记录当前游戏结果
     * @param musicId
     * @param value
     */
    GameDataManager.prototype.recordMusicById = function (musicId, value) {
        DataManager.setData("musicData" + musicId, value);
    };
    /**
     * 记录用户游戏相关数据
     * @param value
     */
    GameDataManager.prototype.recordUserGameData = function () {
        DataManager.setData(usercloudInfoKey, User.instace);
    };
    /**
     * 获取用户游戏相关数据
     */
    GameDataManager.prototype.getUserGameData = function () {
        return DataManager.getData(usercloudInfoKey);
    };
    /**
     * 记录用户卡片相关数据
     * @param value
     */
    GameDataManager.prototype.recordUserCardsData = function (value) {
        if (value) {
            var time = new Date().getTime();
            var newObj = Object.assign({ timeTemp: time }, value);
            User.instace.cards.unshift(newObj);
            DataManager.setData(usercloudCardKey, User.instace.cards);
        }
    };
    /**
     * 获取用户卡片数据
     */
    GameDataManager.prototype.getUserCardsData = function () {
        return DataManager.getData(usercloudCardKey);
    };
    /**
     * 记录用户角色相关数据
     * @param value
     */
    GameDataManager.prototype.recordUserRolesData = function (value) {
        if (value) {
            User.instace.roles.push(value);
            DataManager.setData(usercloudRoleKey, User.instace.roles);
        }
    };
    /**
     * 获取用户角色数据
     */
    GameDataManager.prototype.getUserRolesData = function () {
        return DataManager.getData(usercloudRoleKey);
    };
    /**
     * 最后一次玩的篇章的索引
     */
    GameDataManager.prototype.nearestPlayChapterIndex = function () {
        var chapterId = '';
        if (!chapterId) {
            return 0;
        }
        var chapter = this.getChapterById(chapterId);
        if (chapter) {
            return this.modeList.indexOf(chapter);
        }
        return 0;
    };
    /**
     *
     * @param chapterId 篇章id
     * @param musicId 音乐id
     */
    GameDataManager.prototype.recordNearestMusic = function (chapterId, musicId) {
        DataManager.setData("chapter" + chapterId, musicId);
    };
    /**
     * 获取当前篇章最近玩的关卡
     * @param chapter 篇章id
     */
    GameDataManager.prototype.nearestPlayMusic = function (chapter) {
        var musicId = '';
        var chapterMusics = this.getMuicList(chapter);
        var music = chapterMusics.find(function (item) {
            return item.id == musicId;
        });
        if (music) {
            return music;
        }
        return chapterMusics[0];
    };
    /**
     * 设置开放域数据
     */
    GameDataManager.prototype.uploadCloudData = function () {
        var score = User.instace.star;
        var obj = { wxgame: { score: score, update: 0 } };
        Tape.MiniRank.setRankData([{
                key: "star_score",
                value: JSON.stringify(obj)
            }]);
    };
    /**上报单个音乐排行榜 音乐id 音乐分数 到开放域*/
    GameDataManager.prototype.uploadMusicCloudData = function (musicId, score) {
        var obj = { wxgame: { score: score, update: 0 } };
        Tape.MiniRank.setRankData([{
                key: "music_" + musicId,
                value: JSON.stringify(obj)
            }]);
    };
    /**
     * 设置单个音乐的分数
     */
    GameDataManager.prototype.updateMusicGrade = function (score, musicId) {
        yxmp.api.setRankScore(score, {}, "music" + musicId);
    };
    /**
     *
     * @param musicId 获取单个音乐排行榜
     */
    GameDataManager.prototype.getMusicRankList = function (musicId) {
        return yxmp.api.getRankList(100, "music" + musicId);
    };
    /**
     * 获取当前模式的音乐列表
     * @param mode
     */
    GameDataManager.prototype.getMuicList = function (mode) {
        var source = Laya.loader.getRes("res/cfg/stage.json");
        var list = source.filter(function (item) {
            return item.cid == mode.id;
        });
        return list;
    };
    /**
     * 根据当前的星星数量，判断获取的金币
     */
    GameDataManager.prototype.rewardCoinByStar = function (starNum) {
        var list = [[2, 3], [6, 7], [8, 9], [12, 13]];
        if (starNum < list.length) {
            var coins = list[starNum];
            var randomNum = Math.round(Math.random());
            return coins[randomNum];
        }
        return 0;
    };
    /**
     * 章节的当前获得的星星，总共的星星
     * @param chapterId 当前章节的id
     */
    GameDataManager.prototype.chapterStarProgress = function (chapterId) {
        var _this = this;
        var stars = 0;
        var total = 0;
        var chapter = this.modeList.find(function (item) {
            return item.id == chapterId;
        });
        if (chapter) {
            var musics = this.getMuicList(chapter);
            musics.forEach(function (item, index) {
                total += 3;
                var musicRecord = _this.getRecordMusic(item.id);
                if (musicRecord) {
                    stars += musicRecord.star;
                }
            });
        }
        return [stars, total];
    };
    /**
     * 判断游戏结束后是否解锁下一关卡
     */
    GameDataManager.prototype.chapterAutoRelease = function (chapterId, callBack) {
        var item = this.nextChapter(chapterId);
        if (item) {
            var condition = item.lock;
            var type = condition[0];
            var target = condition[1];
            // 需要星星解锁
            if (type == 1 && target > 0) {
                // 判断是否已经解锁过了
                var chapter = this.getModeRecordDataById(item.id);
                if (!chapter || chapter.lock.length > 0) {
                    var ownStar = User.instace.star;
                    if (ownStar >= target) {
                        // 提示解锁
                        callBack && callBack();
                    }
                }
            }
        }
    };
    /**
     * 获取篇章
     * @param targetId 篇章id
     */
    GameDataManager.prototype.getChapterById = function (targetId) {
        var item = this.modeList.find(function (item) {
            return item.id == targetId;
        });
        return item;
    };
    /**
     * 下一章节
     */
    GameDataManager.prototype.nextChapter = function (targetId) {
        var item = this.getChapterById(targetId);
        var index = this.modeList.indexOf(item);
        if (index >= this.modeList.length - 1) {
            // 最后一篇章 
            return null;
        }
        var nextChapter = this.modeList[index + 1];
        return nextChapter;
    };
    /**
    *  当前正在使用的角色
    */
    GameDataManager.prototype.currentUsedRoleId = function () {
        return Laya.LocalStorage.getItem(usedRoleKey);
    };
    /** 当前角色图片 */
    GameDataManager.prototype.currentUserRoleImg = function () {
        var roleId = this.currentUsedRoleId();
        var item = this.roleLIst.find(function (item) {
            return item.id == roleId;
        });
        if (item) {
            return "res/ic_role/" + item.img + ".png";
        }
        return "";
    };
    Object.defineProperty(GameDataManager.prototype, "modeList", {
        get: function () {
            if (!this._modeList) {
                this._modeList = Laya.loader.getRes("res/cfg/game.json");
                this._modeList = this._modeList.list;
            }
            return this._modeList;
        },
        enumerable: true,
        configurable: true
    });
    return GameDataManager;
}());
