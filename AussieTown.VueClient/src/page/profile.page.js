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
import UserDetailComponent from '../component/form/userdetail.component.vue';
import TripComponent from '../component/profile/trip.component.vue';
import MessageComponent from '../component/profile/message.component.vue';
var ProfilePage = (function (_super) {
    __extends(ProfilePage, _super);
    function ProfilePage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isPhotosActivated = false;
        _this.isMessageActivated = false;
        _this.isTripsActivated = false;
        return _this;
    }
    ProfilePage.prototype.asyncData = function (_a) {
        var store = _a.store, route = _a.route;
        console.log('profile id:' + route.params.profileId);
        if (route.params.profileId) {
            return store.dispatch('FETCH_USER_BY_ID', route.params.profileId);
            //return store.dispatch('FETCH_CONVERSATIONS_BY_USER', route.params.profileId);
        }
    };
    ProfilePage.prototype.activatePhotosTab = function () {
        this.isPhotosActivated = true;
    };
    ProfilePage.prototype.activateMessageTab = function () {
        this.isMessageActivated = true;
    };
    ProfilePage.prototype.activateTripsTab = function () {
        this.isTripsActivated = true;
    };
    return ProfilePage;
}(Vue));
ProfilePage = __decorate([
    Component({
        name: 'ProfilePage',
        components: {
            'profileform': UserDetailComponent,
            'tripcomponent': TripComponent,
            'messagecomponent': MessageComponent
        }
    })
], ProfilePage);
export default ProfilePage;
