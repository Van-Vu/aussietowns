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
var router_1 = require("@angular/router");
var user_service_1 = require("../../services/user.service");
var listing_service_1 = require("../../services/listing.service");
var utils_1 = require("../../shared/utils");
var search_service_1 = require("../../services/search.service");
var cookieFactory_1 = require("../mock/cookieFactory");
var ListingOfferFormComponent = /** @class */ (function () {
    function ListingOfferFormComponent(fb, listingService, route, userService, searchService) {
        this.fb = fb;
        this.listingService = listingService;
        this.route = route;
        this.userService = userService;
        this.searchService = searchService;
        //public get autoCorrectedDatePipe(): any { return createAutoCorrectedDatePipe('mm/dd/yyyy hh:mm'); }
        this.isFullday = false;
        this.isNew = true;
        this.tourId = 0;
        this.hostList = [];
        this.guestList = [];
    }
    ListingOfferFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.model = this.fb.group({
            id: [0],
            type: [utils_1.ListingType.Offer],
            operators: this.fb.array([]),
            guests: this.fb.array([]),
            schedules: this.fb.array([]),
            locationId: ['', [forms_1.Validators.required]],
            cost: ['', [forms_1.Validators.required]],
            header: ['', [forms_1.Validators.required]],
            description: [''],
            requirement: [''],
            minParticipant: ['']
        });
        //this.initShedule();
        //this.addOperator();
        this.dateMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/];
        console.log(this.route.params);
        this.sub = this.route.params.subscribe(function (params) {
            _this.tourId = +params['id'] | 0; // (+) converts string 'id' to a number
            if (_this.tourId > 0) {
                _this.isNew = false;
                _this.listingService.getListingById(_this.tourId).subscribe(function (data) {
                    _this.model.controls['id'].setValue(data.id);
                    _this.model.controls['locationId'].setValue({ id: data.locationDetail.id, name: data.locationDetail.name });
                    _this.model.controls['cost'].setValue(data.cost);
                    _this.model.controls['header'].setValue(data.header);
                    _this.model.controls['description'].setValue(data.description);
                    _this.model.controls['requirement'].setValue(data.requirement);
                    _this.model.controls['minParticipant'].setValue(data.minParticipant);
                    for (var i = 0; i < data.tourOperators.length; i++) {
                        _this.addOperator(data.tourOperators[i]);
                    }
                    for (var i = 0; i < data.schedules.length; i++) {
                        _this.applySchedule(data.schedules[i]);
                    }
                });
            }
            else {
                var userId = cookieFactory_1.CookieFactory.check("userId");
                if (userId) {
                    _this.userService.getMiniProfile(+cookieFactory_1.CookieFactory.get("userId"))
                        .subscribe(function (data) { return _this.addOperator(data); }, function (error) {
                    });
                }
                _this.initEmptyShedule();
            }
        });
    };
    ListingOfferFormComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    ListingOfferFormComponent.prototype.onInsert = function () {
        console.log(this.contructBeforeSubmit(this.model.value));
        var model = this.contructBeforeSubmit(this.model.value);
        delete model.id;
        this.listingService.addListing(model)
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
    ListingOfferFormComponent.prototype.onUpdate = function () {
        this.listingService.updateListing(this.contructBeforeSubmit(this.model.value))
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
    ListingOfferFormComponent.prototype.onLocationSearch = function (search) {
        var _this = this;
        this.searchService.autoComplete(search).subscribe(function (response) {
            _this.searchLocations = response;
        });
    };
    ListingOfferFormComponent.prototype.fulldayChange = function () {
        this.isFullday = !this.isFullday;
    };
    ListingOfferFormComponent.prototype.initOperator = function () {
        return {
            Selected: true,
            description: null,
            id: 1,
            imageUrl: "/asset/images/home-icon.png",
            name: "asdfa bodom5"
        };
    };
    ListingOfferFormComponent.prototype.addOperator = function (miniProfile) {
        var control = this.model.controls['operators'].value;
        control.push(miniProfile);
    };
    ListingOfferFormComponent.prototype.initEmptyShedule = function () {
        var control = this.model.controls['schedules'];
        control.push(this.fb.group({
            id: [0],
            startDate: [''],
            startTime: [''],
            duration: [''],
            isRepeated: [false],
            repeatPeriod: [''],
            endDate: ['']
        }));
    };
    ListingOfferFormComponent.prototype.applySchedule = function (schedule) {
        var control = this.model.controls['schedules'];
        var startDate = new Date(schedule.startDate);
        var endDate = schedule.endDate == '' ? null : new Date(schedule.endDate);
        control.push(this.fb.group({
            id: [schedule.id],
            startDate: [{ date: { year: startDate.getFullYear(), month: startDate.getMonth() + 1, day: startDate.getDate() } }],
            startTime: [schedule.startTime.substr(0, 5)],
            duration: [schedule.duration.substr(0, 5)],
            isRepeated: [schedule.repeatedType && schedule.repeatedType !== 0],
            repeatPeriod: [schedule.repeatedType],
            endDate: [endDate ? { date: { year: endDate.getFullYear(), month: endDate.getMonth() + 1, day: endDate.getDate() } } : '']
        }));
    };
    ListingOfferFormComponent.prototype.removeAddress = function (i) {
        var control = this.model.controls['schedules'];
        control.removeAt(i);
    };
    ListingOfferFormComponent.prototype.constructShedule = function (model) {
        var schedules = model.schedules;
        var scheduleArr = [];
        for (var i = 0; i < schedules.length; i++) {
            var schedule = schedules[i];
            scheduleArr.push({
                id: schedule.id,
                startDate: schedule.startDate.date.year + '/' + schedule.startDate.date.month + '/' + schedule.startDate.date.day + 'T' + schedule.startTime,
                duration: schedule.duration,
                repeatedType: schedule.repeatPeriod,
                listingId: model.id,
                endDate: schedule.endDate.date.year + '/' + schedule.endDate.date.month + '/' + schedule.endDate.date.day
            });
        }
        return scheduleArr;
    };
    ListingOfferFormComponent.prototype.constructOperator = function (model) {
        var operators = model.operators;
        var operatorArr = [];
        for (var i = 0; i < operators.length; i++) {
            var operator = operators[i];
            operatorArr.push({
                listingId: model.id,
                userId: operator.id,
                isOwner: (i == 0) ? true : false
            });
        }
        return operatorArr;
    };
    ListingOfferFormComponent.prototype.contructBeforeSubmit = function (model) {
        // Bodom: final format
        //{
        //    "cost":"50",
        //    "description":"adsfas",
        //    "header":"asdfasd",
        //    "locationId":139,
        //    "minParticipant":"4",
        //    "requirement":"asd asdf adfa",
        //    "schedules":[{ "etartDate": "2017/04/13T11:00", "duration": "2:00", "repeatedType": "0", "endDate": "2017/04/13T11:00", "listingId": "0" }],
        //    "type":"0",
        //    "tourOperators":[{ "listingId": "0", "userId": "1", "isOwner": true }]
        //}
        return {
            id: model.id,
            type: utils_1.ListingType.Offer,
            locationId: model.locationId.id,
            cost: model.cost,
            currency: model.currency,
            header: model.header,
            description: model.description,
            requirement: model.requirement,
            minParticipant: model.minParticipant,
            schedules: this.constructShedule(model),
            tourOperators: this.constructOperator(model)
        };
    };
    ListingOfferFormComponent = __decorate([
        core_1.Component({
            selector: 'listingofferform',
            template: require('./listingofferform.component.html'),
            styles: [require('./listingofferform.component.css')]
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, listing_service_1.ListingService,
            router_1.ActivatedRoute, user_service_1.UserService, search_service_1.SearchService])
    ], ListingOfferFormComponent);
    return ListingOfferFormComponent;
}());
exports.ListingOfferFormComponent = ListingOfferFormComponent;
//# sourceMappingURL=listingofferform.component.js.map