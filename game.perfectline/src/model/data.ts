const loaderName = "_kv_data_loader_";

const checkoutData = () => {
    let handler = (success, fail) => {
        yxmp.api.getCloudData(['*']).then(res => {
            if (res && res.data) {
                var data = {};
                var dataArray = res.data;
                if (dataArray instanceof Array) {
                    dataArray.forEach(element => {
                        var key = element.key;
                        var value = element.value;
                        if (key) {
                            Object.assign(data, {
                                [key]: value
                            });
                        }
                    });
                }
                success && success(data);
            } else {
                throw res;
            }
        }).catch((err) => {
            fail && fail(err);
        });
    }
    return LoaderManager.getRemoteData(loaderName, handler);
}

let saveDataList = [];

const updateData = () => {
    let list = saveDataList.splice(0, saveDataList.length);
    return yxmp.api.setCloudData(list).catch(err => {
        list.forEach(element => {
            let start = saveDataList.indexOf(element);
            if (start >= 0) {
                saveDataList.splice(start, 1);
            }
        });
    });
}

module DataManager {
    // 用户跟新的
    export const setData = (key, value) => {
        if(typeof value == "string") {
            yxmp.getCloudData().set(key, value);
            return ;
        }
        var obj = JSON.parse(JSON.stringify(value));
        yxmp.getCloudData().set(key, obj);
    }

    export const getData = (key, def: any = '') => {
        return yxmp.getCloudData().get(key, def);
    }

    export const hasData = (key) => {
        return getData(key) !== '';
    }

}
