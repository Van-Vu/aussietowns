import { Component } from '@angular/core';
import { isBrowser } from 'angular2-universal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { IMyOptions, IMyDateModel } from 'mydatepicker';
import { ListingService } from '../../services/listing.service';

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

    constructor(private fb: FormBuilder, private listingService: ListingService, private route: ActivatedRoute) {    }

    ngOnInit() {
        console.log(Date.now());
        let date = new Date();

        this.model = this.fb.group({
            Id:[''],
            BeginDate: [{ date: { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() } }, [Validators.required]],
            EndDate: [{ date: { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() } }, [Validators.required]],
            Budget: ['', [Validators.required]],
            Currency: ['0'],
            Location: ['', [Validators.required]],
            Header: ['', [Validators.required]],
            Description: [''],
            MinParticipant: ['0']
        });

        this.sub = this.route.params.subscribe(params => {
            this.tourId = +params['id'] | 0; // (+) converts string 'id' to a number
            if (this.tourId > 0) {
                this.isNew = false;
                if (isBrowser) {
                    this.listingService.getListingById(this.tourId).subscribe(
                        data => {
                            this.model.controls['Id'].setValue(data.Data.Id);
                            this.model.controls['Budget'].setValue(data.Data.Budget);
                            this.model.controls['Currency'].setValue(data.Data.Currency);
                            this.model.controls['Location'].setValue(data.Data.Location);
                            this.model.controls['Header'].setValue(data.Data.Header);
                            this.model.controls['Description'].setValue(data.Data.Description);
                            this.model.controls['MinParticipant'].setValue(data.Data.MinParticipant);
                            let beginDate = new Date(data.Data.BeginDate);
                            this.model.controls['BeginDate'].setValue(
                            {
                                date: { year: beginDate.getFullYear(), month: beginDate.getMonth() + 1, day: beginDate.getDate() } 
                            });
                            let endDate = new Date(data.Data.EndDate);
                            this.model.controls['EndDate'].setValue(
                            {
                                date: { year: endDate.getFullYear(), month: endDate.getMonth() + 1, day: endDate.getDate()}
                            });
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
        let copy: IMyOptions = this.getCopyOfOptions(this.endDatePickerOptions);
        copy.disableUntil = {
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            day: d.getDate()
        };
        this.endDatePickerOptions = copy;
    }

    onInsert() {
        let model = this.contructBeforeSubmit(this.model.value);
        delete model.Id;
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

    // Returns copy of myOptions
    getCopyOfOptions(option: IMyOptions): IMyOptions {
        return JSON.parse(JSON.stringify(option));
    }

    contructBeforeSubmit(model) {
        return {
            Id: model.Id,
            BeginDate: model.BeginDate.date.year + ' ' + model.BeginDate.date.month + ' ' + model.BeginDate.date.day,
            EndDate: model.EndDate.date.year + ' ' + model.EndDate.date.month + ' ' + model.EndDate.date.day,
            Budget: model.Budget,
            Currency: model.Currency,
            Description: model.Description,
            Header: model.Header,
            LocationId: model.Location.id,
            MinParticipant: model.MinParticipant
        }
    }
}
