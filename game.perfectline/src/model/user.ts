class User {

    private static _instace: User;
    private _userInfo: any;
    public roles: Array<any> = [];
    public cards: Array<any> = [];
    
    public initdData () {

    }

    /**
     * 保存用户信息
     */
    public set userInfo(user : any) {
       if(this._userInfo != user) {
            //    this._userInfo = user;
           this._userInfo =  Object.assign(this._userInfo, user);
       }
    }

    /**
     * 获取用户信息
     */
    public get userInfo() {
        if(!this._userInfo) {
            this._userInfo = {
                avatar: "",
                id: "",
                nickname: "", 
                gold:0,
                star:0,
                power:10,
            }
        }
       return this._userInfo; 
    }

    /**
     * 是否拥有此角色
     * @param roleid 角色id
     */
    checkIsOwnRoleById(roleid) {
        var role = this.roles.find(item => {
            return item.id == roleid;
        });
        return role ? true : false;
    }

    public static get instace() : User {
        if(!this._instace) {
            this._instace = new User();  
        }
        return this._instace;
    }
}

