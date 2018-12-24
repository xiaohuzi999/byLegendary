class User {
    public avatar:string =  "";
    public id:string =  "";
    public nickname:string =  ""; 
    public gold:number = 0;
    public star:number = 0;
    public power:number = 10;
    public diamond:number = 0;

    /**当前歌曲ID */
    public curId:number = 1;
    /**记录 */
    public starInfo:number[] = []

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

