"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var search_service_1 = require("../../services/search.service");
var map_bridge_1 = require("../../services/map.bridge");
var angular2_universal_1 = require("angular2-universal");
var listing_service_1 = require("../../services/listing.service");
var listingrequestmodal_component_1 = require("../modal/listingrequestmodal.component");
var listingoffermodal_component_1 = require("../modal/listingoffermodal.component");
var SearchComponent = /** @class */ (function () {
    function SearchComponent(searchService, mapBridge, listingService) {
        this.searchService = searchService;
        this.mapBridge = mapBridge;
        this.listingService = listingService;
        this.map = null;
        //suburbs: SuburbLocation[];
        this.listings = [];
        this.totalDistance = 0;
    }
    SearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (angular2_universal_1.isBrowser) {
            if (!this.map) {
                this.lat = -33.860;
                this.lng = 151.210;
                var mapProp = {
                    center: new google.maps.LatLng(-33.860, 151.210),
                    zoom: 5,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                this.map = new google.maps.Map(document.getElementById("gmap"), mapProp);
            }
            else {
                this.lat = 1;
                this.lng = 1;
            }
            this.listingService.getListingBySuburb(139).subscribe(function (listings) {
                _this.listings = listings;
            });
        }
        //this.map.addListener("bounds_changed", (event) => this.callSomething(event));
        //this.map.addListener("click", (event) => this.callSomething(event));
        this.itinerarySubscription = this.mapBridge.caculate$.subscribe(function (tripItems) {
            _this.calculateTotalDistance(tripItems);
        });
    };
    SearchComponent.prototype.ngOnDestroy = function () {
        // prevent memory leak when component destroyed
        this.itinerarySubscription.unsubscribe();
    };
    SearchComponent.prototype.calculateTotalDistance = function (tripItems) {
        var _this = this;
        var directionsService = new google.maps.DirectionsService();
        var waypoints = [];
        var origin = new google.maps.LatLng(tripItems[0].lat, tripItems[0].lng);
        var destination = new google.maps.LatLng(tripItems[tripItems.length - 1].lat, tripItems[tripItems.length - 1].lng);
        tripItems.forEach(function (tripItem, index) {
            if ((index !== 0) && (index !== tripItems.length - 1)) {
                waypoints.push({
                    location: new google.maps.LatLng(tripItem.lat, tripItem.lng),
                    stopover: true
                });
            }
        });
        var request = {
            origin: origin,
            destination: destination,
            waypoints: waypoints,
            optimizeWaypoints: false,
            travelMode: google.maps.TravelMode["DRIVING"]
        };
        var directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(this.map);
        this.totalDistance = 0;
        directionsService.route(request, function (response, status) {
            if (status == 'OK') {
                directionsDisplay.setDirections(response);
                response.routes[0].legs.forEach(function (leg) {
                    _this.totalDistance += parseInt(leg.distance.value) / 1000;
                });
                alert(_this.totalDistance);
            }
        });
    };
    SearchComponent.prototype.callSomething = function (customInfo) {
        //Bodom
        //this.searchService.getSuburbDetails(customInfo).subscribe(info => {
        //    console.log(info);
        //});
    };
    SearchComponent.prototype.showTourRequest = function () {
        this.listingRequestModalComponent.show();
    };
    SearchComponent.prototype.showTourDetail = function () {
        this.listingOfferModalComponent.show();
    };
    __decorate([
        core_1.ViewChild(listingrequestmodal_component_1.ListingRequestModalComponent),
        __metadata("design:type", listingrequestmodal_component_1.ListingRequestModalComponent)
    ], SearchComponent.prototype, "listingRequestModalComponent", void 0);
    __decorate([
        core_1.ViewChild(listingoffermodal_component_1.ListingOfferModalComponent),
        __metadata("design:type", listingoffermodal_component_1.ListingOfferModalComponent)
    ], SearchComponent.prototype, "listingOfferModalComponent", void 0);
    SearchComponent = __decorate([
        core_1.Component({
            selector: "search",
            template: require('./search.component.html'),
        }),
        __metadata("design:paramtypes", [search_service_1.SearchService, map_bridge_1.MapBridge, listing_service_1.ListingService])
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map