import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import UserDetailComponent from '../component/form/userdetail.component.vue';
import TripComponent from '../component/profile/trip.component.vue';
import MessageComponent from '../component/profile/message.component.vue';
import UserImageComponent from '../component/profile/userimage.component.vue';

@Component({
    name: 'ProfilePage',
    components: {
        'profileform': UserDetailComponent,
        'tripcomponent': TripComponent,
        'messagecomponent': MessageComponent,
        'userimage': UserImageComponent
    }
})

export default class ProfilePage extends Vue {
    isPhotosActivated: boolean = false;
    isMessageActivated: boolean = false;
    isTripsActivated: boolean = false;

    asyncData({ store, route }) {
        console.log('profile id:' + route.params.profileId);
        if (route.params.profileId) {
            return store.dispatch('FETCH_USER_BY_ID', route.params.profileId);
            //return store.dispatch('FETCH_CONVERSATIONS_BY_USER', route.params.profileId);
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