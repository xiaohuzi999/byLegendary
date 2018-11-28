/*
* name;
*/
class LLKView extends xframe.XMWindow{
    public ui:ui.MiniLLK.LLKViewUI;
    private _itemSp:Laya.Sprite;
    private _items:LLKItem[] = [];
    //
    private _selectedItem:LLKItem;
    private _map:any[]=[
        [2,0,2,1,3],
        [1,2,0,2,3],
        [1,1,0,2,2],
        [2,3,2,2,4],
        [3,2,2,2,4],
    ]
    constructor(){
        super();
    }

    public show(...args):void{
        super.show();
        this.ui.tfTitle.text = "连连看"
        this.initMap(this._map);
    }

    private initMap(map:any[]):void{
        this.clear();
        let len:number;
        let item:LLKItem;
        for(let i=0; i<map.length; i++){
            len = map[i].length;
            for(let j=0; j<len; j++){
                if(map[i][j] > 0){
                    item = new LLKItem();
                    item.dataSource = DBLLK.getVo(map[i][j]);
                    this._items.push(item);
                    this._itemSp.addChild(item);
                    item.x = item.width*j;
                    item.y = item.height*i;
                    item.position.x = i;
                    item.position.y = j;
                    item.on(Laya.Event.CLICK, this, this.onItemClick)
                }
            }
        }
        this._itemSp.width = map.length*item.width;
        this._itemSp.height = len * item.height;
        this._itemSp.x = (this.ui.width - this._itemSp.width)/2;
        this._itemSp.y = (this.ui.height - this._itemSp.height)/2;
    }

    private onClick(e:Laya.Event):void{
        switch(e.target){
            case this.ui.btnClose: 
                this.close();
            break;
        }
    }

    private onItemClick(e:Laya.Event):void{
        let item:any = e.currentTarget;
        if(this.selectedItem){
            if(this.selectedItem.dataSource.id == item.dataSource.id){
                if(LLKLogic.checkLink(this.selectedItem.position, item.position, this._map)){
                    this.delItem(this.selectedItem);
                    this.delItem(item);
                }
                this.selectedItem = null;
            }else{
                this.selectedItem = item;
            }
        }else{
            this.selectedItem = item;
        }
    }

    private delItem(item:LLKItem):void{
        for(let i=this._items.length-1; i>-1; i--){
            if(this._items[i] == item){
                this._items[i].off(Laya.Event.CLICK, this, this.onItemClick);
                //do sth;
                this._items[i].removeSelf();
                this._items.splice(i, 1);
                this._map[item.position.x][item.position.y] = 0;
                break;
            }
        }
        if(this._items.length == 0){
            trace("done===========================");
        }
    }

    private clear():void{
        for(let i=this._items.length-1; i>-1; i--){
            this._items[i].off(Laya.Event.CLICK, this, this.onItemClick);
            this._items[i].removeSelf();
        }
        this._items.length = 0;
    }

    private set selectedItem(item:LLKItem){
        if(this._selectedItem != item){
            if(this._selectedItem){
                this._selectedItem.selected = false;
            }
            this._selectedItem = item;
            if(this._selectedItem){
                this._selectedItem.selected = true;
            }
        }
    }

    private get selectedItem():LLKItem{
        return this._selectedItem;
    }

    protected createUI():void{
        this.ui = new ui.MiniLLK.LLKViewUI();
        this.addChild(this.ui);
        this.closeOnBlank = true;

        this._itemSp = new Laya.Sprite();
        this.ui.addChild(this._itemSp);
    }

    protected initEvent():void{
        super.initEvent();
        this.ui.on(Laya.Event.CLICK, this, this.onClick);
    }

    protected removeEvent():void{
        super.removeEvent();
        this.ui.off(Laya.Event.CLICK, this, this.onClick);
    }
}