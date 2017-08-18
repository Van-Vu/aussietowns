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
import UserModel from '../model/user.model';
import ListingService from '../service/listing.service';
import { plainToClass, classToPlain } from "class-transformer";
import AvailabilityComponent from '../component/booking/availability.component.vue';
import { ScreenSize } from '../model/enum';
import { detectScreenSize } from '../service/screen.service';
import UserSearchComponent from '../component/shared/search/usersearch.component.vue';
import RingLoader from '../component/shared/external/ringloader.vue';
import store from '../store';
var BookingPage = (function (_super) {
    __extends(BookingPage, _super);
    function BookingPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //model: BookingModel = null;
        _this.isStickyBoxRequired = true;
        _this.isBooked = false;
        _this.isLoading = false;
        _this.errorMsg = '';
        return _this;
        //validateBeforeSubmit(e) {
        //    e.preventDefault();
        //    this.$validator.validateAll().then(() => {
        //        alert('From Submitted!');
        //    }).catch(() => {
        //        return false;
        //    });
        //}
    }
    BookingPage.prototype.asyncData = function (_a) {
        var store = _a.store, route = _a.route;
        //if (store.state.listing instanceof ListingModel) {
        //    //route.push({ name: "home" });
        //    //route.next('/home');
        //    store.state.booking = new BookingModel(store.state.listing);
        //} else {
        //    route.next({ name : "home" });
        //}
        store.state.booking.participants = plainToClass(UserModel, this.generateParticipants(store));
    };
    Object.defineProperty(BookingPage.prototype, "model", {
        get: function () {
            return this.$store.state.booking;
        },
        enumerable: true,
        configurable: true
    });
    BookingPage.prototype.created = function () {
    };
    BookingPage.prototype.mounted = function () {
        var screenSize = detectScreenSize(this.$mq);
        switch (screenSize) {
            case ScreenSize.Desktop:
                this.isStickyBoxRequired = true;
                break;
            case ScreenSize.Tablet:
                this.isStickyBoxRequired = false;
                break;
            case ScreenSize.Mobile:
                this.isStickyBoxRequired = false;
                break;
        }
    };
    BookingPage.prototype.confirmBooking = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            (new ListingService()).bookAListing(_this.constructBookingRequest())
                .then(function () {
                _this.isBooked = true;
                resolve(true);
            })
                .catch(function () { return reject('Please fill in participant information'); });
            //if ((this.model.bookingDate) && (this.model.bookingTime)) resolve(true);
        });
        //alert('Form Submitted!');
    };
    BookingPage.prototype.constructBookingRequest = function () {
        return {
            listingId: this.model.listing.id,
            bookingDate: this.model.bookingDate,
            time: this.model.time,
            participants: this.model.participants
        };
    };
    BookingPage.prototype.generateParticipants = function (store) {
        var users = [plainToClass(UserModel, classToPlain(store.state.loggedInUser))];
        if (store.state.booking != null && store.state.booking.participants > 0) {
            for (var i = 0; i < store.state.booking.participants - 1; i++) {
                users.push(new UserModel());
            }
        }
        return users;
    };
    BookingPage.prototype.onBookingDateChanged = function (value) {
        this.$store.state.booking.bookingDate = value;
    };
    BookingPage.prototype.onBookingTimeChanged = function (value) {
        this.$store.state.booking.bookingTime = value;
    };
    //onProceed() {
    //    this.$store.dispatch('UPDATE_BOOKING', { participants: this.bookingNumber, date: this.bookingDate, time: '09:00' });
    //    this.$router.push({ name: "booking" });
    //}
    BookingPage.prototype.addMoreParticipant = function () {
        this.$store.state.booking.participants.push(new UserModel());
    };
    BookingPage.prototype.removeParticipant = function (index) {
        if (confirm('Are you sure?')) {
            this.$store.state.booking.participants.splice(index, 1);
        }
    };
    BookingPage.prototype.setLoading = function (value) {
        this.isLoading = value;
    };
    BookingPage.prototype.handleErrorMessage = function (errorMsg) {
        this.errorMsg = errorMsg;
    };
    BookingPage.prototype.validateParticipantInfo = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                _this.$validator.validateAll().then(function (result) {
                    if (result) {
                        resolve(true);
                    }
                    reject('Please fill in required information');
                });
            }, 1000);
            //this.$validator.validateAll().then(() => {
            //    // Data is valid, so we can submit the form.
            //    //document.querySelector('#myForm').submit();
            //    alert('From Submitted!');
            //    resolve(true);
            //}).catch(() => {
            //    reject('This is a custom validation error message. Click next again to get rid of the validation');
            //});
        });
        //return new Promise((resolve, reject) => {
        //    setTimeout(() => {
        //            reject('This is a custom validation error message. Click next again to get rid of the validation')
        //        },
        //        1000);
        //});
        //return new Promise((resolve, reject) => {
        //    setTimeout(() => {
        //        if (this.count < 1) {
        //            this.count++
        //            reject('This is a custom validation error message. Click next again to get rid of the validation')
        //        } else {
        //            this.count = 0
        //            resolve(true)
        //        }
        //    }, 1000)
        //})
    };
    BookingPage.prototype.validateBookingTime = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                if ((_this.model.bookingDate) && (_this.model.bookingTime))
                    resolve(true);
                reject('Please choose your suitable date and time');
            }, 1000);
        });
    };
    BookingPage = __decorate([
        Component({
            name: 'BookingPage',
            components: {
                'availability': AvailabilityComponent,
                "usersearch": UserSearchComponent,
                'ringloader': RingLoader
            },
            beforeRouteEnter: function (to, from, next) {
                if (store.state.listing instanceof ListingModel) {
                    store.state.booking = new BookingModel(store.state.listing);
                    next();
                }
                else {
                    next({ name: "home" });
                }
            }
        })
    ], BookingPage);
    return BookingPage;
}(Vue));
export default BookingPage;
