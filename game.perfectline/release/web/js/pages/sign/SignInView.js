var __extends=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])};return function(e,i){function n(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(n.prototype=i.prototype,new n)}}(),SignInView=function(t){function e(){var e=t.call(this)||this;return e.ui=new ui.plugins.SignInUI,e.bgAlpha=.3,e.closeOnBlank=!0,e}return __extends(e,t),e.prototype.onClick=function(t){switch(t.target){case this.ui.btnClose:this.close();break;case this.ui.btnReceice:if(User.instace.canSign){var e=(new Date).getDay();User.instace.sign.info.push(e);var i=DBSign.getSignVo(User.instace.sign.info.length);trace("vo----------------------",i);for(var n="获得",o=0;o<i.reward.length;o++){var s=i.reward[o];Bag.getInstance().addItem(s[0],s[1]);var a=DBItem.getItemVo(s[0]);o>0&&(n+="、"),n+=a.name+"x"+s[1]}XTip.showTip(n),User.instace.dispatchEvent(),this.update(),this.ui.btnReceice.visible=User.instace.canSign}}},e.prototype.show=function(){for(var e=[],i=0;i<arguments.length;i++)e[i]=arguments[i];t.prototype.show.call(this),xframe.AniUtil.flowIn(this);for(var n=0;n<7;n++)this.ui["sign"+(n+1)].dataSource=DBSign.getSignVo(n+1);this.update(),this.ui.btnReceice.visible=User.instace.canSign},e.prototype.close=function(){xframe.AniUtil.flowOut(this,Laya.Handler.create(this,t.prototype.close))},e.prototype.update=function(){for(var t=User.instace.sign.info.length,e=0;e<7;e++)e<t?this.ui["sign"+(e+1)].update(1):this.ui["sign"+(e+1)].update(0)},e.prototype.initEvent=function(){t.prototype.initEvent.call(this),this.ui.btnClose.on(Laya.Event.CLICK,this,this.onClick),this.ui.btnReceice.on(Laya.Event.CLICK,this,this.onClick)},e.prototype.removeEvent=function(){t.prototype.removeEvent.call(this),this.ui.btnClose.off(Laya.Event.CLICK,this,this.onClick),this.ui.btnClose.off(Laya.Event.CLICK,this,this.onClick)},e}(xframe.XMWindow);