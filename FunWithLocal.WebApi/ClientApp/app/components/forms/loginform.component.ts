﻿import { Component, ViewChild, EventEmitter, Output } from '@angular/core';

import { User } from '../../model/user'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { forbiddenNameValidator } from '../../shared/email.validator';

import { UserService } from '../../services/user.service';

@Component({
    selector: 'loginform',
    template: require('./loginform.component.html'),
    styles: [require('./loginform.component.css')]
})

export class LoginFormComponent {
    model: FormGroup;
    @Output() isLoggedIn = new EventEmitter<any>();


    constructor(private fb: FormBuilder, private userService: UserService) {}

    ngOnInit() {
        this.model = this.fb.group({
            email: ['', [forbiddenNameValidator()]],
            password: ['', [Validators.required, Validators.minLength(7)]],
        });

        this.model.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged(); // (re)set validation messages now
    }

    submitted = false;
    onLogin() {
        this.userService.login(this.model.value)
            .subscribe(
            data => this.isLoggedIn.emit({ id: data.userId, name: data.username }),
            error => {

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
        }
    };
}
