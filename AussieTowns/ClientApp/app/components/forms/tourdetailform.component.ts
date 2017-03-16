import { Component } from '@angular/core';
//import { User } from '../../model/user'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { UserService } from '../../services/user.service';

import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe.js'
import { CompleterService, CompleterData, RemoteData } from 'ng2-completer';

@Component({
    selector: 'tourdetailform',
    template: require('./tourdetailform.component.html'),
    styles: [require('./tourdetailform.component.css')]
})

export class TourDetailFormComponent {
    //Bodom: doesn't work on refresh'

    model: FormGroup;
    public get dateMask(): any { return [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/]; }
    public get autoCorrectedDatePipe(): any { return createAutoCorrectedDatePipe('mm/dd/yyyy'); }
    isFullday: boolean = false;

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

    constructor(private fb: FormBuilder, private completerService: CompleterService) {
        this.dataService = completerService.local(this.searchData, 'color', 'color'); 
    }

    ngOnInit() {
        this.model = this.fb.group({
            Time: ['', [Validators.required]],
            Location: ['', [Validators.required]],
            Duration: ['', [Validators.required]],
            Header: ['', [Validators.required]],
            Hours: [''],
            Minutes: [''],
            Expectation: [''],
            Requirements: [''],
            Participants: ['']
        });
    }

    fulldayChange() {
        this.isFullday = !this.isFullday;
    }
}
