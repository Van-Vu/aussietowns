import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import UserDetailComponent from '../form/userdetail.component.vue';
import TripComponent from './trip.component.vue';

@Component({
    name: 'ProfileComponent',
    components: {
        'profileform': UserDetailComponent,
        'tripcomponent': TripComponent
    }
})

export default class ProfileComponent extends Vue {
    isPhotosActivated: boolean = false;
    isMessageActivated: boolean = false;
    isTripsActivated: boolean = false;

    asyncData({ store, route }) {
        console.log('profile id:' + route.params.profileId);
        if (route.params.profileId) {
            return store.dispatch('FETCH_USER_BY_ID', route.params.profileId);
        }
    }

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