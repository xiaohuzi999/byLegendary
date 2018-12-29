/*
* name;
*/
var App = /** @class */ (function () {
    function App() {
    }
    App.prototype.start = function () {
        this.initEvet();
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
