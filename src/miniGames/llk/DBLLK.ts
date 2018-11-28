/*
* name;
*/
class DBLLK{
    private static _data:any = {
        1:{id:1, skin:"400103"},
        2:{id:1, skin:"400203"},
        3:{id:1, skin:"400303"},
        4:{id:1, skin:"400403"}
    }

    /**获取 */
    public static getVo(id:any):LLKItemVo{
        return this._data[id];
    }
}