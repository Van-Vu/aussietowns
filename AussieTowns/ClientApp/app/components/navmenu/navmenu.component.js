"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var registrationform_component_1 = require("../forms/registrationform.component");
var loginform_component_1 = require("../forms/loginform.component");
var ng2_cookies_1 = require("ng2-cookies");
var angular2_universal_1 = require("angular2-universal");
var user_service_1 = require("../../services/user.service");
var NavMenuComponent = (function () {
    function NavMenuComponent(userService) {
        var _this = this;
        this.userService = userService;
        this.isLoggedin = false;
        // Bodom: hack from here: https://github.com/aspnet/JavaScriptServices/issues/435
        if (angular2_universal_1.isBrowser) {
            this.userService.getUserInfo().subscribe(function (data) {
                _this.isLoggedin = true;
                _this.name = data.Data.username;
            });
        }
    }
    NavMenuComponent.prototype.handleLoggedIn = function (userName) {
        if (userName) {
            this.isLoggedin = true;
            this.name = userName;
        }
        else {
            this.isLoggedin = false;
        }
    };
    NavMenuComponent.prototype.onLogout = function () {
        ng2_cookies_1.Cookie.delete("token");
        this.isLoggedin = false;
    };
    NavMenuComponent.prototype.onTest = function () {
        this.userService.getUserInfo().subscribe(function (data) {
            var abc = data;
        });
    };
    return NavMenuComponent;
}());
__decorate([
    core_1.ViewChild(registrationform_component_1.RegistrationFormComponent),
    __metadata("design:type", registrationform_component_1.RegistrationFormComponent)
], NavMenuComponent.prototype, "registerModal", void 0);
__decorate([
    core_1.ViewChild(loginform_component_1.LoginFormComponent),
    __metadata("design:type", loginform_component_1.LoginFormComponent)
], NavMenuComponent.prototype, "loginModal", void 0);
NavMenuComponent = __decorate([
    core_1.Component({
        selector: 'nav-menu',
        template: require('./navmenu.component.html'),
        styles: [require('./navmenu.component.css')]
    }),
    __metadata("design:paramtypes", [user_service_1.UserService])
], NavMenuComponent);
exports.NavMenuComponent = NavMenuComponent;
//# sourceMappingURL=navmenu.component.js.map