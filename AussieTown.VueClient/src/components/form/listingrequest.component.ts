import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import VeeValidate from 'vee-validate';
import { ListingType } from '../shared/utils';
import AutoCompleteComponent from '../autocomplete/autocomplete.vue';
import { AutocompleteItem } from '../autocomplete/autocomplete.model';

Vue.use(VeeValidate);

@Component({
    name: 'ListingRequest',
    components: {
        'autocomplete': AutoCompleteComponent
    }
})

export default class ListingRequestForm extends Vue {
    dateMask: any;
    tourId: number = 0;
    hostList: any[] = [];
    searchLocations: any;

    list: any[] = [];
    searchStr: string = "";
    selectedId: number = 0;
    placeHolderText = "this is the test";


    id = 0;
    type = ListingType.Request;
    operators = [];
    guests = [];
    schedules = [];
    location = '';
    cost = 0;
    header = '';
    description = '';
    expectation = '';
    requirement = '';
    minParticipant = 0;

    selectedLocation: AutocompleteItem;
    formSubmitted = false;

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

    onLocationSearch(search) {
        //this.searchService.autoComplete(search).subscribe((response: any) => {
        //    this.searchLocations = response;
        //});
    }

    fulldayChange() {
        //this.isFullday = !this.isFullday;
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
                startDate: schedule.startDate.date.year + '/' + schedule.startDate.date.month + '/' + schedule.startDate.date.day + 'T' + schedule.startTime,
                duration: schedule.duration,
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
                isOwner: (i == 0) ? true : false
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


        //return {
        //    id: model.id,
        //    type: ListingType.Offer,
        //    locationId: model.locationId.id,
        //    cost: model.cost,
        //    currency: model.currency,
        //    header: model.header,
        //    description: model.description,
        //    requirement: model.requirement,
        //    minParticipant: model.minParticipant,
        //    schedules: this.constructShedule(model),
        //    tourOperators: this.constructOperator(model)
        //}
    }
}
