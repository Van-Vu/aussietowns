"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ScheduleComponent = /** @class */ (function () {
    function ScheduleComponent(fb) {
        this.fb = fb;
        this.repeatPeriods = [
            { value: '1', display: 'Daily' },
            { value: '2', display: 'Weekly' },
            { value: '3', display: 'Monthly' }
        ];
        this.startDatePickerOptions = {
            dateFormat: 'dd/mm/yyyy',
            height: '34px',
            width: '250px',
            showTodayBtn: true,
            showClearDateBtn: false,
            markCurrentDay: true
        };
        this.endDatePickerOptions = {
            dateFormat: 'dd/mm/yyyy',
            height: '34px',
            width: '250px',
            showTodayBtn: true,
            showClearDateBtn: false,
            markCurrentDay: true
        };
    }
    ScheduleComponent.prototype.onStartDateChanged = function (event) {
        var d = event.jsdate;
        // set previous of selected date
        d.setDate(d.getDate() - 1);
        // Get new copy of options in order the date picker detect change
        var copy = JSON.parse(JSON.stringify(this.endDatePickerOptions));
        copy.disableUntil = {
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            day: d.getDate()
        };
        this.endDatePickerOptions = copy;
    };
    ScheduleComponent.prototype.onEndDateChanged = function (event) {
    };
    ScheduleComponent.prototype.onStartTimeInput = function (event) {
    };
    __decorate([
        core_1.Input('scheduleIntance'),
        __metadata("design:type", forms_1.FormGroup)
    ], ScheduleComponent.prototype, "model", void 0);
    ScheduleComponent = __decorate([
        core_1.Component({
            selector: 'schedule',
            template: require('./schedule.component.html')
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder])
    ], ScheduleComponent);
    return ScheduleComponent;
}());
exports.ScheduleComponent = ScheduleComponent;
//# sourceMappingURL=schedule.component.js.map