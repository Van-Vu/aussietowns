import Vue from "vue";
import { Component, Inject, Watch, Prop } from "vue-property-decorator";
import VueRouter from 'vue-router';
import ListingOfferModalComponent from '../modal/listingoffermodal.component.vue';
import SearchService from '../service/search.service';
import ListingService from '../service/listing.service';
import SearchBarComponent from '../component/shared/search/searchbar.component.vue';
import Swiper from '../component/shared/external/vue-swiper.vue';
import CardSmallComponent from '../component/shared/cardsmall.component.vue'
import CardFullComponent from '../component/shared/listingcard.component.vue';
import { AutocompleteItem } from '../model/autocomplete.model';
import { Utils } from '../component/utils';
import * as Cookies from 'js-cookie';
import { ScreenSize } from '../model/enum';
import { detectScreenSize } from '../service/screen.service';
 
@Component({
    name: 'HomePage',
    components: {
        "searchbar": SearchBarComponent,
        "swiper": Swiper,
        "cardsmall": CardSmallComponent,
        "listingcard": CardFullComponent
    },
    beforeRouteEnter(to, from, next) {
        // called before the route that renders this component is confirmed.
        // does NOT have access to `this` component instance,
        // because it has not been created yet when this guard is called!
        console.log('beforeRouteEnter from home page');
        next();
    },
    beforeRouteUpdate(to, from, next) {
        // called when the route that renders this component has changed,
        // but this component is reused in the new route.
        // For example, for a route with dynamic params /foo/:id, when we
        // navigate between /foo/1 and /foo/2, the same Foo component instance
        // will be reused, and this hook will be called when that happens.
        // has access to `this` component instance.
        console.log('beforeRouteUpdate  from home page');
        next();
    },
    beforeRouteLeave(to, from, next) {
        // called when the route that renders this component is about to
        // be navigated away from.
        // has access to `this` component instance.
        console.log('beforeRouteLeave  from home page');
        next();
    }
})

export default class HomePage extends Vue{
    showListingRequest: boolean = false;
    showListingOffer: boolean = false;
    searchSuburb: AutocompleteItem = null;
    backgroundImage: string = '';
    swiperDirection: string = 'horizontal';
    $mq: any;

    asyncData({ store, route }) {
        return store.dispatch('FETCH_FEATURELISTINGS');
    }

    get currentPage() {
        return this.$store.state.currentPage;
    }

    get featuredListings() {
        return this.$store.state.featureListings;
    }

    onSelect(val: AutocompleteItem) {
        this.searchSuburb = val;
    }

    onSearch(val) {
        if (this.searchSuburb) {
            this.$router.push({ name: 'search', params: { seoString: Utils.seorizeString(this.searchSuburb.name), suburbId: this.searchSuburb.id } });    
        }
    }

    created() {
        this.$store.dispatch('SET_CURRENT_PAGE', 'home');
    }

    mounted() {
        //Bodom hack: fetch data offline Swiper need to wait for rendering first
        //setTimeout(() => {
        //    (this.$children.find(x => x.$el.id === 'homepage-swipe') as any).refresh();    
        //}, 1000);


        var screenSize = detectScreenSize(this.$mq);
        switch (screenSize) {
            case ScreenSize.Desktop:
                this.backgroundImage = '/static/images/homepage_desktop.jpg';
                this.swiperDirection = 'horizontal';
                break;

            case ScreenSize.Tablet:
                this.backgroundImage = '/static/images/homepage_tablet.jpg';
                this.swiperDirection = 'vertical';
                break;

            case ScreenSize.Mobile:
                this.backgroundImage = '/static/images/homepage_mobile.jpg';
                this.swiperDirection = 'vertical';
                break;
        }

    }

    checkLogginUser() {
        console.log(this.$store.getters.doneTodos);
    }




    //requestSlides: Array<any> = [
    //    { "text": "slide conten asdfa sdfasfd asdf asdf asdf as dfasd", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/a5bdb2fc08f9096fb1ef3afca2e5c1ff5292daf9fe7b86b8710d091ae7fa5547/400/232/1.0" },
    //    { "text": "slide conten", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/2466d2267dc2316b277610eafb1d957d7ce978df7e9bdd053fd8c67c40d57165/400/232/1.0" },
    //    { "text": "slide conten", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/5da2f1e6962f0c61837683b9fedbed7f0f2bb39d87626fda2cc1176d2f892fbc/400/232/1.0" },
    //    { "text": "slide conten", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/7f905e034dbde2f070551d1c979bac39b5e58a9a43e8d454bc20a1f23924c2e4/400/232/1.0" },
    //    { "text": "slide conten", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/17cd5bb4ea0f4d7c51aa00c90611ad7eaae2b2d7170ac1688a0d4fc6697595df/400/232/1.0" },
    //    { "text": "slide conten", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/ba7fa31fd8b2f088920095c7355ae83e061320debe07dbed1b4fe2a5c3b323ed/400/232/1.0" },
    //    { "text": "slide conten", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/e6d82c83caba66519a39f427dda7d16a4e6ee4c6600739dc39ea2900f779a576/400/232/1.0" },
    //    { "text": "slide conten", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/74c0d1d8346196311ba28caea05f2416273b5c0e156479bb3f30f65c446ce96a/400/232/1.0" },
    //    { "text": "slide conten", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/35d6a6e29c5727ed466104eac7975a858a8182e707c1a92fa6cdf513166a68be/400/232/1.0" },
    //    { "text": "slide conten", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/c20a31bb5a3b657a603b8a792d691fa407410753a5617e7077386bb692169eae/400/232/1.0" }
    //];


}
