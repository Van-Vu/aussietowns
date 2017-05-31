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
import VeeValidate from 'vee-validate';
import { ListingType } from '../shared/utils';
import ScheduleComponent from '../shared/schedule.component.vue';
import ParticipantComponent from '../shared/participant.component.vue';
import ListingModel from '../model/listing.model';
import MiniProfile from '../model/miniprofile.model';
import LocationSearchComponent from '../shared/locationsearch.component.vue';
import ListingService from '../../services/listing.service';
Vue.use(VeeValidate);
var ListingOfferForm = (function (_super) {
    __extends(ListingOfferForm, _super);
    function ListingOfferForm() {
        //dateMask: any;
        //tourId: number = 0;
        //hostList: any[] = [];
        //searchLocations: any;
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.formSubmitted = false;
        _this.model = new ListingModel();
        return _this;
    }
    ListingOfferForm.prototype.onInsertorUpdate = function () {
        //Bodom: hack
        this.model.id = 0;
        (new ListingService()).addListing(this.contructBeforeSubmit(this.model));
    };
    ListingOfferForm.prototype.onInsert = function () {
        //console.log(this.contructBeforeSubmit(this.model.value));
        //let model = this.contructBeforeSubmit(this.model.value);
        //delete model.id;
        //this.listingService.addListing(model)
        //    .subscribe(
        //    data => {
        //        if (data.State == 1) {
        //        }
        //        else {
        //            alert(data.Msg);
        //        }
        //        console.log(data.Data);
        //    },
        //    error => {
        //    });
    };
    ListingOfferForm.prototype.onUpdate = function () {
        //this.listingService.updateListing(this.contructBeforeSubmit(this.model.value))
        //    .subscribe(
        //    data => {
        //        if (data.State == 1) {
        //        }
        //        else {
        //            alert(data.Msg);
        //        }
        //        console.log(data.Data);
        //    },
        //    error => {
        //    });
    };
    ListingOfferForm.prototype.onLocationSelected = function (item) {
        this.model.locationDetail = item;
    };
    ListingOfferForm.prototype.fulldayChange = function () {
        //this.isFullday = !this.isFullday;
    };
    ListingOfferForm.prototype.onUserAdded = function (user) {
        if (this.model.tourOperators == null)
            this.model.tourOperators = new Array();
        this.model.tourOperators.push(new MiniProfile(user.id, user.name, '', '', user.imageUrl, ''));
    };
    ListingOfferForm.prototype.onUserRemoved = function (user) {
    };
    ListingOfferForm.prototype.initOperator = function () {
        return {
            Selected: true,
            description: null,
            id: 1,
            imageUrl: "/asset/images/home-icon.png",
            name: "asdfa bodom5"
        };
    };
    ListingOfferForm.prototype.addOperator = function (miniProfile) {
        //const control = this.model.controls['operators'].value;
        //control.push(miniProfile);
    };
    ListingOfferForm.prototype.initEmptyShedule = function () {
        //const control = <FormArray>this.model.controls['schedules'];
        //control.push(this.fb.group({
        //    id: [0],
        //    startDate: [''],
        //    startTime: [''],
        //    duration: [''],
        //    isRepeated: [false],
        //    repeatPeriod: [''],
        //    endDate: ['']
        //}));
    };
    ListingOfferForm.prototype.applySchedule = function (schedule) {
        //const control = <FormArray>this.model.controls['schedules'];
        //var startDate = new Date(schedule.startDate);
        //var endDate = schedule.endDate == '' ? null : new Date(schedule.endDate);
        //control.push(this.fb.group({
        //    id: [schedule.id],
        //    startDate: [{ date: { year: startDate.getFullYear(), month: startDate.getMonth() + 1, day: startDate.getDate() } }],
        //    startTime: [schedule.startTime.substr(0, 5)],
        //    duration: [schedule.duration.substr(0, 5)],
        //    isRepeated: [schedule.repeatedType && schedule.repeatedType !== 0],
        //    repeatPeriod: [schedule.repeatedType],
        //    endDate: [endDate ? { date: { year: endDate.getFullYear(), month: endDate.getMonth() + 1, day: endDate.getDate() } } : '']
        //}));
    };
    ListingOfferForm.prototype.removeAddress = function (i) {
        //const control = <FormArray>this.model.controls['schedules'];
        //control.removeAt(i);
    };
    ListingOfferForm.prototype.constructShedule = function (model) {
        var schedules = model.schedules;
        var scheduleArr = [];
        for (var i = 0; i < schedules.length; i++) {
            var schedule = schedules[i];
            scheduleArr.push({
                id: schedule.id,
                startDate: schedule.startDate.getUTCFullYear() + '/' + schedule.startDate.getUTCMonth() + '/' + schedule.startDate.getUTCDate() + 'T' + schedule.startTime.HH + ':' + schedule.startTime.mm,
                duration: schedule.duration.HH + ':' + schedule.duration.mm,
                repeatedType: schedule.repeatedType,
                listingId: model.id,
                endDate: schedule.endDate.getUTCFullYear() + '/' + schedule.endDate.getUTCMonth() + '/' + schedule.endDate.getUTCDate()
            });
        }
        return scheduleArr;
    };
    ListingOfferForm.prototype.constructOperator = function (model) {
        var operators = model.tourOperators;
        var operatorArr = [];
        for (var i = 0; i < operators.length; i++) {
            var operator = operators[i];
            operatorArr.push({
                listingId: model.id,
                userId: operator.id,
                isOwner: (i === 0)
            });
        }
        return operatorArr;
    };
    ListingOfferForm.prototype.contructBeforeSubmit = function (model) {
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
            type: ListingType.Offer,
            locationId: model.locationDetail.id,
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
    return ListingOfferForm;
}(Vue));
ListingOfferForm = __decorate([
    Component({
        name: 'ListingOffer',
        components: {
            'locationsearch': LocationSearchComponent,
            'schedule': ScheduleComponent,
            'participant': ParticipantComponent
        }
    })
], ListingOfferForm);
export default ListingOfferForm;
