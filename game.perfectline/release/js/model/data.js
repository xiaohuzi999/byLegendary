var loaderName = "_kv_data_loader_";
var checkoutData = function () {
    var handler = function (success, fail) {
        yxmp.api.getCloudData(['*']).then(function (res) {
            if (res && res.data) {
                var data = {};
                var dataArray = res.data;
                if (dataArray instanceof Array) {
                    dataArray.forEach(function (element) {
                        var _a;
                        var key = element.key;
                        var value = element.value;
                        if (key) {
                            Object.assign(data, (_a = {},
                                _a[key] = value,
                                _a));
                        }
                    });
                }
                success && success(data);
            }
            else {
                throw res;
            }
        }).catch(function (err) {
            fail && fail(err);
        });
    };
    return LoaderManager.getRemoteData(loaderName, handler);
};
var saveDataList = [];
var updateData = function () {
    var list = saveDataList.splice(0, saveDataList.length);
    return yxmp.api.setCloudData(list).catch(function (err) {
        list.forEach(function (element) {
            var start = saveDataList.indexOf(element);
            if (start >= 0) {
                saveDataList.splice(start, 1);
            }
        });
    });
};
var DataManager;
(function (DataManager) {
    // 用户跟新的
    DataManager.setData = function (key, value) {
        if (typeof value == "string") {
            yxmp.getCloudData().set(key, value);
            return;
        }
        var obj = JSON.parse(JSON.stringify(value));
        yxmp.getCloudData().set(key, obj);
    };
    DataManager.getData = function (key, def) {
        if (def === void 0) { def = ''; }
        return yxmp.getCloudData().get(key, def);
    };
    DataManager.hasData = function (key) {
        return DataManager.getData(key) !== '';
    };
})(DataManager || (DataManager = {}));
