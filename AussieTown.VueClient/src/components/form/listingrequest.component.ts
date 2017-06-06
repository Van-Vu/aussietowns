import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import VeeValidate from 'vee-validate';
import { ListingType } from '../shared/utils';
import AutoCompleteComponent from '../shared/autocomplete.vue';
import { AutocompleteItem } from '../model/autocomplete.model';
import ListingModel from '../model/listing.model';
import LocationSearchComponent from '../shared/locationsearch.component.vue';
import ParticipantComponent from '../shared/participant.component.vue';
import ListingService from '../../services/listing.service';
import MiniProfile from '../model/miniprofile.model';

Vue.use(VeeValidate);

@Component({
    name: 'ListingRequest',
    components: {
        'locationsearch': LocationSearchComponent,
        'participant': ParticipantComponent
    }
})

export default class ListingRequestForm extends Vue {
    asyncData({ store, route }) {
        // return the Promise from the action
        console.log('here II am: :' + store.state);
        return store.dispatch('FETCH_LISTING', 18);
    }

    selectedLocation: AutocompleteItem;
    formSubmitted = false;

    model: ListingModel = new ListingModel();

    created() {
        this.model = this.$store.state.listings[0].data;
    }

    onInsertorUpdate() {
        //Bodom: hack
        this.model.id = 0;

        (new ListingService()).addListing(this.contructBeforeSubmit(this.model));
    }

    onInsert() {
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
    }

    onUpdate() {
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
    }

    onLocationSelected(item: AutocompleteItem) {
        this.model.locationDetail = item;
    }

    onUserAdded(user: AutocompleteItem) {
        if (this.model.tourGuests == null) this.model.tourGuests = new Array<MiniProfile>();
        this.model.tourGuests.push(new MiniProfile(user.id, user.name, '', '', user.imageUrl, ''));
    }

    onUserRemoved(user) {

    }

    initOperator() {
        return {
            Selected: true,
            description: null,
            id: 1,
            imageUrl: "/asset/images/home-icon.png",
            name: "asdfa bodom5"
        }
    }

    constructShedule(model) {
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
    }

    constructOperator(model) {
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
    }

    contructBeforeSubmit(model) {
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
        }
    }
}
