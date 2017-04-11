import { Component } from '@angular/core';
import { isBrowser } from 'angular2-universal';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../../services/user.service';

import { IMyOptions, IMyDateModel } from 'mydatepicker';
import { ListingService } from '../../services/listing.service';
import { ListingType } from '../../shared/utils';
import { SearchService } from '../../services/search.service';
import { CookieFactory } from '../mock/cookieFactory';

@Component({
    selector: 'listingrequestform',
    template: require('./listingrequestform.component.html'),
    styles: [require('./listingrequestform.component.css')]
})

export class ListingRequestFormComponent {
    model: FormGroup;

    tourId: number = 0;
    isNew = true;
    private sub: any;
    searchLocations: any;

    private beginDatePickerOptions: IMyOptions = {
        dateFormat: 'dd/mm/yyyy',
        height: '34px',
        width: '250px',
        showTodayBtn: true,
        showClearDateBtn: false,
        markCurrentDay: true
    };

    private endDatePickerOptions: IMyOptions = {
        dateFormat: 'dd/mm/yyyy',
        height: '34px',
        width: '250px',
        showTodayBtn: true,
        showClearDateBtn: false,
        markCurrentDay: true
    };

    constructor(private fb: FormBuilder, private listingService: ListingService,
        private route: ActivatedRoute, private searchService: SearchService, private userService: UserService) { }

    ngOnInit() {
        console.log(Date.now());
        let date = new Date();

        this.model = this.fb.group({
            id: [0],
            type: [ListingType.Request],
            guests: this.fb.array([]),
            scheduleid: [0],
            startDate: [{ date: { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() } }, [Validators.required]],
            endDate: [{ date: { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() } }, [Validators.required]],
            cost: ['', [Validators.required]],
            currency: ['0'],
            locationId: ['', [Validators.required]],
            header: ['', [Validators.required]],
            description: [''],
            minParticipant: ['0']
        });

        this.sub = this.route.params.subscribe(params => {
            this.tourId = +params['id'] | 0; // (+) converts string 'id' to a number
            if (this.tourId > 0) {
                this.isNew = false;
                if (isBrowser) {
                    this.listingService.getListingById(this.tourId).subscribe(
                        data => {
                            this.model.controls['id'].setValue(data.id);
                            this.model.controls['cost'].setValue(data.cost);
                            this.model.controls['currency'].setValue(data.currency);
                            this.model.controls['locationId'].setValue({ id: data.locationDetail.id, name: data.locationDetail.name}),
                            this.model.controls['header'].setValue(data.header);
                            this.model.controls['description'].setValue(data.description);
                            this.model.controls['minParticipant'].setValue(data.minParticipant);
                            for (var i = 0; i < data.tourGuests.length; i++) {
                                this.addGuest(data.tourGuests[i]);
                            }
                            for (var i = 0; i < data.schedules.length; i++) {
                                this.applySchedule(data.schedules[i]);
                            }
                        });
                }

            } else {
                let userId = CookieFactory.check("userId");
                if (userId) {
                    this.userService.getMiniProfile(+CookieFactory.get("userId"))
                        .subscribe(
                        data => this.addGuest(data),
                        error => {

                        });
                }
            }
        });
    }

    private ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onBeginDateChanged(event: IMyDateModel) {
        let d: Date = event.jsdate;

        // set previous of selected date
        d.setDate(d.getDate() - 1);

        // Get new copy of options in order the date picker detect change
        let copy: IMyOptions = JSON.parse(JSON.stringify(this.endDatePickerOptions));
        copy.disableUntil = {
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            day: d.getDate()
        };
        this.endDatePickerOptions = copy;
    }

    onInsert() {
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

    applySchedule(schedule) {
        var startDate = new Date(schedule.startDate);
        var endDate = schedule.endDate == '' ? null : new Date(schedule.endDate);

        this.model.controls['scheduleid'].setValue(schedule.id);
        this.model.controls['startDate'].setValue({
            date: { year: startDate.getFullYear(), month: startDate.getMonth() + 1, day: startDate.getDate() }
        });

        this.model.controls['endDate'].setValue({
            date: { year: endDate.getFullYear(), month: endDate.getMonth() + 1, day: endDate.getDate() }
        });
    }

    addGuest(miniProfile) {
        const control = this.model.controls['guests'].value;

        control.push(miniProfile);
    }

    constructGuestList(model) {
        var guests = model.guests;

        var guestsArr = [];
        for (var i = 0; i < guests.length; i++) {
            var guest = guests[i];
            guestsArr.push({
                listingId: model.id,
                userId: guest.id,
                isOwner: (i == 0) ? true : false
            });
        }

        return guestsArr;
    }

    constructShedule(model) {
        var scheduleArr = [];
        scheduleArr.push({
            id: model.scheduleid,
            duration: "0",
            startDate: model.startDate.date.year + '/' + model.startDate.date.month + '/' + model.startDate.date.day,
            endDate: model.endDate.date.year + '/' + model.endDate.date.month + '/' + model.endDate.date.day
        });

        return scheduleArr;
    }

    contructBeforeSubmit(model) {
        return {
            id: model.id,
            type: model.type,
            schedules: this.constructShedule(model),
            cost: model.cost,
            currency: model.currency,
            description: model.description,
            header: model.header,
            locationId: model.locationId.id,
            minParticipant: model.minParticipant,
            tourOperators: [],
            tourGuests: this.constructGuestList(model)
        }
    }
}
