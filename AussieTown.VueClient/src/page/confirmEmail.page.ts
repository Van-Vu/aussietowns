import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import VeeValidate from 'vee-validate';
import { NotificationType } from '../model/enum';
import { plainToClass } from "class-transformer";
import UserModel from '../model/user.model';

Vue.use(VeeValidate);

@Component({
    name: 'ConfirmEmailPage',
    components: {

    }
})

export default class ConfirmEmailPage extends Vue {
    @Prop() confirmToken: string;
    isConfirmed: boolean = false;

    static asyncData({ store, route }) {
        if (route.params.confirmToken) {
            return store.dispatch('VERIFY_EMAIL_TOKEN', route.params.confirmToken);
        }
    }

    get model() {
        return plainToClass<UserModel, Object>(UserModel, this.$store.state.profile);
    }


    created() {

    }

    onChangePassword() {
        this.$validator.validateAll().then((result) => {
            if (result) {
                if (this.model.id > 0) {
                    this.$store.dispatch("ENABLE_LOADING");
                    this.model.token = this.$route.params.confirmToken;
                    return this.$store.dispatch('CONFIRM_USER', this.model)
                        .then(response => {
                            this.$store.dispatch("DISABLE_LOADING");
                            if (response == 1) {
                                this.isConfirmed = true;
                            }
                        })
                        .catch(err => {
                            
                        });
                }
            }
        }).catch(() => {
            alert('Correct them errors!');
        });
    }

}

