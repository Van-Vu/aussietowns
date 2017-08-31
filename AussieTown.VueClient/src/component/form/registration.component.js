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
import RegisterModel from '../../model/register.model';
import UserService from '../../service/user.service';
Vue.use(VeeValidate);
var RegistrationForm = /** @class */ (function (_super) {
    __extends(RegistrationForm, _super);
    function RegistrationForm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = new RegisterModel();
        _this.list = [];
        _this.placeHolderText = "this is the test";
        _this.formSubmitted = false;
        return _this;
    }
    RegistrationForm.prototype.submitForm = function () {
        (new UserService()).signup(this.model);
    };
    RegistrationForm.prototype.onLocationSearch = function (event) {
        //this.searchStr = event;
        this.list = [
            { "id": 1, "name": "test" },
            { "id": 2, "name": "test2" }
        ];
    };
    RegistrationForm.prototype.onSelect = function (val) {
        //this.searchStr = val.Description;
        //this.selectedId = val.Value;
    };
    RegistrationForm.prototype.onRegister = function () {
        var _this = this;
        this.$validator.validateAll().then(function () {
            // eslint-disable-next-line
            (new UserService()).signup(_this.model)
                .then(function (response) {
                _this.$emit('onSuccessfulLogin', response);
            });
        }).catch(function () {
            // eslint-disable-next-line
            alert('Correct them errors!');
        });
    };
    RegistrationForm.prototype.capture = function () { };
    RegistrationForm = __decorate([
        Component({
            name: 'RegistrationForm',
            components: {}
        })
    ], RegistrationForm);
    return RegistrationForm;
}(Vue));
export default RegistrationForm;
