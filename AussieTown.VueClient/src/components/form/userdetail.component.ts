import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import VeeValidate from 'vee-validate';
import AutoCompleteComponent from "../shared/autocomplete.vue";

Vue.use(VeeValidate);

@Component({
    name: 'UserDetail',
    components: {
        "autocomplete": AutoCompleteComponent
    }
})

export default class UserDetailComponent extends Vue {
    email: string = '';
    password: string = '';
    firstname: string = '';
    lastname: string = '';
    phone: string = '';
    gender: string = '';
    birthday = new Date(2016, 9, 16);
    description: string = '';
    address: string = '';
    emergencyContact: string = '';

    list: any[] = [];
    placeHolderText = "this is the test";

    formSubmitted: boolean = false;

    submitForm() {
        this.formSubmitted = true;
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

onUpdate(){}
capture(){}
}

