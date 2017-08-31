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
import { UserSource, UserRole } from '../../model/enum';
import { fetchPublicKey, decryptTextFromServer, requestPasswordReset, encryptText } from '../../service/auth.service';
import { NotificationType } from '../../model/enum';
Vue.use(VeeValidate);
var LoginForm = /** @class */ (function (_super) {
    __extends(LoginForm, _super);
    function LoginForm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isForgotPassword = false;
        _this.formSubmitted = false;
        _this.model = new LoginModel();
        _this.confirmPassword = '';
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
    LoginForm.prototype.validateBeforeSubmit = function (e) {
        var _this = this;
        this.$validator.validateAll().then(function () {
            // eslint-disable-next-line
            if (_this.isLogin) {
                _this.login(_this.model);
            }
            else {
                _this.signup(_this.model);
            }
        }).catch(function () {
            // eslint-disable-next-line
            alert('Correct them errors!');
        });
    };
    LoginForm.prototype.login = function (model) {
        var _this = this;
        if (model.password) {
            model.password = encryptText(model.password);
        }
        (new UserService()).login(model)
            .then(function (responseToken) {
            _this.$store.dispatch('SET_CURRENT_USER', responseToken.loggedInUser);
            //this.$auth.setUser(responseToken.loggedInUser);
            _this.setCookies(responseToken.accessToken);
            _this.$emit('onSuccessfulLogin');
        })
            .catch(function (error) {
            _this.$store.dispatch('ADD_NOTIFICATION', { title: "Login error", text: error.message ? error.message : error, type: NotificationType.Error });
        });
    };
    LoginForm.prototype.signup = function (model) {
        var _this = this;
        if (model.password) {
            model.password = encryptText(model.password);
        }
        model.role = UserRole.User;
        (new UserService()).signup(model)
            .then(function (responseToken) {
            _this.$store.dispatch('SET_CURRENT_USER', responseToken.loggedInUser);
            _this.setCookies(responseToken.accessToken);
            _this.$emit('onSuccessfulLogin');
        });
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
    LoginForm = __decorate([
        Component({
            name: "Loginform"
        })
    ], LoginForm);
    return LoginForm;
}(Vue));
export default LoginForm;
