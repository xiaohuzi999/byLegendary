/*
* name;
*/
class PopAddPower extends xframe.XMWindow {

    ui = new ui.views.home.AddPowerUI();

    constructor() {
        super();
        this.ui.btnClose.on(Laya.Event.CLICK, null, () => {
            this.close()
        });
        
        this.ui.btnWatch.on(Laya.Event.CLICK, null, () => {
            //watch
        });
    }

}