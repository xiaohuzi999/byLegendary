/*
* name;
*/
class User{
    public id:string;
    public openid:string;

    public name:string;

    public pic:string;

    public power:number = 0;

    public gold:number = 10000;
    
    public diamond:number = 0;
    //
    public role:Role;

    public task:{id:number, value:number}[] = [];
    
    public taskDone:number[] = [];

    /**Trainee Gift */
    public traineeGift:number[] = [];
    /** */
    public sign:{end:number, info:number[]} = {end:0, info:[]};
    /** */
    public createDate:number;
    //单例;
    private static _instance:User;
    //事件-更新;
    public static readonly UPDATE:string = "update";

    constructor(){
        this.role = new Role(DBRole.getHero(1));
        this.role.uid = 1;
    }

    /**初始化 */
    public init():void{
        let val:any = XDB.getData(XDB.USER);
        if(val){
            if(typeof val === "string"){
                val = JSON.parse(val);
            }
            this.update(val);
        }else{
            this.createDate = Laya.Browser.now();
        }
        this.dispatchEvent();
    }

    //更新
    public update(value:any):void{
        for(var i in value){
            this[i] = value[i];
        }
    }

    //属性修改之后手动调用；
    public dispatchEvent():void{
        XEvent.instance.event(User.UPDATE);
    }

    /**保存 */
    public save():void{
        XDB.save(XDB.USER, this);
    }

    public static getInstance():User{
        if(!this._instance){
            this._instance = new User();
        }
        return this._instance;
    }
}