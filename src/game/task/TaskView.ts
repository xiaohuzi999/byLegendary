/*
* name;
*/
class TaskView extends xframe.XMWindow{
    public ui:ui.task.TaskViewUI;
    constructor(){
        super();
    }

    public show(...args):void{
        super.show();
        this.showTask(User.getInstance().task[0]);
    }

    private showTask(taskId:any):void{  
        let vo:TaskVo = DBTask.getTaskVo(taskId);
        if(vo){
            this.ui.tfName.text = vo.name+"";
            this.ui.tfDesc.text = vo.desc+"";
            let arr:any[] = vo.reward || [];
            let items:any[] = [];
            for(let i=0; i<arr.length; i++){
                items.push({itemId:arr[i][0], num:arr[i][1]})
            }
            this.ui.itemList.array = items;
        }
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