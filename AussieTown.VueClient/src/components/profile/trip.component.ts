import Vue from "vue";
import { Component, Inject, Watch, Prop } from "vue-property-decorator";
import ListingCardComponent from '../shared/listingcard.component.vue';
import ListingModel from '../model/listing.model';
import UserModel from '../model/user.model';

@Component({
    name: "TripComponent",
    components: {
        "listingcard": ListingCardComponent
    }
})

export default class TripComponent extends Vue {
    offers: ListingModel[] = new Array<ListingModel>();
    requests: ListingModel[] = new Array<ListingModel>();

    created(): void {
        if (this.$store.state.profile) {
            var profile = this.$store.state.profile as UserModel;
            if (profile.operatorListings) this.offers = profile.operatorListings;
            if (profile.guestListings) this.requests = profile.guestListings;
        }
    }
}
