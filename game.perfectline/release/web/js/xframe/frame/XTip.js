var xframe,__extends=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,o){t.__proto__=o}||function(t,o){for(var e in o)o.hasOwnProperty(e)&&(t[e]=o[e])};return function(o,e){function n(){this.constructor=o}t(o,e),o.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}();!function(t){var o=function(o){function e(){var e=o.call(this)||this;return e._layer=t.LayerManager.LAYER_POP,e._align=t.LayerManager.ALIGN_CENTER,e}return __extends(e,o),e.showTip=function(t){var o=Laya.Pool.getItem("XTip");o||(o=new e),o.show(t),Laya.Tween.to(o,{y:o.y-180,alpha:0},500,null,Handler.create(o,o.close),1200)},e.prototype.show=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];o.prototype.show.call(this),this.alpha=1,this._msgTF.text=t[0]+""},e.prototype.close=function(){Laya.Pool.recover("XTip",this),o.prototype.close.call(this)},e.prototype.createUI=function(){this.ui=new ui.views.TipsUI,this.addChild(this.ui),this._msgTF=this.ui.tfContent},e}(t.XWindow);t.XTip=o}(xframe||(xframe={}));