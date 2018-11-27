/*
* name;
*/
class Player extends ui.main.PlayerUI{
    private _vo:Role;
    constructor(){
        super();
        this.dataSource;
    }

    /**更新表现 */
    public update():void{
        this.dataSource = this._vo;
    }

    public set dataSource(r:Role){
        this._vo = r;
        this.tfName.text = this._vo.name+" Lv"+this._vo.lv;
        this.pic.skin = "pet/"+this._vo.lv+".png"
    }

    public get dataSource():Role{
        return this._vo;
    }
}