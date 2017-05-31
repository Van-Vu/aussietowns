import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import VeeValidate from 'vee-validate';
import { ListingType } from '../shared/utils';
import AutoCompleteComponent from '../shared/autocomplete.vue';
import { AutocompleteItem } from '../model/autocomplete.model';
import ScheduleComponent from '../shared/schedule.component.vue';
import ParticipantComponent from '../shared/participant.component.vue';
import ListingModel from '../model/listing.model';
import MiniProfile from '../model/miniprofile.model';
import LocationSearchComponent from '../shared/locationsearch.component.vue';
import ListingService from '../../services/listing.service';

Vue.use(VeeValidate);

@Component({
    name: 'ListingOffer',
    components: {
        'locationsearch': LocationSearchComponent,
        'schedule': ScheduleComponent,
        'participant': ParticipantComponent
    }
})

export default class ListingOfferForm extends Vue{
    //dateMask: any;
    //tourId: number = 0;
    //hostList: any[] = [];
    //searchLocations: any;

    //id= 0;
    //type= ListingType.Offer;
    //operators = [
    //    {
    //        id: 1,
    //        photoUrl: "/static/images/logo.png",
    //        fullname: "asdfasdfas",
    //        shortDescription: "asdfasdfa"
    //    }
    //];
    //guests= [];
    //schedules=[];
    //location='';
    //cost=0;
    //header='';
    //description = '';
    //expectation = '';
    //requirement='';
    //minParticipant=0;

    selectedLocation: AutocompleteItem;
    formSubmitted = false;

    model: ListingModel = new ListingModel();

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

    fulldayChange() {
        //this.isFullday = !this.isFullday;
    }

    onUserAdded(user: AutocompleteItem) {
        if (this.model.tourOperators == null) this.model.tourOperators= new Array<MiniProfile>();
        this.model.tourOperators.push(new MiniProfile(user.id, user.name, '', '', user.imageUrl, ''));
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

    addOperator(miniProfile) {
        //const control = this.model.controls['operators'].value;

        //control.push(miniProfile);
    }

    initEmptyShedule() {
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
    }

    applySchedule(schedule) {
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
    }

    removeAddress(i: number) {
        //const control = <FormArray>this.model.controls['schedules'];
        //control.removeAt(i);
    }


    constructShedule(model) {
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
    }

    constructOperator(model: ListingModel) {
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
        }
    }
}
