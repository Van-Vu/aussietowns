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
import { Component, Prop, Watch } from "vue-property-decorator";
import { Utils } from '../utils';
import ScheduleModel from '../../model/schedule.model';
import { RepeatedType } from '../../model/enum';
import datepicker from '../shared/external/datepicker.vue';
var AvailabilityComponent = /** @class */ (function (_super) {
    __extends(AvailabilityComponent, _super);
    function AvailabilityComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bookingTime = '';
        //disableDays = {
        //    to: new Date()
        //    //days: [6, 0] // Disable Saturday's and Sunday's
        //};
        _this.days = ["0", "1", "2", "3", "4", "5", "6"];
        _this.availableTimeslot = null;
        return _this;
    }
    Object.defineProperty(AvailabilityComponent.prototype, "availableDays", {
        get: function () {
            if (this.availableBookings) {
                return this.availableBookings.map(function (x) { return new Date(x.bookingDate); });
            }
            return '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AvailabilityComponent.prototype, "disableDays", {
        get: function () {
            var _this = this;
            if (this.model) {
                switch (this.model.repeatedType) {
                    case RepeatedType.Daily:
                        return {
                            to: new Date()
                        };
                    case RepeatedType.Weekly:
                        var disableDays = this.days.filter(function (x) { return _this.model.repeatedDay.indexOf(x) == -1; }).map(function (x) { return +x; });
                        return {
                            to: new Date(),
                            days: disableDays
                        };
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AvailabilityComponent.prototype, "startDateFormated", {
        get: function () {
            return Utils.formatDate(new Date(this.model.startDate));
        },
        enumerable: true,
        configurable: true
    });
    AvailabilityComponent.prototype.created = function () {
    };
    AvailabilityComponent.prototype.onBookingTimeChanged = function (value, oldValue) {
        this.$emit('bookingTimeChanged', value);
    };
    AvailabilityComponent.prototype.onBookingDateChanged = function (value) {
        if (value == "")
            return;
        var timeslots = new Array();
        if (this.model) {
            timeslots.push(this.model.startTime);
        }
        else {
            var dateString_1 = (new Date(value)).toDateString();
            var booking = this.availableBookings.find(function (x) { return (new Date(x.bookingDate)).toDateString() === dateString_1; });
            timeslots.push(booking.startTime);
        }
        this.availableTimeslot = timeslots;
        this.bookingTime = '';
        this.$emit('bookingDateChanged', value);
    };
    __decorate([
        Prop(),
        __metadata("design:type", ScheduleModel)
    ], AvailabilityComponent.prototype, "model", void 0);
    __decorate([
        Prop(),
        __metadata("design:type", Array)
    ], AvailabilityComponent.prototype, "availableBookings", void 0);
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
                "datepicker": datepicker
            }
        })
    ], AvailabilityComponent);
    return AvailabilityComponent;
}(Vue));
export default AvailabilityComponent;
