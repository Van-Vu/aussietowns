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
var core_1 = require("@angular/core");
//import { User } from '../../model/user'
var forms_1 = require("@angular/forms");
var createAutoCorrectedDatePipe_js_1 = require("text-mask-addons/dist/createAutoCorrectedDatePipe.js");
var ng2_completer_1 = require("ng2-completer");
var TourDetailFormComponent = (function () {
    function TourDetailFormComponent(fb, completerService) {
        this.fb = fb;
        this.completerService = completerService;
        this.isFullday = false;
        this.searchData = [
            { color: 'red', value: '#f00' },
            { color: 'green', value: '#0f0' },
            { color: 'blue', value: '#00f' },
            { color: 'cyan', value: '#0ff' },
            { color: 'magenta', value: '#f0f' },
            { color: 'yellow', value: '#ff0' },
            { color: 'black', value: '#000' }
        ];
        this.dataService = completerService.local(this.searchData, 'color', 'color');
    }
    Object.defineProperty(TourDetailFormComponent.prototype, "dateMask", {
        get: function () { return [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/]; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TourDetailFormComponent.prototype, "autoCorrectedDatePipe", {
        get: function () { return createAutoCorrectedDatePipe_js_1.default('mm/dd/yyyy'); },
        enumerable: true,
        configurable: true
    });
    TourDetailFormComponent.prototype.ngOnInit = function () {
        this.model = this.fb.group({
            Time: ['', [forms_1.Validators.required]],
            Location: ['', [forms_1.Validators.required]],
            Duration: ['', [forms_1.Validators.required]],
            Header: ['', [forms_1.Validators.required]],
            Hours: [''],
            Minutes: [''],
            Expectation: [''],
            Requirements: [''],
            Participants: ['']
        });
    };
    TourDetailFormComponent.prototype.fulldayChange = function () {
        this.isFullday = !this.isFullday;
    };
    return TourDetailFormComponent;
}());
TourDetailFormComponent = __decorate([
    core_1.Component({
        selector: 'tourdetailform',
        template: require('./tourdetailform.component.html'),
        styles: [require('./tourdetailform.component.css')]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, ng2_completer_1.CompleterService])
], TourDetailFormComponent);
exports.TourDetailFormComponent = TourDetailFormComponent;
//# sourceMappingURL=tourdetailform.component.js.map