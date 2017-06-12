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


@Component({
    name: 'Home',
    components: {
        "locationsearch": LocationSearchComponent,
        "listingrequestmodal": ListingRequestModalComponent,
        "listingoffermodal": ListingOfferModalComponent,
        "datepicker": datepicker
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
        { "text": "slide conten", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/2466d2267dc2316b277610eafb1d957d7ce978df7e9bdd053fd8c67c40d57165/400/232/1.0" },
        { "text": "slide conten", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/5da2f1e6962f0c61837683b9fedbed7f0f2bb39d87626fda2cc1176d2f892fbc/400/232/1.0" },
        { "text": "slide conten", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/7f905e034dbde2f070551d1c979bac39b5e58a9a43e8d454bc20a1f23924c2e4/400/232/1.0" },
        { "text": "slide conten", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/2466d2267dc2316b277610eafb1d957d7ce978df7e9bdd053fd8c67c40d57165/400/232/1.0" },
        { "text": "slide conten", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/5da2f1e6962f0c61837683b9fedbed7f0f2bb39d87626fda2cc1176d2f892fbc/400/232/1.0" },
        { "text": "slide conten", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/7f905e034dbde2f070551d1c979bac39b5e58a9a43e8d454bc20a1f23924c2e4/400/232/1.0" }
    ];

    requestConfig: Object = {
        direction: 'horizontal',
        //nextButton: '.swiper-button-next',
        //prevButton: '.swiper-button-prev',
        slidesPerView: 3,
        paginationClickable: true,
        spaceBetween: 0,
        loop: true,
        controlBy: 'container'
    };

    private addNewSlide() {
        this.slides.push(
            { index:1, image: 'http://www.angulartypescript.com/wp-content/uploads/2016/03/car1.jpg', text: 'BMW 1' },
            { index:2, image: 'http://www.angulartypescript.com/wp-content/uploads/2016/03/car2.jpg', text: 'BMW 2' },
            //{ image: 'http://www.angulartypescript.com/wp-content/uploads/2016/03/car3.jpg', text: 'BMW 3' },
            //{ image: 'http://www.angulartypescript.com/wp-content/uploads/2016/03/car4.jpg', text: 'BMW 4' },
            //{ image: 'http://www.angulartypescript.com/wp-content/uploads/2016/03/car5.jpg', text: 'BMW 5' },
            //{ image: 'http://www.angulartypescript.com/wp-content/uploads/2016/03/car6.jpg', text: 'BMW 6' }
        );
    }

    private removeLastSlide() {
        this.slides.pop();
    }

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

	
}
