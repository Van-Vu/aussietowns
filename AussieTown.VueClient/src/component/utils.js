import { ListingType, NotificationType } from '../model/enum';
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.formatDate = function (date) {
        var monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];
        var day = this.ensureTwoDigit(date.getDate());
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        return day + ' ' + monthNames[monthIndex] + ' ' + year;
    };
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
        return array.filter(function (x) { return !_this.valueCompare(x, item); });
    };
    Utils.spliceArray = function (array, item) {
        var index = array.indexOf(item);
        if (index >= 0) {
            array.splice(index, 1);
        }
    };
    Utils.stripHtml = function (text) {
        var regex = /(<([^>]+)>)/ig, result = text ? text.replace(regex, "") : '';
        return result;
    };
    Utils.isElementInViewport = function (el) {
        var rect = el.getBoundingClientRect();
        return (rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */);
    };
    Utils.handleError = function (store, error) {
        store.dispatch("DISABLE_LOADING");
        switch (error.status) {
            case 400:
                store.dispatch('ADD_NOTIFICATION', { title: "Error occurs but no worries, we're on it!", type: NotificationType.Error });
                break;
            case 403:
                store.dispatch('SHOW_LOGIN_MODAL');
                store.dispatch('ADD_NOTIFICATION', { title: "Login required", text: "Please login or register to proceed", type: NotificationType.Warning });
                break;
            case 500:
                store.dispatch('ADD_NOTIFICATION', { title: "Error occurs but no worries, we're on it!", type: NotificationType.Error });
                break;
        }
        store.dispatch('LOG_ERROR', { message: "" + error.data, stack: error.config.data });
    };
    Utils.getProfileImage = function (url) {
        return url ? url : '/static/images/anonymous.png';
    };
    Utils.getProfileFullName = function (user) {
        return (user.firstName && user.lastName) ? user.firstName + " " + user.lastName : user.email;
    };
    return Utils;
}());
export { Utils };
