var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameActivity = /** @class */ (function (_super) {
    __extends(GameActivity, _super);
    function GameActivity() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ui = new ui.pages.GamePageUI();
        //
        _this._items = [];
        //是否已经加入最后节点
        _this._autoLast = false;
        _this._reviveTimes = 0;
        //
        _this._awsomeTime = 0;
        //是否可项目
        _this._turnable = true;
        _this.curX = Laya.stage.width / 2;
        _this.curY = Laya.stage.height / 2;
        _this.delX = 0;
        _this.delY = 0;
        _this.speedX = 0;
        _this.speedY = 0;
        _this.dir = 1;
        //误差；
        _this.deviation = 80;
        _this.targetX = _this.curX;
        _this.targetY = _this.curY;
        return _this;
    }
    GameActivity.prototype.createUI = function () {
        var _this = this;
        _super.prototype.createUI.call(this);
        //this.ui.bg.skin = "res/map/bj"+this.params.id+"1.jpg";
        this.starContainer = new Laya.Sprite();
        this.ui.addChildAt(this.starContainer, this.ui.getChildIndex(this.ui.btnPause));
        this.map = new Laya.Sprite();
        this.ui.addChildAt(this.map, this.ui.getChildIndex(this.ui.btnPause));
        this.pathSp = new Laya.Sprite();
        this.ui.addChildAt(this.pathSp, this.ui.getChildIndex(this.ui.btnPause));
        this.effContainer = new Laya.Sprite();
        this.ui.addChild(this.effContainer);
        this._eff = new Laya.Image("res/game/spot_s.png");
        this._eff.anchorX = this._eff.anchorY = 0.5;
        this._eff2 = new Laya.Image("res/game/light.png");
        this._eff2.anchorX = this._eff2.anchorY = 0.5;
        this.scrollRect = new Laya.Rectangle(0, 0, this.ui.width, this.ui.height);
        this.ui.selectBox.cacheAsBitmap = true;
        this.init();
        //this.initEvent();
        //自动暂停
        wx.onHide(function () {
            if (_this.soundChannel && !_this.soundChannel.paused) {
                _this.pause();
            }
        });
    };
    GameActivity.prototype.init = function () {
        var _this = this;
        this.ui.btnPause.on(Laya.Event.CLICK, null, function () {
            _this.pause();
        });
        this.ui.btnSelSong.on(Laya.Event.CLICK, null, function () {
            XFacade.instance.showModule(LevelsActivity, _this.params);
        });
        this.ui.backBtn.on(Laya.Event.CLICK, null, function () {
            _this.close();
        });
        this.ui.btnStart.on(Laya.Event.CLICK, this, this.onStart);
    };
    GameActivity.prototype.show = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        _super.prototype.show.call(this);
        this.params = args[0];
        trace("args..........", args);
        this.ui.tfChap.text = this.params.name;
        this.ui.btnPause.visible = false;
        // loading frist music
        var fristMusic = GameDataManager.instance.nearestPlayMusic(this.params);
        XFacade.instance.showModule(GameLoading, fristMusic);
    };
    GameActivity.prototype.initEvent = function () {
        XEvent.instance.on(GameEvent.ERR, this, this.onGameEvent, [GameEvent.ERR]);
        XEvent.instance.on(GameEvent.BACK, this, this.onGameEvent, [GameEvent.BACK]);
        XEvent.instance.on(GameEvent.OVER, this, this.onGameEvent, [GameEvent.OVER]);
        XEvent.instance.on(GameEvent.RESTART, this, this.onGameEvent, [GameEvent.RESTART]);
        XEvent.instance.on(GameEvent.SELECTED, this, this.onGameEvent, [GameEvent.SELECTED]);
        XEvent.instance.on(GameEvent.NEXTCHAPTER, this, this.onGameEvent, [GameEvent.NEXTCHAPTER]);
    };
    GameActivity.prototype.removeEVent = function () {
        XEvent.instance.off(GameEvent.ERR, this, this.onGameEvent);
        XEvent.instance.off(GameEvent.OVER, this, this.onGameEvent);
        XEvent.instance.off(GameEvent.BACK, this, this.onGameEvent);
        XEvent.instance.off(GameEvent.RESTART, this, this.onGameEvent);
        XEvent.instance.off(GameEvent.SELECTED, this, this.onGameEvent);
        XEvent.instance.off(GameEvent.NEXTCHAPTER, this, this.onGameEvent);
    };
    GameActivity.prototype.onGameEvent = function (type, data) {
        if (data === void 0) { data = null; }
        switch (type) {
            case GameEvent.BACK:
                this.stop();
                this.close();
                break;
            case GameEvent.OVER:
                this.over();
                break;
            case GameEvent.RESTART:
                this.restart();
                break;
            case GameEvent.SELECTED:
                this._data = data;
                var record = null;
                if (record) {
                    this.ui.tfName.text = data.name;
                }
                else {
                    var list = GameDataManager.instance.getMuicList(this.params);
                    var index = list.indexOf(data) + 1;
                    this.ui.tfName.text = "第" + index + "首";
                }
                this.ui.selectBox.visible = true;
                this.ui.btnPause.visible = false;
                this.ui.backBtn.visible = true;
                this.initMap();
                break;
            case GameEvent.NEXTCHAPTER:
                this.params = data;
                this.ui.bg.skin = "res/map/bj" + this.params.id + "1.png";
                this.ui.tfChap.text = this.params.name;
                this.ui.selectBox.visible = true;
                var fristMusic = GameDataManager.instance.nearestPlayMusic(this.params);
                XFacade.instance.showModule(GameLoading, fristMusic);
                break;
            case GameEvent.ERR:
                XAlert.showAlert("哎呀，网络不太好~返回再试试吧", Laya.Handler.create(this, this.close));
                break;
        }
    };
    GameActivity.prototype.onStart = function (e) {
        e.stopPropagation();
        if (User.instace.userInfo.power > 0) {
            User.instace.userInfo.power -= 1;
            this.startWithCfg();
            this.ui.selectBox.visible = false;
            this.ui.btnPause.visible = true;
            this.ui.backBtn.visible = false;
            //record nearest play music in chapter
        }
        else {
            XFacade.instance.showModule(PopAddPower);
        }
    };
    GameActivity.prototype.pause = function () {
        if (this.soundChannel) {
            Star.sleep();
            try {
                this.soundChannel.pause();
            }
            catch (e) {
            }
            Laya.timer.clear(this, this.update);
            Laya.timer.clear(this, this.update2);
            Laya.stage.off(Laya.Event.CLICK, this, this.onC);
            PopGamePause.show(false, [Laya.Handler.create(this, this.toResume), Laya.Handler.create(this, this.restart)]);
            //暂停无敌状态
            Laya.timer.clear(this, this.refreshState);
        }
    };
    //继续
    GameActivity.prototype.toResume = function () {
        DBGame.countdown(3, Laya.Handler.create(this, this.resume));
    };
    //重新开始
    GameActivity.prototype.restart = function () {
        if (User.instace.userInfo.power > 0) {
            User.instace.userInfo.power -= 1;
            GameDataManager.instance.recordUserGameData();
        }
        else {
            XFacade.instance.showModule(PopAddPower);
            return;
        }
        this.stop();
        this.initMap(false);
        //DBGame.countdown(3, Laya.Handler.create(this, this.startWithCfg));
        this.startWithCfg();
    };
    //继续
    GameActivity.prototype.revive = function () {
        var _this = this;
        if (User.instace.userInfo.power > 0) {
            User.instace.userInfo.power -= 1;
            GameDataManager.instance.recordUserGameData();
        }
        else {
            XFacade.instance.showModule(PopAddPower);
            return;
        }
        this._reviveTimes--;
        var p = this.getStdPoint(this._startTime);
        this.targetX = p.x;
        this.targetY = p.y;
        this.ball.pos(p.x, p.y);
        this.ball.reset();
        this.dir = 1;
        var stdNode = this.getStdNode(this._startTime);
        this.speedX = stdNode.sx;
        DBGame.countdown(3, Handler.create(null, function () {
            //this.soundChannel.play();
            //this._curTime = Laya.Browser.now();
            //this._startTime = this._curTime-this._startTime;
            _this.soundChannel.play();
            //Laya.timer.frameLoop(1, this, this.update)
            //Laya.stage.on(Laya.Event.CLICK, this, this.onC);
            _this._awsomeTime = 3;
            _this.showAwesome();
        }));
    };
    GameActivity.prototype.showAwesome = function () {
        /**
            Laya.timer.once(this._awsomeTime * 1000, null, () => {
                this.ball.removeFlash();
                this.dir = 1;
                this._awsomeTime = 0;
            });
            Laya.timer.once((this._awsomeTime + 1) * 1000, null, () => {
                this._turnable = true;
            });
             */
        if (this._awsomeTime > 0) {
            this._turnable = false;
            this.ball.flash();
            Laya.timer.loop(100, this, this.refreshState);
        }
    };
    GameActivity.prototype.refreshState = function () {
        var _this = this;
        this._awsomeTime -= 0.1;
        if (this._awsomeTime <= 0) {
            this.ball.removeFlash();
            this.dir = 1;
            this._awsomeTime = 0;
            Laya.timer.clear(this, this.refreshState);
            Laya.timer.once(1000, null, function () {
                _this._turnable = true;
            });
        }
    };
    GameActivity.prototype.stop = function () {
        if (this.soundChannel) {
            this.soundChannel.stop();
            Laya.SoundManager.removeChannel(this.soundChannel);
            this.soundChannel.completeHandler = null;
        }
        Star.sleep();
        Laya.timer.clear(this, this.update);
        Laya.timer.clear(this, this.update2);
        Laya.stage.off(Laya.Event.CLICK, this, this.onC);
        Laya.SoundManager.destroySound(GameActivity.mp3);
    };
    GameActivity.prototype.resume = function () {
        if (!this.soundChannel) {
            return;
        }
        // this._curTime = Laya.Browser.now();
        // this._startTime = this._curTime-this._startTime;
        this.soundChannel.play();
        //继续无敌状态
        this.showAwesome();
        /*
        if(!this.soundChannel){
            return;
        }

        this._curTime = this.soundChannel.position;
        Laya.timer.frameLoop(1, null, syncSnd);
        var $this = this;
        function syncSnd():void{
            if($this.soundChannel.position >= $this._curTime){
                Laya.timer.clear(null, syncSnd);
                $this.update();
                Laya.timer.frameLoop(1, $this, $this.update)
                Laya.stage.on(Laya.Event.CLICK, $this, $this.onC);
                Laya.stage.off(Laya.Event.CLICK, $this, $this.resume);
            }
        }

        this.soundChannel.resume();
        */
    };
    GameActivity.prototype.over = function () {
        if (this._score > 0) {
            this.showResult();
        }
        else {
            this.back();
        }
    };
    GameActivity.prototype.initMap = function (firstTime) {
        if (firstTime === void 0) { firstTime = true; }
        this._rendIndex = 1;
        this._starNum = this._score = this._awsomeTime = this._curTime = this._startTime = 0;
        this._autoLast = false;
        this.showPro(null);
        this.ui.tfScore.text = "0";
        this._reviveTimes = DBGame.ReviveTimes;
        this._mapArr = [];
        for (var i = 0; i < this._items.length; i++) {
            this._items[i].removeSelf();
        }
        this._items.length = 0;
        while (this.effContainer.numChildren) {
            this.effContainer.removeChildAt(0);
        }
        var cfg = Laya.loader.getRes('res/snd/' + this._data.json + '.json');
        this._starCfg = (this._data.stars + "").split("|");
        for (var i = 0; i < this._starCfg.length; i++) {
            this._starCfg[i] = parseInt(this._starCfg[i]);
        }
        //克隆资源列表 
        this._resList = xframe.XUtils.clone(cfg.items) || [];
        this._resList.sort(function (a, b) {
            return a.t - b.t;
        });
        trace("this._resList..................................", this._resList);
        if (firstTime) {
            //生成星星
            Star.shine(30, this.starContainer);
        }
        this.stop();
        //设定初始点=============================
        this.posInfo = xframe.XUtils.clone(cfg.nodes);
        this.srcPosInfo = xframe.XUtils.clone(cfg.nodes);
        var node = this.srcPosInfo.shift();
        this.curX = this.targetX = node.x;
        this.curY = this.targetY = this.offsetY = node.y;
        this.speedX = node.sx;
        this.speedY = cfg.speed;
        this.rendMap();
        //生成角色========================================
        if (!this.ball) {
            this.ball = new Ball();
            this.ball.shadow(4);
            this.pathSp.addChild(this.ball);
        }
        this.ball.setSkin(1, this.speedY);
        this.ball.reset();
        this.ball.pos(this.curX, this.curY);
        this.map.y = this.pathSp.y = 0;
    };
    GameActivity.prototype.rendMap = function () {
        //0，判断是否需要重新绘制地图;
        var maxHeight = 4096; //2048
        var curY = this.targetY - this.offsetY;
        if (this._mapArr.length) {
            if (this._autoLast || curY - this._mapArr[this._mapArr.length - 1] > 120) {
                return;
            }
        }
        var cfg = Laya.loader.getRes('res/snd/' + this._data.json + '.json');
        //1根据当前位置计算出初始节点及结束点；
        //a,取当前节点
        var midIndex;
        var startIndex;
        for (var i = cfg.nodes.length - 1; i >= 0; i--) {
            if (cfg.nodes[i].y > curY) {
                midIndex = i;
                break;
            }
        }
        //trace("midIndex============================",midIndex)
        //取开始节点
        for (i = midIndex; i >= 0; i--) {
            if (cfg.nodes[i].y - curY >= Laya.stage.height) {
                break;
            }
        }
        startIndex = Math.max(0, i);
        //trace("startIndex============================",i)
        //2,生成地图==========================
        curY = cfg.nodes[startIndex].y;
        this._mapArr.length = 0;
        for (i = startIndex; i < cfg.nodes.length; i++) {
            //trace("delY============================",curY - cfg.nodes[i].y)
            if (curY - cfg.nodes[i].y < maxHeight) {
                this._mapArr.push(cfg.nodes[i].x, cfg.nodes[i].y);
            }
            else {
                break;
            }
        }
        //3，绘制地图
        this.map.graphics.clear();
        if (startIndex == 0) { //画起点
            this.map.graphics.drawCircle(this._mapArr[0], this._mapArr[1], 160, "#ffffff");
            this.map.graphics.drawTexture(Laya.loader.getRes("res/game/start_bg.png"), this._mapArr[0] - 200, this._mapArr[1] - 200);
        }
        this.map.graphics.drawLines(0, 0, this._mapArr, "#ffffff", 160); //160
        if (i >= cfg.nodes.length && this.soundChannel.duration) {
            this._autoLast = true;
            var last = this.posInfo[this.posInfo.length - 1];
            var total = this.soundChannel.duration * 1000;
            trace("end=========================", this.soundChannel, last, this.soundChannel.duration);
            var info = { x: last.x, y: last.y - (total - last.t) * this.speedY, sx: 0, sy: last.sy, t: total };
            this.posInfo.push(info);
            this.srcPosInfo.push(info);
            this.map.graphics.drawLine(last.x, last.y, info.x, info.y, "#ffffff", 160);
            this.map.graphics.drawCircle(info.x, info.y, 160, "#ffffff");
            this.map.graphics.drawTexture(Laya.loader.getRes("res/game/start_bg.png"), info.x - 200, info.y - 200);
        }
        var offset = this._autoLast ? 3 : 1;
        i = startIndex == 0 ? 2 : 0;
        for (i; i < this._mapArr.length - offset; i++) {
            this.map.graphics.drawTexture(Laya.loader.getRes("res/game/spot.png"), this._mapArr[i] - 28, this._mapArr[i + 1] - 28);
            //画引导res/game/click.png
            if (this._data.id == "1" && startIndex < 27) {
                if (this._mapArr[i] > this.ui.width / 2) {
                    this.map.graphics.drawTexture(Laya.loader.getRes("res/game/click.png"), this._mapArr[i] + 135, this._mapArr[i + 1] - 32);
                }
                else {
                    this.map.graphics.drawTexture(Laya.loader.getRes("res/game/click.png"), this._mapArr[i] - 195, this._mapArr[i + 1] - 32);
                }
            }
            i++;
        }
        //4，缓存；
        //this.map.cacheAsBitmap = true;
    };
    GameActivity.prototype.startWithCfg = function () {
        this.start();
        //this._awsomeTime = 1;
        return;
        this.stop();
        this.soundChannel = Laya.SoundManager.playSound(GameActivity.mp3, 1, Laya.Handler.create(this, this.gemeEnd));
        this._curTime = this.soundChannel.position;
        Laya.timer.frameLoop(1, this, this.update);
        Laya.stage.on(Laya.Event.CLICK, this, this.onC);
        /**预加载*/
        var res = [
            { url: 'res/map/bj' + this.params.id + '2.jpg', type: Laya.Loader.IMAGE },
            { url: 'res/map/bj' + this.params.id + '3.jpg', type: Laya.Loader.IMAGE }
        ];
        Laya.loader.load(res);
    };
    //使用微信接口方法;
    GameActivity.prototype.start = function () {
        var _this = this;
        var url = encodeURI(Laya.URL.basePath + GameActivity.mp3);
        if (this.soundChannel && this.soundChannel.src != url) {
            this.soundChannel.destroy();
            //清理掉
        }
        this.soundChannel = wx.createInnerAudioContext();
        this.soundChannel.src = url;
        this.soundChannel.play();
        this.soundChannel.onPlay(function () {
            if (_this._startTime == 0) {
                _this._curTime = _this._startTime = Laya.Browser.now();
            }
            else {
                _this._curTime = Laya.Browser.now();
                _this._startTime = _this._curTime - _this._startTime;
            }
            Laya.timer.frameLoop(1, _this, _this.update2);
            Laya.stage.on(Laya.Event.CLICK, _this, _this.onC);
            trace("start======================", _this.soundChannel);
        });
        this.soundChannel.onEnded(function () {
            _this.gemeEnd();
            trace("onEnded======================");
        });
        this.soundChannel.onPause(function () {
            //记录播放的时间---
            _this._startTime = Laya.Browser.now() - _this._startTime;
            trace("onPause======================");
        });
        this.soundChannel.onError(function () {
            XEvent.instance.event(GameEvent.ERR);
            //播放失败，返回体力
            User.instace.userInfo.power += 1;
            GameDataManager.instance.recordUserGameData();
            trace("onError======================");
        });
        /**预加载*/
        var res = [
            { url: 'res/map/bj' + this.params.id + '2.jpg', type: Laya.Loader.IMAGE },
            { url: 'res/map/bj' + this.params.id + '3.jpg', type: Laya.Loader.IMAGE }
        ];
        Laya.loader.load(res);
    };
    /**核心驱动方法 */
    GameActivity.prototype.update2 = function () {
        var _this = this;
        this._rendIndex++;
        var exeIndex = this._rendIndex % 5;
        var end = false;
        var tmpTime = Laya.Browser.now() - this._curTime;
        this._curTime = Laya.Browser.now();
        var position = this._curTime - this._startTime;
        Star.active();
        if (this._awsomeTime) {
            var p = this.getStdPoint(position);
            this.targetY = p.y;
            this.targetX = p.x;
            if (exeIndex == 4) {
                var targetPoint = this.getTargetPoint(true, 6);
                var now = this._score;
                if (targetPoint) {
                    this.speedX = targetPoint.sx;
                    this._score += 10;
                    xframe.XUtils.showTxtEffect(now, this._score, Laya.Handler.create(null, function (n) {
                        _this.ui.tfScore.text = n + "";
                    }));
                }
            }
        }
        else {
            this.targetY = this.offsetY - this.speedY * position;
            this.targetX += this.speedX * tmpTime * this.dir;
        }
        this.ball.update();
        this.ball.x = this.targetX;
        this.ball.y = this.targetY;
        this.pathSp.y = this.offsetY - this.targetY;
        this.map.y = this.pathSp.y;
        if (exeIndex == 1) {
            var targetPoint_1 = this.getTargetPoint(false);
            if (this.srcPosInfo.length <= 2) {
                this.ui.btnPause.visible = false;
            }
            else if (targetPoint_1) {
                if (targetPoint_1.y - this.targetY > 150) {
                    end = true;
                }
            }
        }
        else if (exeIndex == 2) {
            this.showPro(DBGame.calcPro(position, this._starCfg));
        }
        else if (exeIndex == 4) {
            this.rendMap();
        }
        else if (exeIndex == 0) {
            this.rendMapItems(position);
        }
        else if (exeIndex == 3 && this.srcPosInfo.length && this.getStdPoint(position).distance(this.targetX, this.targetY) > 106) { //120
            end = true;
            trace("End at time::", position, tmpTime, this.targetX, this.targetY, this.getStdPoint(position));
        }
        if (end) {
            Star.sleep();
            this.soundChannel.pause();
            Laya.timer.clear(this, this.update);
            Laya.timer.clear(this, this.update2);
            Laya.stage.off(Laya.Event.CLICK, this, this.onC);
            if (this._starNum > 0 && this._reviveTimes) {
                XFacade.instance.showModule(PopGameRevive, { yes: Laya.Handler.create(this, this.revive), no: Laya.Handler.create(this, this.showResult) });
            }
            else {
                this.showResult();
            }
        }
    };
    /**核心驱动方法 */
    GameActivity.prototype.update = function () {
        this._rendIndex++;
        var exeIndex = this._rendIndex % 5;
        var end = false;
        var tmpTime = (this.soundChannel.position - this._curTime) * 1000;
        var position = this.soundChannel.position * 1000;
        //timeOver
        if (tmpTime < 0 || position == 0) {
            return;
        }
        else if (tmpTime > 500) { //无效的音频，扔掉
            trace("Update Error：：Time offset is over..", tmpTime, this.soundChannel.position, this._curTime);
            this.stop();
            Laya.timer.once(1000, this, this.startWithCfg);
            return;
        }
        this._curTime = this.soundChannel.position;
        Star.active();
        if (this._awsomeTime) {
            var p = this.getStdPoint(position);
            this.targetY = p.y;
            this.targetX = p.x;
            if (exeIndex == 4) {
                var targetPoint = this.getTargetPoint();
                if (targetPoint) {
                    this._score += 10;
                    this.speedX = targetPoint.sx;
                    this.ui.tfScore.text = this._score + "";
                }
            }
        }
        else {
            this.targetY = this.offsetY - this.speedY * position;
            this.targetX += this.speedX * tmpTime * this.dir;
        }
        this.ball.update();
        this.ball.x = this.targetX;
        this.ball.y = this.targetY;
        this.pathSp.y = this.offsetY - this.targetY;
        this.map.y = this.pathSp.y;
        if (exeIndex == 1) {
            var targetPoint_2 = this.getTargetPoint(false);
            if (this.srcPosInfo.length <= 2) {
                this.ui.btnPause.visible = false;
            }
            else if (targetPoint_2) {
                if (targetPoint_2.y - this.targetY > 150) {
                    end = true;
                }
            }
        }
        else if (exeIndex == 2) {
            this.showPro(DBGame.calcPro(position, this._starCfg));
        }
        else if (exeIndex == 4) {
            this.rendMap();
        }
        else if (exeIndex == 0) {
            this.rendMapItems(this._curTime * 1000);
        }
        else if (exeIndex == 3 && this.srcPosInfo.length && this.getStdPoint(position).distance(this.targetX, this.targetY) > 106) { //120
            end = true;
            trace("End at time::", position, tmpTime, this.targetX, this.targetY, this.getStdPoint(position));
        }
        if (end) {
            Star.sleep();
            this.soundChannel.pause();
            Laya.timer.clear(this, this.update);
            Laya.stage.off(Laya.Event.CLICK, this, this.onC);
            if (this._starNum > 0 && this._reviveTimes) {
                XFacade.instance.showModule(PopGameRevive, { yes: Laya.Handler.create(this, this.revive), no: Laya.Handler.create(this, this.showResult) });
            }
            else {
                this.showResult();
            }
        }
    };
    GameActivity.prototype.onC = function () {
        var _this = this;
        this.curX = this.targetX;
        this.curY = this.targetY;
        var targetPoint = this.getTargetPoint();
        if (targetPoint) {
            this.dir = 1;
            this.speedX = targetPoint.sx;
            //效果判定---
            var delX = Math.abs(targetPoint.x - this.ball.x);
            var delY = Math.abs(targetPoint.y - this.ball.y);
            var nowScore = this._score;
            if (delX < 12 && delY < 15) { //5
                this.shine(targetPoint.x, targetPoint.y);
                this._score += 10;
            }
            else if (delX < 36 && delY < 25) { //3
                this.showEff(targetPoint.x, targetPoint.y);
                this._score += 5;
            }
            else { //2
                this._score += 3;
            }
            xframe.XUtils.showTxtEffect(nowScore, this._score, Laya.Handler.create(null, function (n) {
                _this.ui.tfScore.text = n + "";
            }));
            //动效====================================
            //this.fly();
        }
        else { //翻转
            if (this.srcPosInfo.length && this._turnable) {
                this.dir *= -1;
            }
        }
    };
    GameActivity.prototype.showResult = function () {
        this.stop();
        var params = {
            music: this._data,
            star: this._starNum,
            score: this._score
        };
        XFacade.instance.showModule(GameResultView, params);
    };
    /**
     * 渲染地图元素
     * 1,渲染不根据时间变化的元素，生成变化元素列表；
     * 2，渲染变化元素；
     * */
    GameActivity.prototype.rendMapItems = function (time) {
        for (var i = 0; i < this._items.length; i++) {
            if (this._items[i].y - this.targetY > Laya.stage.height) {
                this._items[i].removeSelf();
                trace(this._items[i].name);
                this._items.splice(i--, 1);
            }
            else {
                break;
            }
        }
        var delTime = Laya.stage.height * .35 / this.speedY;
        for (var i = 0; i < this._resList.length; i++) {
            if (this._resList[i].t < time + delTime) {
                var item = new Laya.Image();
                item.pos(this._resList[i].x, this._resList[i].y);
                var url = "res/map/" + this._resList[i].id + ".png";
                Laya.loader.load(url, Laya.Handler.create(null, function () {
                    item.skin = url;
                    xframe.AniUtil.popIn(item, 200);
                }));
                item.scaleX = this._resList[i].s;
                trace("rendMapItems", item.x, item.y, this._resList[i]);
                item.name = item.x + "_" + item.y;
                this.pathSp.addChild(item);
                //行为控制
                //xframe.AniUtil.popIn(item, 200)
                /*
                if(Math.random()>.5){
                    xframe.AniUtil.fadeIn(item, 200);
                }else{
                    xframe.AniUtil.popIn(item, 200)
                }*/
                this._resList.splice(i--, 1);
                this._items.push(item);
            }
            else {
                break;
            }
        }
    };
    GameActivity.prototype.showPro = function (proInfo) {
        var _this = this;
        if (proInfo) {
            this.ui.bar.value = proInfo.pro || 0;
            this._starNum = proInfo.stars;
            if (proInfo.stars == 3) {
                this.ui.star_2.skin = "res/game/star_w.png";
                this.ui.star_1.skin = "res/game/star_w.png";
                this.ui.star_0.skin = "res/game/star_w.png";
            }
            else if (proInfo.stars == 2) {
                this.ui.star_2.skin = "res/game/star_b.png";
                this.ui.star_1.skin = "res/game/star_w.png";
                this.ui.star_0.skin = "res/game/star_w.png";
                Laya.loader.load("res/map/bj" + this.params.id + "3.jpg", Laya.Handler.create(null, function () {
                    _this.switchSkin("res/map/bj" + _this.params.id + "3.jpg");
                }));
            }
            else if (proInfo.stars == 1) {
                this.ui.star_2.skin = "res/game/star_b.png";
                this.ui.star_1.skin = "res/game/star_b.png";
                this.ui.star_0.skin = "res/game/star_w.png";
                Laya.loader.load("res/map/bj" + this.params.id + "2.jpg", Laya.Handler.create(null, function () {
                    _this.switchSkin("res/map/bj" + _this.params.id + "2.jpg");
                }));
            }
        }
        else {
            this.ui.bar.value = 0;
            this.ui.star_2.skin = "res/game/star_b.png";
            this.ui.star_1.skin = "res/game/star_b.png";
            this.ui.star_0.skin = "res/game/star_b.png";
            this.ui.bg.skin = "res/map/bj" + this.params.id + "1.jpg";
        }
        this.ui.proBox.cacheAsBitmap = true;
    };
    GameActivity.prototype.switchSkin = function (skinStr) {
        if (this.ui.bg.skin != skinStr) {
            var img = new Laya.Image(this.ui.bg.skin);
            img.size(Laya.stage.width, Laya.stage.height);
            this.ui.bg.parent.addChildAt(img, this.ui.bg.parent.getChildIndex(this.ui.bg));
            Laya.Tween.to(img, { alpha: 0 }, 500, null, Laya.Handler.create(img, img.removeSelf));
            this.ui.bg.skin = skinStr;
            this.ui.bg.alpha = 0;
            Laya.Tween.to(this.ui.bg, { alpha: 1 }, 500);
        }
    };
    /**显示经过特效 */
    GameActivity.prototype.showEff = function (x, y) {
        this._eff.pos(x, y);
        this.pathSp.addChild(this._eff);
        Laya.timer.once(248, this._eff, this._eff.removeSelf);
    };
    /**精准打击特效 */
    GameActivity.prototype.shine = function (x, y) {
        this._eff2.pos(x, y);
        this._eff2.alpha = 1;
        this._eff2.scale(0.5, 0.5);
        this.pathSp.addChildAt(this._eff2, 0);
        Laya.Tween.to(this._eff2, { scaleX: 1.2, scaleY: 1.2, alpha: 0 }, 200, null, Laya.Handler.create(this._eff2, this._eff2.removeSelf));
        /*
        this._eff2.scaleX = this._eff2.scaleY = 0.5;
        Laya.Tween.to(this._eff2, {scaleX:1,scaleY:1}, 20, null, Laya.Handler.create(null, ()=>{
            Laya.Tween.to(this._eff2, {scaleX:1.5, scaleY:1.5},60,null, Laya.Handler.create(this._eff2, this._eff2.removeSelf))
        }))
        */
    };
    /**飞特效 */
    GameActivity.prototype.fly = function () {
        //动效===
        var img = Laya.Pool.getItemByClass("eff", Laya.Image);
        img.skin = "res/game/origin.png";
        this.effContainer.addChild(img);
        img.pos(this.curX + 40, this.curY + this.pathSp.y);
        var rnd = Math.random() * 400;
        Laya.Tween.to(img, { x: 200 + rnd, y: 150 + rnd }, 150 + rnd / 4, null, Laya.Handler.create(null, function () {
            Laya.Tween.to(img, { x: 80, y: 414 }, 150 + rnd / 4, null, Laya.Handler.create(null, function () {
                img.removeSelf();
                Laya.Pool.recover("eff", img);
            }));
        }));
    };
    //获取目标节点
    GameActivity.prototype.getTargetPoint = function (modify, deviation) {
        if (modify === void 0) { modify = true; }
        if (deviation === void 0) { deviation = -1; }
        var targetPoint;
        if (this.srcPosInfo.length) {
            for (var i = 0; i < this.srcPosInfo.length; i++) {
                var posInfo = this.srcPosInfo[i];
                if (deviation == -1) {
                    deviation = this.deviation;
                }
                if (Math.abs(posInfo.y - this.targetY) <= deviation || posInfo.y > this.targetY) {
                    targetPoint = posInfo;
                    modify && this.srcPosInfo.shift();
                    break;
                    //修改成点击一下取一个节点
                }
                else {
                    break;
                }
            }
        }
        return targetPoint;
    };
    GameActivity.prototype.getStdPoint = function (now) {
        if (!this._stdP) {
            this._stdP = new Laya.Point(this.curX, this.curY);
        }
        var tmp;
        for (var i = this.posInfo.length - 1; i >= 0; i--) {
            tmp = this.posInfo[i];
            if (tmp.t <= now) {
                break;
            }
        }
        var delTime = now - tmp.t;
        this._stdP.x = tmp.x + tmp.sx * delTime;
        this._stdP.y = tmp.y - this.speedY * delTime;
        return this._stdP;
    };
    /**获取标准的节点-重置操作点 */
    GameActivity.prototype.getStdNode = function (now) {
        var tmp;
        for (var i = this.posInfo.length - 1; i >= 0; i--) {
            if (this.posInfo[i].t <= now) {
                tmp = this.posInfo[i];
                break;
            }
        }
        this.srcPosInfo = [];
        for (i = i + 1; i < this.posInfo.length - 1; i++) {
            this.srcPosInfo.push(this.posInfo[i]);
        }
        return tmp;
    };
    GameActivity.prototype.gemeEnd = function () {
        trace("gameEnd---------------------------------------------->>");
        var params = {
            music: this._data,
            star: this._starNum,
            score: this._score
        };
        XFacade.instance.showModule(GameResultView, params);
        this.stop();
    };
    GameActivity.prototype.onDestroy = function () {
        Laya.loader.clearRes("res/map/bj" + this.params.id + "1.jpg");
        Laya.loader.clearRes("res/map/bj" + this.params.id + "2.jpg");
        Laya.loader.clearRes("res/map/bj" + this.params.id + "2.jpg");
        //this._data && Laya.loader.clearRes('res/snd/' + this._data.json + '.json');
        Laya.loader.clearRes(GameActivity.mp3);
        Star.destroy();
        this.soundChannel && this.soundChannel.destroy();
        this.ball && this.ball.stop();
        Laya.timer.clear(this, this.update);
        Laya.stage.off(Laya.Event.CLICK, this, this.onC);
        this.ui.btnStart.off(Laya.Event.CLICK, this, this.onStart);
        Laya.stage.off(Laya.Event.CLICK, this, this.resume);
        this.removeEVent();
        this.stop();
    };
    return GameActivity;
}(xframe.XWindow));
/**游戏事件 */
var GameEvent = /** @class */ (function () {
    function GameEvent() {
    }
    /**返回 */
    GameEvent.BACK = "back";
    /**重新开始 */
    GameEvent.RESTART = "restart";
    /**事件-选中歌曲 */
    GameEvent.SELECTED = 'selected';
    /**下一章节 */
    GameEvent.NEXTCHAPTER = "nextchapter";
    /**跳转到解锁篇章 */
    GameEvent.HOMECHAPTER = "homechapter";
    /**加载错误 */
    GameEvent.ERR = "err";
    /**结束歌曲 */
    GameEvent.OVER = "over";
    return GameEvent;
}());
