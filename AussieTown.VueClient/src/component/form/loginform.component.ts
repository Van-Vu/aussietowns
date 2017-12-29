import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import UserService from '../../service/user.service';

import { Validator } from 'vee-validate';
import VeeValidate from 'vee-validate';
import LoginModel from '../../model/login.model';
import { UserSource, UserRole } from '../../model/enum';

import { fetchPublicKey, decryptTextFromServer, requestPasswordReset, encryptText } from '../../service/auth.service';
import { GlobalConfig } from '../../GlobalConfig';
import { NotificationType } from '../../model/enum';

Vue.use(VeeValidate);

import GSignInButton from 'vue-google-signin-button';
Vue.use(GSignInButton);

import FBSignInButton from 'vue-facebook-signin-button';
Vue.use(FBSignInButton);


declare const FB: any;
declare const gapi: any;
declare const JSEncrypt: any;

@Component({
  name: "Loginform"  
})


export default class LoginForm extends Vue {
    isForgotPassword: boolean = false;
    formSubmitting: boolean = false;
    model: LoginModel = new LoginModel();
    email: string = '';
    confirmPassword: string = '';
    rawPassword: string = '';
    $cookie: any;
    $auth: any;

    isValidatingEmail: boolean = false;

    // Login or Signup
    isLogin: boolean = true;

    googleSignInParams: any = {
        client_id: '865729199339-hclqajg0re388bm6t9pje61gsglat3rr.apps.googleusercontent.com'
    };
    fbSignInParams: any = {
        scope: 'public_profile,email',
        return_scopes: true
    };

    @Watch('isLogin')
    onisLoginChanged(value: boolean, oldValue: boolean) {
        (this.$validator as any).reset();

        //if (value) {
        //    this.$validator.attach('email', 'required|email|verify_email');
        //} else {
        //    this.$validator.attach('email', 'required|email');
        //}
    }

    created() {
        // https://jsfiddle.net/pp0w8u6s/
        // http://vee-validate.logaretm.com/examples.html#debounce-example
        Validator.extend('verify_email', {
            getMessage: field => `This ${field} already exists.`,
            validate: value => new Promise((resolve) => {
                if (this.isLogin) {
                    resolve({ valid: true });
                    return;
                }

                this.isValidatingEmail = true;
                (new UserService()).verifyEmail(value)
                    .then(response => {
                        resolve({ valid: response });
                        this.isValidatingEmail = false;
                    })
                    .catch(error => {
                        this.isValidatingEmail = false;
                        resolve({ valid: true })
                    });
            })
        });
        this.$validator.attach('email', 'required|email|verify_email');
    }

    validateEmail() {
        this.$validator.validate('email', this.email);
    }

    validateBeforeSubmit(e) {
        this.$validator.validateAll({ email: this.email, password: this.rawPassword }).then((result) => {
            if (result) {
                this.formSubmitting = true;
                if (this.rawPassword) {
                    this.model.password = encryptText(this.rawPassword);
                }

                this.model.email = this.email;
                if (this.isLogin) {
                    this.login(this.model).then(() => this.formSubmitting = false).catch(() => this.formSubmitting = false);
                } else {
                    this.signup(this.model).then(() => this.formSubmitting = false).catch(() => this.formSubmitting = false);
                }
                (this.$validator as any).reset();                
            }
        }).catch(() => {
            // eslint-disable-next-line
            alert('Correct them errors!');
        });
    }

    login(model) {
        return (new UserService()).login(model)
            .then(responseToken => this.handleLoginToken(responseToken));
    }

    signup(model) {
        model.role = UserRole.User;
        model.images = [{ "url": model.photoUrl }];

        return (new UserService()).signup(model)
        .then(responseToken => this.handleLoginToken(responseToken));
    }

    handleLoginToken(response) {
        var token = response.result;
        this.$store.dispatch('SET_CURRENT_USER', token.loggedInUser);
        this.$store.dispatch('SET_TOKEN', token.accessToken);
        this.setCookies(token.accessToken);
        this.rawPassword = '';        

        if (this.$store.state.modalOpenning) {
            this.$emit('onSuccessfulLogin');
        } else {
            let queryString = this.$route.query;
            this.$router.push(queryString.returnUrl);
        }
    }

    setCookies(accessToken) {
        this.$cookie.set('mtltk', accessToken);    
    }

    onResetPassword() {
        requestPasswordReset(this.model.email)
            .then(x => console.log(x));
    }

    onGgSignInSuccess(googleUser) {
        // `googleUser` is the GoogleUser object that represents the just-signed-in user. 
        // See https://developers.google.com/identity/sign-in/web/reference#users 
        const profile = googleUser.getBasicProfile(); // etc etc 
        console.log('ID: ' + profile.getId());
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        this.$store.dispatch("ENABLE_LOADING");
        if (this.isLogin) {
            this.login({ email: profile.getEmail(), source: UserSource.Google, externalId: encryptText(profile.getId()) })
                .then(() => this.$store.dispatch("DISABLE_LOADING"));
        } else {
            this.signup({
                email: profile.getEmail(),
                firstname: profile.getGivenName(),
                lastname: profile.getFamilyName(),
                photoUrl: profile.getImageUrl(),
                source: UserSource.Google,
                externalId: encryptText(profile.getId())
            })
            .then(() => this.$store.dispatch("DISABLE_LOADING"));
        }
        
    }

    onGgSignInError(error) {
        // `error` contains any error occurred. 
    }

    onFbSignInSuccess(response) {
        this.$store.dispatch("ENABLE_LOADING");
        FB.api('/me',
            { "fields": "id,name,email,first_name,last_name,picture" },
            profile => {
                console.log(`Id: ${profile.id}.`);
                console.log(`Name: ${profile.name}.`);
                console.log(`Email: ${profile.email}.`);
                console.log(`First name: ${profile.first_name}.`);
                console.log(`Last name: ${profile.last_name}.`);
                console.log(`Picture: ${profile.picture.data.url}.`);

                if (this.isLogin) {
                    this.login({ email: profile.email, source: UserSource.Facebook, externalId: encryptText(profile.id) })
                        .then(() => this.$store.dispatch("DISABLE_LOADING"));    
                } else {
                    this.signup({
                        email: profile.email,
                        firstname: profile.first_name,
                        lastname: profile.last_name,
                        photoUrl: profile.picture.data.url,
                        source: UserSource.Facebook,
                        externalId: encryptText(profile.id)
                    })
                    .then(() => this.$store.dispatch("DISABLE_LOADING"));    
                }
            });
    }

    onFbSignInError(error) {
    }

    checkFbLoginStatus() {
        FB.getLoginStatus(response => {
            console.log(response);
        });
    }

    checkGGLoginStatus() {
        gapi.auth.checkSessionState({ session_state: null }, isUserNotLoggedIn => {
            if (isUserNotLoggedIn) {
                // do some stuff
            }
        });        
    }

    checkRSAEncryoption() {
        var encrypt = new JSEncrypt();

        fetchPublicKey().then(data => {
            encrypt.setPublicKey(data);
            let encryptedText = encrypt.encrypt("không phải utf8");
            console.log(encryptedText);
            decryptTextFromServer(encryptedText).then(x => console.log(x))
        })
    }

    changeLoginMode(value) {
        this.isLogin = value;
        (this.$validator as any).reset();
        this.$emit('onChangeMode', value ? 'Login' : 'Sign Up');
    }

    switchToForgotPassword(value) {
        this.isForgotPassword = value;
        (this.$validator as any).reset();
        this.$emit('onChangeMode', value ? 'Forgot password' : 'Login');
    }
}
