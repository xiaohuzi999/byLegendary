// 关卡解锁
const helpUnlock = "helpUnlock";
// 分享音乐卡片
const shareMuiscCard = "musicCard";

module HelpUtil {
    export function gethelplist(key): Promise<any> {
        return new Promise((resolve) => {
            yxmp.plugin.help.getHelpList(key).then(res => {
                if (res) {
                    let contributions: Array<any> = res.data.concat([]);
                    let result: Array<any> = [];
                    // console.error("gethelplist", res);
                    contributions.forEach(element => {
                        if (element.app_name == "perfectline") {
                            element.kv_data_list.forEach(kv => {
                                if (kv.key == key) {
                                    // let value = JSON.parse(kv.value);
                                    // let obj = { contributor_id: element.contributor_id, value: value };
                                    result.push(kv);
                                }
                            });
                        }
                    });
                    resolve(result);
                } else {
                    resolve([]);
                }  
            })
        })
    }

    // 合成分享图片
    export function shareByView(view: Laya.Sprite, x = 0, y = 0, w = view.width, h = view.height) {
        try {
            var htmlCanvas = view.drawToCanvas(w, h, x, y);
            var canvas = htmlCanvas.getCanvas();
            let url = canvas.toTempFilePathSync();
            // let opts = (<any>Object).assign({}, options || {}, { imageUrl: url });
            // wx.shareAppMessage(getShareOptions(opts, type));
            return url;
        } catch (error) {
            // console.log(error);
            // wx.shareAppMessage(getShareOptions(options, type));
        }
    } 
}