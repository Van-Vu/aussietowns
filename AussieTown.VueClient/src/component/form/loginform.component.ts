import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import UserService from '../../service/user.service';

import VeeValidate from 'vee-validate';
import LoginModel from '../../model/login.model';
import { UserSource } from '../../model/enum';

import { fetchPublicKey, decryptTextFromServer } from '../../service/auth.service';
import { GlobalConfig } from '../../GlobalConfig';

Vue.use(VeeValidate);

declare const FB: any;
declare const gapi: any;
declare const JSEncrypt: any;

@Component({
  name: "Loginform"  
})


export default class LoginForm extends Vue {
    formSubmitted: boolean = false;
    model: LoginModel = new LoginModel();
    $cookie: any;

    // Login or Signup
    isLogin: boolean = true;

    googleSignInParams: any = {
        client_id: '865729199339-hclqajg0re388bm6t9pje61gsglat3rr.apps.googleusercontent.com'
    };
    fbSignInParams: any = {
        scope: 'public_profile,email',
        return_scopes: true
    };

    validateBeforeSubmit(e) {
        this.$validator.validateAll().then(() => {
            // eslint-disable-next-line
            if (this.isLogin) {
                this.login(this.model);
            } else {
                this.signup(this.model);
            }
        }).catch(() => {
            // eslint-disable-next-line
            alert('Correct them errors!');
        });
    }

    login(model) {
        if (model.password) {
            model.password = this.encryptText(model.password);
        }

        (new UserService()).login(model)
        .then(responseToken => {
            this.$store.dispatch('SET_CURRENT_USER', responseToken.loggedInUser);
            this.setCookies(responseToken.accessToken);
            this.$emit('onSuccessfulLogin');
        });
    }

    signup(model) {
        if (model.password) {
            model.password = this.encryptText(model.password);    
        }

        (new UserService()).signup(model)
        .then(responseToken => {
            this.$store.dispatch('SET_CURRENT_USER', responseToken.loggedInUser);
            this.setCookies(responseToken.accessToken);
            this.$emit('onSuccessfulLogin');
        });
    }

    setCookies(accessToken) {
        this.$cookie.set('mtltk', accessToken);
    }

    encryptText(text) {
        var encrypt = new JSEncrypt();
        encrypt.setPublicKey(GlobalConfig.publicKey);
        let encryptedText = encrypt.encrypt(text);
        return encryptedText;
    }

    submitForm() {
        this.formSubmitted = true;
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
            this.login({ email: profile.getEmail(), source: UserSource.Google, externalId: this.encryptText(profile.getId()) });    
        } else {
            this.signup({
                email: profile.getEmail(),
                firstname: profile.getGivenName(),
                lastname: profile.getFamilyName(),
                photoUrl: profile.getImageUrl(),
                source: UserSource.Google,
                externalId: this.encryptText(profile.getId())
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
                    this.login({ email: profile.email, source: UserSource.Facebook, externalId: this.encryptText(profile.id) });    
                } else {
                    this.signup({
                        email: profile.email,
                        firstname: profile.first_name,
                        lastname: profile.last_name,
                        photoUrl: profile.picture.data.url,
                        source: UserSource.Facebook,
                        externalId: this.encryptText(profile.id)
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
