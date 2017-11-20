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
import UserService from '../../service/user.service';
import { Validator } from 'vee-validate';
import VeeValidate from 'vee-validate';
import LoginModel from '../../model/login.model';
import { UserSource, UserRole } from '../../model/enum';
import { fetchPublicKey, decryptTextFromServer, requestPasswordReset, encryptText } from '../../service/auth.service';
import { NotificationType } from '../../model/enum';
Vue.use(VeeValidate);
import GSignInButton from 'vue-google-signin-button';
Vue.use(GSignInButton);
import FBSignInButton from 'vue-facebook-signin-button';
Vue.use(FBSignInButton);
var LoginForm = /** @class */ (function (_super) {
    __extends(LoginForm, _super);
    function LoginForm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isForgotPassword = false;
        _this.formSubmitted = false;
        _this.model = new LoginModel();
        _this.confirmPassword = '';
        _this.rawPassword = '';
        // Login or Signup
        _this.isLogin = true;
        _this.googleSignInParams = {
            client_id: '865729199339-hclqajg0re388bm6t9pje61gsglat3rr.apps.googleusercontent.com'
        };
        _this.fbSignInParams = {
            scope: 'public_profile,email',
            return_scopes: true
        };
        return _this;
    }
    LoginForm.prototype.onisLoginChanged = function (value, oldValue) {
        this.$validator.reset();
    };
    LoginForm.prototype.created = function () {
        Validator.extend('verify_coupon', {
            getMessage: function (field) { return "The " + field + " is not a valid coupon."; },
            validate: function (value) { return new Promise(function (resolve) {
                // API call or database access.
                var validCoupons = ['SUMMER2016', 'WINTER2016', 'FALL2016'];
                setTimeout(function () {
                    resolve({
                        valid: value && validCoupons.indexOf(value.toUpperCase()) !== -1
                    });
                }, 500);
            }); }
        });
        this.$validator.attach('coupon', 'required|verify_coupon');
    };
    LoginForm.prototype.validateBeforeSubmit = function (e) {
        var _this = this;
        this.$validator.validateAll().then(function (result) {
            _this.$validator.reset();
            if (result) {
                if (_this.rawPassword) {
                    _this.model.password = encryptText(_this.rawPassword);
                }
                if (_this.isLogin) {
                    _this.login(_this.model);
                }
                else {
                    _this.signup(_this.model);
                }
            }
        }).catch(function () {
            // eslint-disable-next-line
            alert('Correct them errors!');
        });
    };
    LoginForm.prototype.login = function (model) {
        var _this = this;
        (new UserService()).login(model)
            .then(function (responseToken) { return _this.handleLoginToken(responseToken); })
            .catch(function (error) {
            _this.$store.dispatch('ADD_NOTIFICATION', { title: "Login error", text: error.message ? error.message : error.data, type: NotificationType.Error });
        });
    };
    LoginForm.prototype.signup = function (model) {
        var _this = this;
        model.role = UserRole.User;
        model.images = [{ "url": model.photoUrl }];
        (new UserService()).signup(model)
            .then(function (responseToken) { return _this.handleLoginToken(responseToken); });
    };
    LoginForm.prototype.handleLoginToken = function (token) {
        this.$store.dispatch('SET_CURRENT_USER', token.loggedInUser);
        this.setCookies(token.accessToken);
        this.$emit('onSuccessfulLogin');
        this.rawPassword = '';
    };
    LoginForm.prototype.setCookies = function (accessToken) {
        this.$cookie.set('mtltk', accessToken);
    };
    LoginForm.prototype.submitForm = function () {
        this.formSubmitted = true;
    };
    LoginForm.prototype.onResetPassword = function () {
        requestPasswordReset(this.model.email)
            .then(function (x) { return console.log(x); });
    };
    LoginForm.prototype.onGgSignInSuccess = function (googleUser) {
        // `googleUser` is the GoogleUser object that represents the just-signed-in user. 
        // See https://developers.google.com/identity/sign-in/web/reference#users 
        var profile = googleUser.getBasicProfile(); // etc etc 
        console.log('ID: ' + profile.getId());
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        if (this.isLogin) {
            this.login({ email: profile.getEmail(), source: UserSource.Google, externalId: encryptText(profile.getId()) });
        }
        else {
            this.signup({
                email: profile.getEmail(),
                firstname: profile.getGivenName(),
                lastname: profile.getFamilyName(),
                photoUrl: profile.getImageUrl(),
                source: UserSource.Google,
                externalId: encryptText(profile.getId())
            });
        }
    };
    LoginForm.prototype.onGgSignInError = function (error) {
        // `error` contains any error occurred. 
        console.log('OH NOES', error);
    };
    LoginForm.prototype.onFbSignInSuccess = function (response) {
        var _this = this;
        FB.api('/me', { "fields": "id,name,email,first_name,last_name,picture" }, function (profile) {
            console.log("Id: " + profile.id + ".");
            console.log("Name: " + profile.name + ".");
            console.log("Email: " + profile.email + ".");
            console.log("First name: " + profile.first_name + ".");
            console.log("Last name: " + profile.last_name + ".");
            console.log("Picture: " + profile.picture.data.url + ".");
            if (_this.isLogin) {
                _this.login({ email: profile.email, source: UserSource.Facebook, externalId: encryptText(profile.id) });
            }
            else {
                _this.signup({
                    email: profile.email,
                    firstname: profile.first_name,
                    lastname: profile.last_name,
                    photoUrl: profile.picture.data.url,
                    source: UserSource.Facebook,
                    externalId: encryptText(profile.id)
                });
            }
        });
    };
    LoginForm.prototype.onFbSignInError = function (error) {
        console.log('OH NOES', error);
    };
    LoginForm.prototype.checkFbLoginStatus = function () {
        FB.getLoginStatus(function (response) {
            console.log(response);
        });
    };
    LoginForm.prototype.checkGGLoginStatus = function () {
        gapi.auth.checkSessionState({ session_state: null }, function (isUserNotLoggedIn) {
            if (isUserNotLoggedIn) {
                // do some stuff
            }
        });
    };
    LoginForm.prototype.checkRSAEncryoption = function () {
        var encrypt = new JSEncrypt();
        fetchPublicKey().then(function (data) {
            encrypt.setPublicKey(data);
            var encryptedText = encrypt.encrypt("không phải utf8");
            console.log(encryptedText);
            decryptTextFromServer(encryptedText).then(function (x) { return console.log(x); });
        });
    };
    __decorate([
        Watch('isLogin'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Boolean, Boolean]),
        __metadata("design:returntype", void 0)
    ], LoginForm.prototype, "onisLoginChanged", null);
    LoginForm = __decorate([
        Component({
            name: "Loginform"
        })
    ], LoginForm);
    return LoginForm;
}(Vue));
export default LoginForm;
