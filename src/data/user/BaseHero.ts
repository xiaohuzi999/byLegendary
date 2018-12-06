/*
* name;
*/
class BaseHero extends BaseRole{
    public  quality:number;
    public  desc:string	
    public  skill:any;
    
    /**攻击成长*/
    public strengthGrow:number = 1;
    /**体质成长*/
    public physiqueGrow:number = 0;
    /**敏捷成长*/
    public agilityGrow:number = 0;
    constructor(){
        super();
    }
}