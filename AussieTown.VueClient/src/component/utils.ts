import { ListingType, NotificationType } from '../model/enum';

export class Utils {
    public static formatDate(date: Date) {
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
    }

    public static getDate(datetime: Date) {
        var date = new Date(datetime);
        return date.getFullYear() + '/' + this.ensureTwoDigit((date.getMonth()) + 1) + '/' + this.ensureTwoDigit(date.getDate());
    }

    public static  getTime(datetime: any) {
        var date = new Date(datetime);
        return this.ensureTwoDigit(date.getHours()) + ':' + this.ensureTwoDigit(date.getMinutes());
    }

    public static getDateTime(datetime: any) {
        var date = new Date(datetime);
        return this.ensureTwoDigit(date.getDate()) + '/' + this.ensureTwoDigit((date.getMonth()) + 1) + '/' + date.getFullYear()
            + ' ' + this.ensureTwoDigit(date.getHours()) + ':' + this.ensureTwoDigit(date.getMinutes());
    }

    public static ensureTwoDigit(value) {
        return ("0" + (value)).slice(-2);
    }

    public static listingTypeConvert(listingType: string) {
        return listingType === 'offer' ? ListingType.Offer : ListingType.Request;
    }

    public static seorizeString(name: string) {
        let sanitizeName = name.toLowerCase().replace(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g, "");
        return sanitizeName.split(' ').join('-');
    }

    private static valueCompare(x, y) {
        return JSON.stringify(x) === JSON.stringify(y);
    }

    public static removeFromArray(array, item) {
        return array.filter(x => !this.valueCompare(x, item));
    }

    public static spliceArray(array, item) {
        var index = array.indexOf(item);
        if (index >= 0) {
            array.splice(index, 1);
        }
    }

    public static stripHtml(text) {
        var regex = /(<([^>]+)>)/ig
            , result = text ? text.replace(regex, "") : '';

        return result;
    }

    public static isElementInViewport(el) {
        var rect = el.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
        );
    }

    public static handleError(store, error: any) {
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

        store.dispatch('LOG_ERROR', { message: `${error.data}`, stack: error.config.data });
    }

    public static getProfileImage(url) {
        return url ? url : '/static/images/anonymous.png';    
    }

    public static getProfileFullName(user) {
        return (user.firstName && user.lastName) ? `${user.firstName} ${user.lastName}` : user.email;
    }
}