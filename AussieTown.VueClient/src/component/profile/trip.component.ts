import Vue from "vue";
import { Component, Inject, Watch, Prop } from "vue-property-decorator";
import ListingModel from '../../model/listing.model';
import UserModel from '../../model/user.model';
import { ListingType } from '../../model/enum';
import CardFullComponent from '../shared/listingcard.component.vue';

@Component({
    name: "TripComponent",
    components: {
        "listingcard": CardFullComponent
    }
})

export default class TripComponent extends Vue {
    static asyncData({ store, route }) {
        if (route.params.profileId) {
            return store.dispatch('FETCH_PROFILE_BY_ID', route.params.profileId);
        }
    }

    get requests() {
        return this.$store.state.profile.operatorListings.filter(x => x.type == ListingType.Request);
    }

    get confirmedGuests() {
        return this.$store.state.profile.guestListings;
    }
}
