/*
* name;
*/
var Bag = /** @class */ (function () {
    function Bag() {
        /**编号 */
        this.index = 1;
        /**道具列表 */
        this.items = [];
    }
    /**初始化 */
    Bag.prototype.init = function () {
        var val = XDB.getData(XDB.BAG);
        if (val) {
            if (typeof val === "string") {
                val = JSON.parse(val);
            }
            this.update(val);
        }
        else {
            //针对4399
            if (AppConfig.platfrom == AppConfig.Plat4399) {
                this.addItem(ItemVo.GOLD, 8888);
                this.addItem(ItemVo.DIAMOND, 888);
                this.addItem(ItemVo.KEY, 15);
                this.addItem(ItemVo.POWER, 10);
            }
        }
    };
    /**生成一个道具 */
    Bag.prototype.createItem = function (itemId, itemNum) {
        if (itemNum === void 0) { itemNum = 1; }
        var vo;
        if (DBItem.getItemVo(itemId)) {
            vo = { uid: this.index++, itemId: itemId, num: Math.floor(itemNum) };
        }
        else {
            XTip.showTip("道具Id" + itemId + "不存在");
        }
        return vo;
    };
    /**加入道具 */
    Bag.prototype.addItem = function (itemId, itemNum) {
        if (itemNum === void 0) { itemNum = 1; }
        var vo = DBItem.getItemVo(itemId);
        if (!vo) {
            XTip.showTip("无效道具ID:" + itemId);
            return;
        }
        //如果是货币
        if (itemId == ItemVo.GOLD) {
            User.instace.gold += Math.floor(itemNum);
            User.instace.dispatchEvent();
            User.instace.save();
            return;
        }
        else if (itemId == ItemVo.DIAMOND) {
            User.instace.diamond += Math.floor(itemNum);
            User.instace.dispatchEvent();
            User.instace.save();
            return;
        }
        else if (itemId == ItemVo.POWER) {
            User.instace.power += Math.floor(itemNum);
            User.instace.dispatchEvent();
            User.instace.save();
            return;
        }
        if (vo.max == 1) { //不叠加
            this.items.push(this.createItem(itemId, itemNum));
        }
        else {
            var hasIt = false;
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].itemId == itemId) {
                    this.items[i].num += Math.floor(itemNum);
                    hasIt = true;
                    break;
                }
            }
            if (!hasIt) {
                this.items.push(this.createItem(itemId, itemNum));
            }
        }
        this.dispatchEvent();
        this.save();
    };
    /**根据道具ID返回 */
    Bag.prototype.getItemById = function (itemId) {
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].itemId == itemId) {
                return this.items[i];
            }
        }
        return null;
    };
    /**根据唯一ID返回 */
    Bag.prototype.getItemByUid = function (uid) {
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].uid == uid) {
                return this.items[i];
            }
        }
        return null;
    };
    /**获取道具数量 */
    Bag.prototype.getItemNum = function (itemId) {
        if (itemId == ItemVo.GOLD) {
            return User.instace.gold;
        }
        else if (itemId == ItemVo.DIAMOND) {
            return User.instace.diamond;
        }
        var num = 0;
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].itemId == itemId) {
                num += Math.floor(this.items[i].num);
            }
        }
        return num;
    };
    /**随机扣除道具 */
    Bag.prototype.delItem = function (itemId, itemNum) {
        if (itemId == ItemVo.GOLD) {
            User.instace.gold -= itemNum;
            return;
        }
        else if (itemId == ItemVo.DIAMOND) {
            User.instace.diamond -= itemNum;
            return;
        }
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].itemId == itemId) {
                this.items[i].num -= Math.floor(itemNum);
                if (this.items[i].num < 1) {
                    this.items.splice(i, 1);
                }
                break;
            }
        }
        this.dispatchEvent();
        this.save();
    };
    /**扣除指定道具 */
    Bag.prototype.delItemByUid = function (uid, itemNum) {
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].uid == uid) {
                this.items[i].num -= Math.floor(itemNum);
                if (this.items[i].num < 1) {
                    this.items.splice(i, 1);
                }
                break;
            }
        }
        this.dispatchEvent();
        this.save();
    };
    //更新
    Bag.prototype.update = function (value) {
        for (var i in value) {
            this[i] = value[i];
        }
    };
    /**保存 */
    Bag.prototype.save = function () {
        XDB.save(XDB.BAG, this);
    };
    //变化之后手动调用；
    Bag.prototype.dispatchEvent = function () {
        XEvent.instance.event(User.UPDATE);
    };
    /** */
    Bag.getInstance = function () {
        if (!this._instance) {
            this._instance = new Bag();
        }
        return this._instance;
    };
    /**事件-道具变化 */
    Bag.CHANGE = "change";
    return Bag;
}());
