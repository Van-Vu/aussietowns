import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../model/user'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { forbiddenNameValidator } from '../../shared/email.validator';

import { AlertService } from "../../services/alert.service";
import { UserService } from '../../services/user.service';
import { SearchService } from '../../services/search.service';

@Component({
    selector: 'registrationform',
    template: require('./registrationform.component.html'),
    styles: [require('./registrationform.component.css')]
})

export class RegistrationFormComponent{
    @Output() isRegistered = new EventEmitter<any>();

    powers = ['Really Smart', 'Super Flexible',
        'Super Hot', 'Weather Changer'];
    model: FormGroup;
    loading = false;
    searchLocations: any;
    
    constructor(private fb: FormBuilder, private userService: UserService,
        private alertService: AlertService, private router: Router, private searchService: SearchService) { }

    ngOnInit() {
        this.model = this.fb.group({
            firstName: ['', [Validators.required, Validators.minLength(2)]],
            lastName: ['', [Validators.required, Validators.minLength(2)]],
            locationId: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [forbiddenNameValidator()]],
            password: ['', [Validators.required, Validators.minLength(7)]],
            phone: ['', [Validators.required, Validators.minLength(2)]]
        });

        this.model.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged(); // (re)set validation messages now
    }

    submitted = false;
    onRegistration({ value, valid }: { value: User, valid: boolean }) {
        this.submitted = true;
        //console.log(value, valid);
        this.loading = true;
        this.userService.create(this.model.value)
            .subscribe(
            data => {
                this.alertService.success('Registration successful', true);
                //this.router.navigate(['/login']);
                this.isRegistered.emit(true);
            },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
                this.isRegistered.emit(false);
            });

        //this.userService.getUserInfo().subscribe(
        //    data => {
        //        var abc = data;
        //    }
        //);
    }

    onLocationSearch(search) {
        this.searchService.autoComplete(search).subscribe((response: any) => {
            this.searchLocations = response;
        });
    }

    onValueChanged(data?: any) {
        if (!this.model) { return; }
        const form = this.model;

        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    formErrors = {
        'Email': ''
    };

    validationMessages = {
        'Email': {
            'required': 'Name is required.',
            'minlength': 'Name must be at least 4 characters long.',
            'maxlength': 'Name cannot be more than 24 characters long.',
            'forbiddenName': 'Invalid email.'
        },
        'power': {
            'required': 'Power is required.'
        }
    };
}
