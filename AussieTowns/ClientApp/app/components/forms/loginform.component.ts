import { Component, ViewChild, EventEmitter, Output } from '@angular/core';

import { User } from '../../model/user'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalFrameComponent } from './modalframe.component';

import { forbiddenNameValidator } from '../../shared/email.validator';

import { UserService } from '../../services/user.service';

@Component({
    selector: 'loginform',
    template: require('./loginform.component.html'),
    styles: [require('./loginform.component.css')]
})

export class LoginFormComponent {
    @ViewChild(ModalFrameComponent) modal: ModalFrameComponent;
    model: FormGroup;
    @Output() isLoggedIn = new EventEmitter<string>();


    constructor(private fb: FormBuilder, private userService: UserService) {}

    ngOnInit() {
        this.model = this.fb.group({
            Email: ['', [forbiddenNameValidator()]],
            Password: ['', [Validators.required, Validators.minLength(7)]],
        });

        this.model.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged(); // (re)set validation messages now
    }

    submitted = false;
    onLogin() {
        this.userService.login(this.model.value)
            .subscribe(
            data => {
                if (data.State == 1) {
                    this.isLoggedIn.emit(data.Data.username);
                    this.modal.hide();
                }
                else {
                    this.isLoggedIn.emit(null);
                    alert(data.Msg);
                }

                console.log(data.Data);
            },
            error => {

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
        }
    };
}
