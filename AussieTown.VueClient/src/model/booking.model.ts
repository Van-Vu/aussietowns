import User from './user.model';
import ListingModel from './listing.model';
import { plainToClass } from "class-transformer";

export default class BookingModel {
    public participants: User[];
    public listing: ListingModel;
    public bookingDate: any;
    public time: any;

    constructor(listing, participants, bookingDate, time) {
        this.listing = listing;
        this.participants = plainToClass(User, participants);
        this.bookingDate = bookingDate;
        this.time = time;
    }
}