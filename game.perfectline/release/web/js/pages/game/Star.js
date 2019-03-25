var __extends=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var a in e)e.hasOwnProperty(a)&&(t[a]=e[a])};return function(e,a){function n(){this.constructor=e}t(e,a),e.prototype=null===a?Object.create(a):(n.prototype=a.prototype,new n)}}(),Star=function(t){function e(){var e=t.call(this)||this;e.MaxAlpha=1,e.MinAlpha=.5,e.skin="res/game/dot.png";var a=Math.random();return e._sleepTime=4e3*a+2e3,e._offsetY=150*a+600,a<.7&&(e.alpha=e.MaxAlpha,a<.15?(e.MaxAlpha=.6,e.MinAlpha=.4,e.scale(.5,.5)):(e.MaxAlpha=.75,e.scale(.7,.7))),e.visible=!1,Laya.timer.once(2e3*a,e,e.reborn),e}return __extends(e,t),e.prototype.flash=function(){var t=this;Laya.Tween.to(this,{alphp:this.MinAlpha},200,null,Laya.Handler.create(null,function(){Laya.Tween.to(t,{alphp:t.MaxAlpha},200,null,Laya.Handler.create(null,function(){Laya.Tween.to(t,{alpha:t.MinAlpha},1e3,null,Laya.Handler.create(null,function(){Laya.timer.once(500,null,function(){t.visible=!1}),Laya.Tween.to(t,{x:t.x},1,null,Handler.create(t,t.reborn),t._sleepTime)}))}))}))},e.prototype.move=function(){e._sleep||(this._moveTween=Laya.Tween.to(this,{y:this.y+this._offsetY},2200))},e.prototype.reborn=function(){this.visible=!0,this.alpha=this.MaxAlpha,this.x=Math.floor(Math.random()*Laya.stage.width),this.y=Math.floor(Math.random()*(Laya.stage.height-200))-200,this.flash(),this.move()},e.prototype.__sleep=function(){Laya.Tween.clear(this._moveTween)},e.prototype.die=function(){Laya.Tween.clearAll(this),this.removeSelf()},e.shine=function(t,a){this.destroy();for(var n=0;n<t;n++)this._stars.push(new e),a.addChild(this._stars[n])},e.sleep=function(){if(!this._sleep){this._sleep=!0;for(var t=0;t<this._stars.length;t++)this._stars[t].__sleep()}},e.active=function(){if(this._sleep){this._sleep=!1;for(var t=0;t<this._stars.length;t++)this._stars[t].move()}},e.destroy=function(){for(var t=0;t<this._stars.length;t++)this._stars[t].die();this._stars.length=0},e._sleep=!0,e._stars=[],e}(Laya.Image);