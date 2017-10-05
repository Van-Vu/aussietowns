﻿import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import VeeValidate from 'vee-validate';
import { AutocompleteItem } from '../model/autocomplete.model';
import ParticipantComponent from '../component/shared/participant.component.vue';
import ListingModel from '../model/listing.model';
import MiniProfile from '../model/miniprofile.model';
import LocationSearchComponent from '../component/shared/search/locationsearch.component.vue';
import { Utils } from '../component/utils';
import { ListingType } from '../model/enum';
import datepicker from '../component/shared/external/datepicker.vue';
import ScheduleModel from '../model/schedule.model';
import ScheduleModalComponent from '../component/modal/schedulemodal.component.vue';
import ImageUploadComponent from '../component/shared/imageupload.component.vue';
import NumberChooser from '../component/shared/numberchooser.component.vue';
import { ScreenSize, NotificationType, UserRole, UserAction } from '../model/enum';
import { detectScreenSize } from '../service/screen.service';
import AvailabilityComponent from '../component/booking/availability.component.vue';

Vue.use(VeeValidate);

@Component({
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

export default class ListingPage extends Vue{
    @Prop listingType: string;

    selectedLocation: AutocompleteItem;
    formSubmitted = false;
    isOffer: boolean = false;
    isEditing: boolean = false;
    editingSchedule: ScheduleModel = null;
    isStickyBoxRequired: boolean = true;

    $mq: any;
    $auth: any;

    modelCache: any = null;

    asyncData({ store, route }) {
        if (route.params.listingId) {
            return store.dispatch('FETCH_LISTING_BY_ID', route.params.listingId);
        } else {
            return store.dispatch('CREATE_LISTING', route.params.listingType);
        }
    }

    get model() {
        if (this.$store.state.listing instanceof ListingModel) {
            this.isOffer = this.$store.state.listing.type == ListingType.Offer;
            return this.$store.state.listing;
        }

        //Bodom: comeback
        this.isOffer = this.listingType.toUpperCase() === ListingType[ListingType.Offer].toUpperCase();
        return new ListingModel();
    }

    get showScheduleModal() {
        return this.$store.state.showScheduleModal;
    }

    mounted() {
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

        if (!(this.$route.params as any).listingId) {
            this.isEditing = true;
        }
    }

    get canEdit() {
        // Create new listing
        if (!(this.$route.params as any).listingId && !this.model.id && this.$store.state.loggedInUser) {
            return true;
        }

        if (this.model.tourOperators) {
            var primaryUser = this.model.tourOperators.filter(x => x.isPrimary === true);
            if (primaryUser.length > 0) {
                return this.$auth.check(UserRole.Editor, primaryUser[0].id, UserAction.Edit);
            }            
        }

        return false;
    }

    onUploadImageCompleted() {
        if (this.canEdit) {
            (this.model as any).imageList = this.$store.state.listing.imageList;
            (this.$children.find(x => x.$el.id === 'imageupload').$children[0] as any).refresh();
            this.$store.dispatch('ADD_NOTIFICATION', { title: "Upload finish", type: NotificationType.Success });            
        }
    }

    onInsertorUpdate() {
        this.isEditing = false;
        if (this.canEdit) {
            this.$validator.validateAll().then(() => {
                this.$store.dispatch("ENABLE_LOADING");
                if (this.model.id > 0) {
                    return this.$store.dispatch('UPDATE_LISTING', this.contructBeforeSubmit(this.model))
                        .then(() => this.$store.dispatch("DISABLE_LOADING"))
                        .catch(err => {
                            this.$store.dispatch("DISABLE_LOADING");
                            this.$store.dispatch('ADD_NOTIFICATION', { title: "Cannot update this listing. We are on it !", type: NotificationType.Error });
                            this.onCancelEdit();
                        });
                } else {
                    return this.$store.dispatch('INSERT_LISTING', this.contructBeforeSubmit(this.model))
                        .then(listingId => {
                            this.$store.dispatch("DISABLE_LOADING");
                            this.$router.push({
                                name: 'listingDetail',
                                params: { seoString: Utils.seorizeString(this.model.header), listingId: listingId }
                            });
                        })
                        .catch(err => {
                            this.$store.dispatch("DISABLE_LOADING");
                            this.$store.dispatch('ADD_NOTIFICATION', { title: "Cannot update this listing. We are on it !", type: NotificationType.Error });
                            this.onCancelEdit();
                        });
                }            
            }).catch(() => {
                alert('Correct them errors!');
            });
        }
    }

    onEdit() {
        if (this.canEdit) {
            this.isEditing = true;
            this.modelCache = JSON.parse(JSON.stringify(this.model));
        }
    }

    onCancelEdit() {
        this.isEditing = false;
        Object.assign(this.model, this.modelCache);
        this.modelCache = null;
    }

    onLocationSelected(item: AutocompleteItem) {
        this.model.locationDetail = item;
    }

    onUserAdded(user: AutocompleteItem) {
        this.$store.dispatch("INSERT_LISTING_OPERATOR", new MiniProfile(user.id, user.name, '', '', user.imageUrl, ''));
    }

    onUserRemoved(user) {
        this.$store.dispatch("REMOVE_LISTING_OPERATOR", user);
    }

    checkAvailability(schedule) {
        this.$router.push({ name: "booking" });

        //var bookingDayPanel = this.$children.find(x => x.$el.id === "availDay");
        //if (bookingDayPanel) {
        //    (bookingDayPanel as any).togglePanel();
        //}
    }

    onSaveSchedule(scheduleObject) {
        console.log(scheduleObject);
    }

    onEditSchedule(scheduleObject) {
        this.editingSchedule = scheduleObject;
        this.$store.dispatch('SHOW_SCHEDULE_MODAL', scheduleObject);
    }

    onHideScheduleModal() {
        this.$store.dispatch('HIDE_SCHEDULE_MODAL');
    }

    constructShedule(model) {
        var schedules = model.schedules;

        var scheduleArr = [];
        for (var i = 0; i < schedules.length; i++) {
            var schedule = schedules[i];

            if (Array.isArray(schedule.dateRange)) {
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
                endDate: Utils.getDate(new Date(schedule.endDate))
            });
        }

        return scheduleArr;
    }

    constructParticipants(listingId: number, model: any) {
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
    }

    contructBeforeSubmit(model: ListingModel) {
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
        }
    }
}
