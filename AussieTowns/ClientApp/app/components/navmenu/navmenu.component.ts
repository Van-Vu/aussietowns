import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Cookie } from 'ng2-cookies';

import { isBrowser } from 'angular2-universal';

import { UserService } from '../../services/user.service';
import { DeviceDetectionService, DeviceMode } from '../shared/devicedetection.service';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import { RegistrationModalComponent } from '../modal/registrationmodal.component';
import { LoginModalComponent } from '../modal/loginmodal.component';

declare var document: any;

@Component({
    selector: 'nav-menu',
    template: require('./navmenu.component.html'),
    styles: [require('./navmenu.component.scss').toString()]
})
export class NavMenuComponent {
    @ViewChild(RegistrationModalComponent) registerModal: RegistrationModalComponent;
    @ViewChild(LoginModalComponent) loginModal: LoginModalComponent;

    isLoggedin: boolean = false;
    name: string;
    id: number;
    hideNavToggle = true;
    isMenuOpen = false;
    isSticky = false;

    constructor(private userService: UserService, private detectionService: DeviceDetectionService) {
        // Bodom: hack from here: https://github.com/aspnet/JavaScriptServices/issues/435
        if (isBrowser) {
            //this.userService.getUserInfo().subscribe(
            //    data => {
            //        this.isLoggedin = true;
            //        this.name = data.Data.FirstName;
            //    });

        }

    }

    ngOnInit() {
        if (isBrowser) {
            Observable.fromEvent(window, 'resize')
                .debounceTime(100)
                .subscribe(e => {
                    this.onWindowResize();
                });

            Observable.fromEvent(window, 'scroll')
                .throttleTime(1000)
                .subscribe(e => {
                    this.onWindowScroll();
                });
            

            this.onWindowResize();
        }
    }

    onWindowResize() {
        let windowMode = this.detectionService.getCurrentMode();
        if (windowMode == DeviceMode.Mobile) {
            this.hideNavToggle = false;
        } else {
            this.hideNavToggle = true;
        }
    }

    onWindowScroll() {
        this.isSticky = this.detectionService.isScrollOverHalfPage();
    }

    handleLoggedIn(loggedInfo) {
        if (loggedInfo) {
            this.isLoggedin = true;
            this.name = loggedInfo.name;
            this.id = loggedInfo.id;
        } else {
            this.isLoggedin = false;
        }
    }

    onLogout() {
        Cookie.delete("token");
        this.isLoggedin = false;
    }

    onTest() {
        this.userService.getUserInfo(1).subscribe(
            data => {
                var abc = data;
            });
    }

    onNavToggle() {
        this.isMenuOpen = !this.isMenuOpen;
        return false;
    }
}
