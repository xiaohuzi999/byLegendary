/*
* name;
*/
class LLKLogic{
    private static mapData:any[];
    private static row:number;
    private static col:number;
    constructor(){

    }

    //
    public static checkLink(a:Laya.Point,b:Laya.Point, map:any[]):boolean {
        this.mapData = map;
        this.row = map[0].length;
        this.col = map.length;
        if (a.x == b.x && this.horizon(a, b)){
            return true; 
        } 
        if (a.y == b.y && this.vertical(a, b)){
            return true;
        } 
        if (this.oneCorner(a, b)){
            return true; 
        }else{
            return this.twoCorner(a, b);
        }
    }

    //
    private static horizon(a:Laya.Point,b:Laya.Point):boolean 
    {
        if (a.x == b.x && a.y == b.y) return false; //如果点击的是同一个图案，直接返回false;
        var x_start:number = a.y < b.y?a.y:b.y;         //获取a,b中较小的y值
        var x_end:number = a.y < b.y?b.y:a.y;           //获取a,b中较大的值
        //遍历a,b之间是否通路，如果一个不是就返回false;
        for (let i = x_start + 1; i < x_end;i ++ ) {
            if (this.mapData[a.x][i] != 0) {
                return false;
            }
        }
        return true;
    }

    //
    private static vertical(a:Laya.Point,b:Laya.Point):boolean{
        if (a.x == b.x && a.y == b.y) return false;
        var y_start:number = a.x < b.x?a.x:b.x;
        var y_end:number = a.x < b.x?b.x:a.x;
        for (let i = y_start + 1; i < y_end; i ++ ) 
        {
            if (this.mapData[i][a.y] != 0){
                return false;
            }
        }
        return true;
    }

    //
    private static oneCorner(a:Laya.Point,b:Laya.Point):boolean 
    {
        var c:Laya.Point = new Laya.Point(b.x, a.y);
        var d:Laya.Point = new Laya.Point(a.x, b.y);
        //判断C点是否有元素                 
        if (this.mapData[c.x][c.y] == 0) 
        {
            var path1:boolean = this.horizon(b, c) && this.vertical(a, c);
            return path1;
        }
        //判断D点是否有元素
        if (this.mapData[d.x][d.y] == 0) 
        {
            var path2:boolean = this.horizon(a, d) && this.vertical(b, d);
            return path2;
        }else 
        {
            return false;
        }
                            
    }

    //
    private static twoCorner(a:Laya.Point,b:Laya.Point):boolean {
         var ll:Line[] = this.scan(a, b);
         if (ll.length == 0) 
         {
                 return false;
         }
         for (let i = 0; i < ll.length; i ++ ) 
         {
            var tmpLine:Line = ll[i];
            if (tmpLine.direct == 1) 
            {
                if (this.vertical(a,tmpLine.a) && this.vertical(b,tmpLine.b)) 
                {
                    return true;
                }
            }else if (tmpLine.direct == 0) 
            {
                if (this.horizon(a, tmpLine.a) && this.horizon(b, tmpLine.b)) 
                {
                    return true;
                }
            }
         }
         return false;
    }


    private static scan(a:Laya.Point,b:Laya.Point):Line[] {
         var linkList:Line[] = [];
         //检测a点,b点的左侧是否能够垂直直连
         for (var i = a.y; i >= 0; i -- ) 
         {
            if (this.mapData[a.x][i] == 0 && this.mapData[b.x][i] == 0 && this.vertical(new Laya.Point(a.x,i),new Laya.Point(b.x,i))) 
            {
                linkList.push(new Line(new Laya.Point(a.x,i),new Laya.Point(b.x,i),0));
            }
         }
         //检测a点,b点的右侧是否能够垂直直连
         for (i = a.y; i < this.col;i ++ ) 
         {
            if (this.mapData[a.x][i] == 0 && this.mapData[b.x][i] == 0 && this.vertical(new Laya.Point(a.x,i),new Laya.Point(b.x,i))) 
            {
                linkList.push(new Line(new Laya.Point(a.x,i),new Laya.Point(b.x,i),0));
            }
         }
         //检测a点,b点的上侧是否能够水平直连
         for (var j = a.x; j >= 0; j -- ) 
         {
            if (this.mapData[j][a.y] == 0 && this.mapData[j][b.y] == 0 && this.horizon(new Laya.Point(j,a.y),new Laya.Point(j,b.y))) 
            {
                linkList.push(new Line(new Laya.Point(j, a.y), new Laya.Point(j, b.y), 1));
            }
         }
         //检测a点,b点的下侧是否能够水平直连
         for (j = a.x; j < this.row; j ++ ) 
         {
            if (this.mapData[j][a.y] == 0 && this.mapData[j][b.y] == 0 && this.horizon(new Laya.Point(j,a.y),new Laya.Point(j,b.y))) 
            {
                linkList.push(new Line(new Laya.Point(j, a.y), new Laya.Point(j, b.y), 1));
                        
            }
         }
         return linkList;
    }
}

//
class Line{
    public a:Laya.Point;
    public b:Laya.Point;
    public direct:number; //连线方向1:水平直连 0:垂直直连
    constructor(a:Laya.Point,b:Laya.Point,direct:number){
        this.a = a;
        this.b = b;
        this.direct = direct;
    }
}