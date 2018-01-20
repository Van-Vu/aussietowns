import Vue from "vue";
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
import ImageUploadComponent from '../component/shared/imageupload.component.vue';
import NumberChooser from '../component/shared/numberchooser.component.vue';
import { ScreenSize, NotificationType, UserRole, UserAction } from '../model/enum';
import { detectScreenSize } from '../service/screen.service';
import AvailabilityComponent from '../component/booking/availability.component.vue';
import VueMask from 'v-mask';

Vue.use(VueMask);
Vue.use(VeeValidate);

import vMediaQuery from '../component/shared/external/v-media-query';
Vue.use(vMediaQuery);

@Component({
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

export default class ListingPage extends Vue{
    @Prop() listingType: string;
    @Prop() seoString: string;

    selectedLocation: AutocompleteItem;
    isOffer: boolean = false;
    isEditing: boolean = false;
    isStickyBoxRequired: boolean = false;

    $mq: any;
    $auth: any;

    modelCache: any = null;

    static asyncData({ store, route }) {
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
        //this.isOffer = this.listingType.toUpperCase() === ListingType[ListingType.Offer].toUpperCase();
        return new ListingModel();
    }

    get showScheduleModal() {
        return this.$store.state.showScheduleModal;
    }

    get isLoggedIn() {
        return this.$store.getters.isLoggedIn;
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

    get firstImageUrl() {
        return this.model.imageList.length > 0 ? this.model.imageList[0].url : '';
    }

    get locationName() {
        if (!!this.model.locationDetail && !!this.model.locationDetail.name)
            return this.model.locationDetail.name;

        return '';
    }

    public metaInfo(): any {
        return {
            meta: [
                { vmid: 'description', name: 'description', content: this.model.description},
                { vmid: 'ogtitle', property: 'og:title', content: this.model.header },
                { vmid: 'ogurl', property: 'og:url', content: `${Utils.getCurrentHost()}${this.$route.fullPath}`},
                { vmid: 'ogdescription', property: 'og:description', content: this.model.description },
                { vmid: 'ogtype', property: 'og:type', content: 'listing' },
                { vmid: 'ogimage', property: 'og:image', content: this.firstImageUrl },
                { vmid: 'ogimagewidth', property: 'og:image:width', content: "630" },
                { vmid: 'ogimageheight', property: 'og:image:height', content: "355" },

                { vmid: 'twittertitle', property: 'twitter:title', content: this.model.header },
                { vmid: 'twitterdescription', property: 'twitter:description', content: this.model.description },
                { vmid: 'twitterimage', property: 'twitter:image', content: this.firstImageUrl }
            ],
            title: `${this.model.header} in ${this.locationName}`,
        };
    }

    created() {
        this.$validator.attach('location', 'required', this.model.locationDetail);
        this.$validator.attach('minParticipant', 'min_value:1', this.model.minParticipant);
    }

    mounted() {
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

        if (!(this.$route.params as any).listingId) {
            this.isEditing = true;
        }
    }

    onUploadImageCompleted() {
        if (this.canEdit) {
            (this.model as any).imageList = this.$store.state.listing.imageList;
            (this.$children.find(x => x.$el.id === 'imageupload').$children[0] as any).refresh();
            this.$store.dispatch('ADD_NOTIFICATION', { title: "Upload finish", type: NotificationType.Success });            
        }
    }

    onInsertorUpdate() {
        if (this.canEdit) {
            this.$validator.validateAll(this.model).then((result) => {
                if (result) {
                    this.$store.dispatch("ENABLE_LOADING");
                    if (this.model.id > 0) {
                        return this.$store.dispatch('UPDATE_LISTING', this.contructBeforeSubmit(this.model))
                            .then(() => {
                                this.$store.dispatch('ADD_NOTIFICATION',
                                    { title: "Update success", type: NotificationType.Success });
                                this.isEditing = false;
                            })
                            .catch(err => {
                                this.onCancelEdit();
                            })
                            .then(() => this.$store.dispatch("DISABLE_LOADING"));
                    } else {
                        return this.$store.dispatch('INSERT_LISTING', this.contructBeforeSubmit(this.model))
                            .then(listingId => {
                                this.model.id = listingId;

                                this.$router.push({
                                    name: 'listingDetail',
                                    params: { seoString: Utils.seorizeString(this.model.header), listingId: this.model.id }
                                });

                                this.$store.dispatch('ADD_NOTIFICATION',
                                {
                                    title: "Insert success. Please upload listing images",
                                    type: NotificationType.Success
                                    });

                                this.isEditing = false;
                            })
                            .catch(err => this.onCancelEdit())
                            .then(() => this.$store.dispatch("DISABLE_LOADING"));
                    }
                }
            }).catch((err) => {
                this.$store.dispatch("DISABLE_LOADING");
                alert('Correct them errors!');
                console.log(err);
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
        this.$store.dispatch("INSERT_LISTING_OPERATOR", new MiniProfile(user.id, user.name, '', '', user.imageUrl, '', false));
    }

    onUserRemoved(user) {
        this.$store.dispatch("REMOVE_LISTING_OPERATOR", user);
    }

    checkAvailability(schedule) {
        if (this.isLoggedIn) {
            this.$router.push({ name: "booking" });
        } else {
            Utils.handleXHRError(this.$store, {status: 403});
        }
    }

    onSaveSchedule(scheduleObject) {
    }

    onEditSchedule(scheduleObject) {
        this.$store.dispatch('SHOW_SCHEDULE_MODAL', scheduleObject);
    }

    onManageBooking() {
        this.$router.push({ name: 'bookingManage', params: { seoString: this.seoString, listingId: this.model.id } })    
    }

    onHideScheduleModal() {
        this.$store.dispatch('HIDE_SCHEDULE_MODAL');
    }

    onEnquire() {
        if (this.isLoggedIn) {
            let primaryHost = this.model.tourOperators.find(x => x.isPrimary == true)
            this.$store.dispatch('SHOW_CONTACT_MODAL',
                {
                    senderId: this.$store.state.loggedInUser.id,
                    receiverId: primaryHost.id,
                    receiverName: primaryHost.fullname,
                    listingId: this.model.id,
                    listingHeader: this.model.header
                });
        } else {
            Utils.handleXHRError(this.$store, { status: 403 });
        }

    }

    constructShedule(model) {
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
