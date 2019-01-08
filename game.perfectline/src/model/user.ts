class User {
    public openid:string;

    public avatar:string =  "";
    public id:string =  "";
    public nickname:string =  ""; 
    public gold:number = 0;
    public star:number = 0;
    public power:number = 10;
    public diamond:number = 0;

    /**当前歌曲ID */
    public curId:number = 1;
    /**记录{id:星数(undefined未开启; 否者已开启)} */
    public starInfo:any = {1:0};
    /**角色状态 {id:state---number(-1/undefind未激活,0未使用,1使用中)}*/
    public roleInfo:any= {1:1};

    private static _instace: User;
    /** */
    public static readonly UPDATE:string = "update"
    public initdData () {
        let val:any = XDB.getData(XDB.USER);
        if(val){
            for(let i in val){
                this[i] = val[i];
            }
        }
    }

    public dispatchEvent():void{
        XEvent.instance.event(User.UPDATE)
    }

    public save():void{
        XDB.save(XDB.USER, this)
    }


    public static get instace() : User {
        if(!this._instace) {
            this._instace = new User();  
        }
        return this._instace;
    }
}

