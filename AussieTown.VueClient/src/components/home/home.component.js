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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import ListingRequestModalComponent from '../modal/listingrequestmodal.component.vue';
import ListingOfferModalComponent from '../modal/listingoffermodal.component.vue';
import LocationSearchComponent from '../shared/locationsearch.component.vue';
//import datepicker from '../share/datepicker.vue';
import * as datepicker from '../shared/datepicker.vue';
import * as Swiper from '../shared/vue-swiper.vue';
var HomeComponent = (function (_super) {
    __extends(HomeComponent, _super);
    function HomeComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //The time to show the next photo
        _this.NextPhotoInterval = 5000;
        //Looping or not
        _this.noLoopSlides = true;
        //Photos
        _this.slides = [];
        _this.initializeRequestSlide = false;
        _this.showListingRequest = false;
        _this.showListingOffer = false;
        _this.datepick = "2017-06-03";
        _this.requestSlides = [
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
        return _this;
    }
    HomeComponent.prototype.asyncData = function (_a) {
        var store = _a.store, route = _a.route;
        // return the Promise from the action
        console.log('here II am: :' + store.state);
        //return store.dispatch('FETCH_LISTING_BY_ID', 18);
    };
    HomeComponent.prototype.onSelect = function (val) {
        console.log(val);
    };
    HomeComponent.prototype.onSearch = function (model) {
        //{ name: 'user', params: { userId: 123 } }
        this.$router.push('search');
    };
    Object.defineProperty(HomeComponent.prototype, "myComputedProp", {
        get: function () {
            return this.$store.state;
        },
        enumerable: true,
        configurable: true
    });
    HomeComponent.prototype.created = function () {
        //axios.get(`http://jsonplaceholder.typicode.com/posts`)
        //.then(response => {
        //  // JSON responses are automatically parsed.
        //  this.posts = response.data
        //})
        //.catch(e => {
        //  this.errors.push(e)
        //})
        this.$cookie.set('bodomtest', 'hi there');
    };
    HomeComponent.prototype.onSlideChangeStart = function (currentPage) {
        console.log('onSlideChangeStart', currentPage);
    };
    HomeComponent.prototype.onSlideChangeEnd = function (currentPage) {
        console.log('onSlideChangeEnd', currentPage);
    };
    return HomeComponent;
}(Vue));
__decorate([
    Prop,
    __metadata("design:type", Array)
], HomeComponent.prototype, "posts", void 0);
HomeComponent = __decorate([
    Component({
        name: 'Home',
        components: {
            "locationsearch": LocationSearchComponent,
            "listingrequestmodal": ListingRequestModalComponent,
            "listingoffermodal": ListingOfferModalComponent,
            "datepicker": datepicker,
            "swiper": Swiper
        }
    })
], HomeComponent);
export default HomeComponent;
