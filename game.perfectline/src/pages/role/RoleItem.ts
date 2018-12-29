/*
* name;
*/
class RoleItem extends ui.views.RoleItemRenderUI{
    private _vo:RoleVo;
    constructor(){
        super();
    }

    public set dataSource(vo:RoleVo){
        this.useBtn.offAll(Laya.Event.CLICK);
        this._vo = vo;
        if(vo){
            this.roleimg.skin = "res/ic_role/" + vo.img + ".png";
            this.rolename.text = vo.name;
            this.tip.text = vo.name;
            if(User.instace.roleInfo[vo.id] == 1){
                this.useBtn.label = "使用中";
                this.tip.text = "已获取";
            }else if(User.instace.roleInfo[vo.id] == 0){
                this.useBtn.label = "使用";
                this.tip.text = "已获取";
                this.useBtn.on(Laya.Event.CLICK, this, this.onUse);
            }else{
                this.useBtn.label = "购买";
                if(vo.cost[0] == 1){
                    this.tip.text = "消费"+vo.cost[1]+"金币获得";
                }else{
                    this.tip.text = "消费"+vo.cost[1]+"钻石获得";
                }
                this.useBtn.on(Laya.Event.CLICK, this, this.onBuy);
            }
        }
    }

    private onBuy():void{
        if(this._vo.cost[0] == 1){
            if(User.instace.gold<this._vo.cost[1]){
                XTip.showTip("金币不足~");
            }else{
                User.instace.roleInfo[this._vo.id] = 0;
                User.instace.gold -= this._vo.cost[1];
                XTip.showTip("获得"+this._vo.name);
            }
            User.instace.save();
            User.instace.dispatchEvent();
        }else{
            if(User.instace.gold<this._vo.cost[1]){
                XTip.showTip("钻石不足~");
            }else{
                User.instace.roleInfo[this._vo.id] = 0;
                User.instace.diamond -= this._vo.cost[1];
                XTip.showTip("获得"+this._vo.name);
            }
            User.instace.save();
            User.instace.dispatchEvent();
        }
    }

    private onUse():void{
        for(let i in User.instace.roleInfo){
            if(i == this._vo.id+""){
                User.instace.roleInfo[i] = 1;
            }else{
                User.instace.roleInfo[i] = 0;
            }
        }
        User.instace.dispatchEvent();
    }

    public get dataSource():RoleVo{
        return this._vo;
    }

    public destroy():void{
        this.useBtn.off(Laya.Event.CLICK, this, this.onBuy);
        this.useBtn.off(Laya.Event.CLICK, this, this.onUse);
        super.destroy()
    }
}