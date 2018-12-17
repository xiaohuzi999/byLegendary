class DataLoader {

    _data_ = {};
    _checked_ = false;
    _checking_ = false;
    _callbacks_ = [];

    assignLocalData(data = {}) {
        Object.assign(this._data_, data)
    }

    getRemoteData(handle, success, fail) {
        let callback = (isLoaded, data) => {
            if (isLoaded) {
                success && success(data);
            } else {
                fail && fail(data);
            }
        }
        if (this._checking_) {
            this._callbacks_.push(callback);
            return;
        }
        if (this._checked_) {
            callback && callback(true, this._data_);
            return;
        }
        this._checking_ = true;
        handle && handle((res) => {
            callback && callback(true, res);
            this.callbackState(true, res)
        }, (res) => {
            callback && callback(false, res);
            this.callbackState(false, res);
        });
    }

    callbackState(isLoaded, data) {
        if (isLoaded) {
            this._data_ = data;
            this._checked_ = true;
        } else {
            this._checked_ = false;
        }
        this._checking_ = false;
        var callbacks = this._callbacks_.splice(0, this._callbacks_.length);
        callbacks.forEach((value) => {
            value && value(isLoaded, data);
        });
    }
}

const loaders = {
}

const getDataLoader = (name) => {
    if (!loaders[name]) {
        Object.assign(loaders, {
            [name]: new DataLoader()
        });
    }
    return loaders[name];
}

module LoaderManager {

    export const getRemoteData = (name, loader) => {
        return new Promise((resolve, reject) => {
            getDataLoader(name).getRemoteData(loader, resolve, reject);
        });
    }

    export const assignLocalData = (name, data) => {
        return getDataLoader(name).assignLocalData(data);
    }

}
