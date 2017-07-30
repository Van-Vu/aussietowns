var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
import datepicker from '../shared/external/datepicker.vue';
import numberchooser from '../shared/numberchooser.component.vue';
var AvailabilityComponent = (function (_super) {
    __extends(AvailabilityComponent, _super);
    function AvailabilityComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AvailabilityComponent.prototype.created = function () {
    };
    AvailabilityComponent.prototype.onParticipantChanged = function (value) {
        this.$emit('participantChanged', value);
    };
    AvailabilityComponent.prototype.onBookingDateChanged = function (value) {
        this.$emit('bookingDateChanged', value);
    };
    return AvailabilityComponent;
}(Vue));
__decorate([
    Prop,
    __metadata("design:type", Object)
], AvailabilityComponent.prototype, "disableDays", void 0);
__decorate([
    Prop,
    __metadata("design:type", String)
], AvailabilityComponent.prototype, "bookingDate", void 0);
__decorate([
    Prop,
    __metadata("design:type", Number)
], AvailabilityComponent.prototype, "participants", void 0);
AvailabilityComponent = __decorate([
    Component({
        name: "AvailabilityComponent",
        components: {
            "datepicker": datepicker,
            "numberchooser": numberchooser
        }
    })
], AvailabilityComponent);
export default AvailabilityComponent;
