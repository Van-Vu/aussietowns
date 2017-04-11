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
var angular2_universal_1 = require("angular2-universal");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var ng2_completer_1 = require("ng2-completer");
var tour_service_1 = require("../../services/tour.service");
var TourRequestFormComponent = (function () {
    function TourRequestFormComponent(fb, completerService, tourService, route) {
        this.fb = fb;
        this.completerService = completerService;
        this.tourService = tourService;
        this.route = route;
        this.tourId = 0;
        this.isNew = true;
        this.searchData = [
            { color: 'red', value: '#f00' },
            { color: 'green', value: '#0f0' },
            { color: 'blue', value: '#00f' },
            { color: 'cyan', value: '#0ff' },
            { color: 'magenta', value: '#f0f' },
            { color: 'yellow', value: '#ff0' },
            { color: 'black', value: '#000' }
        ];
        this.beginDatePickerOptions = {
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
        this.dataService = completerService.local(this.searchData, 'color', 'color');
    }
    TourRequestFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        var date = new Date();
        this.model = this.fb.group({
            Id: [''],
            BeginDate: [{ date: { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() } }, [forms_1.Validators.required]],
            EndDate: [{ date: { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() } }, [forms_1.Validators.required]],
            Budget: ['', [forms_1.Validators.required]],
            Currency: ['0'],
            Location: ['', [forms_1.Validators.required]],
            Header: ['', [forms_1.Validators.required]],
            Description: [''],
            MinParticipant: ['0']
        });
        this.sub = this.route.params.subscribe(function (params) {
            _this.tourId = +params['id'] | 0; // (+) converts string 'id' to a number
            if (_this.tourId > 0) {
                _this.isNew = false;
                if (angular2_universal_1.isBrowser) {
                    _this.tourService.getRequestById(_this.tourId).subscribe(function (data) {
                        _this.model.controls['Id'].setValue(data.Data.Id);
                        _this.model.controls['Budget'].setValue(data.Data.Budget);
                        _this.model.controls['Currency'].setValue(data.Data.Currency);
                        _this.model.controls['Location'].setValue(data.Data.Location);
                        _this.model.controls['Header'].setValue(data.Data.Header);
                        _this.model.controls['Description'].setValue(data.Data.Description);
                        _this.model.controls['MinParticipant'].setValue(data.Data.MinParticipant);
                        var beginDate = new Date(data.Data.BeginDate);
                        _this.model.controls['BeginDate'].setValue({
                            date: { year: beginDate.getFullYear(), month: beginDate.getMonth() + 1, day: beginDate.getDate() }
                        });
                        var endDate = new Date(data.Data.EndDate);
                        _this.model.controls['EndDate'].setValue({
                            date: { year: endDate.getFullYear(), month: endDate.getMonth() + 1, day: endDate.getDate() }
                        });
                    });
                }
            }
        });
    };
    TourRequestFormComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    TourRequestFormComponent.prototype.onBeginDateChanged = function (event) {
        var d = event.jsdate;
        // set previous of selected date
        d.setDate(d.getDate() - 1);
        // Get new copy of options in order the date picker detect change
        var copy = this.getCopyOfOptions(this.endDatePickerOptions);
        copy.disableUntil = {
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            day: d.getDate()
        };
        this.endDatePickerOptions = copy;
    };
    TourRequestFormComponent.prototype.onInsert = function () {
        var model = this.contructBeforeSubmit(this.model.value);
        delete model.Id;
        this.tourService.addRequest(model)
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
    TourRequestFormComponent.prototype.onUpdate = function () {
        this.tourService.updateRequest(this.contructBeforeSubmit(this.model.value))
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
    // Returns copy of myOptions
    TourRequestFormComponent.prototype.getCopyOfOptions = function (option) {
        return JSON.parse(JSON.stringify(option));
    };
    TourRequestFormComponent.prototype.contructBeforeSubmit = function (model) {
        return {
            Id: model.Id,
            BeginDate: model.BeginDate.date.year + ' ' + model.BeginDate.date.month + ' ' + model.BeginDate.date.day,
            EndDate: model.EndDate.date.year + ' ' + model.EndDate.date.month + ' ' + model.EndDate.date.day,
            Budget: model.Budget,
            Currency: model.Currency,
            Description: model.Description,
            Header: model.Header,
            Location: model.Location,
            MinParticipant: model.MinParticipant
        };
    };
    return TourRequestFormComponent;
}());
TourRequestFormComponent = __decorate([
    core_1.Component({
        selector: 'tourrequestform',
        template: require('./tourrequestform.component.html'),
        styles: [require('./tourrequestform.component.css')]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, ng2_completer_1.CompleterService,
        tour_service_1.TourService, router_1.ActivatedRoute])
], TourRequestFormComponent);
exports.TourRequestFormComponent = TourRequestFormComponent;
//# sourceMappingURL=tourrequestform.component.js.map