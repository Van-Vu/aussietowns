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
import VeeValidate from 'vee-validate';
import LocationSearchComponent from "../shared/search/locationsearch.component.vue";
import datepicker from '../shared/external/datepicker.vue';
Vue.use(VeeValidate);
var UserDetailComponent = (function (_super) {
    __extends(UserDetailComponent, _super);
    function UserDetailComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isEditing = false;
        _this.modelCache = null;
        return _this;
    }
    Object.defineProperty(UserDetailComponent.prototype, "model", {
        get: function () {
            return this.$store.state.profile;
        },
        enumerable: true,
        configurable: true
    });
    UserDetailComponent.prototype.asyncData = function (_a) {
        var store = _a.store, route = _a.route;
        if (route.params.profileId) {
            return store.dispatch('FETCH_PROFILE_BY_ID', route.params.profileId);
        }
    };
    UserDetailComponent.prototype.created = function () {
    };
    UserDetailComponent.prototype.onLocationSelected = function (item) {
        this.model.locationId = +item.id;
    };
    UserDetailComponent.prototype.onInsertorUpdate = function () {
        if (this.model.id > 0) {
            return this.$store.dispatch('UPDATE_USER', this.contructBeforeSubmit(this.model));
            //(new ListingService()).updateListing(this.contructBeforeSubmit(this.model));
        }
    };
    UserDetailComponent.prototype.onEdit = function () {
        this.isEditing = true;
        this.modelCache = Object.assign({}, this.model);
    };
    UserDetailComponent.prototype.onCancelEdit = function () {
        this.isEditing = false;
        Object.assign(this.model, this.modelCache);
        this.modelCache = null;
    };
    UserDetailComponent.prototype.contructBeforeSubmit = function (model) {
        return this.model;
    };
    UserDetailComponent.prototype.onUpdate = function () { };
    UserDetailComponent.prototype.capture = function () { };
    UserDetailComponent = __decorate([
        Component({
            name: 'UserDetail',
            components: {
                "locationsearch": LocationSearchComponent,
                "datepicker": datepicker
            }
        })
    ], UserDetailComponent);
    return UserDetailComponent;
}(Vue));
export default UserDetailComponent;
