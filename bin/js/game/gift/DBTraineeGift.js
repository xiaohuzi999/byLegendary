/*
* name;
*/
var DBTraineeGift = /** @class */ (function () {
    function DBTraineeGift() {
    }
    /** */
    DBTraineeGift.getTraineeGiftVo = function (id) {
        return this.dic[id];
    };
    //id	reward	name	day
    DBTraineeGift.dic = {
        0: { id: 0, name: "1*5", reward: [[1, 5]], day: "第1天" },
        1: { id: 1, name: "2*5", reward: [[2, 5]], day: "第2天" },
        2: { id: 2, name: "1*5*3*1", reward: [[1, 5], [3, 1]], day: "第3天" }
    };
    return DBTraineeGift;
}());
//# sourceMappingURL=DBTraineeGift.js.map