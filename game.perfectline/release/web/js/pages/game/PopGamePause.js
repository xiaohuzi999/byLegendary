var __extends=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};return function(e,n){function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),PopGamePause=function(t){function e(){return t.call(this)||this}return __extends(e,t),e.prototype.createUI=function(){var t=this;this._view=new ui.views.GamePauseUI,this.addChild(this._view),this._view.btnHome.on(Laya.Event.CLICK,null,function(){XEvent.instance.event(GameEvent.BACK),XFacade.instance.closeModule(e)}),this._view.btnRestart.on(Laya.Event.CLICK,null,function(){t._restartHandler.run(),XFacade.instance.closeModule(e)}),this._view.btnResume.on(Laya.Event.CLICK,null,function(n){n.stopPropagation(),t._resumeHandler.run(),XFacade.instance.closeModule(e)})},e.prototype.show=function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];t.prototype.show.call(this),this._restartHandler=e[1],this._resumeHandler=e[0]},e.prototype.close=function(){t.prototype.close.call(this),this._restartHandler=this._resumeHandler=null},e}(xframe.XMWindow);