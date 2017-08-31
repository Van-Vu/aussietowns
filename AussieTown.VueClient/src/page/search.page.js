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
import CardFullComponent from '../component/shared/listingcard.component.vue';
if (process.env.VUE_ENV === 'client') {
    var googleMaps = require('vue2-google-maps');
    Vue.use(googleMaps, {
        load: {
            key: 'AIzaSyCaS0ArS9mkdiAFxHKIgpMwUMp1_XSdzTM'
        }
    });
}
var SearchPage = /** @class */ (function (_super) {
    __extends(SearchPage, _super);
    function SearchPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.map = null;
        //suburbs: SuburbLocation[];
        _this.listings = [];
        _this.totalDistance = 0;
        //listing = { id: 1, location: "Sydney", primaryOwner: "test User", header: "this is header", cost: "cost", description: "this is description" };
        _this.showListingRequest = false;
        _this.showListingOffer = false;
        _this.center = { lat: -33.860, lng: 151.210 };
        _this.markers = [
            { position: { lat: -33.860, lng: 10.0 } },
            { position: { lat: 11.0, lng: 11.0 } }
        ];
        return _this;
    }
    SearchPage.prototype.asyncData = function (_a) {
        var store = _a.store, route = _a.route;
        if (route.params.suburbId) {
            return store.dispatch('SEARCH_LISTINGS_BY_SUBURB', route.params.suburbId);
        }
    };
    SearchPage.prototype.created = function () {
        this.$store.dispatch('SET_CURRENT_PAGE', 'search');
    };
    SearchPage.prototype.mounted = function () {
        var _this = this;
        if (this.$store.state.searchListings) {
            this.listings = this.$store.state.searchListings;
        }
        else {
            this.$store.dispatch('SEARCH_LISTINGS_BY_SUBURB', this.$route.params.suburbId).then(function () {
                _this.listings = _this.$store.state.searchListings;
            });
        }
    };
    SearchPage.prototype.showTourRequest = function () {
        this.$router.push("home");
    };
    SearchPage = __decorate([
        Component({
            name: "SearchPage",
            components: {
                "listingcard": CardFullComponent
            }
        })
    ], SearchPage);
    return SearchPage;
}(Vue));
export default SearchPage;
