var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
* name;
*/
var FightView = /** @class */ (function (_super) {
    __extends(FightView, _super);
    function FightView() {
        var _this = _super.call(this) || this;
        _this.ui = new ui.fight.FightUI();
        _this._curRnd = 1;
        return _this;
    }
    //
    FightView.prototype.fight = function (home, away) {
        var fighters = FightModel.init(home, away);
        var tmp = fighters[0];
        for (var i = 0; i < tmp.length; i++) {
            this.ui.home_0.dataSource = tmp[0];
        }
        tmp = fighters[1];
        for (var i = 0; i < tmp.length; i++) {
            this.ui.away_0.dataSource = tmp[0];
        }
        //test
        this._allFighter = [this.ui.home_0, this.ui.away_0];
        this._fightInfo = FightModel.fight();
        this.replay();
    };
    FightView.prototype.replay = function () {
        this.execRnd();
    };
    FightView.prototype.execRnd = function () {
        this.ui.tfRnd.text = "回合" + this._curRnd;
        this._curRndInfo = this._fightInfo[this._curRnd];
        if (this._curRndInfo) {
            this.execAct();
            this._curRnd++;
        }
        else {
            trace("结束~~~~~~~~~~~~~~~");
        }
    };
    FightView.prototype.execAct = function () {
        var vo = this._curRndInfo.shift();
        if (vo) {
            var attacker = this.getFighter(vo.nowId);
            trace("execAct", vo);
            attacker.attack(Laya.Handler.create(this, this.execAct));
            for (var i in vo.fightInfo) {
                var defender = this.getFighter(i);
                defender.beAttacked();
            }
        }
        else {
            Laya.timer.once(500, this, this.execRnd);
            //this.execRnd();
        }
    };
    FightView.prototype.getFighter = function (id) {
        for (var i = 0; i < this._allFighter.length; i++) {
            if (this._allFighter[i].dataSource.uid == id) {
                return this._allFighter[i];
            }
        }
        return null;
    };
    return FightView;
}(xframe.XMWindow));
//# sourceMappingURL=FightView.js.map