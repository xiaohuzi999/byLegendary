/*
* name;
*/
class ShopView extends xframe.XMWindow{
    public ui:ui.shop.ShopUI
    constructor(){
        super();
    }

    public show():void{
        super.show();
        this.ui.itemList.array = DBShop.getShopList();
        User.getInstance().gold += 10000;
        User.getInstance().diamond+= 1000;
        User.getInstance().dispatchEvent();
    }

    protected createUI():void{
        this.ui  = new ui.shop.ShopUI();
        this.addChild(this.ui);
        this.ui.itemList.vScrollBarSkin = "";
    }

    private onClick(e:Laya.Event):void{
        switch(e.target){
            case this.ui.btnClose:
                this.close();
            break;
        }
    }

    private onItemClick(e:Laya.Event, index:number):void{
        if(e.type == Laya.Event.CLICK){
            let vo:ShopItemVo = this.ui.itemList.getItem(index)
            if(vo.priceType == 1){
                if(User.getInstance().gold < vo.price){
                    XTip.showTip("金币不足~")
                }else{
                    User.getInstance().gold -= vo.price;
                    User.getInstance().save();
                    //加入道具
                    Bag.getInstance().addItem(vo.itemId, 1);
                }
            }else{
                 if(User.getInstance().diamond < vo.price){
                    XTip.showTip("钻石不足~")
                }else{
                    User.getInstance().diamond -= vo.price;
                    User.getInstance().save();
                    //加入道具
                    Bag.getInstance().addItem(vo.itemId, 1);
                }
            }
        }
    }

    protected initEvent():void{
        this.ui.on(Laya.Event.CLICK, this, this.onClick);
        this.ui.itemList.mouseHandler = Laya.Handler.create(this, this.onItemClick, null, false);
    }

    protected removeEvent():void{
        this.ui.off(Laya.Event.CLICK, this, this.onClick);
        this.ui.itemList.mouseHandler.recover();
        this.ui.itemList.mouseHandler = null;
    }
}