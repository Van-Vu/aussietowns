import User from './user.model';
import { plainToClass } from "class-transformer";
var BookingModel = (function () {
    function BookingModel(listing, participants) {
        this.listing = listing;
        this.participants = plainToClass(User, participants);
    }
    return BookingModel;
}());
export default BookingModel;
