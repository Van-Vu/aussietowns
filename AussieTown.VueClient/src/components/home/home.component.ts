import Vue from "vue";
import { Component, Inject, Watch, Prop } from "vue-property-decorator";
import VueRouter from 'vue-router';
import LoginModalComponent from '../modal/loginmodal.component.vue';
import ListingRequestModalComponent from '../modal/listingrequestmodal.component.vue';
import ListingOfferModalComponent from '../modal/listingoffermodal.component.vue';
import axios from 'axios';
import SearchService from '../../services/search.service';
import LocationSearchComponent from '../shared/locationsearch.component.vue';
//import datepicker from '../share/datepicker.vue';

import * as datepicker from '../shared/datepicker.vue';
import * as Swiper from '../shared/vue-swiper.vue';

@Component({
    name: 'Home',
    components: {
        "locationsearch": LocationSearchComponent,
        "listingrequestmodal": ListingRequestModalComponent,
        "listingoffermodal": ListingOfferModalComponent,
        "datepicker": datepicker,
        "swiper": Swiper
    }
})

export default class HomeComponent extends Vue{

    asyncData({ store, route }) {
        // return the Promise from the action
        console.log('here II am: :' + store.state);
        //return store.dispatch('FETCH_LISTING_BY_ID', 18);
    }


    //The time to show the next photo
    private NextPhotoInterval: number = 5000;
    //Looping or not
    private noLoopSlides: boolean = true;
    //Photos
    private slides: any[] = [];
    initializeRequestSlide: boolean = false;
    searchLocations: any;
    $cookie: any;
    showListingRequest: boolean = false;
    showListingOffer: boolean = false;

    datepick = "2017-06-03";

    requestSlides: Array<any> = [
        { "text": "slide conten asdfa sdfasfd asdf asdf asdf as dfasd", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/a5bdb2fc08f9096fb1ef3afca2e5c1ff5292daf9fe7b86b8710d091ae7fa5547/400/232/1.0" },
        { "text": "slide conten", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/2466d2267dc2316b277610eafb1d957d7ce978df7e9bdd053fd8c67c40d57165/400/232/1.0" },
        { "text": "slide conten", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/5da2f1e6962f0c61837683b9fedbed7f0f2bb39d87626fda2cc1176d2f892fbc/400/232/1.0" },
        { "text": "slide conten", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/7f905e034dbde2f070551d1c979bac39b5e58a9a43e8d454bc20a1f23924c2e4/400/232/1.0" },
        { "text": "slide conten", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/17cd5bb4ea0f4d7c51aa00c90611ad7eaae2b2d7170ac1688a0d4fc6697595df/400/232/1.0" },
        { "text": "slide conten", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/ba7fa31fd8b2f088920095c7355ae83e061320debe07dbed1b4fe2a5c3b323ed/400/232/1.0" },
        { "text": "slide conten", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/e6d82c83caba66519a39f427dda7d16a4e6ee4c6600739dc39ea2900f779a576/400/232/1.0" },
        { "text": "slide conten", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/74c0d1d8346196311ba28caea05f2416273b5c0e156479bb3f30f65c446ce96a/400/232/1.0" },
        { "text": "slide conten", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/35d6a6e29c5727ed466104eac7975a858a8182e707c1a92fa6cdf513166a68be/400/232/1.0" },
        { "text": "slide conten", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/c20a31bb5a3b657a603b8a792d691fa407410753a5617e7077386bb692169eae/400/232/1.0" },
        { "text": "slide conten", "imgSrc": "/static/images/giphy.gif" }
    ];

    onSelect(val) {
        console.log(val);
    }

    onSearch(model) {
        //{ name: 'user', params: { userId: 123 } }
        this.$router.push('search');
    }
@Prop posts: any[];
errors: any[];

    get myComputedProp() {
        return this.$store.state;
    }

    created() {
	    //axios.get(`http://jsonplaceholder.typicode.com/posts`)
	    //.then(response => {
	    //  // JSON responses are automatically parsed.
	    //  this.posts = response.data
	    //})
	    //.catch(e => {
	    //  this.errors.push(e)
	    //})
        this.$cookie.set('bodomtest', 'hi there');
    }

    onSlideChangeStart(currentPage) {
        console.log('onSlideChangeStart', currentPage);
    }

    onSlideChangeEnd(currentPage) {
        console.log('onSlideChangeEnd', currentPage);
    }
	
}
