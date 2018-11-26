/*
* name;
*/
var App = /** @class */ (function () {
    function App() {
    }
    App.prototype.start = function () {
        this.initEvent();
        //loading & login
        XFacade.instance.showModule(LoadingView);
    };
    App.prototype.onRdy = function () {
        XFacade.instance.showModule(MainView);
    };
    App.prototype.initEvent = function () {
        XEvent.instance.once(LoadingView.RDY, this, this.onRdy);
    };
    return App;
}());
//# sourceMappingURL=App.js.map