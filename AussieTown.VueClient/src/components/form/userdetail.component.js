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
import AutoCompleteComponent from "../autocomplete/autocomplete.vue";
Vue.use(VeeValidate);
var UserDetailComponent = (function (_super) {
    __extends(UserDetailComponent, _super);
    function UserDetailComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.email = '';
        _this.password = '';
        _this.firstname = '';
        _this.lastname = '';
        _this.phone = '';
        _this.gender = '';
        _this.birthday = new Date(2016, 9, 16);
        _this.description = '';
        _this.address = '';
        _this.emergencyContact = '';
        _this.list = [];
        _this.placeHolderText = "this is the test";
        _this.formSubmitted = false;
        return _this;
    }
    UserDetailComponent.prototype.submitForm = function () {
        this.formSubmitted = true;
    };
    UserDetailComponent.prototype.onLocationSearch = function (event) {
        //this.searchStr = event;
        this.list = [
            { "id": 1, "name": "test" },
            { "id": 2, "name": "test2" }
        ];
    };
    UserDetailComponent.prototype.onSelect = function (val) {
        //this.searchStr = val.Description;
        //this.selectedId = val.Value;
    };
    UserDetailComponent.prototype.onUpdate = function () { };
    UserDetailComponent.prototype.capture = function () { };
    return UserDetailComponent;
}(Vue));
UserDetailComponent = __decorate([
    Component({
        name: 'UserDetail',
        components: {
            "autocomplete": AutoCompleteComponent
        }
    })
], UserDetailComponent);
export default UserDetailComponent;
