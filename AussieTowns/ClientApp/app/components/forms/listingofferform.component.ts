import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe.js'

import { isBrowser } from 'angular2-universal';

import { ListingService } from '../../services/listing.service';
import { User } from '../../model/user';
import { Utils } from '../../shared/utils';

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
    hostList: User[]=[];
    guestList: User[]=[];
    
    constructor(private fb: FormBuilder, private listingService: ListingService, private route: ActivatedRoute, private userService: UserService) {}

    ngOnInit() {
        this.model = this.fb.group({
            Id: [''],
            TourOperators: [''],
            TourGuests: [''],
            Time: ['', [Validators.required]],
            Location: ['', [Validators.required]],
            Cost: ['', [Validators.required]],
            Header: ['', [Validators.required]],
            Hour: [''],
            Minute: [''],
            Description: [''],
            Requirement: [''],
            MinParticipant: ['']
        });

        this.dateMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/];

        this.sub = this.route.params.subscribe(params => {
            this.tourId = +params['id'] | 0; // (+) converts string 'id' to a number
            if (this.tourId > 0) {
                this.isNew = false;
                this.listingService.getListingById(this.tourId).subscribe(
                    data => {
                        this.model.controls['Id'].setValue(data.Data.Id);
                        this.model.controls['Time'].setValue(Utils.getDateTime(data.Data.Time));
                        this.model.controls['Location'].setValue(data.Data.Location);
                        this.model.controls['Cost'].setValue(data.Data.Cost);
                        this.model.controls['Header'].setValue(data.Data.Header);
                        this.model.controls['Hour'].setValue(data.Data.Hour);
                        this.model.controls['Minute'].setValue(data.Data.Minute);
                        this.model.controls['Description'].setValue(data.Data.Description);
                        this.model.controls['Requirement'].setValue(data.Data.Requirement);
                        this.model.controls['MinParticipant'].setValue(data.Data.MinParticipant);

                        this.model.controls['TourOperators'].setValue(this.hostList);
                        this.model.controls['TourGuests'].setValue(this.guestList);
                    });
            }
        });
    }

    private ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onInsert() {
        let model = this.model.value;
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
        this.listingService.updateListing(this.model.value)
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

    fulldayChange() {
        this.isFullday = !this.isFullday;
    }
}
