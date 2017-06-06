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
import * as vuetimepicker from './vuetimepicker.vue';
import * as datepicker from './datepicker.vue';
var ScheduleComponent = (function (_super) {
    __extends(ScheduleComponent, _super);
    function ScheduleComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isRepeated = false;
        _this.repeatPeriods = [
            { value: '1', display: 'Daily' },
            { value: '2', display: 'Weekly' },
            { value: '3', display: 'Monthly' }
        ];
        return _this;
    }
    ScheduleComponent.prototype.created = function () {
        if (this.model.length > 0) {
            for (var i = 0; i < this.model.length; i++) {
                console.log('run here, server?');
                var schedule = this.model[i];
                if (typeof (schedule.startTime) === 'string') {
                    schedule.startTime = {
                        HH: schedule.startTime.toString().substring(0, 2),
                        mm: schedule.startTime.toString().substring(3, 5)
                    };
                }
                if (typeof (schedule.duration) === 'string') {
                    schedule.duration = {
                        HH: schedule.duration.toString().substring(0, 2),
                        mm: schedule.duration.toString().substring(3, 5)
                    };
                }
            }
        }
    };
    return ScheduleComponent;
}(Vue));
__decorate([
    Prop,
    __metadata("design:type", Array)
], ScheduleComponent.prototype, "model", void 0);
ScheduleComponent = __decorate([
    Component({
        name: "Schedule",
        components: {
            "vue-timepicker": vuetimepicker,
            "datepicker": datepicker
        }
    })
], ScheduleComponent);
export default ScheduleComponent;
