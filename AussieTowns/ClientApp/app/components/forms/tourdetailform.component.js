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
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var createAutoCorrectedDatePipe_js_1 = require("text-mask-addons/dist/createAutoCorrectedDatePipe.js");
var ng2_completer_1 = require("ng2-completer");
var angular2_universal_1 = require("angular2-universal");
var tour_service_1 = require("../../services/tour.service");
var TourDetailFormComponent = (function () {
    function TourDetailFormComponent(fb, completerService, tourService, route) {
        this.fb = fb;
        this.completerService = completerService;
        this.tourService = tourService;
        this.route = route;
        this.isFullday = false;
        this.isNew = true;
        this.tourId = 0;
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
        get: function () { return createAutoCorrectedDatePipe_js_1.default('mm/dd/yyyy hh:mm'); },
        enumerable: true,
        configurable: true
    });
    TourDetailFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.model = this.fb.group({
            Id: [''],
            Time: ['', [forms_1.Validators.required]],
            Location: ['', [forms_1.Validators.required]],
            Cost: ['', [forms_1.Validators.required]],
            Header: ['', [forms_1.Validators.required]],
            Hour: [''],
            Minute: [''],
            Description: [''],
            Requirement: [''],
            MinParticipant: ['']
        });
        this.sub = this.route.params.subscribe(function (params) {
            _this.tourId = +params['id'] | 0; // (+) converts string 'id' to a number
            if (_this.tourId > 0) {
                _this.isNew = false;
                if (angular2_universal_1.isBrowser) {
                    _this.tourService.getOfferById(_this.tourId).subscribe(function (data) {
                        _this.model.controls['Id'].setValue(data.Data.Id);
                        _this.model.controls['Time'].setValue(_this.transformDateFormat(data.Data.Time));
                        _this.model.controls['Location'].setValue(data.Data.Location);
                        _this.model.controls['Cost'].setValue(data.Data.Cost);
                        _this.model.controls['Header'].setValue(data.Data.Header);
                        _this.model.controls['Hour'].setValue(data.Data.Hour);
                        _this.model.controls['Minute'].setValue(data.Data.Minute);
                        _this.model.controls['Description'].setValue(data.Data.Description);
                        _this.model.controls['Requirement'].setValue(data.Data.Requirement);
                        _this.model.controls['MinParticipant'].setValue(data.Data.MinParticipant);
                    });
                }
            }
        });
    };
    TourDetailFormComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    TourDetailFormComponent.prototype.onInsert = function () {
        var model = this.model.value;
        delete model.Id;
        this.tourService.addOffer(model)
            .subscribe(function (data) {
            if (data.State == 1) {
            }
            else {
                alert(data.Msg);
            }
            console.log(data.Data);
        }, function (error) {
        });
    };
    TourDetailFormComponent.prototype.onUpdate = function () {
        this.tourService.updateOffer(this.model.value)
            .subscribe(function (data) {
            if (data.State == 1) {
            }
            else {
                alert(data.Msg);
            }
            console.log(data.Data);
        }, function (error) {
        });
    };
    TourDetailFormComponent.prototype.fulldayChange = function () {
        this.isFullday = !this.isFullday;
    };
    TourDetailFormComponent.prototype.transformDateFormat = function (datetime) {
        var date = new Date(datetime);
        return this.ensureTwoDigit(date.getDate()) + '/' + this.ensureTwoDigit((date.getMonth()) + 1) + '/' + date.getFullYear()
            + ' ' + this.ensureTwoDigit(date.getHours()) + ':' + this.ensureTwoDigit(date.getMinutes());
    };
    TourDetailFormComponent.prototype.ensureTwoDigit = function (value) {
        return ("0" + (value)).slice(-2);
    };
    return TourDetailFormComponent;
}());
TourDetailFormComponent = __decorate([
    core_1.Component({
        selector: 'tourdetailform',
        template: require('./tourdetailform.component.html'),
        styles: [require('./tourdetailform.component.css')]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, ng2_completer_1.CompleterService,
        tour_service_1.TourService, router_1.ActivatedRoute])
], TourDetailFormComponent);
exports.TourDetailFormComponent = TourDetailFormComponent;
//# sourceMappingURL=tourdetailform.component.js.map