var __extends=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])};return function(e,o){function n(){this.constructor=e}t(e,o),e.prototype=null===o?Object.create(o):(n.prototype=o.prototype,new n)}}(),PopAddPower=function(t){function e(){var e=t.call(this)||this;return e.ui=new ui.views.home.AddPowerUI,e._flag=1,e.NeedGold=188,e.ui.btnClose.on(Laya.Event.CLICK,null,function(){e.close()}),e.ui.btnWatch.on(Laya.Event.CLICK,null,function(){1==e._flag&&(User.instace.gold>=e.NeedGold?(User.instace.gold-=e.NeedGold,User.instace.power++,User.instace.save(),User.instace.dispatchEvent(),e.close(),XTip.showTip("购买成功，体力+1")):XTip.showTip("您的金币不足了哟~"))}),e}return __extends(e,t),e.prototype.show=function(){for(var e=[],o=0;o<arguments.length;o++)e[o]=arguments[o];t.prototype.show.call(this)},e.prototype.createUI=function(){t.prototype.createUI.call(this),this.ui.btnWatch.label="购买",this.ui.tfTip.text="消费"+this.NeedGold+"金币购买"},e}(xframe.XMWindow);