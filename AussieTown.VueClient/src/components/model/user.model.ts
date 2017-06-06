import { AutocompleteItem } from './autocomplete.model';
import ListingModel from './listing.model';

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
    public operatorListings: ListingModel[];
    public guestListings: ListingModel[];

    //constructor(id, fullname, email, profileurl, photourl, description) {
    //    this.id = id;
    //    this.fullname = fullname;
    //    this.email = email;
    //    this.profileUrl = profileurl;
    //    this.photoUrl = photourl;
    //    this.shortDescription = description;
    //}
}