import { Component } from '@angular/core';

@Component({
    selector: 'profilecomponent',
    template: require('./profile.component.html')
})

export class ProfileComponent {
    isPhotosActivated: boolean = false;
    isMessageActivated: boolean = false;
    isTripsActivated: boolean = false;

    activatePhotosTab() {
        this.isPhotosActivated = true;
    }

    activateMessageTab() {
        this.isMessageActivated = true;
    }

    activateTripsTab() {
        this.isTripsActivated = true;
    }
}