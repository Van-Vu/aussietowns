﻿import { ListingType } from '../model/enum';

export class Utils {
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
        return array.filter(target => !this.valueCompare(item, target));
    }
}