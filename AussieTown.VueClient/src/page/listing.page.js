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
import VeeValidate from 'vee-validate';
import ParticipantComponent from '../component/shared/participant.component.vue';
import ListingModel from '../model/listing.model';
import MiniProfile from '../model/miniprofile.model';
import LocationSearchComponent from '../component/shared/search/locationsearch.component.vue';
import { Utils, ListingType } from '../component/utils';
import * as datepicker from '../component/shared/external/datepicker.vue';
import ScheduleModalComponent from '../component/modal/schedulemodal.component.vue';
Vue.use(VeeValidate);
var ListingPage = (function (_super) {
    __extends(ListingPage, _super);
    function ListingPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.formSubmitted = false;
        _this.isOffer = false;
        _this.isEditing = false;
        _this.editingSchedule = null;
        _this.showScheduleModal = false;
        _this.model = new ListingModel();
        return _this;
    }
    ListingPage.prototype.asyncData = function (_a) {
        var store = _a.store, route = _a.route;
        if (route.params.listingId) {
            return store.dispatch('FETCH_LISTING_BY_ID', route.params.listingId);
        }
    };
    ListingPage.prototype.beforeRouteEnter = function (to, from, next) {
        //console.log('execute beforeRouteEnter: ' + to.params.seoString);
        //next(vm => vm.setListingId(1));
        next();
    };
    ListingPage.prototype.setListingId = function (id) {
        //this.listingId = id;
        //console.log("here I am:" + this.listingId);
    };
    ListingPage.prototype.created = function () {
        var _this = this;
        if (this.listingType) {
            this.isOffer = Utils.listingTypeConvert(this.listingType) === ListingType.Offer;
        }
        if (this.$store.state.listing) {
            this.model = this.$store.state.listing;
            this.isOffer = this.model.listingType == ListingType.Offer;
        }
        else {
            if (this.$route.params.listingId) {
                this.$store.dispatch('FETCH_LISTING_BY_ID', this.$route.params.listingId).then(function () {
                    _this.model = _this.$store.state.listing;
                    _this.isOffer = _this.model.listingType == ListingType.Offer;
                });
            }
        }
        this.$store.dispatch('SET_CURRENT_PAGE', 'listing');
    };
    ListingPage.prototype.onInsertorUpdate = function () {
        if (this.model.id > 0) {
            return this.$store.dispatch('UPDATE_LISTING', this.contructBeforeSubmit(this.model));
        }
        else {
            return this.$store.dispatch('INSERT_LISTING', this.contructBeforeSubmit(this.model));
        }
    };
    ListingPage.prototype.onLocationSelected = function (item) {
        this.model.locationDetail = item;
    };
    ListingPage.prototype.onUserAdded = function (user) {
        if (this.model.tourOperators == null)
            this.model.tourOperators = new Array();
        this.model.tourOperators.push(new MiniProfile(user.id, user.name, '', '', user.imageUrl, ''));
    };
    ListingPage.prototype.onUserRemoved = function (user) {
    };
    ListingPage.prototype.onSaveSchedule = function (scheduleObject) {
    };
    ListingPage.prototype.onEditSchedule = function (scheduleObject) {
        this.editingSchedule = scheduleObject;
        this.showScheduleModal = true;
    };
    ListingPage.prototype.constructShedule = function (model) {
        var schedules = model.schedules;
        var scheduleArr = [];
        for (var i = 0; i < schedules.length; i++) {
            var schedule = schedules[i];
            scheduleArr.push({
                id: schedule.id != null ? schedule.id : 0,
                startDate: schedule.startDate + 'T' + schedule.startTime.HH + ':' + schedule.startTime.mm,
                duration: schedule.duration.HH + ':' + schedule.duration.mm,
                repeatedType: schedule.repeatedType,
                listingId: model.id,
                endDate: schedule.endDate
            });
        }
        return scheduleArr;
    };
    ListingPage.prototype.constructParticipants = function (listingId, model) {
        var participantArr = [];
        for (var i = 0; i < model.length; i++) {
            var operator = model[i];
            participantArr.push({
                listingId: listingId,
                userId: operator.id,
                isOwner: (i === 0)
            });
        }
        return participantArr;
    };
    ListingPage.prototype.contructBeforeSubmit = function (model) {
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
            type: this.isOffer,
            locationId: model.locationDetail.id,
            cost: model.cost,
            currency: model.currency,
            header: model.header,
            description: model.description,
            requirement: model.requirement,
            minParticipant: model.minParticipant,
            schedules: this.constructShedule(model),
            tourGuests: this.constructParticipants(model.id, model.tourGuests),
            tourOperators: this.constructParticipants(model.id, model.tourOperators)
        };
    };
    return ListingPage;
}(Vue));
__decorate([
    Prop,
    __metadata("design:type", String)
], ListingPage.prototype, "listingType", void 0);
ListingPage = __decorate([
    Component({
        name: 'ListingPage',
        components: {
            'locationsearch': LocationSearchComponent,
            'participant': ParticipantComponent,
            "datepicker": datepicker,
            "schedulemodal": ScheduleModalComponent
        }
    })
], ListingPage);
export default ListingPage;
