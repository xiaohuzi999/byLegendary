/*
* name;
*/
class TaskView extends xframe.XMWindow{
    public ui:ui.task.TaskViewUI;
    constructor(){
        super();
    }

    protected createUI():void{
        this.ui = new ui.task.TaskViewUI();
        this.addChild(this.ui);
        this.closeOnBlank = true;
    }

    protected initEvent():void{
        super.initEvent();
    }

    protected removeEvent():void{
        super.removeEvent();
    }
}