import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe.js'

import { isBrowser } from 'angular2-universal';

import { ListingService } from '../../services/listing.service';
import { User } from '../../model/user';
import { Utils, ListingType } from '../../shared/utils';
import { SearchService } from '../../services/search.service';
import { CookieFactory } from '../mock/cookieFactory';

@Component({
    selector: 'listingofferform',
    template: require('./listingofferform.component.html'),
    styles: [require('./listingofferform.component.css')]
})

export class ListingOfferFormComponent {
    //Bodom: doesn't work on refresh'
    //Bodom: validate datetime
    //Bodom: local time conversion: synch server vs client time conversion

    model: FormGroup;

    dateMask: any;
    //public get autoCorrectedDatePipe(): any { return createAutoCorrectedDatePipe('mm/dd/yyyy hh:mm'); }
    isFullday: boolean = false;
    isNew = true;
    private sub: any;
    tourId: number = 0;
    hostList: any[]=[];
    guestList: any[]=[];
    searchLocations: any;

    constructor(private fb: FormBuilder, private listingService: ListingService,
        private route: ActivatedRoute, private userService: UserService, private searchService: SearchService) { }

    ngOnInit() {
        this.model = this.fb.group({
            id: [0],
            type: [ListingType.Offer],
            operators: this.fb.array([]),
            guests: this.fb.array([]),
            schedules: this.fb.array([]),
            locationId: ['', [Validators.required]],
            cost: ['', [Validators.required]],
            header: ['', [Validators.required]],
            description: [''],
            requirement: [''],
            minParticipant: ['']
        });
        //this.initShedule();

        //this.addOperator();

        this.dateMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/];
        console.log(this.route.params);
        this.sub = this.route.params.subscribe(params => {
            this.tourId = +params['id'] | 0; // (+) converts string 'id' to a number
            if (this.tourId > 0) {
                this.isNew = false;
                this.listingService.getListingById(this.tourId).subscribe(
                    data => {
                        this.model.controls['id'].setValue(data.id);
                        this.model.controls['locationId'].setValue({ id: data.locationDetail.id, name: data.locationDetail.name });
                        this.model.controls['cost'].setValue(data.cost);
                        this.model.controls['header'].setValue(data.header);
                        this.model.controls['description'].setValue(data.description);
                        this.model.controls['requirement'].setValue(data.requirement);
                        this.model.controls['minParticipant'].setValue(data.minParticipant);
                        for (var i = 0; i < data.tourOperators.length; i++) {
                            this.addOperator(data.tourOperators[i]);
                        }
                        for (var i = 0; i < data.schedules.length; i++) {
                            this.applySchedule(data.schedules[i]);
                        }
                    });
            } else {
                let userId = CookieFactory.check("userId");
                if (userId) {
                    this.userService.getMiniProfile(+CookieFactory.get("userId"))
                    .subscribe(
                        data => this.addOperator(data),
                        error => {

                        });
                }
                this.initEmptyShedule();
            }
        });
    }

    private ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onInsert() {
        console.log(this.contructBeforeSubmit(this.model.value));
        let model = this.contructBeforeSubmit(this.model.value);
        delete model.id;
        this.listingService.addListing(model)
            .subscribe(
            data => {
                if (data.State == 1) {
                }
                else {
                    alert(data.Msg);
                }

                console.log(data.Data);
            },
            error => {

            });
    }

    onUpdate() {
        this.listingService.updateListing(this.contructBeforeSubmit(this.model.value))
            .subscribe(
            data => {
                if (data.State == 1) {
                }
                else {
                    alert(data.Msg);
                }

                console.log(data.Data);
            },
            error => {

            });
    }

    onLocationSearch(search) {
        this.searchService.autoComplete(search).subscribe((response: any) => {
            this.searchLocations = response;
        });
    }

    fulldayChange() {
        this.isFullday = !this.isFullday;
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
        const control = this.model.controls['operators'].value;

        control.push(miniProfile);
    }

    initEmptyShedule() {
        const control = <FormArray>this.model.controls['schedules'];

        control.push(this.fb.group({
            id: [0],
            startDate: [''],
            startTime: [''],
            duration: [''],
            isRepeated: [false],
            repeatPeriod: [''],
            endDate: ['']
        }));
    }

    applySchedule(schedule) {
        const control = <FormArray>this.model.controls['schedules'];
        var startDate = new Date(schedule.startDate);
        var endDate = schedule.endDate == '' ? null : new Date(schedule.endDate);
        control.push(this.fb.group({
            id:[schedule.id],
            startDate: [{ date: { year: startDate.getFullYear(), month: startDate.getMonth() + 1, day: startDate.getDate() } }],
            startTime: [schedule.startTime.substr(0,5)],
            duration: [schedule.duration.substr(0,5)],
            isRepeated: [schedule.repeatedType && schedule.repeatedType !== 0],
            repeatPeriod: [schedule.repeatedType],
            endDate: [endDate ? { date: { year: endDate.getFullYear(), month: endDate.getMonth() + 1, day: endDate.getDate() } } : '']
        }));
    }

    removeAddress(i: number) {
        const control = <FormArray>this.model.controls['schedules'];
        control.removeAt(i);
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


        return {
            id: model.id,
            type: ListingType.Offer,
            locationId: model.locationId.id,
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
