var __extends=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),PopUserInfo=function(t){function e(){var e=t.call(this)||this;return e.ui=new ui.views.home.UserInfoUI,e.createUI(),e}return __extends(e,t),e.prototype.createUI=function(){var t=this;this.ui.avatar.skin=User.instace.userInfo.avatarUrl,this.ui.nickLabel.text=User.instace.userInfo.nickName,this.ui.userId.text="ID："+User.instace.userInfo.id,this.ui.heartLabel.text=User.instace.userInfo.power+"",this.ui.starLabel.text=User.instace.userInfo.star+"",this.ui.musicLabel.text=User.instace.userInfo.coin+"",this.ui.btnClose.on(Laya.Event.CLICK,null,function(){t.finish()})},e.show=function(){Tape.PopManager.showPop(e)},e}(xframe.XMWindow);