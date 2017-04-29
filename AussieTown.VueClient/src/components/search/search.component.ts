import Vue from "vue";
import { Component, Inject, Watch, Prop } from "vue-property-decorator";
import AutoCompleteComponent from "./autocomplete/autocomplete.vue";
import ListingOfferCardComponent from './listingoffercard.component.vue';
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyCaS0ArS9mkdiAFxHKIgpMwUMp1_XSdzTM'
    }
});

@Component({
    name: "Search",
    components: {
        "listingoffercard": ListingOfferCardComponent
    }
})

export default class SearchComponent extends Vue {
    lat: number;
    lng: number;
    map: any = null;
    //suburbs: SuburbLocation[];
    listings: any[] = [];
    totalDistance: number = 0;
    listing = { id: 1, location: "Sydney", primaryOwner: "test User", header: "this is header", cost: "cost", description: "this is description" };

    center = { lat: -33.860, lng: 151.210 };
    markers = [
        { position: { lat: -33.860, lng: 10.0 } },
        { position: { lat: 11.0, lng: 11.0 } }
    ];

    showTourRequest() {
        this.$router.push("home");
    }
}
