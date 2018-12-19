/*
* name;
*/
var BuffVo = /** @class */ (function () {
    function BuffVo() {
    }
    //target 0-本人 ,1-本方全队，2-攻击目标，3-对方全队
    BuffVo.TargetMe = 0;
    BuffVo.TargetHome = 1;
    BuffVo.TargetAttackOne = 2;
    BuffVo.TargetAttackAll = 2;
    //type 类型 1，HP增减, 2,attack增减 3，defend增减 4，speed增减, 5，dodge增减， 6，crit增减 7眩晕类 8，混乱类， 9 吸血
    BuffVo.TypeHp = 1;
    BuffVo.TypeAttack = 2;
    BuffVo.TypeDefend = 3;
    BuffVo.TypeSpeed = 4;
    BuffVo.TypeDodge = 5;
    BuffVo.TypeCrit = 6;
    BuffVo.TypeDizzy = 7;
    BuffVo.TypeChaos = 8;
    BuffVo.TypeGreedy = 9;
    return BuffVo;
}());
//# sourceMappingURL=BuffVo.js.map