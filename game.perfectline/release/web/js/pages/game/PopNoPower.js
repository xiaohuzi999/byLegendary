var __extends=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,o){t.__proto__=o}||function(t,o){for(var n in o)o.hasOwnProperty(n)&&(t[n]=o[n])};return function(o,n){function r(){this.constructor=o}t(o,n),o.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),PopNoPower=function(t){function o(){var o=t.call(this)||this;return o.ui=new ui.views.NoPowerTipUI,o.ui.btnClose.on(Laya.Event.CLICK,null,function(){o.params.run(),o.finish()}),o}return __extends(o,t),o.prototype.onShow=function(){trace("PopNoPower show")},o}(xframe.XMWindow);