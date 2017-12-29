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
import SearchBarComponent from '../shared/search/searchbar.component.vue';
import { Utils } from '../utils';
var NavMenuComponent = /** @class */ (function (_super) {
    __extends(NavMenuComponent, _super);
    function NavMenuComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.logginInUserId = 0;
        _this.name = "test";
        _this.hideNavToggle = false;
        _this.isMenuOpen = false;
        _this.isSticky = false;
        _this.searchSuburb = null;
        _this.showMenuModal = false;
        return _this;
    }
    Object.defineProperty(NavMenuComponent.prototype, "currentPage", {
        get: function () {
            return this.$store.state.currentPage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavMenuComponent.prototype, "isLoggedIn", {
        get: function () {
            return this.$store.getters.isLoggedIn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavMenuComponent.prototype, "profilePhoto", {
        get: function () {
            return this.$store.getters.profilePhoto;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavMenuComponent.prototype, "profileLink", {
        get: function () {
            return this.$store.getters.profileLink;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavMenuComponent.prototype, "userId", {
        get: function () {
            return this.$store.getters.userId;
        },
        enumerable: true,
        configurable: true
    });
    NavMenuComponent.prototype.created = function () {
        if (process.env.VUE_ENV === 'client') {
            window.addEventListener('scroll', this.handleScroll);
        }
    };
    NavMenuComponent.prototype.mounted = function () {
        if (this.$store.state.currentPage != 'home') {
            this.isSticky = true;
        }
        window.addEventListener('click', this.closeUserMenu);
    };
    NavMenuComponent.prototype.destroyed = function () {
        if (process.env.VUE_ENV === 'client') {
            window.removeEventListener('scroll', this.handleScroll);
            window.removeEventListener('click', this.closeUserMenu);
        }
    };
    NavMenuComponent.prototype.handleScroll = function (event) {
        if (this.currentPage != null && this.currentPage === 'home') {
            //console.log(this.$root.$el.querySelector('#searchBarHomepage').getBoundingClientRect().top);
            if (this.$root.$el.querySelector('#searchBarHomepage').getBoundingClientRect().top < 0) {
                this.isSticky = true;
            }
            else {
                this.isSticky = false;
            }
        }
    };
    NavMenuComponent.prototype.onRouteParamChanged = function (value, oldValue) {
        this.showMenuModal = false;
        if (this.$route.name != 'home') {
            this.isSticky = true;
        }
        else {
            this.isSticky = false;
        }
        this.searchSuburb = null;
    };
    NavMenuComponent.prototype.onSelect = function (val) {
        this.searchSuburb = val;
    };
    NavMenuComponent.prototype.onSearch = function (val) {
        if (this.searchSuburb) {
            this.$router.push({ name: 'search', params: { seoString: Utils.seorizeString(this.searchSuburb.name), suburbId: this.searchSuburb.id } });
        }
    };
    NavMenuComponent.prototype.onShowLoginModal = function () {
        this.$store.dispatch('SHOW_LOGIN_MODAL');
    };
    NavMenuComponent.prototype.onLogout = function () {
        //this.$store.dispatch('SET_CURRENT_USER', {});
        //this.$store.dispatch('SET_TOKEN', '');
        //this.$cookie.remove('mtltk');
        //this.$cookie.remove('mtl');
        //this.$router.push("home");
        window.location.href = '/logout';
    };
    NavMenuComponent.prototype.closeUserMenu = function (e) {
        if ((!this.$el.contains(e.target)) && (e.target.id != 'popupUserMenu')) {
            this.showMenuModal = false;
        }
    };
    __decorate([
        Watch('$route.params'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", void 0)
    ], NavMenuComponent.prototype, "onRouteParamChanged", null);
    NavMenuComponent = __decorate([
        Component({
            name: 'NavMenuComponent',
            components: {
                "searchbar": SearchBarComponent
            }
        })
    ], NavMenuComponent);
    return NavMenuComponent;
}(Vue));
export default NavMenuComponent;
