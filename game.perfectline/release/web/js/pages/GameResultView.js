var __extends=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var s in e)e.hasOwnProperty(s)&&(t[s]=e[s])};return function(e,s){function i(){this.constructor=e}t(e,s),e.prototype=null===s?Object.create(s):(i.prototype=s.prototype,new i)}}(),GameResultView=function(t){function e(){var e=t.call(this)||this;return e.ui=new ui.views.GameResultViewUI,e.bgAlpha=.5,e.init(),e}return __extends(e,t),e.prototype.init=function(){var t=this;this.ui.homebtn.on(Laya.Event.CLICK,null,function(){XEvent.instance.event(GameEvent.BACK),t.close()}),this.ui.btnRevive.on(Laya.Event.CLICK,null,function(e){e.stopPropagation(),XEvent.instance.event(GameEvent.REVIVE),t.close()})},e.prototype.show=function(){for(var e=[],s=0;s<arguments.length;s++)e[s]=arguments[s];t.prototype.show.call(this),this.params=e[0],trace("params::",this.params);var i=this.params.music.id;void 0!=User.instace.starInfo[i]&&User.instace.starInfo[i]<this.params.score&&(User.instace.starInfo[i]=this.params.score,100==this.params.score&&(trace("xxxxxxxxxxxxxxxxxx9999",this.params.score),void 0!=this.params[ItemVo.KEY]?this.params[ItemVo.KEY]=parseInt(this.params[ItemVo.KEY])+1:this.params[ItemVo.KEY]=1)),this.ui.tfGold.text=this.params[ItemVo.GOLD]||"0",this.ui.tfDiamond.text=this.params[ItemVo.DIAMOND]||"0",this.ui.tfItem.text=this.params[ItemVo.KEY]||"0",this.ui.tfScore.text="完成"+this.params.score+"%",this.params[ItemVo.GOLD]&&Bag.getInstance().addItem(ItemVo.GOLD,this.params[ItemVo.GOLD]),this.params[ItemVo.DIAMOND]&&Bag.getInstance().addItem(ItemVo.DIAMOND,this.params[ItemVo.DIAMOND]),this.params[ItemVo.KEY]&&Bag.getInstance().addItem(ItemVo.KEY,this.params[ItemVo.KEY]),this.params.revive?(this.ui.btnRevive.visible=!0,this.ui.btnRevive.pos(56,730),this.ui.homebtn.pos(334,730)):(this.ui.btnRevive.visible=!1,this.ui.homebtn.pos(188,730)),User.instace.dispatchEvent(),User.instace.save()},e.prototype.updateUi=function(){this.ui.tip.text=this.params.music.name,this.ui.tfGold.text="X"+this._rewardCoin},e}(xframe.XMWindow);