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
import ListingModel from '../model/listing.model';
import LocationSearchComponent from '../shared/locationsearch.component.vue';
import ParticipantComponent from '../shared/participant.component.vue';
import ListingService from '../../services/listing.service';
import MiniProfile from '../model/miniprofile.model';
Vue.use(VeeValidate);
var ListingRequestForm = (function (_super) {
    __extends(ListingRequestForm, _super);
    function ListingRequestForm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.formSubmitted = false;
        _this.model = new ListingModel();
        return _this;
    }
    ListingRequestForm.prototype.asyncData = function (_a) {
        var store = _a.store, route = _a.route;
        // return the Promise from the action
        console.log('here II am: :' + store.state);
        return store.dispatch('FETCH_LISTING', 18);
    };
    ListingRequestForm.prototype.created = function () {
        this.model = this.$store.state.listings[0].data;
    };
    ListingRequestForm.prototype.onInsertorUpdate = function () {
        //Bodom: hack
        this.model.id = 0;
        (new ListingService()).addListing(this.contructBeforeSubmit(this.model));
    };
    ListingRequestForm.prototype.onInsert = function () {
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
    ListingRequestForm.prototype.onUpdate = function () {
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
    ListingRequestForm.prototype.onLocationSelected = function (item) {
        this.model.locationDetail = item;
    };
    ListingRequestForm.prototype.onUserAdded = function (user) {
        if (this.model.tourGuests == null)
            this.model.tourGuests = new Array();
        this.model.tourGuests.push(new MiniProfile(user.id, user.name, '', '', user.imageUrl, ''));
    };
    ListingRequestForm.prototype.onUserRemoved = function (user) {
    };
    ListingRequestForm.prototype.initOperator = function () {
        return {
            Selected: true,
            description: null,
            id: 1,
            imageUrl: "/asset/images/home-icon.png",
            name: "asdfa bodom5"
        };
    };
    ListingRequestForm.prototype.constructShedule = function (model) {
        var schedules = model.schedules;
        var scheduleArr = [];
        for (var i = 0; i < schedules.length; i++) {
            var schedule = schedules[i];
            scheduleArr.push({
                id: schedule.id,
                startDate: schedule.startDate.date.year + '/' + schedule.startDate.date.month + '/' + schedule.startDate.date.day + 'T' + schedule.startTime.HH + ':' + schedule.startTime.mm,
                duration: schedule.duration.HH + ':' + schedule.duration.mm,
                repeatedType: schedule.repeatPeriod,
                listingId: model.id,
                endDate: schedule.endDate.date.year + '/' + schedule.endDate.date.month + '/' + schedule.endDate.date.day
            });
        }
        return scheduleArr;
    };
    ListingRequestForm.prototype.constructOperator = function (model) {
        var operators = model.operators;
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
    ListingRequestForm.prototype.contructBeforeSubmit = function (model) {
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
            type: ListingType.Request,
            locationId: model.locationDetail.id,
            cost: model.cost,
            currency: model.currency,
            header: model.header,
            description: model.description,
            minParticipant: model.minParticipant,
            schedules: this.constructShedule(model),
            tourGuests: this.constructOperator(model)
        };
    };
    return ListingRequestForm;
}(Vue));
ListingRequestForm = __decorate([
    Component({
        name: 'ListingRequest',
        components: {
            'locationsearch': LocationSearchComponent,
            'participant': ParticipantComponent
        }
    })
], ListingRequestForm);
export default ListingRequestForm;
