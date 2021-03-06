﻿import { AutocompleteItem } from './autocomplete.model';
import ListingModel from './listing.model';
import ImageModel from './image.model';
import { UserRole, UserSource } from './enum';
import { Utils } from '../component/utils';

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
    public birthday: string;
    public description: string;
    public address: string;
    public emergencyContact: string;
    public images: ImageModel[];
    public video: string;
    public heroImageUrl: string;
    public role: UserRole;
    public token: string;
    public hobbies: Array<string>;
    public operatorListings: ListingModel[];
    public guestListings: ListingModel[];
    public isActive: boolean;
    public isConfirm: boolean;
    public videoUrl: string;
    public userSource: UserSource;
    public externalId: string;

    get birthdayText(): string {
        return Utils.formatDate(new Date(this.birthday));
    }

    set birthdayText(value: string) {
        this.birthday = value;
    }

    get descriptionText(): string {
        return this.description ? Utils.stripHtml(this.description).replace(/\n/g, '<br/>') : '';
    }

    set descriptionText(value: string) {
        this.description = value;
    }

    // Booking page needs to create empty object
    constructor() {
        this.id = 0;
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.phone = '';
        this.emergencyContact = '';
        this.address = '';
    }
}