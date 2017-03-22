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
    profileUrl = "http://icons.iconarchive.com/icons/graphicloads/100-flat/256/home-icon.png";
    profileImageUrl = "http://icons.iconarchive.com/icons/graphicloads/100-flat/256/home-icon.png";
    fullName: string;
    shortDescription = "This is a short description";

    ngOnInit(): void {
        this.fullName = this.data.Fullname;
        this.shortDescription = this.data.ShortDescription;
    }
}
