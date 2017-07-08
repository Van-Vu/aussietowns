import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import VeeValidate from 'vee-validate';
import { AutocompleteItem } from '../model/autocomplete.model';
import ScheduleComponent from '../component/shared/schedule.component.vue';
import ParticipantComponent from '../component/shared/participant.component.vue';
import ListingModel from '../model/listing.model';
import MiniProfile from '../model/miniprofile.model';
import LocationSearchComponent from '../component/shared/search/locationsearch.component.vue';
import ListingService from '../service/listing.service';
import { Utils } from '../component/utils';
import { ListingType } from '../model/enum';
import datepicker from '../component/shared/external/datepicker.vue';
import ScheduleModel from '../model/schedule.model';
import ScheduleModalComponent from '../component/modal/schedulemodal.component.vue';

Vue.use(VeeValidate);

@Component({
    name: 'ListingPage',
    components: {
        "locationsearch": LocationSearchComponent,
        "participant": ParticipantComponent,
        "datepicker": datepicker,
        "schedulemodal": ScheduleModalComponent
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

    model: ListingModel = new ListingModel();

    asyncData({ store, route }) {
        if (route.params.listingId) {
            return store.dispatch('FETCH_LISTING_BY_ID', route.params.listingId);
        }
    }

    beforeRouteEnter(to, from, next) {
        //console.log('execute beforeRouteEnter: ' + to.params.seoString);
        //next(vm => vm.setListingId(1));
        next();
    }

    setListingId(id) {
        //this.listingId = id;
        //console.log("here I am:" + this.listingId);
    }
    

    created() {
        if (this.listingType) {
            this.isOffer = Utils.listingTypeConvert(this.listingType) === ListingType.Offer;
        }

        if (this.$store.state.listing) {
            this.model = this.$store.state.listing;
            this.isOffer = this.model.listingType == ListingType.Offer;
        } else {
            if (this.$route.params.listingId) {
                this.$store.dispatch('FETCH_LISTING_BY_ID', this.$route.params.listingId).then(() => {
                    this.model = this.$store.state.listing;
                    this.isOffer = this.model.listingType == ListingType.Offer;
                });                
            }
        }         

        this.$store.dispatch('SET_CURRENT_PAGE', 'listing');
    }

    onInsertorUpdate() {
        if (this.model.id > 0) {
            return this.$store.dispatch('UPDATE_LISTING', this.contructBeforeSubmit(this.model));        
        } else {
            return this.$store.dispatch('INSERT_LISTING', this.contructBeforeSubmit(this.model));        
        }
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

    onSaveSchedule(scheduleObject) {
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
                startDate: schedule.startDate + 'T' + schedule.startTime.HH + ':' + schedule.startTime.mm,
                duration: schedule.duration.HH + ':' + schedule.duration.mm,
                repeatedType: schedule.repeatedType,
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
