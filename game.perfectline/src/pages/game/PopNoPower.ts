/*
* name;
*/
class PopNoPower extends xframe.XMWindow {

    ui = new ui.views.NoPowerTipUI;

    constructor() {
        super();
        this.ui.btnClose.on(Laya.Event.CLICK, null, () => {
            this.params.run();
            this.finish();
        });
    }

    protected onShow(): void {
        trace("PopNoPower show");
    }

}