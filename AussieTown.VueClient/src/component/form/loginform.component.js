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
        _this.formSubmitting = false;
        _this.model = new LoginModel();
        _this.email = '';
        _this.confirmPassword = '';
        _this.rawPassword = '';
        _this.isValidatingEmail = false;
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
        //if (value) {
        //    this.$validator.attach('email', 'required|email|verify_email');
        //} else {
        //    this.$validator.attach('email', 'required|email');
        //}
    };
    LoginForm.prototype.created = function () {
        var _this = this;
        // https://jsfiddle.net/pp0w8u6s/
        // http://vee-validate.logaretm.com/examples.html#debounce-example
        Validator.extend('verify_email', {
            getMessage: function (field) { return "This " + field + " already exists."; },
            validate: function (value) { return new Promise(function (resolve) {
                if (_this.isLogin) {
                    resolve({ valid: true });
                    return;
                }
                _this.isValidatingEmail = true;
                (new UserService()).verifyEmail(value)
                    .then(function (response) {
                    resolve({ valid: response });
                    _this.isValidatingEmail = false;
                })
                    .catch(function (error) {
                    _this.isValidatingEmail = false;
                    resolve({ valid: true });
                });
            }); }
        });
        this.$validator.attach('email', 'required|email|verify_email');
    };
    LoginForm.prototype.validateEmail = function () {
        this.$validator.validate('email', this.email);
    };
    LoginForm.prototype.validateBeforeSubmit = function (e) {
        var _this = this;
        this.$validator.validateAll({ email: this.email, password: this.rawPassword }).then(function (result) {
            if (result) {
                _this.formSubmitting = true;
                if (_this.rawPassword) {
                    _this.model.password = encryptText(_this.rawPassword);
                }
                _this.model.email = _this.email;
                if (_this.isLogin) {
                    _this.login(_this.model).then(function () { return _this.formSubmitting = false; }).catch(function () { return _this.formSubmitting = false; });
                }
                else {
                    _this.signup(_this.model).then(function () { return _this.formSubmitting = false; }).catch(function () { return _this.formSubmitting = false; });
                }
                _this.$validator.reset();
            }
        }).catch(function () {
            // eslint-disable-next-line
            alert('Correct them errors!');
        });
    };
    LoginForm.prototype.login = function (model) {
        var _this = this;
        return (new UserService()).login(model)
            .then(function (responseToken) { return _this.handleLoginToken(responseToken); });
    };
    LoginForm.prototype.signup = function (model) {
        var _this = this;
        model.role = UserRole.User;
        model.images = [{ "url": model.photoUrl }];
        return (new UserService()).signup(model)
            .then(function (responseToken) { return _this.handleLoginToken(responseToken); });
    };
    LoginForm.prototype.handleLoginToken = function (response) {
        var token = response.result;
        this.$store.dispatch('SET_CURRENT_USER', token.loggedInUser);
        this.setCookies(token.accessToken);
        this.rawPassword = '';
        if (this.$store.state.modalOpenning) {
            this.$emit('onSuccessfulLogin');
        }
        else {
            var queryString = this.$route.query;
            this.$router.push(queryString.returnUrl);
        }
    };
    LoginForm.prototype.setCookies = function (accessToken) {
        this.$cookie.set('mtltk', accessToken);
    };
    LoginForm.prototype.onResetPassword = function () {
        requestPasswordReset(this.model.email)
            .then(function (x) { return console.log(x); });
    };
    LoginForm.prototype.onGgSignInSuccess = function (googleUser) {
        var _this = this;
        // `googleUser` is the GoogleUser object that represents the just-signed-in user. 
        // See https://developers.google.com/identity/sign-in/web/reference#users 
        var profile = googleUser.getBasicProfile(); // etc etc 
        console.log('ID: ' + profile.getId());
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        this.$store.dispatch("ENABLE_LOADING");
        if (this.isLogin) {
            this.login({ email: profile.getEmail(), source: UserSource.Google, externalId: encryptText(profile.getId()) })
                .then(function () { return _this.$store.dispatch("DISABLE_LOADING"); });
        }
        else {
            this.signup({
                email: profile.getEmail(),
                firstname: profile.getGivenName(),
                lastname: profile.getFamilyName(),
                photoUrl: profile.getImageUrl(),
                source: UserSource.Google,
                externalId: encryptText(profile.getId())
            })
                .then(function () { return _this.$store.dispatch("DISABLE_LOADING"); });
        }
    };
    LoginForm.prototype.onGgSignInError = function (error) {
        // `error` contains any error occurred. 
    };
    LoginForm.prototype.onFbSignInSuccess = function (response) {
        var _this = this;
        this.$store.dispatch("ENABLE_LOADING");
        FB.api('/me', { "fields": "id,name,email,first_name,last_name,picture" }, function (profile) {
            console.log("Id: " + profile.id + ".");
            console.log("Name: " + profile.name + ".");
            console.log("Email: " + profile.email + ".");
            console.log("First name: " + profile.first_name + ".");
            console.log("Last name: " + profile.last_name + ".");
            console.log("Picture: " + profile.picture.data.url + ".");
            if (_this.isLogin) {
                _this.login({ email: profile.email, source: UserSource.Facebook, externalId: encryptText(profile.id) })
                    .then(function () { return _this.$store.dispatch("DISABLE_LOADING"); });
            }
            else {
                _this.signup({
                    email: profile.email,
                    firstname: profile.first_name,
                    lastname: profile.last_name,
                    photoUrl: profile.picture.data.url,
                    source: UserSource.Facebook,
                    externalId: encryptText(profile.id)
                })
                    .then(function () { return _this.$store.dispatch("DISABLE_LOADING"); });
            }
        });
    };
    LoginForm.prototype.onFbSignInError = function (error) {
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
    LoginForm.prototype.changeLoginMode = function (value) {
        this.isLogin = value;
        this.$validator.reset();
        this.$emit('onChangeMode', value ? 'Login' : 'Sign Up');
    };
    LoginForm.prototype.switchToForgotPassword = function (value) {
        this.isForgotPassword = value;
        this.$validator.reset();
        this.$emit('onChangeMode', value ? 'Forgot password' : 'Login');
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
