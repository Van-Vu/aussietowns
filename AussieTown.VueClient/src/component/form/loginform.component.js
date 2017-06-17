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
import UserService from '../../service/user.service';
import VeeValidate from 'vee-validate';
import LoginModel from '../../model/login.model';
Vue.use(VeeValidate);
var LoginForm = (function (_super) {
    __extends(LoginForm, _super);
    function LoginForm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.formSubmitted = false;
        _this.model = new LoginModel();
        _this.googleSignInParams = {
            client_id: '865729199339-hclqajg0re388bm6t9pje61gsglat3rr.apps.googleusercontent.com'
        };
        _this.fbSignInParams = {
            scope: 'public_profile,email',
            return_scopes: true
        };
        return _this;
    }
    LoginForm.prototype.validateBeforeSubmit = function (e) {
        var _this = this;
        this.$validator.validateAll().then(function () {
            // eslint-disable-next-line
            (new UserService()).login(_this.model)
                .then(function (responseToken) {
                _this.$emit('onSuccessfulLogin', responseToken);
            });
        }).catch(function () {
            // eslint-disable-next-line
            alert('Correct them errors!');
        });
    };
    LoginForm.prototype.submitForm = function () {
        this.formSubmitted = true;
    };
    LoginForm.prototype.onSignInSuccess = function (googleUser) {
        // `googleUser` is the GoogleUser object that represents the just-signed-in user. 
        // See https://developers.google.com/identity/sign-in/web/reference#users 
        var profile = googleUser.getBasicProfile(); // etc etc 
        console.log('ID: ' + profile.getId());
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
    };
    LoginForm.prototype.onSignInError = function (error) {
        // `error` contains any error occurred. 
        console.log('OH NOES', error);
    };
    LoginForm.prototype.onFbSignInSuccess = function (response) {
        FB.api('/me', { "fields": "id,name,email,first_name,last_name,picture" }, function (dude) {
            console.log("Id: " + dude.id + ".");
            console.log("Name: " + dude.name + ".");
            console.log("Email: " + dude.email + ".");
            console.log("First name: " + dude.first_name + ".");
            console.log("Last name: " + dude.last_name + ".");
            console.log("Picture: " + dude.picture.data.url + ".");
        });
    };
    LoginForm.prototype.onFbSignInError = function (error) {
        console.log('OH NOES', error);
    };
    return LoginForm;
}(Vue));
LoginForm = __decorate([
    Component({
        name: "Loginform"
    })
], LoginForm);
export default LoginForm;
