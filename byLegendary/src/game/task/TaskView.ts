/*
* name;
*/
class TaskView extends xframe.XMWindow{
    public ui:ui.task.TaskViewUI;
    private _curId:number;
    constructor(){
        super();
    }

    public show(...args):void{
        super.show();
        this.showTask({id:1, value:0});
    }

    private showTask(taskInfo:{id:number, value:number}):void{  
        this._curId = taskInfo.id;
        let vo:TaskVo = DBTask.getTaskVo(this._curId);
        let done:boolean = DBTask.checkFinish(this._curId);
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
        this.ui.btnDone.disabled = !done;
    }

    private onClick(e:Laya.Event):void{
        switch(e.target){
            case this.ui.btnDone:
                if(DBTask.finishTask(this._curId)){
                    this.close();
                }
            break;
            case this.ui.btnDone:
                DBTask.dropTask(this._curId);
                this.close();
            break;
        }
    }

    protected createUI():void{
        this.ui = new ui.task.TaskViewUI();
        this.addChild(this.ui);
        this.closeOnBlank = true;
    }

    protected initEvent():void{
        super.initEvent();
        this.ui.on(Laya.Event.CLICK, this, this.onClick);
    }

    protected removeEvent():void{
        super.removeEvent();
        this.ui.off(Laya.Event.CLICK, this, this.onClick);
    }
}