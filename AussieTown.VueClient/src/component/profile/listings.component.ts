import Vue from "vue";
import { Component, Inject, Watch, Prop } from "vue-property-decorator";
import CardSmallComponent from '../shared/cardsmall.component.vue';
import ListingModel from '../../model/listing.model';
import UserModel from '../../model/user.model';
import { ListingType } from '../../model/enum';

@Component({
    name: "ListingsComponent",
    components: {
        "cardsmall": CardSmallComponent
    }
})

export default class ListingsComponent extends Vue {
    static asyncData({ store, route }) {
        if (route.params.profileId) {
            return store.dispatch('FETCH_PROFILE_BY_ID', route.params.profileId);
        }
    }

    get listings() {
        return this.$store.state.profile.operatorListings.filter(x => x.type == ListingType.Offer);
    }
}
