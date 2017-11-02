import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

import { User } from '../../model/user'

import { UserService } from '../../services/user.service';

import { FormBuilder } from '@angular/forms';

declare var google: any;

@Component({
    selector: 'tourparticipant',
    template: require('./tourparticipant.component.html')
})

export class TourParticipantComponent {
    @Input() users: any[];
    @Input('participantType') participantType: string;
    @Output() userAdded = new EventEmitter();
    @Output() userRemoved = new EventEmitter();

    searchUsers: any;
    isAdding = false;
    needCleanup: boolean = true;
    buttonText: string;

    constructor(private userService: UserService, private fb: FormBuilder) {}

    ngOnInit() {
        this.buttonText = "Add " + this.participantType;
    }

    toggleProfileSearch(event) {
        this.isAdding = !this.isAdding;
        if (this.isAdding) {
            this.buttonText = "Done";
        } else {
            this.buttonText = "Add " + this.participantType;
        }

        event.stopPropagation();
    }

    onUserSearch(search) {
        this.userService.search(search).subscribe((response: any) => {
            this.searchUsers = response;
        });
    }

    onUserSelected(user) {
        this.users.push(user);
        this.userAdded.emit(user);
    }

    onUserRemove(user) {
        this.users.splice(this.users.indexOf(user), 1);
        this.userRemoved.emit(user);        
    }
}
