import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../model/user'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CompleterService, CompleterData, RemoteData } from 'ng2-completer';


import { ModalFrameComponent } from './modalframe.component';

import { forbiddenNameValidator } from '../../shared/email.validator';

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
            firstName: ['', [Validators.required, Validators.minLength(2)]],
            lastName: ['', [Validators.required, Validators.minLength(2)]],
            location: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [forbiddenNameValidator()]],
            phone: ['', [Validators.required, Validators.minLength(2)]]
        });

        this.model.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged(); // (re)set validation messages now
    }

    submitted = false;
    onSubmit({ value, valid }: { value: User, valid: boolean }) {
        this.submitted = true;
        console.log(value, valid);
    }

    newHero() {
        this.model = this.fb.group({
            firstName: ['', [Validators.required, Validators.minLength(2)]],
            lastName: ['', [Validators.required, Validators.minLength(2)]],
            location: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.required, Validators.minLength(2)]],
            phone: ['', [Validators.required, Validators.minLength(2)]]
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
        'email': '',
        'power': ''
    };

    validationMessages = {
        'email': {
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
