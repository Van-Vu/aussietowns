"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.getDate = function (datetime) {
        var date = new Date(datetime);
        return this.ensureTwoDigit(date.getDate()) + '/' + this.ensureTwoDigit((date.getMonth()) + 1) + '/' + date.getFullYear();
    };
    Utils.getTime = function (datetime) {
        var date = new Date(datetime);
        return this.ensureTwoDigit(date.getHours()) + ':' + this.ensureTwoDigit(date.getMinutes());
    };
    Utils.getDateTime = function (datetime) {
        var date = new Date(datetime);
        return this.ensureTwoDigit(date.getDate()) + '/' + this.ensureTwoDigit((date.getMonth()) + 1) + '/' + date.getFullYear()
            + ' ' + this.ensureTwoDigit(date.getHours()) + ':' + this.ensureTwoDigit(date.getMinutes());
    };
    Utils.ensureTwoDigit = function (value) {
        return ("0" + (value)).slice(-2);
    };
    return Utils;
}());
exports.Utils = Utils;
var ListingType;
(function (ListingType) {
    ListingType[ListingType["Offer"] = 0] = "Offer";
    ListingType[ListingType["Request"] = 1] = "Request";
})(ListingType = exports.ListingType || (exports.ListingType = {}));
//# sourceMappingURL=utils.js.map