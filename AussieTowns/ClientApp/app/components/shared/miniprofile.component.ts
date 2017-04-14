import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../model/user';

@Component({
    selector: 'miniprofile',
    template: require('./miniprofile.component.html'),
    styles: [require('./miniprofile.component.css')]
})
export class MiniProfileComponent {
    @Input() data: any;
    @Input() isRemovable: boolean = true;
    @Output() removeUser = new EventEmitter();

    userId: number;
    profileUrl: string;
    profileImageUrl: string;
    fullName: string;
    shortDescription: string;

    ngOnInit(): void {
        this.userId = this.data.id;
        this.profileImageUrl = this.data.photoUrl;
        this.fullName = this.data.fullname;
        this.shortDescription = this.data.shortDescription;
    }

    onRemoveUser() {
        this.removeUser.emit(this.data);
    }
}
