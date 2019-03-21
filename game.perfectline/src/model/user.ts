class User {
    public openid:string;

    public avatar:string =  "res/ic_role/ppx.png";
    public id:string =  "";
    public nickname:string =  ""; 
    public gold:number = 0;
    //public star:number = 0;
    public power:number = 10;
    public diamond:number = 0;
    //登录记录
    public loginDay:number = -1;

    /**当前歌曲ID */
    public curId:number = 1;
    /**记录{id:星数(undefined未开启; 否者已开启)} ,改成进度了*/
    public starInfo:any = {1:0};
    /**角色状态 {id:state---number(-1/undefind未激活,0未使用,1使用中)}*/
    public roleInfo:any= {1:1};
    /**签到信息 end，结束时间戳 info,存签到的时间参数*/
    public sign:{end:number, info:number[]} = {end:0, info:[]};

    private static _instace: User;
    /** */
    public static readonly UPDATE:string = "update"
    //最大体力
    public static readonly MaxPower:number = 10;
    public initdData () {
        let val:any = XDB.getData(XDB.USER);
        if(val){
            for(let i in val){
                this[i] = val[i];
            }
        }
        //同步体力---
        let date:Date = new Date();
        if(date.getDay() != this.loginDay){
            this.loginDay = date.getDay();
            this.power = User.MaxPower;
        }
        //同步签到
        let now = Laya.Browser.now();
        if(now - this.sign.end > 0){
            let date:Date = new Date();
            let delDay:number = 6-date.getDay();
            let tDate:Date = new Date(date.getFullYear(), date.getMonth(),date.getDate()+1)
            let delTime = tDate.getTime() - date.getTime();
            delTime += 3600*1000*24*delDay
            this.sign.end = now+delTime;

            trace("end::::::::::::::",this.sign.end)
            this.sign.info.length = 0;
        }
    }

    public get curRole():number{
        for(let i in this.roleInfo){
            if(this.roleInfo[i] == 1){
                return parseInt(i);
            }
        }
    }

    /**判断是否已经签到过 */
    public get canSign():boolean{
        let date:Date = new Date();
        let day:number = date.getDay();
        return this.sign.info.indexOf(day) == -1;
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

