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
    return Utils;
}());
export { Utils };
export var ListingType;
(function (ListingType) {
    ListingType[ListingType["Offer"] = 0] = "Offer";
    ListingType[ListingType["Request"] = 1] = "Request";
})(ListingType || (ListingType = {}));
