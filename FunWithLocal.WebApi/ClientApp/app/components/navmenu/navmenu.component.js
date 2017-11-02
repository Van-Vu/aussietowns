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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var ng2_cookies_1 = require("ng2-cookies");
var angular2_universal_1 = require("angular2-universal");
var user_service_1 = require("../../services/user.service");
var devicedetection_service_1 = require("../shared/devicedetection.service");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/throttleTime");
var registrationmodal_component_1 = require("../modal/registrationmodal.component");
var loginmodal_component_1 = require("../modal/loginmodal.component");
var NavMenuComponent = /** @class */ (function () {
    function NavMenuComponent(userService, detectionService) {
        this.userService = userService;
        this.detectionService = detectionService;
        this.isLoggedin = false;
        this.hideNavToggle = true;
        this.isMenuOpen = false;
        this.isSticky = false;
        // Bodom: hack from here: https://github.com/aspnet/JavaScriptServices/issues/435
        if (angular2_universal_1.isBrowser) {
            //this.userService.getUserInfo().subscribe(
            //    data => {
            //        this.isLoggedin = true;
            //        this.name = data.Data.FirstName;
            //    });
        }
    }
    NavMenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (angular2_universal_1.isBrowser) {
            Observable_1.Observable.fromEvent(window, 'resize')
                .debounceTime(100)
                .subscribe(function (e) {
                _this.onWindowResize();
            });
            Observable_1.Observable.fromEvent(window, 'scroll')
                .throttleTime(1000)
                .subscribe(function (e) {
                _this.onWindowScroll();
            });
            this.onWindowResize();
        }
    };
    NavMenuComponent.prototype.onWindowResize = function () {
        var windowMode = this.detectionService.getCurrentMode();
        if (windowMode == devicedetection_service_1.DeviceMode.Mobile) {
            this.hideNavToggle = false;
        }
        else {
            this.hideNavToggle = true;
        }
    };
    NavMenuComponent.prototype.onWindowScroll = function () {
        this.isSticky = this.detectionService.isScrollOverHalfPage();
    };
    NavMenuComponent.prototype.handleLoggedIn = function (loggedInfo) {
        if (loggedInfo) {
            this.isLoggedin = true;
            this.name = loggedInfo.name;
            this.id = loggedInfo.id;
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
        this.userService.getUserInfo(1).subscribe(function (data) {
            var abc = data;
        });
    };
    NavMenuComponent.prototype.onNavToggle = function () {
        this.isMenuOpen = !this.isMenuOpen;
        return false;
    };
    __decorate([
        core_1.ViewChild(registrationmodal_component_1.RegistrationModalComponent),
        __metadata("design:type", registrationmodal_component_1.RegistrationModalComponent)
    ], NavMenuComponent.prototype, "registerModal", void 0);
    __decorate([
        core_1.ViewChild(loginmodal_component_1.LoginModalComponent),
        __metadata("design:type", loginmodal_component_1.LoginModalComponent)
    ], NavMenuComponent.prototype, "loginModal", void 0);
    NavMenuComponent = __decorate([
        core_1.Component({
            selector: 'nav-menu',
            template: require('./navmenu.component.html'),
            styles: [require('./navmenu.component.scss').toString()]
        }),
        __metadata("design:paramtypes", [user_service_1.UserService, devicedetection_service_1.DeviceDetectionService])
    ], NavMenuComponent);
    return NavMenuComponent;
}());
exports.NavMenuComponent = NavMenuComponent;
//# sourceMappingURL=navmenu.component.js.map