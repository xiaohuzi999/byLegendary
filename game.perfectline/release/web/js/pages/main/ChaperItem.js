var __extends=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i])};return function(t,i){function n(){this.constructor=t}e(t,i),t.prototype=null===i?Object.create(i):(n.prototype=i.prototype,new n)}}(),ChaperItem=function(e){function t(){var t=e.call(this)||this;return t._selected=!1,t.box.scaleX=t.box.scaleY=.8,t}return __extends(t,e),Object.defineProperty(t.prototype,"dataSource",{get:function(){return this._data},set:function(e){this._data=e,e?(this.visible=!0,this.pic.skin="res/icon/"+e.id+".png",this.pic.gray=this.lock.visible=void 0==User.instace.starInfo[e.id]):this.visible=!1},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"selected",{get:function(){return this._selected},set:function(e){this._selected!=e&&(this._selected=e,this._selected?Laya.Tween.to(this.box,{scaleX:1,scaleY:1},200):Laya.Tween.to(this.box,{scaleX:.8,scaleY:.8},200))},enumerable:!0,configurable:!0}),t}(ui.views.home.ChapterItemUI);