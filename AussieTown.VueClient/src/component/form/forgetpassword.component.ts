import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import VeeValidate from 'vee-validate';
import { verifyResetToken, resetPassword, encryptText } from '../../service/auth.service';

import ResetPasswordModel from '../../model/resetpassword.model';



Vue.use(VeeValidate);

@Component({
    name: 'ForgetPasswordForm',
    components: {

    }
})

export default class ForgetPasswordForm extends Vue {
    @Prop() guidString: string;
    confirmPassword: string = '';
    model: ResetPasswordModel = new ResetPasswordModel();

    formSubmitted: boolean = false;

    static asyncData({ store, route }) {
        if (route.params.guidString) {
            return verifyResetToken(route.params.guidString).then(x => {
                console.log('Bodom:' + x);
            });
        }
    }

    created() {
        //console.log('Bodom guidString:' + this.guidString);
    }


    onResetPassword() {
        //this.$validator.validateAll().then(() => {
        //    // eslint-disable-next-line
        //    (new UserService()).signup(this.model)
        //        .then(response => {
        //            this.$emit('onSuccessfulLogin', response);
        //        });
        //}).catch(() => {
        //    // eslint-disable-next-line
        //    alert('Correct them errors!');
        //});

        this.model.isChangePassword = false;
        this.model.resetToken = this.guidString;
        this.model.newPassword = encryptText(this.model.newPassword);

        resetPassword(this.model)
            .then(x => console.log(x));

    }
}

