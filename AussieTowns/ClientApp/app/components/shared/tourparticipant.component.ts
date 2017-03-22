import { Component, Input, Output, EventEmitter } from '@angular/core';

import { User } from '../../model/user'

declare var google: any;

@Component({
    selector: 'tourparticipant',
    template: require('./tourparticipant.component.html'),
    styles: [require('./tourparticipant.component.css')]
})

export class TourParticipantComponent {
    @Input() users: User[];
    @Input() participantType: string;
    @Output() userAdded = new EventEmitter();
    @Output() userRemoved = new EventEmitter();

    isAdding = false;

    toggleProfileSearch(event) {
        this.isAdding = !this.isAdding;
        event.stopPropagation();
    }
    handleUserAdded(user) {
        this.isAdding = false;
        this.users.push(user);
        this.userAdded.emit(user);
    }

    handleUserRemoved(user) {
        this.users.splice(this.users.indexOf(user), 1);
        this.userRemoved.emit(user);
    }
}
