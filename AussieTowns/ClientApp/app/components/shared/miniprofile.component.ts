import { Component, Input } from '@angular/core';
import { User } from '../../model/user';

@Component({
    selector: 'miniprofile',
    template: require('./miniprofile.component.html'),
    styles: [require('./miniprofile.component.css')]
})
export class MiniProfileComponent {
    @Input() data: any;
    userId = "test";
    profileUrl = "test";
    profileImageUrl = "/asset/images/home-icon.png";
    fullName: string;
    shortDescription = "This is a short description";

    ngOnInit(): void {
        this.fullName = this.data.Fullname;
        this.shortDescription = this.data.ShortDescription;
    }
}
