/*
* name;
*/
class FightModel{
    private static _home:Role[] = [];
    private static _away:Role[] = [];
    private static _all:Role[] = [];
    private static _wait:Role[] = [];
    private static _curRnd:number = 1;
    /**当前*/
    private static _curRole:Role;
    /**uids */
    private static _uidIndex:number = -1;
    
    /**初始化 */
    public static init(home:Role[], away:any[]):any[]{
        this._home.length = this._away.length = this._all.length = 0;
        this._curRnd = 1;

        for(let i=0; i<home.length; i++){
            this._home.push(DBRole.calcRolePro(home[i]));
        }
        for(let i=0; i<away.length; i++){
            this._away.push(DBRole.calcNpcPro(away[i]));
        }
        this._all = this._home.concat(this._away);
        //
        for(let i=0; i<this._all.length; i++){
            if(this._all[i].uid == undefined){
                this._all[i].uid = this._uidIndex --;
            }
        }
        //this._all.sort(this.sortOnSpeed);
        //this.fight();
        return [this._home, this._away]
    }

    public static fight():any{
        //如果没有接受
        let result:number = this.checkEnd();
        let fightResut:any = {};
        while(result < 1){
            //
            trace("rnd：：：：：：：：：", this._curRnd);
            this.out();
            fightResut[this._curRnd ++] = this.startNewRnd();
            result = this.checkEnd();
        }
        fightResut["result"] = result;
        fightResut["totalRnd"] = this._curRnd-1;
        trace("fightResut::",fightResut)
        return fightResut;
    }

    private static out():void{
        for(let i=0; i<this._all.length; i++){
            trace("【state】", this._all[i].name, this._all[i].hp);
        }
    }

    /**
     * 开始新一轮
     */
    private static startNewRnd():FightVo[]{
        //console.log("startFight============================")
        let rnd:FightVo[] = [];
        this._wait = this._all.slice(0, this._all.length);
        while(this._wait.length){
            this._curRole = this._wait.shift();
            //trace("Now----------", this._curRole)
           rnd.push(this.excuteAI(this._curRole));
        }
        return rnd;
    }

    /**
     * 执行AI逻辑*
     */
    private static excuteAI(role:Role):FightVo{
        let vo:FightVo = new FightVo();
        vo.nowId = role.uid;
        let list:Role[];
        let target:Role;
        //1,操作------------------------------------------------
        list = this.exSkill(role, vo);
        //2，操作结果------------------------------------------------
        if(list && list.length >0){
            //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxo",list.length);
            var len:number = list.length;
            for(var i=0; i<len; i++){
                target = list[i];
                if(target.hp <= 0){
                    xframe.XUtils.delArrItem(this._all, target);
                    xframe.XUtils.delArrItem(this._wait, target);
                    xframe.XUtils.delArrItem(this._home, target);
                    xframe.XUtils.delArrItem(this._away, target);
                }
            }
        }else{
            console.warn("Skill Err",role);
        }
        return vo;
    }

    private static exSkill(skillRole:Role, vo:FightVo):any {
        //寻找当前能执行的技能；
        let list:any = skillRole.skills || [];
        let isAway:boolean = this._away.indexOf(skillRole) > -1
        var skillData:SkillVo;
        for(let i=list.length-1; i>-1; i--){
            let vo:SkillVo = DBSkill.getSkill(list[i]);
            if(Math.random()<= vo.rate){
                skillData = vo;
                break;
            }
        }
        if(!skillData){
            skillData =  DBSkill.getSkill(0);
        }
        //寻找目标==========================================================
        var targets:Role[] = [];
        let tmp:Role[];
        //本方
        if(skillData.target == SkillVo.TargetHome){
            for(let i=0; i<skillData.num; i++){
                if(isAway){
                    this._away[i] && targets.push(this._away[i])
                }else{
                    this._home[i] && targets.push(this._home[i])
                }
            }
        }
        //对方
        else if(skillData.target == SkillVo.TargetAway){
            for(let i=0; i<skillData.num; i++){
                if(isAway){
                    this._home[i] && targets.push(this._home[i])
                }else{
                    this._away[i] && targets.push(this._away[i])
                }
            }
        }
        //技能效果(伤害)解析==============================================================
        for(let i=0; i<targets.length; i++){
            //计算伤害=============
            var hurt:number = skillRole.attack * skillData.rate;     
            //BUFF伤害加成；
            hurt = parseInt(hurt+"");   
            if(hurt != 0){
                //TODO：BUFF减伤；
                targets[i].hp = Math.max(0, targets[i].hp - hurt);
                if(targets[i].hp > targets[i].maxHp){
                    targets[i].hp = targets[i].maxHp;
                }
                if(vo.fightInfo[targets[i].uid]){
                    vo.fightInfo[targets[i].uid]["hp"] = targets[i].hp
                }else{
                    vo.fightInfo[targets[i].uid] = {"hp":targets[i].hp};
                }
            }
        }

        //BUFF解析===============================================================
        if(skillData.buff){
            let makeBuff:boolean = Math.random() < skillData.buffRate;
            if(makeBuff){
                let buffData:BuffVo = DBBuff.getBuff(skillData.buff);
                if(buffData){
                    let tmp:Role[];
                    if(buffData.target == BuffVo.TargetMe){
                        this.addBuff(skillRole, buffData, vo);
                    }else if(buffData.target == BuffVo.TargetHome){
                        tmp = isAway?this._away:this._home;
                        for(let i=0; i<tmp.length; i++){
                            this.addBuff(tmp[i], buffData, vo);
                        }
                    }else if(buffData.target == BuffVo.TargetAttackOne){
                        this.addBuff(targets[0], buffData, vo);
                    }else if(buffData.target == BuffVo.TargetAttackOne){
                        tmp = isAway?this._home:this._away;
                        for(let i=0; i<tmp.length; i++){
                            this.addBuff(tmp[i], buffData, vo);
                        }
                    }
                }
            }
        }

        //生成操作列表
        vo.action = FightVo.SKILL;
        vo.skillId = skillData.id+"";
        return targets;
    }

    /**加BUFF */
    private static addBuff(role:Role, buff:BuffVo, vo:FightVo):void{
        trace("加BUFF======================", role.uid, buff.id)
        /*
        if(!this._buffInfo[role.uid]){
            this._buffInfo[role.uid] = {};
        }
        //todo同类BUFF重复加的问题
        //格式【当前回合，持续回合, BUFF附加状态】
        let state:number = Role.FS_NORMAL
        if(buff.type == BuffVo.TYPE_DIZZY){
            state = Role.FS_DIZZY;
            role.fightState = state;
        }else if(buff.type == BuffVo.TYPE_CHAOS){
            state = Role.FS_CHAOS
            role.fightState = state;
        }
        this._buffInfo[role.uid][buff.id] = [0, buff.rnd, state];
        if(vo.fightInfo[role.uid]){
            vo.fightInfo[role.uid]["addBuff"] = buff.id
        }else{
            vo.fightInfo[role.uid] = {addBuff:buff.id};
        }
        */
    }

    /**
     * 检测是否已经结束
     * return 0未结束，1主队胜，2可对剩，3平局
     */
    public static checkEnd():number{
        if(this._home.length==0){
            return 2
        }else if(this._away.length == 0){
            return 1;
        }else if(this._curRnd > 99){
            return 3;
        }
        return 0;
    }

    /***/
    private static sortOnSpeed(roleA:Role,roleB:Role){
        if(roleA.speed > roleB.speed){
            return 1;
        }
        return -1;
    }

    //
    private static getRole(roleId:string):Role{
        for(var i in this._all){
            if(this._all[i].uid == roleId){
                return this._all[i];
            }
        }
        return null;
    }
}