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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import LoginModal from '../modal/loginmodal.component.vue';
import MenuModal from '../modal/menumodal.component.vue';
import RegistrationModal from '../modal/registrationmodal.component.vue';
import SearchBarComponent from '../shared/search/searchbar.component.vue';
var NavMenuComponent = (function (_super) {
    __extends(NavMenuComponent, _super);
    function NavMenuComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.logginInUserId = 0;
        _this.name = "test";
        _this.hideNavToggle = false;
        _this.isMenuOpen = false;
        _this.isSticky = false;
        _this.profilePhoto = '';
        _this.isLoggedIn = false;
        _this.showSecondSearchBar = false;
        _this.showLoginModal = false;
        _this.showRegistrationModal = false;
        _this.showMenuModal = false;
        // To handle scroll event
        _this.currentTime = Date.now();
        return _this;
    }
    Object.defineProperty(NavMenuComponent.prototype, "currentPage", {
        get: function () {
            return this.$store.state.currentPage;
        },
        enumerable: true,
        configurable: true
    });
    NavMenuComponent.prototype.created = function () {
        if (process.env.VUE_ENV === 'client') {
            window.addEventListener('scroll', this.handleScroll);
        }
        if (this.currentPage != null && this.currentPage !== 'home') {
            this.showSecondSearchBar = true;
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
            // Attach search bar
            if (this.currentPage != null && this.currentPage === 'home') {
                //console.log(this.$root.$el.querySelector('#searchBarHomepage').getBoundingClientRect().top);
                if (this.$root.$el.querySelector('#searchBarHomepage').getBoundingClientRect().top < 0) {
                    this.showSecondSearchBar = true;
                }
                else {
                    this.showSecondSearchBar = false;
                }
            }
            this.currentTime = timeNow;
        }
    };
    NavMenuComponent.prototype.onPropertyChanged = function (value, oldValue) {
        console.log("secondbar value " + value);
    };
    NavMenuComponent.prototype.onRouteParamChanged = function (value, oldValue) {
        this.showMenuModal = false;
        this.showLoginModal = false;
        if (this.currentPage != null && this.currentPage != 'home') {
            this.showSecondSearchBar = true;
        }
    };
    NavMenuComponent.prototype.onSuccessfulLogin = function () {
        this.showLoginModal = false;
    };
    NavMenuComponent.prototype.onSelect = function () { console.log('select'); };
    NavMenuComponent.prototype.onSearch = function () { console.log('search'); };
    NavMenuComponent.prototype.mounted = function () {
        this.profilePhoto = this.$store.getters.profilePhoto;
        this.isLoggedIn = this.$store.getters.isLoggedIn;
    };
    __decorate([
        Watch('showSecondSearchBar'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", void 0)
    ], NavMenuComponent.prototype, "onPropertyChanged", null);
    __decorate([
        Watch('$route.params'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", void 0)
    ], NavMenuComponent.prototype, "onRouteParamChanged", null);
    NavMenuComponent = __decorate([
        Component({
            name: 'nav-menu',
            components: {
                'loginmodal': LoginModal,
                'registrationmodal': RegistrationModal,
                'menumodal': MenuModal,
                "searchbar": SearchBarComponent
            }
        })
    ], NavMenuComponent);
    return NavMenuComponent;
}(Vue));
export default NavMenuComponent;
