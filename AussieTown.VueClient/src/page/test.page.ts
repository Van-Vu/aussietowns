import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import SearchBarComponent from '../component/shared/search/searchbar.component.vue';
import Swiper from '../component/shared/external/vue-swiper.vue';
import NumberChooser from '../component/shared/numberchooser.component.vue';
import UserService from '../service/user.service';
import { NotificationType } from '../model/enum';
import datepicker from '../component/shared/external/datepicker.vue';

@Component({
    name: 'TestPage',
    components: {
        "searchbar": SearchBarComponent,
        "swiper": Swiper,
        "numberchooser": NumberChooser,
        "datepicker": datepicker
    }
})

export default class TestPage extends Vue {
    showListingRequest: boolean = false;
    showListingOffer: boolean = false;
    numberChooser : number = 0;

    disableDays = {
        days: [6, 0] // Disable Saturday's and Sunday's
    };

    startDate = new Date();


    checkLogginUser() {
        this.$store.dispatch('TEST');
    }

    addNotification() {
        this.$store.dispatch('ADD_NOTIFICATION', { title: "this is title", text: "this is the text", type: NotificationType.Success });
    }

}
