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
}

export enum ListingType { Offer, Request }