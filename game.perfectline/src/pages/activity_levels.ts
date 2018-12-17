class LevelsActivity extends xframe.XMWindow {
    ui = new ui.pages.LevelPageUI();
    private source:Array<any> = [];
    private params:any;
    constructor() {
        super();
        this.initView();
    }

    initView() {
        this.ui.btnBack.on(Laya.Event.CLICK, null, () => {
            this.close()
        });
        this.ui.list.array = [];
        this.ui.list.itemRender = ui.views.LevelRenderViewUI;
        this.ui.list.vScrollBarSkin = null;
        this.ui.list.scrollBar.elasticBackTime = 200;
        this.ui.list.scrollBar.elasticDistance = 200;
        this.ui.list.renderHandler = Laya.Handler.create(this, (item, index) => {
            this.renderItem(item, index);
        }, null, false);
        this.ui.list.mouseHandler = Laya.Handler.create(this, (event, index) => {
            this.mouseItem(event, index);
        }, null, false);
    }

    public show(...args):void{
        super.show();
        this.params = args[0];
    }
       
    onShow() {
        trace("params::",this.params)
        this.ui.list.array = GameDataManager.instance.getMuicList(this.params);
    }

    renderItem(item, index) {
        var data = this.ui.list.array[index];
        var itemRender = item as ui.views.LevelRenderViewUI;
        var musicRecord =  null;
        if(musicRecord) {
            itemRender.title.text = data.name;
            itemRender.tfAuthor.text = data.author;
            for(let i = 1; i < 4; i++) {
                if(i >  musicRecord.star) {
                    itemRender["star_" + (i -1)].skin = "res/game/ic_star_result_gray_s.png";
                } else {
                    itemRender["star_" + (i - 1)].skin = "res/game/ic_star_result_s.png";
                }
            }
        } else {
            itemRender.title.text = "挑战后可获得音乐信息";  
            itemRender.tfAuthor.text = "";  
            itemRender.star_1.skin = "res/game/ic_star_result_gray_s.png";
            itemRender.star_2.skin = "res/game/ic_star_result_gray_s.png";
            itemRender.star_0.skin = "res/game/ic_star_result_gray_s.png";
        }
    }

    mouseItem(event:Laya.Event, index) {
        if (event && event.type === Laya.Event.CLICK) {
            var data = this.ui.list.array[index];
            XFacade.instance.showModule(GameLoading, data);
            this.close();
        }
    }

}
