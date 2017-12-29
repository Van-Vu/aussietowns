import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import SearchBarComponent from '../component/shared/search/searchbar.component.vue';
import Swiper from '../component/shared/external/vue-swiper.vue';
import NumberChooser from '../component/shared/numberchooser.component.vue';
import UserService from '../service/user.service';
import SettingService from '../service/settings.service';

import { NotificationType } from '../model/enum';
import datepicker from '../component/shared/external/datepicker.vue';

//import LoginModal from '../component/modal/loginmodal.component.vue';
import ScheduleModalComponent from '../component/modal/schedulemodal.component.vue';

import LoginForm from '../component/form/loginform.component.vue';
import ScheduleComponent from '../component/shared/schedule.component.vue';
import CardFullComponent from '../component/shared/listingcard.component.vue';
import CheckButton from '../component/shared/checkbutton.component.vue';
import CheckButtonModel from '../model/checkbutton.model';

@Component({
    name: 'TestPage',
    components: {
        "searchbar": SearchBarComponent,
        "swiper": Swiper,
        "numberchooser": NumberChooser,
        "datepicker": datepicker,
        "loginmodal": LoginForm,
        "schedulemodal": ScheduleComponent,
        "listingcard": CardFullComponent,
        'checkButton': CheckButton
    }
})

export default class TestPage extends Vue {
    showListingRequest: boolean = false;
    showListingOffer: boolean = false;
    numberChooser : number = 0;
    currentView: string = 'listingcard';
    listings: any[] = [];
    hobbies: CheckButtonModel[] = null;


    isValidating: boolean = false;
    rawPassword: string = '';
    email: string = '';
    $ua: any;
    checkButtonModel: any;

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
        //return store.dispatch('FETCH_FEATURELISTINGS');
    }

    created() {
        this.listings = this.$store.state.featureListings;

        this.checkButtonModel
        //this.$store.dispatch('SEARCH_LISTINGS_BY_SUBURB', 129).then(() => {
        //    this.listings = this.$store.state.searchListings;
        //});

        //v - validate="'required|email'"
        this.$validator.attach('email', 'required|email');


    }

    fetchHobbies() {
        (new SettingService()).getAllHobbies()
            .then(response => {this.hobbies = response as any});        
    }

    checkLogginUser() {
        this.$store.dispatch('TEST');
    }

    addNotification() {
        this.$store.dispatch('ADD_NOTIFICATION', { title: "this is title", text: "this is the text", type: NotificationType.Success });
    }

    validateBeforeSubmit() {
        alert('validate');
    }

    onContact() {
        this.$ua.trackEvent('TestPage', 'Contact Click', '', 0);

        this.$store.dispatch('SHOW_CONTACT_MODAL',
        {
            senderId: 1,
            receiverId: 2,
            receiverName: 'Hey there',
            listingId: 15,
            listingHeader: 'this is listing 15'
        });
    }

    onBlur(value) {
        this.isValidating = true;
        this.$validator.validate('email', this.email);
        //this.isValidating = false;
    }

}
