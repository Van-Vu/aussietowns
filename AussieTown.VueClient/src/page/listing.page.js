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
import { Component, Prop, Watch } from "vue-property-decorator";
import VeeValidate from 'vee-validate';
import ParticipantComponent from '../component/shared/participant.component.vue';
import ListingModel from '../model/listing.model';
import MiniProfile from '../model/miniprofile.model';
import LocationSearchComponent from '../component/shared/search/locationsearch.component.vue';
import { Utils } from '../component/utils';
import { ListingType } from '../model/enum';
import datepicker from '../component/shared/external/datepicker.vue';
import ImageUploadComponent from '../component/shared/imageupload.component.vue';
import NumberChooser from '../component/shared/numberchooser.component.vue';
import { NotificationType, UserRole, UserAction } from '../model/enum';
import AvailabilityComponent from '../component/booking/availability.component.vue';
import VueMask from 'v-mask';
Vue.use(VueMask);
Vue.use(VeeValidate);
import vMediaQuery from '../component/shared/external/v-media-query';
Vue.use(vMediaQuery);
var ListingPage = /** @class */ (function (_super) {
    __extends(ListingPage, _super);
    function ListingPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.formSubmitting = false;
        _this.isOffer = false;
        _this.isEditing = false;
        _this.isStickyBoxRequired = false;
        _this.modelCache = null;
        return _this;
    }
    ListingPage.asyncData = function (_a) {
        var store = _a.store, route = _a.route;
        if (route.params.listingId) {
            return store.dispatch('FETCH_LISTING_BY_ID', route.params.listingId);
        }
        else {
            return store.dispatch('CREATE_LISTING', route.params.listingType);
        }
    };
    ListingPage.prototype.onRouteParamChanged = function (value, oldValue) {
        if (value.listingId) {
            this.isEditing = false;
            return this.$store.dispatch('FETCH_LISTING_BY_ID', value.listingId);
        }
        else {
            this.isEditing = true;
            return this.$store.dispatch('CREATE_LISTING', value.listingType);
        }
    };
    Object.defineProperty(ListingPage.prototype, "model", {
        get: function () {
            if (this.$store.state.listing instanceof ListingModel) {
                this.isOffer = this.$store.state.listing.type == ListingType.Offer;
                return this.$store.state.listing;
            }
            //Bodom: comeback
            //this.isOffer = this.listingType.toUpperCase() === ListingType[ListingType.Offer].toUpperCase();
            return new ListingModel();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListingPage.prototype, "showScheduleModal", {
        get: function () {
            return this.$store.state.showScheduleModal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListingPage.prototype, "isLoggedIn", {
        get: function () {
            return this.$store.getters.isLoggedIn;
        },
        enumerable: true,
        configurable: true
    });
    ListingPage.prototype.mounted = function () {
        //var screenSize = detectScreenSize(this.$mq);
        //switch (screenSize) {
        //    case ScreenSize.Desktop:
        //        this.isStickyBoxRequired = true;
        //        break;
        //    case ScreenSize.Tablet:
        //        this.isStickyBoxRequired = false;
        //        break;
        //    case ScreenSize.Mobile:
        //        this.isStickyBoxRequired = false;
        //        break;
        //}        
        if (!this.$route.params.listingId) {
            this.isEditing = true;
        }
    };
    Object.defineProperty(ListingPage.prototype, "canEdit", {
        get: function () {
            // Create new listing
            if (!this.$route.params.listingId && !this.model.id && this.$store.state.loggedInUser) {
                return true;
            }
            if (this.model.tourOperators) {
                var primaryUser = this.model.tourOperators.filter(function (x) { return x.isPrimary === true; });
                if (primaryUser.length > 0) {
                    return this.$auth.check(UserRole.Editor, primaryUser[0].id, UserAction.Edit);
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    ListingPage.prototype.onUploadImageCompleted = function () {
        if (this.canEdit) {
            this.model.imageList = this.$store.state.listing.imageList;
            this.$children.find(function (x) { return x.$el.id === 'imageupload'; }).$children[0].refresh();
            this.$store.dispatch('ADD_NOTIFICATION', { title: "Upload finish", type: NotificationType.Success });
        }
    };
    ListingPage.prototype.onInsertorUpdate = function () {
        var _this = this;
        if (this.canEdit) {
            this.$validator.validateAll().then(function (result) {
                if (result) {
                    _this.$store.dispatch("ENABLE_LOADING");
                    if (_this.model.id > 0) {
                        return _this.$store.dispatch('UPDATE_LISTING', _this.contructBeforeSubmit(_this.model))
                            .then(function () {
                            _this.$store.dispatch("DISABLE_LOADING");
                            _this.$store.dispatch('ADD_NOTIFICATION', { title: "Update success", type: NotificationType.Success });
                            _this.isEditing = false;
                        })
                            .catch(function (err) {
                            _this.onCancelEdit();
                        });
                    }
                    else {
                        return _this.$store.dispatch('INSERT_LISTING', _this.contructBeforeSubmit(_this.model))
                            .then(function (listingId) {
                            _this.$store.dispatch("DISABLE_LOADING");
                            _this.$router.push({
                                name: 'listingDetail',
                                params: { seoString: Utils.seorizeString(_this.model.header), listingId: listingId }
                            });
                            _this.$store.dispatch('ADD_NOTIFICATION', {
                                title: "Insert success. Please upload listing images",
                                type: NotificationType.Success
                            });
                        })
                            .catch(function (err) { return _this.onCancelEdit(); });
                    }
                }
            }).catch(function () {
                alert('Correct them errors!');
            });
        }
    };
    ListingPage.prototype.onEdit = function () {
        if (this.canEdit) {
            this.isEditing = true;
            this.modelCache = JSON.parse(JSON.stringify(this.model));
        }
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
        this.$store.dispatch("INSERT_LISTING_OPERATOR", new MiniProfile(user.id, user.name, '', '', user.imageUrl, ''));
    };
    ListingPage.prototype.onUserRemoved = function (user) {
        this.$store.dispatch("REMOVE_LISTING_OPERATOR", user);
    };
    ListingPage.prototype.checkAvailability = function (schedule) {
        if (this.isLoggedIn) {
            this.$router.push({ name: "booking" });
        }
        else {
            Utils.handleError(this.$store, { status: 403 });
        }
    };
    ListingPage.prototype.onSaveSchedule = function (scheduleObject) {
        console.log(scheduleObject);
    };
    ListingPage.prototype.onEditSchedule = function (scheduleObject) {
        this.$store.dispatch('SHOW_SCHEDULE_MODAL', scheduleObject);
    };
    ListingPage.prototype.onHideScheduleModal = function () {
        this.$store.dispatch('HIDE_SCHEDULE_MODAL');
    };
    ListingPage.prototype.onEnquire = function () {
        if (this.isLoggedIn) {
            var primaryHost = this.model.tourOperators.find(function (x) { return x.isPrimary == true; });
            this.$store.dispatch('SHOW_CONTACT_MODAL', {
                senderId: this.$store.state.loggedInUser.id,
                receiverId: primaryHost.id,
                receiverName: primaryHost.fullname,
                listingId: this.model.id,
                listingHeader: this.model.header
            });
        }
        else {
            Utils.handleError(this.$store, { status: 403 });
        }
    };
    ListingPage.prototype.constructShedule = function (model) {
        var schedules = model.schedules;
        var scheduleArr = [];
        for (var i = 0; i < schedules.length; i++) {
            var schedule = schedules[i];
            if (!this.isOffer && Array.isArray(schedule.dateRange)) {
                schedule.startDate = schedule.dateRange[0];
                schedule.endDate = schedule.dateRange[1];
                schedule.repeatedDay = [];
                schedule.duration = "00:00";
            }
            scheduleArr.push({
                id: schedule.id != null ? schedule.id : 0,
                startDate: Utils.getDate(new Date(schedule.startDate)) + 'T' + schedule.startTime,
                duration: schedule.duration,
                repeatedType: schedule.repeatedType,
                repeatedDay: schedule.repeatedDay,
                listingId: model.id,
                endDate: schedule.endDate ? Utils.getDate(new Date(schedule.endDate)) : ''
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
                isPrimary: (i === 0)
            });
        }
        return participantArr;
    };
    ListingPage.prototype.contructBeforeSubmit = function (model) {
        // Bodom: final format
        //{
        //  "cost":"50",
        //  "description":"adsfas",
        //  "header":"asdfasd",
        //  "locationId":139,
        //  "minParticipant":"4",
        //  "requirement":"asd asdf adfa",
        //  "schedules":[{"startDate": "2017/04/13T11:00", "duration": "2:00", "repeatedType": "0", "repeatedDay": [], "endDate": "2017/04/13T11:00", "listingId": "0"}],  
        //  "type":"0",
        //  "tourOperators":[{"listingId": "0", "userId": "1", "isOwner": true}]
        //}
        return {
            id: model.id,
            type: this.isOffer ? 0 : 1,
            locationId: model.locationDetail.id,
            cost: model.cost,
            currency: model.currency,
            header: Utils.stripHtml(model.header),
            description: Utils.stripHtml(model.description),
            requirement: Utils.stripHtml(model.requirement),
            minParticipant: model.minParticipant,
            schedules: this.constructShedule(model),
            tourGuests: this.constructParticipants(model.id, model.tourGuests),
            tourOperators: this.constructParticipants(model.id, model.tourOperators)
        };
    };
    __decorate([
        Prop(),
        __metadata("design:type", String)
    ], ListingPage.prototype, "listingType", void 0);
    __decorate([
        Watch('$route.params'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], ListingPage.prototype, "onRouteParamChanged", null);
    ListingPage = __decorate([
        Component({
            name: 'ListingPage',
            components: {
                "locationsearch": LocationSearchComponent,
                "participant": ParticipantComponent,
                "datepicker": datepicker,
                "imageupload": ImageUploadComponent,
                "numberchooser": NumberChooser,
                "availabilityCheck": AvailabilityComponent
            }
        })
    ], ListingPage);
    return ListingPage;
}(Vue));
export default ListingPage;
