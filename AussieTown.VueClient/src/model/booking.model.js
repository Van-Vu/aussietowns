import User from './user.model';
import { plainToClass } from "class-transformer";
var BookingModel = (function () {
    function BookingModel(listing, participants, bookingDate, time) {
        this.listing = listing;
        this.participants = plainToClass(User, participants);
        this.bookingDate = bookingDate;
        this.time = time;
    }
    return BookingModel;
}());
export default BookingModel;
