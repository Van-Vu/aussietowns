import Vue from "vue";
import { Component, Inject, Watch, Prop } from "vue-property-decorator";
import ListingModel from '../../model/listing.model';
import UserModel from '../../model/user.model';
import { ListingType, CardType } from '../../model/enum';
import CardFullComponent from '../shared/listingcard.component.vue';


@Component({
    name: "ListingsComponent",
    components: {
        "listingcard": CardFullComponent
    }
})

export default class ListingsComponent extends Vue {
    listingCardType: CardType = CardType.Listing;

    static asyncData({ store, route }) {
        if (route.params.profileId) {
            return store.dispatch('FETCH_PROFILE_BY_ID', route.params.profileId);
        }
    }

    get listings() {
        return this.$store.state.profile.operatorListings.filter(x => x.type == ListingType.Offer);
    }
}
