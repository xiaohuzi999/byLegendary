var __extends=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var e in n)n.hasOwnProperty(e)&&(t[e]=n[e])};return function(n,e){function i(){this.constructor=n}t(n,e),n.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)}}(),DevView=function(t){function n(){var n=null!==t&&t.apply(this,arguments)||this;return n.ui=new ui.pages.DevPageUI,n}return __extends(n,t),n.prototype.createUI=function(){var n=this;t.prototype.createUI.call(this),this.ui.btnBack.on(Laya.Event.CLICK,null,function(){n.close()}),this.ui.panelOutput.vScrollBarSkin=null,this.ui.btnAddCoin.on(Laya.Event.CLICK,null,function(){User.instace.gold+=1e3,User.instace.power+=10,User.instace.dispatchEvent(),User.instace.save()}),this.ui.btnClearLocalData.on(Laya.Event.CLICK,null,function(){XDB.delLocalData(),n.ui.labelOutput.text="本地数据清除成功\n"}),this.ui.btnClearRemoteData.on(Laya.Event.CLICK,null,function(){XTip.showTip("开发中~~")}),this.ui.btnExit.on(Laya.Event.CLICK,null,function(){XTip.showTip("开发中~~")})},n}(xframe.XMWindow);