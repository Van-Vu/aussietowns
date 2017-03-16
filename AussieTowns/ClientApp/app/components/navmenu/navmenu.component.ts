import { Component, ViewChild } from '@angular/core';
import { RegistrationFormComponent } from '../forms/registrationform.component';
import { LoginFormComponent } from '../forms/loginform.component';

import { Cookie } from 'ng2-cookies';

import { isBrowser } from 'angular2-universal';

import { UserService } from '../../services/user.service';

declare var document: any;

@Component({
    selector: 'nav-menu',
    template: require('./navmenu.component.html'),
    styles: [require('./navmenu.component.css')]
})
export class NavMenuComponent {
    @ViewChild(RegistrationFormComponent) registerModal: RegistrationFormComponent;
    @ViewChild(LoginFormComponent) loginModal: LoginFormComponent;

    isLoggedin: boolean = false;
    name: string;

    constructor(private userService: UserService) {
        // Bodom: hack from here: https://github.com/aspnet/JavaScriptServices/issues/435
        if (isBrowser) {
            this.userService.getUserInfo().subscribe(
                data => {
                    this.isLoggedin = true;
                    this.name = data.Data.FirstName;
                });
        }

    }

    handleLoggedIn(userName: string) {
        if (userName) {
            this.isLoggedin = true;
            this.name = userName;
        } else {
            this.isLoggedin = false;
        }
    }

    onLogout() {
        Cookie.delete("token");
        this.isLoggedin = false;
    }

    onTest() {
        this.userService.getUserInfo().subscribe(
            data => {
                var abc = data;
            });
    }
}
