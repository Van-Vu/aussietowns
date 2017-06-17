var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Vue from "vue";
import { Component } from "vue-property-decorator";
import LoginModal from '../modal/loginmodal.component.vue';
import RegistrationModal from '../modal/registrationmodal.component.vue';
var NavMenuComponent = (function (_super) {
    __extends(NavMenuComponent, _super);
    function NavMenuComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.logginInUserId = 0;
        _this.name = "test";
        _this.hideNavToggle = false;
        _this.isMenuOpen = false;
        _this.isSticky = false;
        _this.showLoginModal = false;
        _this.showRegistrationModal = false;
        _this.currentTime = Date.now();
        return _this;
        //ngOnInit() {
        //    if (isBrowser) {
        //        Observable.fromEvent(window, 'resize')
        //            .debounceTime(100)
        //            .subscribe(e => {
        //                this.onWindowResize();
        //            });
        //        Observable.fromEvent(window, 'scroll')
        //            .throttleTime(1000)
        //            .subscribe(e => {
        //                this.onWindowScroll();
        //            });
        //        this.onWindowResize();
        //    }
        //}
        //onWindowResize() {
        //    let windowMode = this.detectionService.getCurrentMode();
        //    if (windowMode == DeviceMode.Mobile) {
        //        this.hideNavToggle = false;
        //    } else {
        //        this.hideNavToggle = true;
        //    }
        //}
        //onWindowScroll() {
        //    this.isSticky = this.detectionService.isScrollOverHalfPage();
        //}
        //handleLoggedIn(loggedInfo) {
        //    if (loggedInfo) {
        //        this.isLoggedin = true;
        //        this.name = loggedInfo.name;
        //        this.id = loggedInfo.id;
        //    } else {
        //        this.isLoggedin = false;
        //    }
        //}
        //onLogout() {
        //    Cookie.delete("token");
        //    this.isLoggedin = false;
        //}
        //onTest() {
        //    this.userService.getUserInfo(1).subscribe(
        //        data => {
        //            var abc = data;
        //        });
        //}
        //onNavToggle() {
        //    this.isMenuOpen = !this.isMenuOpen;
        //    return false;
        //}
    }
    NavMenuComponent.prototype.created = function () {
        if (process.env.VUE_ENV === 'client') {
            window.addEventListener('scroll', this.handleScroll);
        }
    };
    NavMenuComponent.prototype.destroyed = function () {
        if (process.env.VUE_ENV === 'client') {
            window.removeEventListener('scroll', this.handleScroll);
        }
    };
    NavMenuComponent.prototype.handleScroll = function (event) {
        var timeNow = Date.now();
        if (timeNow - this.currentTime > 50) {
            // Blacken header color
            if (window.scrollY > 100) {
                this.isSticky = true;
            }
            else {
                this.isSticky = false;
            }
            console.log(this.$('.searchbar').getBoundingClientRect());
            // Attach search bar
            this.currentTime = timeNow;
        }
    };
    NavMenuComponent.prototype.onSuccessfulLogin = function (responseToken) {
        if (responseToken) {
            this.$cookie.set('mtltk', responseToken.token);
            this.$cookie.set('mtluserId', responseToken.userId);
            this.showLoginModal = false;
        }
    };
    return NavMenuComponent;
}(Vue));
NavMenuComponent = __decorate([
    Component({
        name: 'nav-menu',
        components: {
            'loginmodal': LoginModal,
            'registrationmodal': RegistrationModal
        }
    })
], NavMenuComponent);
export default NavMenuComponent;
