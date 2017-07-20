var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Vue from "vue";
import { Component } from "vue-property-decorator";
import BookingModel from '../model/booking.model';
import ListingModel from '../model/listing.model';
import User from '../model/user.model';
import ListingService from '../service/listing.service';
import { plainToClass, classToPlain } from "class-transformer";
var BookingPage = (function (_super) {
    __extends(BookingPage, _super);
    function BookingPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = null;
        return _this;
    }
    BookingPage.prototype.asyncData = function (_a) {
        var store = _a.store, route = _a.route;
        if (!(store.state.listing instanceof ListingModel) || (store.state.booking == null)) {
            //route.push({ name: "home" });
            //route.next('/home');
        }
    };
    BookingPage.prototype.created = function () {
        this.$store.dispatch('SET_CURRENT_PAGE', 'booking');
        if (this.$store.state.listing instanceof ListingModel) {
            this.model = new BookingModel(this.$store.state.listing, this.generateParticipants(), this.$store.state.booking.date, this.$store.state.booking.time);
        }
        else {
            this.$router.push({ name: "home" });
        }
    };
    BookingPage.prototype.confirmBooking = function () {
        (new ListingService()).bookAListing(this.constructBookingRequest());
    };
    BookingPage.prototype.constructBookingRequest = function () {
        return {
            listingId: this.model.listing.id,
            bookingDate: this.model.bookingDate,
            time: this.model.time,
            participants: this.model.participants
        };
    };
    BookingPage.prototype.generateParticipants = function () {
        var users = [plainToClass(User, classToPlain(this.$store.state.loggedInUser))];
        if (this.$store.state.booking != null && this.$store.state.booking.participants > 0) {
            for (var i = 0; i < this.$store.state.booking.participants - 1; i++) {
                users.push(new User());
            }
        }
        return users;
    };
    BookingPage = __decorate([
        Component({
            name: 'BookingPage'
        })
    ], BookingPage);
    return BookingPage;
}(Vue));
export default BookingPage;
