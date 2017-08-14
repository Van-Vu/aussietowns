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
import ScheduleModalComponent from '../component/modal/schedulemodal.component.vue';
import ImageUploadComponent from '../component/shared/imageupload.component.vue';
import NumberChooser from '../component/shared/numberchooser.component.vue';
import { ScreenSize, NotificationType } from '../model/enum';
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
    showScheduleModal: boolean = false;
    showAvailability: boolean = false;
    isStickyBoxRequired: boolean = true;

    $mq: any;

    modelCache: any = null;

    asyncData({ store, route }) {
        if (route.params.listingId) {
            return store.dispatch('FETCH_LISTING_BY_ID', route.params.listingId);
        }
    }

    get model() {
        this.isOffer = this.$store.state.listing.listingType == ListingType.Offer;
        return this.$store.state.listing;
    }

    created() {

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
    }

    onUploadImageCompleted() {
        (this.model as any).imageList = this.$store.state.listing.imageList;
        (this.$children.find(x => x.$el.id === 'imageupload').$children[0] as any).refresh();
        this.$store.dispatch('ADD_NOTIFICATION', { title: "Upload finish", type: NotificationType.Success });
    }

    onInsertorUpdate() {
        this.isEditing = false;
        if (this.model.id > 0) {
            return this.$store.dispatch('UPDATE_LISTING', this.contructBeforeSubmit(this.model));        
        } else {
            return this.$store.dispatch('INSERT_LISTING', this.contructBeforeSubmit(this.model));        
        }
    }

    onEdit() {
        this.isEditing = true;
        this.modelCache = Object.assign({}, this.model);
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
        if (this.model.tourOperators == null) this.model.tourOperators= new Array<MiniProfile>();
        this.model.tourOperators.push(new MiniProfile(user.id, user.name, '', '', user.imageUrl, ''));
    }

    onUserRemoved(user) {
        
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
        this.showScheduleModal = true;
    }

    constructShedule(model) {
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
    }

    constructParticipants(listingId: number, model: any) {
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
    }

    contructBeforeSubmit(model: ListingModel) {
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
        }
    }
}
