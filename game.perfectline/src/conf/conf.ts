class Conf {
    public static sdkOptions = {
        serverUrl: 'https://betaapi.xiuwu.me',
        appName: 'perfectline',
        asset: {
            server: 'https://s.xiuwu.me',
            beta: false,
        },
        webSocket: {
            url: 'wss://betaapi.xiuwu.me/ws',
            format: 2,
            autoRetryTimes: 3,
        },
        debug: true,
    }
}