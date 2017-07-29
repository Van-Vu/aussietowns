import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import VeeValidate from 'vee-validate';
import { changePassword } from '../../service/auth.service';
import ResetPasswordModel from '../../model/resetpassword.model';



Vue.use(VeeValidate);

@Component({
    name: 'ChangePasswordForm',
    components: {

    }
})

export default class ChangePasswordForm extends Vue {
    @Prop guidString: string;
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
        this.model.email = this.$store.state.loggedInUser.Email;
        changePassword(this.model)
            .then(x => console.log(x));
    }
}

