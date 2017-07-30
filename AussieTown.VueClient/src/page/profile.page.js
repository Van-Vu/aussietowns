var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var ProfilePage = (function (_super) {
    __extends(ProfilePage, _super);
    function ProfilePage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.currentTab = '';
        return _this;
    }
    ProfilePage.prototype.asyncData = function (_a) {
        var store = _a.store, route = _a.route;
        console.log('profile id:' + route.params.profileId);
        if (route.params.profileId) {
            return store.dispatch('FETCH_PROFILE_BY_ID', route.params.profileId);
        }
    };
    ProfilePage.prototype.created = function () {
        this.$store.dispatch('SET_CURRENT_PAGE', 'profile');
        this.currentTab = this.$route.name;
        console.log('create profile page');
    };
    ProfilePage.prototype.onRouteParamChanged = function (value, oldValue) {
        //console.log(`route change ${value}`);
        this.currentTab = value.name;
    };
    return ProfilePage;
}(Vue));
__decorate([
    Watch('$route'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProfilePage.prototype, "onRouteParamChanged", null);
ProfilePage = __decorate([
    Component({
        name: 'ProfilePage'
    })
], ProfilePage);
export default ProfilePage;
