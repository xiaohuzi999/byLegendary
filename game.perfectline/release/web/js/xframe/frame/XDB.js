var XDB=function(){function t(){}return t.fetchSrvData=function(a){this._cb=a;var i=Handler.create(this,this.init);if(AppConfig.platfrom==AppConfig.Plat4399||AppConfig.platfrom==AppConfig.Debug){var e=Laya.LocalStorage.getItem(t.NAME);i.runWith(e)}else wx.login({success:function(t){t.code?xframe.HttpCmd.callServer(i,"srv","login",{appid:AppConfig.AppID,code:t.code}):XAlert.showAlert("登录失败！"+t.errMsg)},initLocal:function(){trace("XDB::未与远程数据同步, 使用本地数据----------------------");var a=Laya.LocalStorage.getItem(t.NAME);i.runWith(a)}})},t.init=function(t){"string"==typeof t?t.length>0&&(this._data=JSON.parse(t)):this._data=t||{},0==this._data.code&&(User.instace.id=this._data.data.id,User.instace.openid=this._data.data.openid,this._data.data.kv.length>0?this._data=JSON.parse(this._data.data.kv):this._data={}),this._cb&&(this._cb.run(),this._cb=null)},t.delLocalData=function(){Laya.LocalStorage.removeItem(this.NAME)},t.getData=function(t){return trace("getData::::::::::::::",this.data),this.data[t]},t.save=function(t,a){this.data[t]=a,Laya.LocalStorage.setItem(this.NAME,JSON.stringify(this.data)),this._pending||AppConfig.platfrom==AppConfig.Plat4399||(this._pending=!0,Laya.timer.once(500,this,this.push2Srv))},t.push2Srv=function(){this._pending=!1,xframe.HttpCmd.callServer(Handler.create(null,function(t){trace("save::",t)}),"srv","save",{openid:User.instace.openid,kv:JSON.stringify(this.data)})},Object.defineProperty(t,"data",{get:function(){return this._data||(this._data={}),this._data},enumerable:!0,configurable:!0}),t.USER="user",t.BAG="bag",t._pending=!1,t.NAME="xdb",t}();