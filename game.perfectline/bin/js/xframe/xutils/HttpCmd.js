/**
* name
*/
var HttpRequest = Laya.HttpRequest;
var xframe;
(function (xframe) {
    var HttpCmd = /** @class */ (function () {
        function HttpCmd() {
        }
        /**
         * 发送http请求
         * @param handler 请求回调；
         * @param m 模块
         * @param action 方法
         * @param srvArgs 参数；
        */
        HttpCmd.callServer = function (handler, m, action, srvArgs) {
            var xhr = Laya.Pool.getItem("HttpRequest");
            if (!xhr) {
                xhr = new HttpRequest();
            }
            xhr.http.timeout = 2000; //设置超时时间；
            xhr.once(Laya.Event.COMPLETE, null, completeHandler);
            xhr.once(Laya.Event.ERROR, null, errorHandler);
            //数据拼接
            xhr.send(HttpCmd.httpRoot + m + "/" + action + parseArgs(srvArgs), null, "get");
            function parseArgs(args) {
                if (typeof args === "string") {
                    return args;
                }
                var str = '';
                for (var i in args) {
                    str += "&" + i + "=" + args[i];
                }
                str += "&t=" + Laya.Browser.now();
                return str;
            }
            function completeHandler(data) {
                if (typeof data === "string") {
                    data = JSON.parse(data);
                }
                handler && handler.runWith(data);
                recover();
            }
            function errorHandler(data, e) {
                //需要一些特殊的处理
                handler && handler.runWith(data);
                recover();
            }
            function recover() {
                xhr.off(Laya.Event.COMPLETE, null, completeHandler);
                xhr.off(Laya.Event.ERROR, null, errorHandler);
                Laya.Pool.recover("HttpRequest", xhr);
            }
        };
        /**host*/
        //http://127.0.0.1/web/index.php?r=srv/login
        //public static httpRoot:string = "http://127.0.0.1/byphp/web/index.php?r=";
        HttpCmd.httpRoot = "http://111.230.26.144/web/index.php?r=";
        return HttpCmd;
    }());
    xframe.HttpCmd = HttpCmd;
})(xframe || (xframe = {}));
