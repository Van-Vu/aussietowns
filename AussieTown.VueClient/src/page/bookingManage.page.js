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
import UserSearchComponent from '../component/shared/search/usersearch.component.vue';
import RingLoader from '../component/shared/external/ringloader.vue';
import store from '../store';
import vMediaQuery from '../component/shared/external/v-media-query';
Vue.use(vMediaQuery);
var BookingManagePage = /** @class */ (function (_super) {
    __extends(BookingManagePage, _super);
    function BookingManagePage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isStickyBoxRequired = false;
        _this.isDateChoosen = false;
        _this.isLoading = false;
        _this.errorMsg = '';
        return _this;
    }
    BookingManagePage.asyncData = function (_a) {
        var store = _a.store, route = _a.route;
        console.log("Bodom fetchData: " + route.params.listingId);
        if (route.params.listingId) {
            return store.dispatch('FETCH_LISTING_WITH_BOOKING_DETAIL', route.params.listingId);
        }
        //route.push("home");
    };
    Object.defineProperty(BookingManagePage.prototype, "model", {
        get: function () {
            return this.$store.state.booking;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BookingManagePage.prototype, "availableDays", {
        get: function () {
            return this.$store.state.booking.slots.map(function (x) { return new Date(x.bookingDate); });
        },
        enumerable: true,
        configurable: true
    });
    BookingManagePage.prototype.created = function () {
    };
    BookingManagePage.prototype.mounted = function () {
        //var screenSize = detectScreenSize(this.$mq);
        //switch (screenSize) {
        //    case ScreenSize.Desktop:
        //        this.isStickyBoxRequired = true;
        //        break;
        //    case ScreenSize.Tablet:
        //        this.isStickyBoxRequired = false;
        //        break;
        //    case ScreenSize.Mobile:
        //        this.isStickyBoxRequired = false;
        //        break;
        //}
    };
    BookingManagePage.prototype.onModify = function () {
        var _this = this;
        (new BookingService()).modifyBooking(this.model.id, this.constructBookingRequest())
            .then(function () {
            _this.isDateChoosen = true;
        });
    };
    BookingManagePage.prototype.onWithdraw = function () {
        var _this = this;
        (new BookingService()).withdrawBooking(this.model.id, this.model.participants.map(function (element) { return element.name; }).join(","))
            .then(function () {
            _this.isDateChoosen = true;
        });
    };
    BookingManagePage.prototype.generateParticipants = function (store) {
        var users = [plainToClass(UserModel, classToPlain(store.state.loggedInUser))];
        if (store.state.booking != null && store.state.booking.participants > 0) {
            for (var i = 0; i < store.state.booking.participants - 1; i++) {
                users.push(new UserModel());
            }
        }
        return users;
    };
    BookingManagePage.prototype.onBookingDateChanged = function (value) {
        this.model.bookingDate = value;
    };
    BookingManagePage.prototype.onBookingTimeChanged = function (value) {
        var _this = this;
        this.model.bookingTime = value;
        if (value != '') {
            this.isLoading = true;
            store.dispatch('FETCH_ALL_BOOKING_BY_DATE', this.constructBookingRequest())
                .then(function () {
                _this.isDateChoosen = true;
                _this.isLoading = false;
            });
        }
    };
    BookingManagePage.prototype.constructBookingRequest = function () {
        return {
            listingId: this.model.listing.id,
            bookingDate: this.model.bookingDate,
            time: this.model.bookingTime
        };
    };
    __decorate([
        Prop(),
        __metadata("design:type", String)
    ], BookingManagePage.prototype, "listingId", void 0);
    __decorate([
        Prop(),
        __metadata("design:type", String)
    ], BookingManagePage.prototype, "seoString", void 0);
    BookingManagePage = __decorate([
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
    ], BookingManagePage);
    return BookingManagePage;
}(Vue));
export default BookingManagePage;
