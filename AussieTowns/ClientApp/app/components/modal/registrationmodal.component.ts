import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../model/user'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CompleterService, CompleterData, RemoteData, CompleterItem } from 'ng2-completer';

import { ModalFrameComponent } from './modalframe.component';

import { forbiddenNameValidator } from '../../shared/email.validator';

import { AlertService } from "../../services/alert.service";
import { UserService } from '../../services/user.service';

@Component({
    selector: 'registrationmodal',
    template: require('./registrationmodal.component.html')
})

export class RegistrationModalComponent{
    @ViewChild(ModalFrameComponent) modal: ModalFrameComponent;

    handleRegistration(event) {
        if (event) {
            this.modal.hide();
        }
    }

    public show(): void {
        this.modal.show();
    }
}
