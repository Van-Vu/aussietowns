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
//import Datepicker from 'vuejs-datepicker';
//import VueTimepicker from 'vue2-timepicker';
var ScheduleComponent = (function (_super) {
    __extends(ScheduleComponent, _super);
    function ScheduleComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.startDate = new Date(2016, 9, 16);
        _this.startTime = { HH: '08', mm: '00' };
        _this.duration = { HH: '08', mm: '00' };
        _this.endDate = new Date(2017, 4, 28);
        _this.isRepeated = false;
        _this.repeatPeriods = [
            { value: '1', display: 'Daily' },
            { value: '2', display: 'Weekly' },
            { value: '3', display: 'Monthly' }
        ];
        _this.selectedPeriod = 0;
        return _this;
    }
    return ScheduleComponent;
}(Vue));
ScheduleComponent = __decorate([
    Component
], ScheduleComponent);
export default ScheduleComponent;
