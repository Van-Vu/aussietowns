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
import { Component, Watch } from "vue-property-decorator";
import datepicker from '../shared/external/datepicker.vue';
import numberchooser from '../shared/numberchooser.component.vue';
var AvailabilityComponent = /** @class */ (function (_super) {
    __extends(AvailabilityComponent, _super);
    function AvailabilityComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bookingDate = '';
        _this.bookingTime = '';
        _this.disableDays = {
            to: new Date(),
            days: [6, 0] // Disable Saturday's and Sunday's
        };
        _this.availableTimeslot = null;
        return _this;
    }
    AvailabilityComponent.prototype.created = function () {
    };
    AvailabilityComponent.prototype.onBookingTimeChanged = function (value, oldValue) {
        this.$emit('bookingTimeChanged', value);
    };
    AvailabilityComponent.prototype.onBookingDateChanged = function (value) {
        var currentListing = this.$store.state.booking.listing;
        var timeslots = new Array();
        timeslots.push(currentListing.schedules[0].startTime);
        this.availableTimeslot = timeslots;
        this.$emit('bookingDateChanged', value);
    };
    __decorate([
        Watch('bookingTime'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", void 0)
    ], AvailabilityComponent.prototype, "onBookingTimeChanged", null);
    AvailabilityComponent = __decorate([
        Component({
            name: "AvailabilityComponent",
            components: {
                "datepicker": datepicker,
                "numberchooser": numberchooser
            }
        })
    ], AvailabilityComponent);
    return AvailabilityComponent;
}(Vue));
export default AvailabilityComponent;
