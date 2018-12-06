/*
* name;
*/
class FightView extends xframe.XMWindow{
    public ui:ui.fight.FightUI = new ui.fight.FightUI();
    constructor(){
        super();
    }

    //
    public fight(home:Role[], away:any[]):void{
        FightModel.init(home, away);
    }
}