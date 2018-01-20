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
import BookingService from '../service/booking.service';
import AvailabilityComponent from '../component/booking/availability.component.vue';
import { BookingStatus } from '../model/enum';
import RingLoader from '../component/shared/external/ringloader.vue';
import store from '../store';
import vMediaQuery from '../component/shared/external/v-media-query';
Vue.use(vMediaQuery);
var BookingManagePage = /** @class */ (function (_super) {
    __extends(BookingManagePage, _super);
    function BookingManagePage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isDateChoosen = false;
        _this.isLoading = false;
        _this.errorMsg = '';
        _this.checkBooking = new Array();
        return _this;
    }
    BookingManagePage.asyncData = function (_a) {
        var store = _a.store, route = _a.route;
        if (route.params.listingId) {
            return store.dispatch('FETCH_LISTING_WITH_BOOKING_DETAIL', route.params.listingId);
        }
        //route.push("home");
    };
    Object.defineProperty(BookingManagePage.prototype, "model", {
        get: function () {
            return this.$store.state.listing;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BookingManagePage.prototype, "availableBookings", {
        get: function () {
            return this.$store.state.listing.bookingSlots;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BookingManagePage.prototype, "bookingGroups", {
        get: function () {
            return this.$store.state.bookingGroups;
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
    BookingManagePage.prototype.onApproveBooking = function () {
        var _this = this;
        this.$store.dispatch("ENABLE_LOADING");
        (new BookingService()).approveBooking(this.constructBookingApprove())
            .then(function () {
            _this.isDateChoosen = true;
            _this.$store.dispatch("DISABLE_LOADING");
        });
    };
    BookingManagePage.prototype.onWithdraw = function () {
        var _this = this;
        this.$store.dispatch("ENABLE_LOADING");
        (new BookingService()).withdrawBooking(this.model.id, this.model.participants.map(function (element) { return element.name; }).join(","))
            .then(function () {
            _this.isDateChoosen = true;
            _this.$store.dispatch("DISABLE_LOADING");
        });
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
                _this.checkBooking = _this.getApprovedBookings();
            });
        }
    };
    BookingManagePage.prototype.constructBookingRequest = function () {
        return {
            listingId: this.model.id,
            bookingDate: this.model.bookingDate,
            time: this.model.bookingTime
        };
    };
    BookingManagePage.prototype.constructBookingApprove = function () {
        return {
            listingId: this.model.id,
            bookingIds: this.checkBooking
        };
    };
    BookingManagePage.prototype.getApprovedBookings = function () {
        var bookingGroups = this.$store.state.bookingGroups;
        if (bookingGroups) {
            var confirmedBookingGroups = bookingGroups.filter(function (x) { return x.status === BookingStatus.Confirm; });
            return confirmedBookingGroups.map(function (x) { return x.id; });
        }
        return new Array();
    };
    BookingManagePage = __decorate([
        Component({
            name: 'BookingManagePage',
            components: {
                'availability': AvailabilityComponent,
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
