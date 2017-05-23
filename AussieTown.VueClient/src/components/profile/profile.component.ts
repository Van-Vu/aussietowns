import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import UserDetailComponent from '../form/userdetail.component.vue';
import ListingRequestForm from '../form/listingrequest.component.vue';

@Component({
    name: 'ProfileComponent',
    components: {
        'profileform': UserDetailComponent,
        "listingrequestform": ListingRequestForm
    }
})

export default class ProfileComponent extends Vue {
    isPhotosActivated: boolean = false;
    isMessageActivated: boolean = false;
    isTripsActivated: boolean = false;

    activatePhotosTab() {
        this.isPhotosActivated = true;
    }

    activateMessageTab() {
        this.isMessageActivated = true;
    }

    activateTripsTab() {
        this.isTripsActivated = true;
    }
}