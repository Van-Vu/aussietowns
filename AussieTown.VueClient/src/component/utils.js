import { ListingType } from '../model/enum';
var Utils = (function () {
    function Utils() {
    }
    Utils.getDate = function (datetime) {
        var date = new Date(datetime);
        return date.getFullYear() + '/' + this.ensureTwoDigit((date.getMonth()) + 1) + '/' + this.ensureTwoDigit(date.getDate());
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
    Utils.listingTypeConvert = function (listingType) {
        return listingType === 'offer' ? ListingType.Offer : ListingType.Request;
    };
    Utils.seorizeString = function (name) {
        var sanitizeName = name.toLowerCase().replace(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g, "");
        return sanitizeName.split(' ').join('-');
    };
    Utils.valueCompare = function (x, y) {
        return JSON.stringify(x) === JSON.stringify(y);
    };
    Utils.removeFromArray = function (array, item) {
        var _this = this;
        return array.filter(function (target) { return !_this.valueCompare(item, target); });
    };
    Utils.isElementInViewport = function (el) {
        var rect = el.getBoundingClientRect();
        return (rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */);
    };
    return Utils;
}());
export { Utils };
