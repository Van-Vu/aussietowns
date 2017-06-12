import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import UserService from '../../services/user.service';

import VeeValidate from 'vee-validate';
import LoginModel from '../model/login.model';


Vue.use(VeeValidate);

@Component({
  name: "Loginform"  
})

export default class LoginForm extends Vue {
    formSubmitted: boolean = false;
    model: LoginModel = new LoginModel();


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
}
