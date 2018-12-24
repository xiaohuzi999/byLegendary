// 关卡解锁
var helpUnlock = "helpUnlock";
// 分享音乐卡片
var shareMuiscCard = "musicCard";
var HelpUtil;
(function (HelpUtil) {
    function gethelplist(key) {
        return new Promise(function (resolve) {
            yxmp.plugin.help.getHelpList(key).then(function (res) {
                if (res) {
                    var contributions = res.data.concat([]);
                    var result_1 = [];
                    // console.error("gethelplist", res);
                    contributions.forEach(function (element) {
                        if (element.app_name == "perfectline") {
                            element.kv_data_list.forEach(function (kv) {
                                if (kv.key == key) {
                                    // let value = JSON.parse(kv.value);
                                    // let obj = { contributor_id: element.contributor_id, value: value };
                                    result_1.push(kv);
                                }
                            });
                        }
                    });
                    resolve(result_1);
                }
                else {
                    resolve([]);
                }
            });
        });
    }
    HelpUtil.gethelplist = gethelplist;
    // 合成分享图片
    function shareByView(view, x, y, w, h) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (w === void 0) { w = view.width; }
        if (h === void 0) { h = view.height; }
        try {
            var htmlCanvas = view.drawToCanvas(w, h, x, y);
            var canvas = htmlCanvas.getCanvas();
            var url = canvas.toTempFilePathSync();
            // let opts = (<any>Object).assign({}, options || {}, { imageUrl: url });
            // wx.shareAppMessage(getShareOptions(opts, type));
            return url;
        }
        catch (error) {
            // console.log(error);
            // wx.shareAppMessage(getShareOptions(options, type));
        }
    }
    HelpUtil.shareByView = shareByView;
})(HelpUtil || (HelpUtil = {}));
