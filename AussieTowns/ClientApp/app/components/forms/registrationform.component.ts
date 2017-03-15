import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../model/user'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CompleterService, CompleterData, RemoteData } from 'ng2-completer';

import { ModalFrameComponent } from './modalframe.component';

import { forbiddenNameValidator } from '../../shared/email.validator';

import { AlertService } from "../../services/alert.service";
import { UserService } from '../../services/user.service';

@Component({
    selector: 'registrationform',
    template: require('./registrationform.component.html'),
    styles: [require('./registrationform.component.css')]
})

export class RegistrationFormComponent{
    @ViewChild(ModalFrameComponent) modal: ModalFrameComponent;

    powers = ['Really Smart', 'Super Flexible',
        'Super Hot', 'Weather Changer'];
    model: FormGroup;
    loading = false;

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
        private userService: UserService, private alertService: AlertService, private router: Router) {
        this.dataService = completerService.local(this.searchData, 'color', 'color');     
    }

    ngOnInit() {
        this.model = this.fb.group({
            FirstName: ['', [Validators.required, Validators.minLength(2)]],
            LastName: ['', [Validators.required, Validators.minLength(2)]],
            Location: ['', [Validators.required, Validators.minLength(2)]],
            Email: ['', [forbiddenNameValidator()]],
            Password: ['', [Validators.required, Validators.minLength(7)]],
            Phone: ['', [Validators.required, Validators.minLength(2)]]
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
                this.router.navigate(['/login']);
                this.modal.hide();
            },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });

        //this.userService.getUserInfo().subscribe(
        //    data => {
        //        var abc = data;
        //    }
        //);
    }

    newHero() {
        this.model = this.fb.group({
            FirstName: ['', [Validators.required, Validators.minLength(2)]],
            LastName: ['', [Validators.required, Validators.minLength(2)]],
            Location: ['', [Validators.required, Validators.minLength(2)]],
            Email: ['', [forbiddenNameValidator()]],
            Password: ['', [Validators.required, Validators.minLength(7)]],
            Phone: ['', [Validators.required, Validators.minLength(2)]]
        });
    }

    public show(): void {
        this.modal.show();
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
