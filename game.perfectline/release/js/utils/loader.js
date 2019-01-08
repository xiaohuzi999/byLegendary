var DataLoader = /** @class */ (function () {
    function DataLoader() {
        this._data_ = {};
        this._checked_ = false;
        this._checking_ = false;
        this._callbacks_ = [];
    }
    DataLoader.prototype.assignLocalData = function (data) {
        if (data === void 0) { data = {}; }
        Object.assign(this._data_, data);
    };
    DataLoader.prototype.getRemoteData = function (handle, success, fail) {
        var _this = this;
        var callback = function (isLoaded, data) {
            if (isLoaded) {
                success && success(data);
            }
            else {
                fail && fail(data);
            }
        };
        if (this._checking_) {
            this._callbacks_.push(callback);
            return;
        }
        if (this._checked_) {
            callback && callback(true, this._data_);
            return;
        }
        this._checking_ = true;
        handle && handle(function (res) {
            callback && callback(true, res);
            _this.callbackState(true, res);
        }, function (res) {
            callback && callback(false, res);
            _this.callbackState(false, res);
        });
    };
    DataLoader.prototype.callbackState = function (isLoaded, data) {
        if (isLoaded) {
            this._data_ = data;
            this._checked_ = true;
        }
        else {
            this._checked_ = false;
        }
        this._checking_ = false;
        var callbacks = this._callbacks_.splice(0, this._callbacks_.length);
        callbacks.forEach(function (value) {
            value && value(isLoaded, data);
        });
    };
    return DataLoader;
}());
var loaders = {};
var getDataLoader = function (name) {
    var _a;
    if (!loaders[name]) {
        Object.assign(loaders, (_a = {},
            _a[name] = new DataLoader(),
            _a));
    }
    return loaders[name];
};
var LoaderManager;
(function (LoaderManager) {
    LoaderManager.getRemoteData = function (name, loader) {
        return new Promise(function (resolve, reject) {
            getDataLoader(name).getRemoteData(loader, resolve, reject);
        });
    };
    LoaderManager.assignLocalData = function (name, data) {
        return getDataLoader(name).assignLocalData(data);
    };
})(LoaderManager || (LoaderManager = {}));
