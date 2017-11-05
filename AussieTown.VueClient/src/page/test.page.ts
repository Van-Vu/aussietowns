import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import SearchBarComponent from '../component/shared/search/searchbar.component.vue';
import Swiper from '../component/shared/external/vue-swiper.vue';
import NumberChooser from '../component/shared/numberchooser.component.vue';
import UserService from '../service/user.service';
import { NotificationType } from '../model/enum';
import datepicker from '../component/shared/external/datepicker.vue';

//import LoginModal from '../component/modal/loginmodal.component.vue';
import ScheduleModalComponent from '../component/modal/schedulemodal.component.vue';

import LoginForm from '../component/form/loginform.component.vue';
import ScheduleComponent from '../component/shared/schedule.component.vue';
import CardFullComponent from '../component/shared/listingcard.component.vue';


@Component({
    name: 'TestPage',
    components: {
        "searchbar": SearchBarComponent,
        "swiper": Swiper,
        "numberchooser": NumberChooser,
        "datepicker": datepicker,
        "loginmodal": LoginForm,
        "schedulemodal": ScheduleComponent,
        "listingcard": CardFullComponent
    }
})

export default class TestPage extends Vue {
    showListingRequest: boolean = false;
    showListingOffer: boolean = false;
    numberChooser : number = 0;
    currentView: string = 'listingcard';
    listings: any[] = [];

    switchModal() {
        if (this.currentView == 'loginmodal') {
            this.currentView = 'listingcard';
        } else {
            this.currentView = 'loginmodal';
        }
    }

    disableDays = {
        days: [6, 0] // Disable Saturday's and Sunday's
    };

    startDate = new Date();

    static asyncData({ store, route }) {
        return store.dispatch('FETCH_FEATURELISTINGS');
    }

    created() {
        this.listings = this.$store.state.featureListings;


        //this.$store.dispatch('SEARCH_LISTINGS_BY_SUBURB', 129).then(() => {
        //    this.listings = this.$store.state.searchListings;
        //});
    }

    checkLogginUser() {
        this.$store.dispatch('TEST');
    }

    addNotification() {
        this.$store.dispatch('ADD_NOTIFICATION', { title: "this is title", text: "this is the text", type: NotificationType.Success });
    }

}
