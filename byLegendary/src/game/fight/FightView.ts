/*
* name;
*/
class FightView extends xframe.XMWindow{
    public ui:ui.fight.FightUI = new ui.fight.FightUI();
    //
    private _fightInfo:any;
    private _curRndInfo:FightVo[];
    private _curRnd:number = 1;
    private _allFighter:Fighter[];
    constructor(){
        super();
    }

    //
    public fight(home:Role[], away:any[]):void{
        let fighters:any[] = FightModel.init(home, away);
        let tmp:Role[] = fighters[0];
        for(let i=0; i<tmp.length; i++){
            this.ui.home_0.dataSource = tmp[0];
        } 
        tmp = fighters[1];
         for(let i=0; i<tmp.length; i++){
            this.ui.away_0.dataSource = tmp[0];
        } 

        //test
        this._allFighter = [this.ui.home_0, this.ui.away_0];

        this._fightInfo = FightModel.fight();
        this.replay();
    }

    private replay():void{
        this.execRnd();
    }

    private execRnd():void{
        this.ui.tfRnd.text = "回合"+this._curRnd;
        this._curRndInfo = this._fightInfo[this._curRnd];
        if(this._curRndInfo){
            this.execAct();
            this._curRnd++;
        }else{
            trace("结束~~~~~~~~~~~~~~~")
        }
    }

    private execAct():void{
        let vo:FightVo = this._curRndInfo.shift();
        if(vo){
            let attacker:Fighter = this.getFighter(vo.nowId);
            trace("execAct", vo)
            attacker.attack(Laya.Handler.create(this, this.execAct));
            for(let i in vo.fightInfo){
                let defender:Fighter = this.getFighter(i);
                defender.beAttacked();
            }
        }else{
            Laya.timer.once(500, this, this.execRnd)
            //this.execRnd();
        }
        
    }
    
    private getFighter(id:any):Fighter{
        for(let i=0; i<this._allFighter.length; i++){
            if(this._allFighter[i].dataSource.uid == id){
                return this._allFighter[i]
            }
        }
        return null;
    }
}