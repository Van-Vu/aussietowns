import { AutocompleteItem } from './autocomplete.model';
import ListingModel from './listing.model';
import { UserRole } from './enum';

export default class UserModel {
    public id: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public locationId: number;
    public locationDetail: AutocompleteItem;
    public phone: string;
    public gender: number;
    public birthday: Date;
    public description: string;
    public address: string;
    public emergencyContact: string;
    public images: string;
    public video: string;
    public role: UserRole;
    public operatorListings: ListingModel[];
    public guestListings: ListingModel[];

    constructor() {
        //this.firstName = '';
        //this.lastName = '';
        //this.email = '';
        //this.phone = '';
        //this.emergencyContact = '';
        //this.address = '';
    }
}