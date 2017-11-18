import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import UserService from '../../service/user.service';

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
    formSubmitted: boolean = false;
    model: LoginModel = new LoginModel();
    confirmPassword: string = '';
    rawPassword: string = '';
    $cookie: any;
    $auth: any;

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
    }

    validateBeforeSubmit(e) {
        this.$validator.validateAll().then((result) => {
            (this.$validator as any).reset();
            if (result) {
                if (this.rawPassword) {
                    this.model.password = encryptText(this.rawPassword);
                }
                if (this.isLogin) {
                    this.login(this.model);
                } else {
                    this.signup(this.model);
                }                
            }
        }).catch(() => {
            // eslint-disable-next-line
            alert('Correct them errors!');
        });
    }

    login(model) {
        (new UserService()).login(model)
            .then(responseToken => this.handleLoginToken(responseToken))
            .catch(error => {
                this.$store.dispatch('ADD_NOTIFICATION', { title: "Login error", text: error.message ? error.message : error.data, type: NotificationType.Error });
            });
    }

    signup(model) {
        model.role = UserRole.User;
        model.images = [{ "url": model.photoUrl }];

        (new UserService()).signup(model)
        .then(responseToken => this.handleLoginToken(responseToken));
    }

    handleLoginToken(token) {
        this.$store.dispatch('SET_CURRENT_USER', token.loggedInUser);
        this.setCookies(token.accessToken);
        this.$emit('onSuccessfulLogin');
        this.rawPassword = '';        
    }

    setCookies(accessToken) {
        this.$cookie.set('mtltk', accessToken);    
    }

    submitForm() {
        this.formSubmitted = true;
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

        if (this.isLogin) {
            this.login({ email: profile.getEmail(), source: UserSource.Google, externalId: encryptText(profile.getId()) });    
        } else {
            this.signup({
                email: profile.getEmail(),
                firstname: profile.getGivenName(),
                lastname: profile.getFamilyName(),
                photoUrl: profile.getImageUrl(),
                source: UserSource.Google,
                externalId: encryptText(profile.getId())
            });
        }
        
    }

    onGgSignInError(error) {
        // `error` contains any error occurred. 
        console.log('OH NOES', error);
    }

    onFbSignInSuccess(response) {
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
                    this.login({ email: profile.email, source: UserSource.Facebook, externalId: encryptText(profile.id) });    
                } else {
                    this.signup({
                        email: profile.email,
                        firstname: profile.first_name,
                        lastname: profile.last_name,
                        photoUrl: profile.picture.data.url,
                        source: UserSource.Facebook,
                        externalId: encryptText(profile.id)
                    });    
                }
            });
    }

    onFbSignInError(error) {
        console.log('OH NOES', error);
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

}
