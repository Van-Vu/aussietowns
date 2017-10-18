import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import VeeValidate from 'vee-validate';

import RegisterModel from '../../model/register.model';
import UserService from '../../service/user.service';



Vue.use(VeeValidate);

@Component({
    name: 'RegistrationForm',
    components: {

    }
})

export default class RegistrationForm extends Vue {
    model: RegisterModel = new RegisterModel();

    list: any[] = [];
    placeHolderText = "this is the test";

    formSubmitted: boolean = false;

    submitForm() {
        (new UserService()).signup(this.model);
    }

    onLocationSearch(event) {
        //this.searchStr = event;
        this.list = [
            { "id": 1, "name": "test" },
            { "id": 2, "name": "test2" }
        ];
    }

    onSelect(val) {
        //this.searchStr = val.Description;
        //this.selectedId = val.Value;
    }

    onRegister() {
        this.$validator.validateAll().then((result) => {
            if (result) {
                (new UserService()).signup(this.model)
                    .then(response => {
                        this.$emit('onSuccessfulLogin', response);
                    });
            }
        }).catch(() => {
            // eslint-disable-next-line
            alert('Correct them errors!');
        });
    }


    capture() { }
}

