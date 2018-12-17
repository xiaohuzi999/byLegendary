/*
* name 角色数据配置
*/
class DBGame{
    /**常量-最大复活次数 */
    public static ReviveTimes:number = 1;

    public static roleInfo:any = {
        1:{skin:"game_xhj", shadow:"yy_xhj", rotate:true},
        2:{skin:"ppx"},
        3:{skin:"hbd"},
        4:{skin:"game_mmq", shadow:"yy_mmq", rotate:true},
        5:{skin:"xq"},
        6:{skin:"game_qklq", shadow:"yy_qklq",rotate:true},
        7:{skin:"ppc"},
        8:{skin:"mmj"},
        9:{skin:"xfq"},
        10:{skin:"game_8b", shadow:"yy_8b", rotate:true}
    }

    /**获取关卡信息 */
    public static getStageInfo(id:any):any{
        let source = Laya.loader.getRes("res/cfg/stage.json");
        for(let i in source){
            if(source[i].id == id){
                return source[i];
            }
        }
    }

    /**计算进度*/
    public static calcPro(nowTime:number, arr:number[]):{pro:number, stars:number}{
        var pro:number;
        var stars:number = 0;
        if(nowTime < arr[0]){
            pro  = nowTime*0.333/arr[0];
        }else if(nowTime < arr[1]){
            pro = 0.333
            pro += (nowTime-arr[0])*0.333/(arr[1]-arr[0]);
            stars = 1;
        }else if(nowTime < arr[2]){
            pro = 0.666;
            pro += (nowTime-arr[1])*0.333/(arr[2]-arr[1])
            stars = 2;
        }else{
            pro = 1;
            stars = 3;
        }
        return {pro:pro, stars:stars};
    }

    /**暂停-复活倒计时 */
    public static countdown(time:number, callback:Laya.Handler, updateHander?:Laya.Handler):void {
        var countView = new ui.views.CountDownViewUI();
        countView.countLabel.text = time + "";
        Laya.stage.addChild(countView);
        Laya.timer.loop(1000, null, update);

        function update():void{
            time --;
            countView.countLabel.text = time + "";
            !updateHander ||  updateHander.run();
            if(time <=0){
                Laya.timer.clear(null, update);
                callback.run();
                countView.removeSelf();
            }
        }
    }
}