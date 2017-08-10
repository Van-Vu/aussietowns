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
import MiniProfile from '../model/miniprofile.model';
import LocationSearchComponent from '../component/shared/search/locationsearch.component.vue';
import { ListingType } from '../model/enum';
import datepicker from '../component/shared/external/datepicker.vue';
import ScheduleModalComponent from '../component/modal/schedulemodal.component.vue';
import ImageUploadComponent from '../component/shared/imageupload.component.vue';
import NumberChooser from '../component/shared/numberchooser.component.vue';
import { ScreenSize, NotificationType } from '../model/enum';
import { detectScreenSize } from '../service/screen.service';
import AvailabilityComponent from '../component/booking/availability.component.vue';
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
        _this.showAvailability = false;
        _this.isStickyBoxRequired = true;
        _this.bookingDate = new Date().toDateString();
        _this.bookingNumber = 0;
        _this.disableDays = {
            days: [6, 0] // Disable Saturday's and Sunday's
        };
        _this.modelCache = null;
        return _this;
    }
    ListingPage.prototype.asyncData = function (_a) {
        var store = _a.store, route = _a.route;
        if (route.params.listingId) {
            return store.dispatch('FETCH_LISTING_BY_ID', route.params.listingId);
        }
    };
    Object.defineProperty(ListingPage.prototype, "model", {
        get: function () {
            this.isOffer = this.$store.state.listing.listingType == ListingType.Offer;
            return this.$store.state.listing;
        },
        enumerable: true,
        configurable: true
    });
    ListingPage.prototype.created = function () {
    };
    ListingPage.prototype.mounted = function () {
        var screenSize = detectScreenSize(this.$mq);
        switch (screenSize) {
            case ScreenSize.Desktop:
                this.isStickyBoxRequired = true;
                break;
            case ScreenSize.Tablet:
                this.isStickyBoxRequired = false;
                break;
            case ScreenSize.Mobile:
                this.isStickyBoxRequired = false;
                break;
        }
    };
    ListingPage.prototype.onUploadImageCompleted = function () {
        this.model.imageList = this.$store.state.listing.imageList;
        this.$children.find(function (x) { return x.$el.id === 'imageupload'; }).$children[0].refresh();
        this.$store.dispatch('ADD_NOTIFICATION', { title: "Upload finish", type: NotificationType.Success });
    };
    ListingPage.prototype.onInsertorUpdate = function () {
        this.isEditing = false;
        if (this.model.id > 0) {
            return this.$store.dispatch('UPDATE_LISTING', this.contructBeforeSubmit(this.model));
        }
        else {
            return this.$store.dispatch('INSERT_LISTING', this.contructBeforeSubmit(this.model));
        }
    };
    ListingPage.prototype.onEdit = function () {
        this.isEditing = true;
        this.modelCache = Object.assign({}, this.model);
    };
    ListingPage.prototype.onCancelEdit = function () {
        this.isEditing = false;
        Object.assign(this.model, this.modelCache);
        this.modelCache = null;
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
    ListingPage.prototype.checkAvailability = function (schedule) {
        this.showAvailability = true;
        this.isStickyBoxRequired = false;
        //var bookingDayPanel = this.$children.find(x => x.$el.id === "availDay");
        //if (bookingDayPanel) {
        //    (bookingDayPanel as any).togglePanel();
        //}
    };
    ListingPage.prototype.onSaveSchedule = function (scheduleObject) {
        console.log(scheduleObject);
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
                startDate: schedule.startDate + 'T' + schedule.startTime,
                duration: schedule.duration,
                repeatedType: schedule.repeatedType,
                repeatedDay: schedule.repeatedDay,
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
    ListingPage.prototype.onBookingDateChanged = function (value) {
        this.bookingDate = value;
    };
    ListingPage.prototype.onParticipantChanged = function (value) {
        this.bookingNumber = value;
    };
    ListingPage.prototype.onProceed = function () {
        this.$store.dispatch('UPDATE_BOOKING', { participants: this.bookingNumber, date: this.bookingDate, time: '09:00' });
        this.$router.push({ name: "booking" });
    };
    __decorate([
        Prop,
        __metadata("design:type", String)
    ], ListingPage.prototype, "listingType", void 0);
    ListingPage = __decorate([
        Component({
            name: 'ListingPage',
            components: {
                "locationsearch": LocationSearchComponent,
                "participant": ParticipantComponent,
                "datepicker": datepicker,
                "schedulemodal": ScheduleModalComponent,
                "imageupload": ImageUploadComponent,
                "numberchooser": NumberChooser,
                "availabilityCheck": AvailabilityComponent
            }
        })
    ], ListingPage);
    return ListingPage;
}(Vue));
export default ListingPage;
