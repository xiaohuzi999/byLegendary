class GameView extends xframe.XWindow {

    ui = new ui.pages.GamePageUI();
    private pathSp: Laya.Sprite;
    private soundChannel: any;
    private effContainer: Laya.Sprite;
    private params:ChapterVo;
    /**静态传值---非理想方案*/
    public static mp3: string;
    //渲染资源列表
    private _resList: { x: number, y: number, t: number, id: string, s: number }[];
    //渲染编号
    private _rendIndex: number
    /**地图效果图 */
    private _eff: Laya.Image;

    private _eff2: Laya.Image;
    /**分数 */
    private _score: number;
    /**星星数 */
    private _starNum: number
    /**星星配置 */
    private _starCfg: any[];
    /**星星 */
    private _stars: Star[];
    //
    private _items: Laya.Image[] = [];
    //是否已经加入最后节点
    private _autoLast: boolean = false;
    private _reviveTimes: number = 0;
    //
    private _awsomeTime: number = 0;
    //是否可项目
    private _turnable: boolean = true;

    protected createUI() {
        super.createUI();
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
        wx.onHide(() => {
            if (this.soundChannel && !this.soundChannel.paused) {
                this.pause();
            }
        })
    }

    init() {
        this.ui.btnPause.on(Laya.Event.CLICK, null, () => {
            this.pause();
        });
        this.ui.backBtn.on(Laya.Event.CLICK, null, () => {
            this.close();
        });
        this.ui.btnStart.on(Laya.Event.CLICK, this, this.onStart);
    }

    public show(...args):void{
        super.show();
        this.params = args[0];
        this.ui.tfName.text = this.params.name;
        this.ui.btnPause.visible = false;
        XFacade.instance.showModule(GameLoading, this.params)
    }

    protected initEvent(): void {
        XEvent.instance.on(GameEvent.ERR, this, this.onGameEvent, [GameEvent.ERR]);
        XEvent.instance.on(GameEvent.BACK, this, this.onGameEvent, [GameEvent.BACK]);
        XEvent.instance.on(GameEvent.OVER, this, this.onGameEvent, [GameEvent.OVER]);
        XEvent.instance.on(GameEvent.RESTART, this, this.onGameEvent, [GameEvent.RESTART]);
        XEvent.instance.on(GameEvent.SELECTED, this, this.onGameEvent, [GameEvent.SELECTED]);
        XEvent.instance.on(GameEvent.NEXTCHAPTER, this, this.onGameEvent, [GameEvent.NEXTCHAPTER]);
    }

    protected removeEVent(): void {
        XEvent.instance.off(GameEvent.ERR, this, this.onGameEvent);
        XEvent.instance.off(GameEvent.OVER, this, this.onGameEvent);
        XEvent.instance.off(GameEvent.BACK, this, this.onGameEvent);
        XEvent.instance.off(GameEvent.RESTART, this, this.onGameEvent);
        XEvent.instance.off(GameEvent.SELECTED, this, this.onGameEvent);
        XEvent.instance.off(GameEvent.NEXTCHAPTER, this, this.onGameEvent); 
    }

    private onGameEvent(type: string, data: any = null): void {
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
                this.ui.selectBox.visible = true;
                this.ui.btnPause.visible = false;
                this.ui.backBtn.visible = true;
                this.initMap();
                break;
            case GameEvent.NEXTCHAPTER:
                XFacade.instance.showModule(GameLoading, DBChapter.getChapInfo(parseInt(this.params.id)+1))
                break;
            case GameEvent.ERR:
                XAlert.showAlert("哎呀，网络不太好~返回再试试吧", Laya.Handler.create(this, this.close));
                break;
        }
    }

    private onStart(e: Event): void {
        e.stopPropagation();
        if (User.instace.power > 0) {
            User.instace.power -= 1;
            this.startWithCfg();
            this.ui.selectBox.visible = false;
            this.ui.btnPause.visible = true;
            this.ui.backBtn.visible = false;
            //record nearest play music in chapter
        } else {
            XFacade.instance.showModule(PopAddPower);
        }
    }

    private pause(): void {
        if (this.soundChannel) {
            Star.sleep()
            try {
                this.soundChannel.pause();
            } catch (e) {

            }
            Laya.timer.clear(this, this.update)
            Laya.timer.clear(this, this.update2)
            Laya.stage.off(Laya.Event.CLICK, this, this.onC);
            PopGamePause.show(false, [Laya.Handler.create(this, this.toResume), Laya.Handler.create(this, this.restart)]);
            //暂停无敌状态
            Laya.timer.clear(this, this.refreshState);
        }
    }

    //继续
    private toResume(): void {
        DBGame.countdown(3, Laya.Handler.create(this, this.resume));
    }

    //重新开始
    private restart(): void {
        if (User.instace.power > 0) {
            User.instace.power -= 1;
            GameDataManager.instance.recordUserGameData()
        } else {
            XFacade.instance.showModule(PopAddPower);
            return;
        }
        this.stop();
        this.initMap(false);
        //DBGame.countdown(3, Laya.Handler.create(this, this.startWithCfg));
        this.startWithCfg();
    }

    //继续
    private revive(): void {
        if (User.instace.power > 0) {
            User.instace.power -= 1;
            GameDataManager.instance.recordUserGameData()
        } else {
            XFacade.instance.showModule(PopAddPower);
            return;
        }

        this._reviveTimes--;
        var p: Laya.Point = this.getStdPoint(this._startTime);
        this.targetX = p.x;
        this.targetY = p.y;
        this.ball.pos(p.x, p.y);
        this.ball.reset();
        this.dir = 1;

        var stdNode: { x: number, y: number, sx: number, sy: number, t?: number } = this.getStdNode(this._startTime)
        this.speedX = stdNode.sx;

        DBGame.countdown(3, Handler.create(null, () => {
            //this.soundChannel.play();
            //this._curTime = Laya.Browser.now();
            //this._startTime = this._curTime-this._startTime;
            this.soundChannel.play();
            //Laya.timer.frameLoop(1, this, this.update)
            //Laya.stage.on(Laya.Event.CLICK, this, this.onC);

            this._awsomeTime = 3;
            this.showAwesome();
        }))
    }

    private showAwesome():void{
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
        if(this._awsomeTime>0){
            this._turnable = false;
            this.ball.flash();
            Laya.timer.loop(100, this, this.refreshState);
        }
    }

    private refreshState():void{
        this._awsomeTime -= 0.1;
        if(this._awsomeTime <= 0){
            this.ball.removeFlash();
            this.dir = 1;
            this._awsomeTime = 0;
            Laya.timer.clear(this, this.refreshState);
            Laya.timer.once(1000, null, () => {
                this._turnable = true;
            });
        }
    }

    private stop(): void {
        if (this.soundChannel) {
            this.soundChannel.stop();
            Laya.SoundManager.removeChannel(this.soundChannel);
            this.soundChannel.completeHandler = null;
        }
        Star.sleep();
        Laya.timer.clear(this, this.update)
        Laya.timer.clear(this, this.update2)
        Laya.stage.off(Laya.Event.CLICK, this, this.onC);
        Laya.SoundManager.destroySound(GameView.mp3);
    }

    private resume(): void {
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
    }

    private over(): void {
        if (this._score > 0) {
            this.showResult();
        } else {
            this.back();
        }
    }


    private curX: number = Laya.stage.width / 2;
    private curY: number = Laya.stage.height / 2;
    private delX: number = 0;
    private delY: number = 0;
    private speedX: number = 0;
    private speedY: number = 0;
    private dir: number = 1;
    //误差；
    private deviation: number = 80

    private targetX: number = this.curX;
    private targetY: number = this.curY;
    private map: Laya.Sprite;
    private starContainer: Laya.Sprite;
    private ball: Ball;
    private _curTime: number;
    //开始时间
    private _startTime: number;
    //y轴方向差距
    private offsetY: number;
    //地图数组
    private _mapArr: number[];

    private initMap(firstTime: boolean = true): void {
        this._rendIndex = 1;
        this._starNum = this._score = this._awsomeTime = this._curTime = this._startTime = 0;
        this._autoLast = false;
        this.showPro(null);
        this.ui.tfScore.text = "0"
        this._reviveTimes = DBGame.ReviveTimes;
        this._mapArr = [];
        for (let i = 0; i < this._items.length; i++) {
            this._items[i].removeSelf();
        }
        this._items.length = 0;
        while (this.effContainer.numChildren) {
            this.effContainer.removeChildAt(0);
        }

        var cfg: { speed: number, mp3: string, nodes: { x: number, y: number, sx: number, t: number }[], items: any } = Laya.loader.getRes('res/snd/' + this.params.json + '.json');

        this._starCfg = (this.params.stars + "").split("|");
        for (let i = 0; i < this._starCfg.length; i++) {
            this._starCfg[i] = parseInt(this._starCfg[i]);
        }

        //克隆资源列表 
        this._resList = xframe.XUtils.clone(cfg.items) || [];
        this._resList.sort(function(a, b):any{
            return a.t - b.t;
        })
        trace("this._resList..................................",this._resList)

        if (firstTime) {
            //生成星星
            Star.shine(30, this.starContainer)
        }

        this.stop();

        //设定初始点=============================
        this.posInfo = xframe.XUtils.clone(cfg.nodes);
        this.srcPosInfo = xframe.XUtils.clone(cfg.nodes);
        let node: { x: number, y: number, sx: number } = this.srcPosInfo.shift();
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
    }

    private rendMap(): void {
        //0，判断是否需要重新绘制地图;
        const maxHeight = 4096;//2048
        var curY: number = this.targetY - this.offsetY;
        if (this._mapArr.length) {
            if (this._autoLast || curY - this._mapArr[this._mapArr.length - 1] > 120) {
                return;
            }
        }
        var cfg: { speed: number, mp3: string, nodes: { x: number, y: number, sx: number, t: number }[], items: any } = Laya.loader.getRes('res/snd/' + this.params.json + '.json');
        //1根据当前位置计算出初始节点及结束点；
        //a,取当前节点
        var midIndex: number;
        var startIndex: number;
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
            } else {
                break;
            }
        }
        //3，绘制地图
        this.map.graphics.clear();
        if (startIndex == 0) {//画起点
            this.map.graphics.drawCircle(this._mapArr[0], this._mapArr[1], 160, "#ffffff");
            this.map.graphics.drawTexture(Laya.loader.getRes("res/game/start_bg.png"), this._mapArr[0] - 200, this._mapArr[1] - 200);
        }
        this.map.graphics.drawLines(0, 0, this._mapArr, "#ffffff", 160);//160
        if (i >= cfg.nodes.length && this.soundChannel.duration) {
            this._autoLast = true;
            var last: { x: number, y: number, sx: number, sy: number, t?: number } = this.posInfo[this.posInfo.length - 1];
            var total: number = this.soundChannel.duration * 1000
            trace("end=========================", this.soundChannel, last, this.soundChannel.duration)
            var info: { x: number, y: number, sx: number, sy: number, t?: number } = { x: last.x, y: last.y - (total - last.t) * this.speedY, sx: 0, sy: last.sy, t: total };
            this.posInfo.push(info);
            this.srcPosInfo.push(info);
            this.map.graphics.drawLine(last.x, last.y, info.x, info.y, "#ffffff", 160);
            this.map.graphics.drawCircle(info.x, info.y, 160, "#ffffff")
            this.map.graphics.drawTexture(Laya.loader.getRes("res/game/start_bg.png"), info.x - 200, info.y - 200);
        }
        let offset: number = this._autoLast ? 3 : 1;
        i = startIndex == 0 ? 2 : 0
        for (i; i < this._mapArr.length - offset; i++) {
            this.map.graphics.drawTexture(Laya.loader.getRes("res/game/spot.png"), this._mapArr[i] - 28, this._mapArr[i + 1] - 28);
            //画引导res/game/click.png
            if (this.params.id == "1" && startIndex < 27) {
                if (this._mapArr[i] > this.ui.width / 2) {
                    this.map.graphics.drawTexture(Laya.loader.getRes("res/game/click.png"), this._mapArr[i] + 135, this._mapArr[i + 1] - 32);
                } else {
                    this.map.graphics.drawTexture(Laya.loader.getRes("res/game/click.png"), this._mapArr[i] - 195, this._mapArr[i + 1] - 32);
                }
            }
            i++;
        }
        //4，缓存；
        //this.map.cacheAsBitmap = true;
    }

    private startWithCfg(): void {
        this.start();
        //this._awsomeTime = 1;
        return;
        this.stop();
        this.soundChannel = Laya.SoundManager.playSound(GameView.mp3, 1, Laya.Handler.create(this, this.gemeEnd));
        this._curTime = this.soundChannel.position;
        Laya.timer.frameLoop(1, this, this.update)
        Laya.stage.on(Laya.Event.CLICK, this, this.onC);

        /**预加载*/
        var res: any = [
            { url: 'res/map/bj' + this.params.id + '2.jpg', type: Laya.Loader.IMAGE },
            { url: 'res/map/bj' + this.params.id + '3.jpg', type: Laya.Loader.IMAGE }
        ]
        Laya.loader.load(res);
    }

    //使用微信接口方法;
    private start(): void {

        var url: string = encodeURI(Laya.URL.basePath + GameView.mp3);
        if (this.soundChannel && this.soundChannel.src != url) {
            this.soundChannel.destroy();
            //清理掉
        }
        this.soundChannel = wx.createInnerAudioContext()
        this.soundChannel.src = url;
        this.soundChannel.play()
        this.soundChannel.onPlay(() => {
            if (this._startTime == 0) {
                this._curTime = this._startTime = Laya.Browser.now();
            } else {
                this._curTime = Laya.Browser.now();
                this._startTime = this._curTime - this._startTime;
            }
            Laya.timer.frameLoop(1, this, this.update2)
            Laya.stage.on(Laya.Event.CLICK, this, this.onC);
            trace("start======================", this.soundChannel);
        })
        this.soundChannel.onEnded(() => {
            this.gemeEnd();
            trace("onEnded======================");
        })
        this.soundChannel.onPause(() => {
            //记录播放的时间---
            this._startTime = Laya.Browser.now() - this._startTime;
            trace("onPause======================");
        });
        this.soundChannel.onError(()=>{
            XEvent.instance.event(GameEvent.ERR);
            //播放失败，返回体力
            User.instace.power += 1;
            GameDataManager.instance.recordUserGameData()
            trace("onError======================");
        })

        /**预加载*/
        var res: any = [
            { url: 'res/map/bj' + this.params.id + '2.jpg', type: Laya.Loader.IMAGE },
            { url: 'res/map/bj' + this.params.id + '3.jpg', type: Laya.Loader.IMAGE }
        ]
        Laya.loader.load(res);
    }

    /**核心驱动方法 */
    private update2(): void {
        this._rendIndex++;
        var exeIndex: number = this._rendIndex % 5;
        var end: boolean = false;
        var tmpTime: number = Laya.Browser.now() - this._curTime;
        this._curTime = Laya.Browser.now();
        var position: number = this._curTime - this._startTime;

        Star.active();
        if (this._awsomeTime) {
            var p: Laya.Point = this.getStdPoint(position)
            this.targetY = p.y;
            this.targetX = p.x;
            if (exeIndex == 4) {
                var targetPoint = this.getTargetPoint(true, 6);
                var now: number = this._score;
                if (targetPoint) {
                    this.speedX = targetPoint.sx;
                    this._score += 10;
                    xframe.XUtils.showTxtEffect(now, this._score, Laya.Handler.create(null, (n: number) => {
                        this.ui.tfScore.text = n + "";
                    }))
                }
            }
        } else {
            this.targetY = this.offsetY - this.speedY * position;
            this.targetX += this.speedX * tmpTime * this.dir;
        }
        this.ball.update()
        this.ball.x = this.targetX;
        this.ball.y = this.targetY;
        this.pathSp.y = this.offsetY - this.targetY;
        this.map.y = this.pathSp.y;


        if (exeIndex == 1) {
            let targetPoint: { x: number, y: number, sx: number, sy: number, t?: number } = this.getTargetPoint(false);
            if (this.srcPosInfo.length <= 2) {
                this.ui.btnPause.visible = false;
            } else if (targetPoint) {
                if (targetPoint.y - this.targetY > 150) {
                    end = true;
                }
            }
        } else if (exeIndex == 2) {
            this.showPro(DBGame.calcPro(position, this._starCfg));
        } else if (exeIndex == 4) {
            this.rendMap();
        } else if (exeIndex == 0) {
            this.rendMapItems(position);
        } else if (exeIndex == 3 && this.srcPosInfo.length && this.getStdPoint(position).distance(this.targetX, this.targetY) > 106) {//120
            end = true;
            trace("End at time::", position, tmpTime, this.targetX, this.targetY, this.getStdPoint(position))
        }
        if (end) {
            Star.sleep()
            this.soundChannel.pause();
            Laya.timer.clear(this, this.update)
            Laya.timer.clear(this, this.update2)
            Laya.stage.off(Laya.Event.CLICK, this, this.onC);
            if (this._starNum > 0 && this._reviveTimes) {
                XFacade.instance.showModule(PopGameRevive, { yes: Laya.Handler.create(this, this.revive), no: Laya.Handler.create(this, this.showResult) })
            } else {
                this.showResult();
            }
        }
    }

    /**核心驱动方法 */
    private update(): void {
        this._rendIndex++;
        var exeIndex: number = this._rendIndex % 5;
        var end: boolean = false;
        var tmpTime: number = (this.soundChannel.position - this._curTime) * 1000;
        var position: number = this.soundChannel.position * 1000;
        //timeOver
        if (tmpTime < 0 || position == 0) {
            return;
        } else if (tmpTime > 500) {//无效的音频，扔掉
            trace("Update Error：：Time offset is over..", tmpTime, this.soundChannel.position, this._curTime)
            this.stop();
            Laya.timer.once(1000, this, this.startWithCfg)
            return;
        }
        this._curTime = this.soundChannel.position;

        Star.active();
        if (this._awsomeTime) {
            var p: Laya.Point = this.getStdPoint(position)
            this.targetY = p.y;
            this.targetX = p.x;
            if (exeIndex == 4) {
                var targetPoint = this.getTargetPoint()
                if (targetPoint) {
                    this._score += 10;
                    this.speedX = targetPoint.sx;
                    this.ui.tfScore.text = this._score + "";
                }
            }
        } else {
            this.targetY = this.offsetY - this.speedY * position;
            this.targetX += this.speedX * tmpTime * this.dir;
        }
        this.ball.update()
        this.ball.x = this.targetX;
        this.ball.y = this.targetY;
        this.pathSp.y = this.offsetY - this.targetY;
        this.map.y = this.pathSp.y;


        if (exeIndex == 1) {
            let targetPoint: { x: number, y: number, sx: number, sy: number, t?: number } = this.getTargetPoint(false);
            if (this.srcPosInfo.length <= 2) {
                this.ui.btnPause.visible = false;
            } else if (targetPoint) {
                if (targetPoint.y - this.targetY > 150) {
                    end = true;
                }
            }
        } else if (exeIndex == 2) {
            this.showPro(DBGame.calcPro(position, this._starCfg));
        } else if (exeIndex == 4) {
            this.rendMap();
        } else if (exeIndex == 0) {
            this.rendMapItems(this._curTime * 1000);
        } else if (exeIndex == 3 && this.srcPosInfo.length && this.getStdPoint(position).distance(this.targetX, this.targetY) > 106) {//120
            end = true;
            trace("End at time::", position, tmpTime, this.targetX, this.targetY, this.getStdPoint(position))
        }
        if (end) {
            Star.sleep()
            this.soundChannel.pause();
            Laya.timer.clear(this, this.update)
            Laya.stage.off(Laya.Event.CLICK, this, this.onC);
            if (this._starNum > 0 && this._reviveTimes) {
                XFacade.instance.showModule(PopGameRevive, { yes: Laya.Handler.create(this, this.revive), no: Laya.Handler.create(this, this.showResult) })
            } else {
                this.showResult();
            }
        }
    }

    private onC(): void {
        this.curX = this.targetX;
        this.curY = this.targetY

        let targetPoint: { x: number, y: number, sx: number, sy: number, t?: number } = this.getTargetPoint();
        if (targetPoint) {
            this.dir = 1;
            this.speedX = targetPoint.sx;

            //效果判定---
            var delX: number = Math.abs(targetPoint.x - this.ball.x);
            var delY: number = Math.abs(targetPoint.y - this.ball.y);
            var nowScore: number = this._score;
            if (delX < 12 && delY < 15) {//5
                this.shine(targetPoint.x, targetPoint.y);
                this._score += 10;
            } else if (delX < 36 && delY < 25) {//3
                this.showEff(targetPoint.x, targetPoint.y);
                this._score += 5;
            } else {//2
                this._score += 3;
            }
            xframe.XUtils.showTxtEffect(nowScore, this._score, Laya.Handler.create(null, (n: number) => {
                this.ui.tfScore.text = n + "";
            }))
            //动效====================================
            //this.fly();
        } else {//翻转
            if (this.srcPosInfo.length && this._turnable) {
                this.dir *= -1
            }
        }
    }

    private showResult(): void {
        this.stop();
        var params = {
            music: this.params,
            star: this._starNum,
            score: this._score
        }
        XFacade.instance.showModule(GameResultView, params);
    }

    /**
     * 渲染地图元素
     * 1,渲染不根据时间变化的元素，生成变化元素列表；
     * 2，渲染变化元素；
     * */
    private rendMapItems(time: number): void {
        for (let i = 0; i < this._items.length; i++) {
            if (this._items[i].y - this.targetY > Laya.stage.height) {
                this._items[i].removeSelf();
                trace(this._items[i].name);
                this._items.splice(i--,1);
            }else{
                break;
            }
        }
        var delTime: number = Laya.stage.height * .35 / this.speedY;
        for (let i = 0; i < this._resList.length; i++) {
            if (this._resList[i].t < time + delTime) {
                var item: Laya.Image = new Laya.Image();
                item.pos(this._resList[i].x, this._resList[i].y);
                var url: string = "res/map/" + this._resList[i].id + ".png"
                Laya.loader.load(url, Laya.Handler.create(null, () => {
                    item.skin = url;
                    xframe.AniUtil.popIn(item, 200)
                }))
                item.scaleX = this._resList[i].s;
                trace("rendMapItems",item.x, item.y,this._resList[i])
                item.name = item.x +"_"+ item.y
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
            } else {
                break;
            }
        }
    }

    private showPro(proInfo: { pro: number, stars: number }): void {
        if (proInfo) {
            this.ui.bar.value = proInfo.pro || 0;
            this._starNum = proInfo.stars;
            if (proInfo.stars == 3) {
                this.ui.star_2.skin = "res/game/star_w.png";
                this.ui.star_1.skin = "res/game/star_w.png";
                this.ui.star_0.skin = "res/game/star_w.png";
            } else if (proInfo.stars == 2) {
                this.ui.star_2.skin = "res/game/star_b.png";
                this.ui.star_1.skin = "res/game/star_w.png";
                this.ui.star_0.skin = "res/game/star_w.png";
                Laya.loader.load("res/map/bj" + this.params.id + "3.jpg", Laya.Handler.create(null, () => {
                    this.switchSkin("res/map/bj" + this.params.id + "3.jpg");
                }))
            } else if (proInfo.stars == 1) {
                this.ui.star_2.skin = "res/game/star_b.png";
                this.ui.star_1.skin = "res/game/star_b.png";
                this.ui.star_0.skin = "res/game/star_w.png";
                Laya.loader.load("res/map/bj" + this.params.id + "2.jpg", Laya.Handler.create(null, () => {
                    this.switchSkin("res/map/bj" + this.params.id + "2.jpg");
                }))
            }
        } else {
            this.ui.bar.value = 0;
            this.ui.star_2.skin = "res/game/star_b.png";
            this.ui.star_1.skin = "res/game/star_b.png";
            this.ui.star_0.skin = "res/game/star_b.png";
            this.ui.bg.skin = "res/map/bj" + this.params.id + "1.jpg";
        }
        this.ui.proBox.cacheAsBitmap = true;
    }

    private switchSkin(skinStr: string): void {
        if (this.ui.bg.skin != skinStr) {
            var img: Laya.Image = new Laya.Image(this.ui.bg.skin);
            img.size(Laya.stage.width, Laya.stage.height)
            this.ui.bg.parent.addChildAt(img, this.ui.bg.parent.getChildIndex(this.ui.bg));
            Laya.Tween.to(img, { alpha: 0 }, 500, null, Laya.Handler.create(img, img.removeSelf))
            this.ui.bg.skin = skinStr;
            this.ui.bg.alpha = 0;
            Laya.Tween.to(this.ui.bg, { alpha: 1 }, 500)
        }
    }

    /**显示经过特效 */
    private showEff(x: number, y: number): void {
        this._eff.pos(x, y);
        this.pathSp.addChild(this._eff);
        Laya.timer.once(248, this._eff, this._eff.removeSelf)
    }

    /**精准打击特效 */
    private shine(x: number, y: number): void {
        this._eff2.pos(x, y);
        this._eff2.alpha = 1;
        this._eff2.scale(0.5, 0.5);
        this.pathSp.addChildAt(this._eff2, 0);
        Laya.Tween.to(this._eff2, { scaleX: 1.2, scaleY: 1.2, alpha: 0 }, 200, null, Laya.Handler.create(this._eff2, this._eff2.removeSelf))
        /*
        this._eff2.scaleX = this._eff2.scaleY = 0.5;
        Laya.Tween.to(this._eff2, {scaleX:1,scaleY:1}, 20, null, Laya.Handler.create(null, ()=>{
            Laya.Tween.to(this._eff2, {scaleX:1.5, scaleY:1.5},60,null, Laya.Handler.create(this._eff2, this._eff2.removeSelf))
        }))
        */
    }

    /**飞特效 */
    private fly(): void {
        //动效===
        var img: Laya.Image = Laya.Pool.getItemByClass("eff", Laya.Image)
        img.skin = "res/game/origin.png";
        this.effContainer.addChild(img);
        img.pos(this.curX + 40, this.curY + this.pathSp.y);
        var rnd: number = Math.random() * 400
        Laya.Tween.to(img, { x: 200 + rnd, y: 150 + rnd }, 150 + rnd / 4, null, Laya.Handler.create(null, () => {
            Laya.Tween.to(img, { x: 80, y: 414 }, 150 + rnd / 4, null, Laya.Handler.create(null, () => {
                img.removeSelf();
                Laya.Pool.recover("eff", img);
            }));
        }));
    }

    //获取目标节点
    private getTargetPoint(modify: boolean = true, deviation: number = -1): { x: number, y: number, sx: number, sy: number } {
        let targetPoint: { x: number, y: number, sx: number, sy: number };
        if (this.srcPosInfo.length) {
            for (let i = 0; i < this.srcPosInfo.length; i++) {
                var posInfo: { x: number, y: number, sx: number, sy: number } = this.srcPosInfo[i];
                if (deviation == -1) {
                    deviation = this.deviation;
                }
                if (Math.abs(posInfo.y - this.targetY) <= deviation || posInfo.y > this.targetY) {
                    targetPoint = posInfo;
                    modify && this.srcPosInfo.shift();
                    break;
                    //修改成点击一下取一个节点
                } else {
                    break;
                }
            }
        }
        return targetPoint;
    }


    //计算标准位置点
    private _stdP: Laya.Point;
    private posInfo: { x: number, y: number, sx: number, sy: number, t?: number }[];
    private srcPosInfo: { x: number, y: number, sx: number, sy: number, t?: number }[];
    private getStdPoint(now: number): Laya.Point {
        if (!this._stdP) {
            this._stdP = new Laya.Point(this.curX, this.curY);
        }
        let tmp: { x: number, y: number, sx: number, sy: number, t?: number };
        for (let i = this.posInfo.length - 1; i >= 0; i--) {
            tmp = this.posInfo[i];
            if (tmp.t <= now) {
                break;
            }
        }
        let delTime: number = now - tmp.t;
        this._stdP.x = tmp.x + tmp.sx * delTime;
        this._stdP.y = tmp.y - this.speedY * delTime;
        return this._stdP;
    }

    /**获取标准的节点-重置操作点 */
    private getStdNode(now): { x: number, y: number, sx: number, sy: number, t?: number } {
        let tmp: { x: number, y: number, sx: number, sy: number, t?: number };
        for (var i = this.posInfo.length - 1; i >= 0; i--) {
            if (this.posInfo[i].t <= now) {
                tmp = this.posInfo[i];
                break;
            }
        }
        this.srcPosInfo = []
        for (i = i + 1; i < this.posInfo.length - 1; i++) {
            this.srcPosInfo.push(this.posInfo[i]);
        }
        return tmp;
    }

    gemeEnd() {
        trace("gameEnd---------------------------------------------->>")
        var params = {
            music: this.params,
            star: this._starNum,
            score: this._score
        }
        XFacade.instance.showModule(GameResultView, params);
        this.stop();
    }

    protected onDestroy():void{
        Laya.loader.clearRes("res/map/bj"+this.params.id+"1.jpg");
        Laya.loader.clearRes("res/map/bj"+this.params.id+"2.jpg");
        Laya.loader.clearRes("res/map/bj"+this.params.id+"2.jpg");
        //this.params && Laya.loader.clearRes('res/snd/' + this.params.json + '.json');
        Laya.loader.clearRes(GameView.mp3);
        Star.destroy();
        this.soundChannel && this.soundChannel.destroy();
        this.ball && this.ball.stop();
        Laya.timer.clear(this, this.update)
        Laya.stage.off(Laya.Event.CLICK, this, this.onC);
        this.ui.btnStart.off(Laya.Event.CLICK, this, this.onStart);
        Laya.stage.off(Laya.Event.CLICK, this, this.resume);
        this.removeEVent();
        this.stop();
    }
}


/**游戏事件 */
class GameEvent {
    /**返回 */
    public static BACK: string = "back";
    /**重新开始 */
    public static RESTART: string = "restart";
    /**事件-选中歌曲 */
    public static SELECTED:string = 'selected';
    /**下一章节 */
    public static NEXTCHAPTER: string = "nextchapter";
    /**跳转到解锁篇章 */
    public static HOMECHAPTER: string = "homechapter";
    /**加载错误 */
    public static ERR: string = "err";
    /**结束歌曲 */
    public static OVER:string = "over"
}