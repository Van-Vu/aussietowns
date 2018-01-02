import Vue from "vue";
import { Component, Inject, Watch, Prop } from "vue-property-decorator";
import VueRouter from 'vue-router';
import ListingOfferModalComponent from '../modal/listingoffermodal.component.vue';
import SearchService from '../service/search.service';
import ListingService from '../service/listing.service';
import SearchBarComponent from '../component/shared/search/searchbar.component.vue';
import Swiper from '../component/shared/external/vue-swiper.vue';
import CardFullComponent from '../component/shared/listingcard.component.vue';
import { AutocompleteItem } from '../model/autocomplete.model';
import { Utils } from '../component/utils';
import * as Cookies from 'js-cookie';
import { ScreenSize, CardType } from '../model/enum';
import { detectScreenSize } from '../service/screen.service';

import vMediaQuery from '../component/shared/external/v-media-query';
Vue.use(vMediaQuery);

@Component({
    name: 'HomePage',
    components: {
        "searchbar": SearchBarComponent,
        "swiper": Swiper,
        "listingcard": CardFullComponent
    }
})

export default class HomePage extends Vue{
    showListingRequest: boolean = false;
    showListingOffer: boolean = false;
    searchSuburb: AutocompleteItem = null;
    backgroundImage: string = '';
    swiperDirection: string = 'horizontal';
    showShadowImage: boolean = true;
    listingCardType: CardType = CardType.Listing;
    articleCardType: CardType = CardType.Article ;
    $mq: any;

    static asyncData({ store, route }) {
        store.dispatch('FETCH_FEATUREARTICLES');
        return store.dispatch('FETCH_FEATURELISTINGS');
    }

    get currentPage() {
        return this.$store.state.currentPage;
    }

    get featuredListings() {
        return this.$store.state.featureListings;
    }

    get featuredArticles() {
        return this.$store.state.featureArticles;
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
        //this.$store.dispatch('SET_CURRENT_PAGE', 'home');
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
                this.showShadowImage = true;
                break;

            case ScreenSize.Tablet:
                this.backgroundImage = '/static/images/homepage_tablet.jpg';
                this.swiperDirection = 'vertical';
                this.showShadowImage = false;
                break;

            case ScreenSize.Mobile:
                this.backgroundImage = '/static/images/homepage_mobile.jpg';
                this.swiperDirection = 'vertical';
                this.showShadowImage = false;
                break;
        }

    }

    checkLogginUser() {
        console.log(this.$store.getters.doneTodos);
    }
}
