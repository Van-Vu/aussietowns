import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe.js'
import { CompleterService, CompleterData, RemoteData } from 'ng2-completer';
import { isBrowser } from 'angular2-universal';

import { TourService } from '../../services/tour.service';
import { User } from '../../model/user';

@Component({
    selector: 'tourdetailform',
    template: require('./tourdetailform.component.html'),
    styles: [require('./tourdetailform.component.css')]
})

export class TourDetailFormComponent {
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

    private searchStr: string;
    private dataService: CompleterData;
    private searchData = [
        { color: 'red', value: '#f00' },
        { color: 'green', value: '#0f0' },
        { color: 'blue', value: '#00f' },
        { color: 'cyan', value: '#0ff' },
        { color: 'magenta', value: '#f0f' },
        { color: 'yellow', value: '#ff0' },
        { color: 'black', value: '#000' }
    ];

    constructor(private fb: FormBuilder, private completerService: CompleterService,
        private tourService: TourService, private route: ActivatedRoute, private userService: UserService) {
        this.dataService = completerService.local(this.searchData, 'color', 'color'); 
    }

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
                if (isBrowser) {
                    this.tourService.getOfferById(this.tourId).subscribe(
                        data => {
                            this.model.controls['Id'].setValue(data.Data.Id);
                            this.model.controls['Time'].setValue(this.transformDateFormat(data.Data.Time));
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
                    //this.userService.getUserInfo().subscribe(
                    //    data => {
                    //        this.hostList.push(data.Data);
                    //    });
                }
            }
        });
    }

    private ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onInsert() {
        let model = this.model.value;
        delete model.Id;
        this.tourService.addOffer(model)
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
        this.tourService.updateOffer(this.model.value)
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

    transformDateFormat(datetime) {
        var date = new Date(datetime);
        return this.ensureTwoDigit(date.getDate()) + '/' + this.ensureTwoDigit((date.getMonth()) + 1) + '/' + date.getFullYear()
            + ' ' + this.ensureTwoDigit(date.getHours()) + ':' + this.ensureTwoDigit(date.getMinutes());
    }

    ensureTwoDigit(value) {
        return ("0" + (value)).slice(-2);
    }
}
