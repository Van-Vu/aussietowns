import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import UserService from '../../service/user.service';

import VeeValidate from 'vee-validate';
import LoginModel from '../../model/login.model';


Vue.use(VeeValidate);
declare const FB: any;

@Component({
  name: "Loginform"  
})

export default class LoginForm extends Vue {
    formSubmitted: boolean = false;
    model: LoginModel = new LoginModel();
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
            (new UserService()).login(this.model)
                .then(responseToken => {
                    this.$emit('onSuccessfulLogin', responseToken); 
                });
        }).catch(() => {
            // eslint-disable-next-line
            alert('Correct them errors!');
        });
    }

    submitForm() {
        this.formSubmitted = true;
    }

    onSignInSuccess(googleUser) {
        // `googleUser` is the GoogleUser object that represents the just-signed-in user. 
        // See https://developers.google.com/identity/sign-in/web/reference#users 
        const profile = googleUser.getBasicProfile(); // etc etc 
        console.log('ID: ' + profile.getId());
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());

    }

    onSignInError(error) {
        // `error` contains any error occurred. 
        console.log('OH NOES', error);
    }

    onFbSignInSuccess(response) {
        FB.api('/me',
            { "fields": "id,name,email,first_name,last_name,picture" },
            dude => {
                console.log(`Id: ${dude.id}.`);
                console.log(`Name: ${dude.name}.`);
                console.log(`Email: ${dude.email}.`);
                console.log(`First name: ${dude.first_name}.`);
                console.log(`Last name: ${dude.last_name}.`);
                console.log(`Picture: ${dude.picture.data.url}.`);
            });
    }

    onFbSignInError(error) {
        console.log('OH NOES', error);
    }
}
