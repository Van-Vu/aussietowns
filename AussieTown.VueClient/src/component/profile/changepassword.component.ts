import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import VeeValidate from 'vee-validate';
import { changePassword, encryptText } from '../../service/auth.service';
import ResetPasswordModel from '../../model/resetpassword.model';



Vue.use(VeeValidate);

@Component({
    name: 'ChangePasswordComponent',
    components: {

    }
})

export default class ChangePasswordComponent extends Vue {
    @Prop guidString: string;
    confirmPassword: string = '';
    model: ResetPasswordModel = new ResetPasswordModel();

    formSubmitted: boolean = false;

    created() {

    }


    onChangePassword() {
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

        this.model.isChangePassword = true;
        this.model.email = this.$store.state.loggedInUser.email;
        this.model.newPassword = encryptText(this.model.newPassword);
        this.model.oldPassword = encryptText(this.model.oldPassword);

        changePassword(this.model)
            .then(x => console.log(x));
    }
}

