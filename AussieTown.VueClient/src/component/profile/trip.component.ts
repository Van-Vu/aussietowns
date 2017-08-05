import Vue from "vue";
import { Component, Inject, Watch, Prop } from "vue-property-decorator";
import CardFullComponent from '../shared/listingcard.component.vue';
import ListingModel from '../../model/listing.model';
import UserModel from '../../model/user.model';

@Component({
    name: "TripComponent",
    components: {
        "listingcard": CardFullComponent
    }
})

export default class TripComponent extends Vue {
    asyncData({ store, route }) {
        if (route.params.profileId) {
            return store.dispatch('FETCH_PROFILE_BY_ID', route.params.profileId);
        }
    }

    get offers() {
        return this.$store.state.profile.operatorListings;
    }

    get requests() {
        return this.$store.state.profile.guestListings;
    }
}
