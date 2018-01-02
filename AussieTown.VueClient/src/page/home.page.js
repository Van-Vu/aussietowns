var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Vue from "vue";
import { Component } from "vue-property-decorator";
import SearchBarComponent from '../component/shared/search/searchbar.component.vue';
import Swiper from '../component/shared/external/vue-swiper.vue';
import CardFullComponent from '../component/shared/listingcard.component.vue';
import { Utils } from '../component/utils';
import { ScreenSize, CardType } from '../model/enum';
import { detectScreenSize } from '../service/screen.service';
import vMediaQuery from '../component/shared/external/v-media-query';
Vue.use(vMediaQuery);
var HomePage = /** @class */ (function (_super) {
    __extends(HomePage, _super);
    function HomePage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.showListingRequest = false;
        _this.showListingOffer = false;
        _this.searchSuburb = null;
        _this.backgroundImage = '';
        _this.swiperDirection = 'horizontal';
        _this.showShadowImage = true;
        _this.listingCardType = CardType.Listing;
        _this.articleCardType = CardType.Article;
        return _this;
    }
    HomePage.asyncData = function (_a) {
        var store = _a.store, route = _a.route;
        store.dispatch('FETCH_FEATUREARTICLES');
        return store.dispatch('FETCH_FEATURELISTINGS');
    };
    Object.defineProperty(HomePage.prototype, "currentPage", {
        get: function () {
            return this.$store.state.currentPage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomePage.prototype, "featuredListings", {
        get: function () {
            return this.$store.state.featureListings;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomePage.prototype, "featuredArticles", {
        get: function () {
            return this.$store.state.featureArticles;
        },
        enumerable: true,
        configurable: true
    });
    HomePage.prototype.onSelect = function (val) {
        this.searchSuburb = val;
    };
    HomePage.prototype.onSearch = function (val) {
        if (this.searchSuburb) {
            this.$router.push({ name: 'search', params: { seoString: Utils.seorizeString(this.searchSuburb.name), suburbId: this.searchSuburb.id } });
        }
    };
    HomePage.prototype.created = function () {
        //this.$store.dispatch('SET_CURRENT_PAGE', 'home');
    };
    HomePage.prototype.mounted = function () {
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
    };
    HomePage.prototype.checkLogginUser = function () {
        console.log(this.$store.getters.doneTodos);
    };
    HomePage = __decorate([
        Component({
            name: 'HomePage',
            components: {
                "searchbar": SearchBarComponent,
                "swiper": Swiper,
                "listingcard": CardFullComponent
            }
        })
    ], HomePage);
    return HomePage;
}(Vue));
export default HomePage;
