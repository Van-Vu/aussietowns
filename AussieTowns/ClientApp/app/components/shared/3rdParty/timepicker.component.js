"use strict";
// source: http://ericjgagnon.github.io/wickedpicker/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var TimePickerComponent = /** @class */ (function () {
    function TimePickerComponent() {
        this.isFullday = false;
        this.textDisable = false;
        /** Implemented as part of ControlValueAccessor. */
        this.onChange = function () {
        };
        this.onTouched = function () { };
    }
    TimePickerComponent_1 = TimePickerComponent;
    TimePickerComponent.prototype.changeValue = function (value) {
        if (value) {
            this.onChange("24:00");
            this.textDisable = true;
        }
        else {
            this.onChange(this.textValue);
            this.textDisable = false;
        }
    };
    TimePickerComponent.prototype.onKey = function (event) {
        this.textValue = event.target.value;
        this.onChange(this.textValue);
    };
    TimePickerComponent.prototype.writeValue = function (value) {
        this.textValue = value;
        this.onChange(value);
    };
    TimePickerComponent.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    TimePickerComponent.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    TimePickerComponent = TimePickerComponent_1 = __decorate([
        core_1.Component({
            selector: 'timepicker',
            providers: [
                { provide: forms_1.NG_VALUE_ACCESSOR, useExisting: core_1.forwardRef(function () { return TimePickerComponent_1; }), multi: true },
            ],
            template: require('./timepicker.component.html')
        })
    ], TimePickerComponent);
    return TimePickerComponent;
    var TimePickerComponent_1;
}());
exports.TimePickerComponent = TimePickerComponent;
//# sourceMappingURL=timepicker.component.js.map