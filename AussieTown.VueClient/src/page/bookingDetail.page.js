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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import UserModel from '../model/user.model';
import BookingService from '../service/booking.service';
import { plainToClass, classToPlain } from "class-transformer";
import AvailabilityComponent from '../component/booking/availability.component.vue';
import { ScreenSize } from '../model/enum';
import { detectScreenSize } from '../service/screen.service';
import UserSearchComponent from '../component/shared/search/usersearch.component.vue';
import RingLoader from '../component/shared/external/ringloader.vue';
import vMediaQuery from '../component/shared/external/v-media-query';
Vue.use(vMediaQuery);
import VueMask from 'v-mask';
Vue.use(VueMask);
var BookingDetailPage = /** @class */ (function (_super) {
    __extends(BookingDetailPage, _super);
    function BookingDetailPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isStickyBoxRequired = true;
        _this.isBooked = false;
        _this.isLoading = false;
        _this.errorMsg = '';
        return _this;
    }
    BookingDetailPage.asyncData = function (_a) {
        var store = _a.store, route = _a.route;
        console.log("Bodom fetchData: " + route.params.bookingId);
        if (route.params.bookingId) {
            return store.dispatch('FETCH_BOOKING_DETAIL', route.params.bookingId);
        }
        //route.push("home");
    };
    Object.defineProperty(BookingDetailPage.prototype, "model", {
        get: function () {
            return this.$store.state.booking;
        },
        enumerable: true,
        configurable: true
    });
    BookingDetailPage.prototype.created = function () {
    };
    BookingDetailPage.prototype.mounted = function () {
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
    BookingDetailPage.prototype.onModify = function () {
        var _this = this;
        (new BookingService()).modifyBooking(this.model.id, this.constructBookingRequest())
            .then(function () {
            _this.isBooked = true;
        });
    };
    BookingDetailPage.prototype.onWithdraw = function () {
        var _this = this;
        (new BookingService()).withdrawBooking(this.model.id, this.model.participants.map(function (element) { return element.name; }).join(","))
            .then(function () {
            _this.isBooked = true;
        });
    };
    BookingDetailPage.prototype.constructBookingRequest = function () {
        return {
            listingId: this.model.listing.id,
            bookingDate: this.model.bookingDate,
            time: this.model.bookingTime,
            participants: this.model.participants
        };
    };
    BookingDetailPage.prototype.generateParticipants = function (store) {
        var users = [plainToClass(UserModel, classToPlain(store.state.loggedInUser))];
        if (store.state.booking != null && store.state.booking.participants > 0) {
            for (var i = 0; i < store.state.booking.participants - 1; i++) {
                users.push(new UserModel());
            }
        }
        return users;
    };
    BookingDetailPage.prototype.onBookingDateChanged = function (value) {
        this.model.bookingDate = value;
    };
    BookingDetailPage.prototype.onBookingTimeChanged = function (value) {
        this.model.bookingTime = value;
    };
    BookingDetailPage.prototype.addMoreParticipant = function () {
        //this.$store.dispatch('ADD_BOOKING_PARTICIPANT',new UserModel());
        this.model.participants.push(new UserModel());
        var model = Object.assign({}, this.model);
        // Bodom hack: no way to push data to model.participants that trigger Vue state
        Vue.set(this, 'model', model);
    };
    BookingDetailPage.prototype.removeParticipant = function (index) {
        if (confirm('Are you sure?')) {
            this.$store.dispatch('REMOVE_BOOKING_PARTICIPANT', index);
        }
    };
    BookingDetailPage.prototype.setLoading = function (value) {
        this.isLoading = value;
    };
    BookingDetailPage.prototype.handleErrorMessage = function (errorMsg) {
        this.errorMsg = errorMsg;
    };
    BookingDetailPage.prototype.validateParticipantInfo = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.$validator.validateAll().then(function (result) {
                if (result) {
                    resolve(true);
                }
                reject('Please fill in required information');
            });
        });
    };
    BookingDetailPage.prototype.validateBookingTime = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if ((_this.model.bookingDate) && (_this.model.bookingTime))
                resolve(true);
            reject('Please choose your suitable date and time');
        });
    };
    __decorate([
        Prop(),
        __metadata("design:type", String)
    ], BookingDetailPage.prototype, "bookingId", void 0);
    __decorate([
        Prop(),
        __metadata("design:type", String)
    ], BookingDetailPage.prototype, "seoString", void 0);
    BookingDetailPage = __decorate([
        Component({
            name: 'BookingDetailPage',
            components: {
                'availability': AvailabilityComponent,
                'usersearch': UserSearchComponent,
                'ringloader': RingLoader
            },
            beforeRouteEnter: function (to, from, next) {
                if (typeof Number(to.params.bookingId) == 'number') {
                    next();
                }
                else {
                    next({ name: "home" });
                }
            }
        })
    ], BookingDetailPage);
    return BookingDetailPage;
}(Vue));
export default BookingDetailPage;
