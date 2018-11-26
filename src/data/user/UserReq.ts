/*
* name;
*/
class UserReq{
    constructor(){

    }

    //
    public static getUserInfo(cb?:Handler):void{
        let userInfo:any = XDB.getData(XDB.USER);
        if(userInfo){
            userInfo = JSON.parse(userInfo);
        }else{
            userInfo = createUser();
        }
        User.getInstance().update(userInfo);
        cb && cb.run();

        //
        function createUser():any{
            return {
                id:1,
                name:"xiaohuzi999", 
                pic:"",
                gold:0, 
                diamond:6,
                power:10,
                role:{...DBMonster.calcTotalPro(0), uid:1}
            };
        }
    }


    public static save():void{
        XDB.save(XDB.USER, JSON.stringify(User.getInstance()));
    }

    public static addHero(id:any):void{
        var role = DBMonster.calcTotalPro(id);
        role.state = Role.IN_FIGHT;
        role.uid = role.id;
        User.getInstance().heros.push(role);
        User.getInstance().emit();
    }

    //
    public static getFightTeam():Role[]{
        var arr:Role[] = [User.getInstance().role]
        //hero
        for(let i=0; i<User.getInstance().heros.length; i++){
            if(User.getInstance().heros[i].state == Role.IN_FIGHT){
                arr.push(User.getInstance().heros[i]);
            }
        }
        //pet
        return arr;
    }
}