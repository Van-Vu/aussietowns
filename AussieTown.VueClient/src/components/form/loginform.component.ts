import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);

@Component({
  name: "Loginform"  
})

export default class LoginForm extends Vue {
    email: string= "";
    password: string= "";
    formSubmitted: boolean = false;

    validateBeforeSubmit(e) {
        this.$validator.validateAll().then(() => {
            // eslint-disable-next-line
            alert('From Submitted!');
        }).catch(() => {
            // eslint-disable-next-line
            alert('Correct them errors!');
        });
    }

    submitForm() {
        this.formSubmitted = true;
    }
}
