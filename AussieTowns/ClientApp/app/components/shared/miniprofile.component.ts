import { Component, Input } from '@angular/core';
import { User } from '../../model/user';

@Component({
    selector: 'miniprofile',
    template: require('./miniprofile.component.html'),
    styles: [require('./miniprofile.component.css')]
})
export class MiniProfileComponent {
    //@Input() user: User;
    userId = "test";
    profileUrl = "http://icons.iconarchive.com/icons/graphicloads/100-flat/256/home-icon.png";
    profileImageUrl = "http://icons.iconarchive.com/icons/graphicloads/100-flat/256/home-icon.png";
    fullName = "Fullname";
    shortDescription = "This is a short description";
}
