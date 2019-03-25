var __extends=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var s in e)e.hasOwnProperty(s)&&(t[s]=e[s])};return function(e,s){function a(){this.constructor=e}t(e,s),e.prototype=null===s?Object.create(s):(a.prototype=s.prototype,new a)}}(),GameView=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.ui=new ui.pages.GamePageUI,e._items=[],e._autoLast=!1,e._reviveTimes=0,e._awsomeTime=0,e._turnable=!0,e.curX=Laya.stage.width/2,e.curY=Laya.stage.height/2,e.delX=0,e.delY=0,e.speedX=0,e.speedY=0,e.dir=1,e.deviation=80,e.targetX=e.curX,e.targetY=e.curY,e}return __extends(e,t),e.prototype.createUI=function(){var e=this;t.prototype.createUI.call(this),this.starContainer=new Laya.Sprite,this.ui.addChildAt(this.starContainer,this.ui.getChildIndex(this.ui.btnPause)),this.map=new Laya.Sprite,this.ui.addChildAt(this.map,this.ui.getChildIndex(this.ui.btnPause)),this.pathSp=new Laya.Sprite,this.ui.addChildAt(this.pathSp,this.ui.getChildIndex(this.ui.btnPause)),this.effContainer=new Laya.Sprite,this.ui.addChild(this.effContainer),this._eff=new Laya.Image("res/game/spot_s.png"),this._eff.anchorX=this._eff.anchorY=.5,this._eff2=new Laya.Image("res/game/light.png"),this._eff2.anchorX=this._eff2.anchorY=.5,this.scrollRect=new Laya.Rectangle(0,0,this.ui.width,this.ui.height),this.ui.selectBox.cacheAsBitmap=!0,this.init(),wx.onHide(function(){e.soundChannel&&!e.soundChannel.paused&&e.pause()})},e.prototype.init=function(){var t=this;this.ui.btnPause.on(Laya.Event.CLICK,null,function(){t.pause()}),this.ui.backBtn.on(Laya.Event.CLICK,null,function(){t.close()}),this.ui.btnStart.on(Laya.Event.CLICK,this,this.onStart)},e.prototype.show=function(){for(var e=[],s=0;s<arguments.length;s++)e[s]=arguments[s];t.prototype.show.call(this),this.params=e[0],this.ui.tfName.text=this.params.name,this.ui.btnPause.visible=!1,XFacade.instance.showModule(GameLoading,this.params)},e.prototype.initEvent=function(){XEvent.instance.on(GameEvent.ERR,this,this.onGameEvent,[GameEvent.ERR]),XEvent.instance.on(GameEvent.BACK,this,this.onGameEvent,[GameEvent.BACK]),XEvent.instance.on(GameEvent.OVER,this,this.onGameEvent,[GameEvent.OVER]),XEvent.instance.on(GameEvent.RESTART,this,this.onGameEvent,[GameEvent.RESTART]),XEvent.instance.on(GameEvent.SELECTED,this,this.onGameEvent,[GameEvent.SELECTED]),XEvent.instance.on(GameEvent.NEXTCHAPTER,this,this.onGameEvent,[GameEvent.NEXTCHAPTER])},e.prototype.removeEVent=function(){XEvent.instance.off(GameEvent.ERR,this,this.onGameEvent),XEvent.instance.off(GameEvent.OVER,this,this.onGameEvent),XEvent.instance.off(GameEvent.BACK,this,this.onGameEvent),XEvent.instance.off(GameEvent.RESTART,this,this.onGameEvent),XEvent.instance.off(GameEvent.SELECTED,this,this.onGameEvent),XEvent.instance.off(GameEvent.NEXTCHAPTER,this,this.onGameEvent)},e.prototype.onGameEvent=function(t,e){switch(void 0===e&&(e=null),t){case GameEvent.BACK:this.stop(),this.close();break;case GameEvent.OVER:this.over();break;case GameEvent.RESTART:this.restart();break;case GameEvent.SELECTED:this.ui.selectBox.visible=!0,this.ui.btnPause.visible=!1,this.ui.backBtn.visible=!0,this.initMap();break;case GameEvent.NEXTCHAPTER:XFacade.instance.showModule(GameLoading,DBChapter.getChapInfo(parseInt(this.params.id)+1));break;case GameEvent.ERR:XAlert.showAlert("哎呀，网络不太好~返回再试试吧",Laya.Handler.create(this,this.close))}},e.prototype.onStart=function(t){t.stopPropagation(),User.instace.power>0?(User.instace.power-=1,this.startWithCfg(),this.ui.selectBox.visible=!1,this.ui.btnPause.visible=!0,this.ui.backBtn.visible=!1):XFacade.instance.showModule(PopAddPower)},e.prototype.pause=function(){if(this.soundChannel){Star.sleep();try{this.soundChannel.pause()}catch(t){}Laya.timer.clear(this,this.update),Laya.timer.clear(this,this.update2),Laya.stage.off(Laya.Event.CLICK,this,this.onC),PopGamePause.show(!1,[Laya.Handler.create(this,this.toResume),Laya.Handler.create(this,this.restart)]),Laya.timer.clear(this,this.refreshState)}},e.prototype.toResume=function(){DBGame.countdown(3,Laya.Handler.create(this,this.resume))},e.prototype.restart=function(){User.instace.power>0?(User.instace.power-=1,GameDataManager.instance.recordUserGameData(),this.stop(),this.initMap(!1),this.startWithCfg()):XFacade.instance.showModule(PopAddPower)},e.prototype.revive=function(){var t=this;if(User.instace.power>0){User.instace.power-=1,GameDataManager.instance.recordUserGameData(),this._reviveTimes--;var e=this.getStdPoint(this._startTime);this.targetX=e.x,this.targetY=e.y,this.ball.pos(e.x,e.y),this.ball.reset(),this.dir=1;var s=this.getStdNode(this._startTime);this.speedX=s.sx,DBGame.countdown(3,Handler.create(null,function(){t.soundChannel.play(),t._awsomeTime=3,t.showAwesome()}))}else XFacade.instance.showModule(PopAddPower)},e.prototype.showAwesome=function(){this._awsomeTime>0&&(this._turnable=!1,this.ball.flash(),Laya.timer.loop(100,this,this.refreshState))},e.prototype.refreshState=function(){var t=this;this._awsomeTime-=.1,this._awsomeTime<=0&&(this.ball.removeFlash(),this.dir=1,this._awsomeTime=0,Laya.timer.clear(this,this.refreshState),Laya.timer.once(1e3,null,function(){t._turnable=!0}))},e.prototype.stop=function(){this.soundChannel&&(this.soundChannel.stop(),Laya.SoundManager.removeChannel(this.soundChannel),this.soundChannel.completeHandler=null),Star.sleep(),Laya.timer.clear(this,this.update),Laya.timer.clear(this,this.update2),Laya.stage.off(Laya.Event.CLICK,this,this.onC),Laya.SoundManager.destroySound(e.mp3)},e.prototype.resume=function(){this.soundChannel&&(this.soundChannel.play(),this.showAwesome())},e.prototype.over=function(){this._score>0?this.showResult():this.back()},e.prototype.initMap=function(t){void 0===t&&(t=!0),this._rendIndex=1,this._starNum=this._score=this._awsomeTime=this._curTime=this._startTime=0,this._autoLast=!1,this.showPro(null),this.ui.tfScore.text="0",this._reviveTimes=DBGame.ReviveTimes,this._mapArr=[];for(s=0;s<this._items.length;s++)this._items[s].removeSelf();for(this._items.length=0;this.effContainer.numChildren;)this.effContainer.removeChildAt(0);var e=Laya.loader.getRes("res/snd/"+this.params.json+".json");this._starCfg=(this.params.stars+"").split("|");for(var s=0;s<this._starCfg.length;s++)this._starCfg[s]=parseInt(this._starCfg[s]);this._resList=xframe.XUtils.clone(e.items)||[],this._resList.sort(function(t,e){return t.t-e.t}),trace("this._resList..................................",this._resList),t&&Star.shine(30,this.starContainer),this.stop(),this.posInfo=xframe.XUtils.clone(e.nodes),this.srcPosInfo=xframe.XUtils.clone(e.nodes);var a=this.srcPosInfo.shift();this.curX=this.targetX=a.x,this.curY=this.targetY=this.offsetY=a.y,this.speedX=a.sx,this.speedY=e.speed,this.rendMap(),this.ball||(this.ball=new Ball,this.ball.shadow(4),this.pathSp.addChild(this.ball)),this.ball.setSkin(1,this.speedY),this.ball.reset(),this.ball.pos(this.curX,this.curY),this.map.y=this.pathSp.y=0},e.prototype.rendMap=function(){var t=this.targetY-this.offsetY;if(!this._mapArr.length||!(this._autoLast||t-this._mapArr[this._mapArr.length-1]>120)){for(var e,s,a=Laya.loader.getRes("res/snd/"+this.params.json+".json"),i=a.nodes.length-1;i>=0;i--)if(a.nodes[i].y>t){e=i;break}for(i=e;i>=0&&!(a.nodes[i].y-t>=Laya.stage.height);i--);for(s=Math.max(0,i),t=a.nodes[s].y,this._mapArr.length=0,i=s;i<a.nodes.length&&t-a.nodes[i].y<4096;i++)this._mapArr.push(a.nodes[i].x,a.nodes[i].y);if(this.map.graphics.clear(),0==s&&(this.map.graphics.drawCircle(this._mapArr[0],this._mapArr[1],160,"#ffffff"),this.map.graphics.drawTexture(Laya.loader.getRes("res/game/start_bg.png"),this._mapArr[0]-200,this._mapArr[1]-200)),this.map.graphics.drawLines(0,0,this._mapArr,"#ffffff",160),i>=a.nodes.length&&this.soundChannel.duration){this._autoLast=!0;var r=this.posInfo[this.posInfo.length-1],n=1e3*this.soundChannel.duration;trace("end=========================",this.soundChannel,r,this.soundChannel.duration);var h={x:r.x,y:r.y-(n-r.t)*this.speedY,sx:0,sy:r.sy,t:n};this.posInfo.push(h),this.srcPosInfo.push(h),this.map.graphics.drawLine(r.x,r.y,h.x,h.y,"#ffffff",160),this.map.graphics.drawCircle(h.x,h.y,160,"#ffffff"),this.map.graphics.drawTexture(Laya.loader.getRes("res/game/start_bg.png"),h.x-200,h.y-200)}var o=this._autoLast?3:1;for(i=0==s?2:0;i<this._mapArr.length-o;i++)this.map.graphics.drawTexture(Laya.loader.getRes("res/game/spot.png"),this._mapArr[i]-28,this._mapArr[i+1]-28),"1"==this.params.id&&s<27&&(this._mapArr[i]>this.ui.width/2?this.map.graphics.drawTexture(Laya.loader.getRes("res/game/click.png"),this._mapArr[i]+135,this._mapArr[i+1]-32):this.map.graphics.drawTexture(Laya.loader.getRes("res/game/click.png"),this._mapArr[i]-195,this._mapArr[i+1]-32)),i++}},e.prototype.startWithCfg=function(){return void this.start()},e.prototype.start=function(){var t=this,s=encodeURI(Laya.URL.basePath+e.mp3);this.soundChannel&&this.soundChannel.src!=s&&this.soundChannel.destroy(),this.soundChannel=wx.createInnerAudioContext(),this.soundChannel.src=s,this.soundChannel.play(),this.soundChannel.onPlay(function(){0==t._startTime?t._curTime=t._startTime=Laya.Browser.now():(t._curTime=Laya.Browser.now(),t._startTime=t._curTime-t._startTime),Laya.timer.frameLoop(1,t,t.update2),Laya.stage.on(Laya.Event.CLICK,t,t.onC),trace("start======================",t.soundChannel)}),this.soundChannel.onEnded(function(){t.gemeEnd(),trace("onEnded======================")}),this.soundChannel.onPause(function(){t._startTime=Laya.Browser.now()-t._startTime,trace("onPause======================")}),this.soundChannel.onError(function(){XEvent.instance.event(GameEvent.ERR),User.instace.power+=1,GameDataManager.instance.recordUserGameData(),trace("onError======================")});var a=[{url:"res/map/bj"+this.params.id+"2.jpg",type:Laya.Loader.IMAGE},{url:"res/map/bj"+this.params.id+"3.jpg",type:Laya.Loader.IMAGE}];Laya.loader.load(a)},e.prototype.update2=function(){var t=this;this._rendIndex++;var e=this._rendIndex%5,s=!1,a=Laya.Browser.now()-this._curTime;this._curTime=Laya.Browser.now();var i=this._curTime-this._startTime;if(Star.active(),this._awsomeTime){var r=this.getStdPoint(i);if(this.targetY=r.y,this.targetX=r.x,4==e){var n=this.getTargetPoint(!0,6),h=this._score;n&&(this.speedX=n.sx,this._score+=10,xframe.XUtils.showTxtEffect(h,this._score,Laya.Handler.create(null,function(e){t.ui.tfScore.text=e+""})))}}else this.targetY=this.offsetY-this.speedY*i,this.targetX+=this.speedX*a*this.dir;if(this.ball.update(),this.ball.x=this.targetX,this.ball.y=this.targetY,this.pathSp.y=this.offsetY-this.targetY,this.map.y=this.pathSp.y,1==e){var o=this.getTargetPoint(!1);this.srcPosInfo.length<=2?this.ui.btnPause.visible=!1:o&&o.y-this.targetY>150&&(s=!0)}else 2==e?this.showPro(DBGame.calcPro(i,this._starCfg)):4==e?this.rendMap():0==e?this.rendMapItems(i):3==e&&this.srcPosInfo.length&&this.getStdPoint(i).distance(this.targetX,this.targetY)>106&&(s=!0,trace("End at time::",i,a,this.targetX,this.targetY,this.getStdPoint(i)));s&&(Star.sleep(),this.soundChannel.pause(),Laya.timer.clear(this,this.update),Laya.timer.clear(this,this.update2),Laya.stage.off(Laya.Event.CLICK,this,this.onC),this._starNum>0&&this._reviveTimes?XFacade.instance.showModule(PopGameRevive,{yes:Laya.Handler.create(this,this.revive),no:Laya.Handler.create(this,this.showResult)}):this.showResult())},e.prototype.update=function(){this._rendIndex++;var t=this._rendIndex%5,e=!1,s=1e3*(this.soundChannel.position-this._curTime),a=1e3*this.soundChannel.position;if(!(s<0||0==a)){if(s>500)return trace("Update Error：：Time offset is over..",s,this.soundChannel.position,this._curTime),this.stop(),void Laya.timer.once(1e3,this,this.startWithCfg);if(this._curTime=this.soundChannel.position,Star.active(),this._awsomeTime){var i=this.getStdPoint(a);if(this.targetY=i.y,this.targetX=i.x,4==t){var r=this.getTargetPoint();r&&(this._score+=10,this.speedX=r.sx,this.ui.tfScore.text=this._score+"")}}else this.targetY=this.offsetY-this.speedY*a,this.targetX+=this.speedX*s*this.dir;if(this.ball.update(),this.ball.x=this.targetX,this.ball.y=this.targetY,this.pathSp.y=this.offsetY-this.targetY,this.map.y=this.pathSp.y,1==t){var n=this.getTargetPoint(!1);this.srcPosInfo.length<=2?this.ui.btnPause.visible=!1:n&&n.y-this.targetY>150&&(e=!0)}else 2==t?this.showPro(DBGame.calcPro(a,this._starCfg)):4==t?this.rendMap():0==t?this.rendMapItems(1e3*this._curTime):3==t&&this.srcPosInfo.length&&this.getStdPoint(a).distance(this.targetX,this.targetY)>106&&(e=!0,trace("End at time::",a,s,this.targetX,this.targetY,this.getStdPoint(a)));e&&(Star.sleep(),this.soundChannel.pause(),Laya.timer.clear(this,this.update),Laya.stage.off(Laya.Event.CLICK,this,this.onC),this._starNum>0&&this._reviveTimes?XFacade.instance.showModule(PopGameRevive,{yes:Laya.Handler.create(this,this.revive),no:Laya.Handler.create(this,this.showResult)}):this.showResult())}},e.prototype.onC=function(){var t=this;this.curX=this.targetX,this.curY=this.targetY;var e=this.getTargetPoint();if(e){this.dir=1,this.speedX=e.sx;var s=Math.abs(e.x-this.ball.x),a=Math.abs(e.y-this.ball.y),i=this._score;s<12&&a<15?(this.shine(e.x,e.y),this._score+=10):s<36&&a<25?(this.showEff(e.x,e.y),this._score+=5):this._score+=3,xframe.XUtils.showTxtEffect(i,this._score,Laya.Handler.create(null,function(e){t.ui.tfScore.text=e+""}))}else this.srcPosInfo.length&&this._turnable&&(this.dir*=-1)},e.prototype.showResult=function(){this.stop();var t={music:this.params,star:this._starNum,score:this._score};XFacade.instance.showModule(GameResultView,t)},e.prototype.rendMapItems=function(t){for(s=0;s<this._items.length&&this._items[s].y-this.targetY>Laya.stage.height;s++)this._items[s].removeSelf(),trace(this._items[s].name),this._items.splice(s--,1);for(var e=.35*Laya.stage.height/this.speedY,s=0;s<this._resList.length&&this._resList[s].t<t+e;s++){var a=new Laya.Image;a.pos(this._resList[s].x,this._resList[s].y);var i="res/map/"+this._resList[s].id+".png";Laya.loader.load(i,Laya.Handler.create(null,function(){a.skin=i,xframe.AniUtil.popIn(a,200)})),a.scaleX=this._resList[s].s,trace("rendMapItems",a.x,a.y,this._resList[s]),a.name=a.x+"_"+a.y,this.pathSp.addChild(a),this._resList.splice(s--,1),this._items.push(a)}},e.prototype.showPro=function(t){var e=this;t?(this.ui.bar.value=t.pro||0,this._starNum=t.stars,3==t.stars?(this.ui.star_2.skin="res/game/star_w.png",this.ui.star_1.skin="res/game/star_w.png",this.ui.star_0.skin="res/game/star_w.png"):2==t.stars?(this.ui.star_2.skin="res/game/star_b.png",this.ui.star_1.skin="res/game/star_w.png",this.ui.star_0.skin="res/game/star_w.png",Laya.loader.load("res/map/bj"+this.params.id+"3.jpg",Laya.Handler.create(null,function(){e.switchSkin("res/map/bj"+e.params.id+"3.jpg")}))):1==t.stars&&(this.ui.star_2.skin="res/game/star_b.png",this.ui.star_1.skin="res/game/star_b.png",this.ui.star_0.skin="res/game/star_w.png",Laya.loader.load("res/map/bj"+this.params.id+"2.jpg",Laya.Handler.create(null,function(){e.switchSkin("res/map/bj"+e.params.id+"2.jpg")})))):(this.ui.bar.value=0,this.ui.star_2.skin="res/game/star_b.png",this.ui.star_1.skin="res/game/star_b.png",this.ui.star_0.skin="res/game/star_b.png",this.ui.bg.skin="res/map/bj"+this.params.id+"1.jpg"),this.ui.proBox.cacheAsBitmap=!0},e.prototype.switchSkin=function(t){if(this.ui.bg.skin!=t){var e=new Laya.Image(this.ui.bg.skin);e.size(Laya.stage.width,Laya.stage.height),this.ui.bg.parent.addChildAt(e,this.ui.bg.parent.getChildIndex(this.ui.bg)),Laya.Tween.to(e,{alpha:0},500,null,Laya.Handler.create(e,e.removeSelf)),this.ui.bg.skin=t,this.ui.bg.alpha=0,Laya.Tween.to(this.ui.bg,{alpha:1},500)}},e.prototype.showEff=function(t,e){this._eff.pos(t,e),this.pathSp.addChild(this._eff),Laya.timer.once(248,this._eff,this._eff.removeSelf)},e.prototype.shine=function(t,e){this._eff2.pos(t,e),this._eff2.alpha=1,this._eff2.scale(.5,.5),this.pathSp.addChildAt(this._eff2,0),Laya.Tween.to(this._eff2,{scaleX:1.2,scaleY:1.2,alpha:0},200,null,Laya.Handler.create(this._eff2,this._eff2.removeSelf))},e.prototype.fly=function(){var t=Laya.Pool.getItemByClass("eff",Laya.Image);t.skin="res/game/origin.png",this.effContainer.addChild(t),t.pos(this.curX+40,this.curY+this.pathSp.y);var e=400*Math.random();Laya.Tween.to(t,{x:200+e,y:150+e},150+e/4,null,Laya.Handler.create(null,function(){Laya.Tween.to(t,{x:80,y:414},150+e/4,null,Laya.Handler.create(null,function(){t.removeSelf(),Laya.Pool.recover("eff",t)}))}))},e.prototype.getTargetPoint=function(t,e){void 0===t&&(t=!0),void 0===e&&(e=-1);var s;if(this.srcPosInfo.length)for(var a=0;a<this.srcPosInfo.length;a++){var i=this.srcPosInfo[a];if(-1==e&&(e=this.deviation),Math.abs(i.y-this.targetY)<=e||i.y>this.targetY){s=i,t&&this.srcPosInfo.shift();break}break}return s},e.prototype.getStdPoint=function(t){this._stdP||(this._stdP=new Laya.Point(this.curX,this.curY));for(var e,s=this.posInfo.length-1;s>=0&&!((e=this.posInfo[s]).t<=t);s--);var a=t-e.t;return this._stdP.x=e.x+e.sx*a,this._stdP.y=e.y-this.speedY*a,this._stdP},e.prototype.getStdNode=function(t){for(var e,s=this.posInfo.length-1;s>=0;s--)if(this.posInfo[s].t<=t){e=this.posInfo[s];break}for(this.srcPosInfo=[],s+=1;s<this.posInfo.length-1;s++)this.srcPosInfo.push(this.posInfo[s]);return e},e.prototype.gemeEnd=function(){trace("gameEnd----------------------------------------------\x3e>");var t={music:this.params,star:this._starNum,score:this._score};XFacade.instance.showModule(GameResultView,t),this.stop()},e.prototype.onDestroy=function(){Laya.loader.clearRes("res/map/bj"+this.params.id+"1.jpg"),Laya.loader.clearRes("res/map/bj"+this.params.id+"2.jpg"),Laya.loader.clearRes("res/map/bj"+this.params.id+"2.jpg"),Laya.loader.clearRes(e.mp3),Star.destroy(),this.soundChannel&&this.soundChannel.destroy(),this.ball&&this.ball.stop(),Laya.timer.clear(this,this.update),Laya.stage.off(Laya.Event.CLICK,this,this.onC),this.ui.btnStart.off(Laya.Event.CLICK,this,this.onStart),Laya.stage.off(Laya.Event.CLICK,this,this.resume),this.removeEVent(),this.stop()},e}(xframe.XWindow),GameEvent=function(){function t(){}return t.BACK="back",t.RESTART="restart",t.SELECTED="selected",t.NEXTCHAPTER="nextchapter",t.HOMECHAPTER="homechapter",t.ERR="err",t.OVER="over",t}();