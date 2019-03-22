/*
* name;
*/
var App = /** @class */ (function () {
    function App() {
    }
    App.prototype.start = function () {
        this.initEvet();
        if (window && window.location && window.location.href) {
            if (window.location.href.indexOf(AppConfig.Plat4399) != -1) {
                AppConfig.platfrom = AppConfig.Plat4399;
                AppConfig.urlRoot = "";
            }
        }
        var data = Laya.loader.getRes("res/cfg/appCfg.json");
        for (var i in data) {
            AppConfig[i] = data[i];
        }
        //XAlert.SKIN = ui.views.XAlertUIUI;
        XFacade.instance.showModule(LoadingView);
    };
    App.prototype.onRdy = function () {
        XFacade.instance.showModule(HomeView);
        XFacade.instance.closeModule(LoadingView);
    };
    App.prototype.initEvet = function () {
        XEvent.instance.once(LoadingView.RDY, this, this.onRdy);
    };
    return App;
}());
