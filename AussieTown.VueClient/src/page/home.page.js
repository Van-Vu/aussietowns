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
import * as Swiper from '../component/shared/external/vue-swiper.vue';
import { Utils } from '../component/utils';
var HomePage = (function (_super) {
    __extends(HomePage, _super);
    function HomePage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.showListingRequest = false;
        _this.showListingOffer = false;
        _this.searchSuburb = null;
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
    HomePage.prototype.asyncData = function (_a) {
        var store = _a.store, route = _a.route;
        //return store.dispatch('SET_CURRENT_PAGE', 'home');
    };
    HomePage.prototype.onSelect = function (val) {
        this.searchSuburb = val;
    };
    HomePage.prototype.onSearch = function (val) {
        if (this.searchSuburb) {
            this.$router.push({ name: 'search', params: { seoString: Utils.seorizeString(this.searchSuburb.name), suburbId: this.searchSuburb.id } });
        }
    };
    HomePage.prototype.created = function () {
        this.$store.dispatch('SET_CURRENT_PAGE', 'home');
    };
    HomePage.prototype.onSlideChangeStart = function (currentPage) {
        console.log('onSlideChangeStart', currentPage);
    };
    HomePage.prototype.onSlideChangeEnd = function (currentPage) {
        console.log('onSlideChangeEnd', currentPage);
    };
    HomePage.prototype.beforeRouteEnter = function (to, from, next) {
        // called before the route that renders this component is confirmed.
        // does NOT have access to `this` component instance,
        // because it has not been created yet when this guard is called!
        console.log('beforeRouteEnter');
        return next();
    };
    HomePage.prototype.beforeRouteUpdate = function (to, from, next) {
        // called when the route that renders this component has changed,
        // but this component is reused in the new route.
        // For example, for a route with dynamic params /foo/:id, when we
        // navigate between /foo/1 and /foo/2, the same Foo component instance
        // will be reused, and this hook will be called when that happens.
        // has access to `this` component instance.
        console.log('beforeRouteUpdate');
        return next();
    };
    HomePage.prototype.beforeRouteLeave = function (to, from, next) {
        // called when the route that renders this component is about to
        // be navigated away from.
        // has access to `this` component instance.
        console.log('beforeRouteLeave');
        return next();
    };
    return HomePage;
}(Vue));
HomePage = __decorate([
    Component({
        name: 'HomePage',
        components: {
            "searchbar": SearchBarComponent,
            "swiper": Swiper
        }
    })
], HomePage);
export default HomePage;
