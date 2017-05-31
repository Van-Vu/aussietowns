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
import ListingOfferCardComponent from './listingoffercard.component.vue';
import ListingRequestModalComponent from '../modal/listingrequestmodal.component.vue';
import ListingOfferModalComponent from '../modal/listingoffermodal.component.vue';
if (process.env.VUE_ENV === 'client') {
    var googleMaps = require('vue2-google-maps');
    Vue.use(googleMaps, {
        load: {
            key: 'AIzaSyCaS0ArS9mkdiAFxHKIgpMwUMp1_XSdzTM'
        }
    });
}
var SearchComponent = (function (_super) {
    __extends(SearchComponent, _super);
    function SearchComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.map = null;
        //suburbs: SuburbLocation[];
        _this.listings = [];
        _this.totalDistance = 0;
        _this.listing = { id: 1, location: "Sydney", primaryOwner: "test User", header: "this is header", cost: "cost", description: "this is description" };
        _this.showListingRequest = false;
        _this.showListingOffer = false;
        _this.center = { lat: -33.860, lng: 151.210 };
        _this.markers = [
            { position: { lat: -33.860, lng: 10.0 } },
            { position: { lat: 11.0, lng: 11.0 } }
        ];
        return _this;
    }
    SearchComponent.prototype.created = function () {
        if (process.env.VUE_ENV === 'client') {
            alert('here');
        }
        ;
        if (process.env.VUE_ENV === 'server') {
            console.log("hey server");
        }
        ;
    };
    SearchComponent.prototype.showTourRequest = function () {
        this.$router.push("home");
    };
    return SearchComponent;
}(Vue));
SearchComponent = __decorate([
    Component({
        name: "Search",
        components: {
            "listingoffercard": ListingOfferCardComponent,
            "listingrequestmodal": ListingRequestModalComponent,
            "listingoffermodal": ListingOfferModalComponent
        }
    })
], SearchComponent);
export default SearchComponent;
