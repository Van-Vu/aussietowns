import Vue from "vue";
import { Component, Inject, Watch, Prop } from "vue-property-decorator";
import ListingCardComponent from '../component/shared/listingcard.component.vue';

if (process.env.VUE_ENV === 'client') {
    const googleMaps = require('vue2-google-maps')
    Vue.use(googleMaps, {
        load: {
            key: 'AIzaSyCaS0ArS9mkdiAFxHKIgpMwUMp1_XSdzTM'
        }
    })
}

@Component({
    name: "SearchPage",
    components: {
        "listingcard": ListingCardComponent
    }
})

export default class SearchPage extends Vue {
    lat: number;
    lng: number;
    map: any = null;
    //suburbs: SuburbLocation[];
    listings: any[] = [];
    totalDistance: number = 0;
    //listing = { id: 1, location: "Sydney", primaryOwner: "test User", header: "this is header", cost: "cost", description: "this is description" };
    showListingRequest: boolean = false;
    showListingOffer: boolean = false;

    asyncData({ store, route }) {
        if (route.params.suburbId) {
            return store.dispatch('SEARCH_LISTINGS_BY_SUBURB', route.params.suburbId);
        }
    }

    created(): void {
        this.$store.dispatch('SET_CURRENT_PAGE', 'search');
    }

    mounted() {
        if (this.$store.state.searchListings) {
            this.listings = this.$store.state.searchListings;
        } else {
            this.$store.dispatch('SEARCH_LISTINGS_BY_SUBURB', this.$route.params.suburbId).then(() => {
                this.listings = this.$store.state.searchListings;
            });
        }        
    }

    center = { lat: -33.860, lng: 151.210 };
    markers = [
        { position: { lat: -33.860, lng: 10.0 } },
        { position: { lat: 11.0, lng: 11.0 } }
    ];

    showTourRequest() {
        this.$router.push("home");
    }
}
