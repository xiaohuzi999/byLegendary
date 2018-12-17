/*
* name;
*/
var App = /** @class */ (function () {
    function App() {
    }
    App.prototype.start = function () {
        XFacade.instance.showModule(LoadingView);
    };
    return App;
}());
