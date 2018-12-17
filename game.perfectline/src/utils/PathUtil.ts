/*
* name;
*/
class PathUtil{
    constructor(){

    }

    /**
     * 将策划端时间配置节点转换成数组；
     * @param str [0:01.655][0:01.995]
    */
    public static convert(str:string):number[]{
        str = str.replace(/\]\[/g,",")
        str = str.replace("[", "");
        str = str.replace("]","");
        var arr:any[] = str.split(",");
        for(let i=0; i<arr.length; i++){
            arr[i] = this.node2Num(arr[i]);
        }
        return arr;
    }

    /**
     * 将时间，角度，速度转换成坐标点
     * @param timeArr 时间线
     * @param speed 每毫秒的速度；
     */
    //临时使用变量
    public static posInfo:{x:number,y:number, sx:number,sy:number,t?:number}[];
    public static convert2Pos(timeArr:number[], speed:number, angle:number, startX:number=0, startY:number=0, randomAngle:boolean=false, speedType:number=0):number[]{
        var curTime:number = 0
        var delTime:number = 0;
        var curX:number = startX;
        var curY:number = startY;
        var posArr:number[] = [curX, curY];
        var dir:number = 1;

        var posInfo:any[] = [];
        var speedx:number = 0;
        var speedy:number = 0;
        for(let i=0; i<timeArr.length; i++){

            //临时随机
            if(randomAngle){
                if(i%4==0){
                    angle = Math.PI/4;
                }else if(i%4==3){
                    angle = Math.PI/3;
                }else if(i%4 == 2){
                    angle = Math.PI/3;
                }else if(i%4 == 1){
                    angle = Math.PI/4;
                }
            }
            

            delTime = timeArr[i] - curTime;
            if(i == 0){
                speedx = 0;
                speedy = speed;
            }else{
                //方案1，无视角度，保持Y速度不变
                if(speedType == 0){
                    speedx = speed / Math.tan(angle)*dir;
                    speedy = speed;
                }else if(speedType == 1){
                    //方案2，角度对XY速度均有影响
                    speedx = speed*Math.cos(angle)*dir
                    speedy = speed*Math.sin(angle);   
                }
            }
            if(i==0){
                posInfo.push({x:curX,y:curY, sx:speedx, sy:speedy, t:0});
            }else{
                posInfo.push({x:curX,y:curY, sx:speedx, sy:speedy, t:timeArr[i-1]});
            }
            

            curX += speedx*delTime;
            curY -= speedy*delTime;
            posArr.push(curX, curY);

            curTime = timeArr[i];
            dir *= -1;
        }
        this.posInfo = posInfo;
        return posArr;
    }

    /**将节点数据转换成数值型 */
    private static node2Num(str:string):number{
        var tmp:string[] = str.split(":");
        //minute
        var time:number = parseInt(tmp[0])*60000;
        time += parseFloat(tmp[1])*1000
        return time;
    }
}