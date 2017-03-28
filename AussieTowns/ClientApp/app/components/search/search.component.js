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
var core_1 = require("@angular/core");
var search_service_1 = require("../../services/search.service");
var map_bridge_1 = require("../../services/map.bridge");
var ng2_completer_1 = require("ng2-completer");
var MapComponent = (function () {
    function MapComponent(searchService, mapBridge, completerService) {
        this.searchService = searchService;
        this.mapBridge = mapBridge;
        this.completerService = completerService;
        this.map = null;
        this.totalDistance = 0;
        this.searchData = [
            { color: 'red', value: '#f00' },
            { color: 'green', value: '#0f0' },
            { color: 'blue', value: '#00f' },
            { color: 'cyan', value: '#0ff' },
            { color: 'magenta', value: '#f0f' },
            { color: 'yellow', value: '#ff0' },
            { color: 'black', value: '#000' }
        ];
        //this.dataService = completerService.local(this.searchData, 'color', 'color');
        this.dataService = completerService.local(this.searchData, 'color', 'color');
        this.dataRemote2 = completerService.remote(null, "detail", "detail");
        this.dataRemote2.urlFormater(function (term) {
            return "/api/search/autocomplete/" + term;
        });
        //this.dataRemote2.dataField("detail");
        //this.dataRemote2.headers(new Headers({ "My-Header": "Hello World!" }));
        //this.dataRemote2 = completerService.remote(
        //    null,
        //    null,
        //    "formatted_address");
        //this.dataRemote2.urlFormater(term => {
        //    return `https://maps.googleapis.com/maps/api/geocode/json?address=${term}`;
        //});
        //this.dataRemote2.dataField("results");
    }
    MapComponent.prototype.ngOnInit = function () {
        var _this = this;
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
        //this.map.addListener("bounds_changed", (event) => this.callSomething(event));
        //this.map.addListener("click", (event) => this.callSomething(event));
        this.searchService.getSuburbs().subscribe(function (suburbs) {
            _this.suburbs = suburbs;
        });
        this.itinerarySubscription = this.mapBridge.caculate$.subscribe(function (tripItems) {
            _this.calculateTotalDistance(tripItems);
        });
    };
    MapComponent.prototype.ngOnDestroy = function () {
        // prevent memory leak when component destroyed
        this.itinerarySubscription.unsubscribe();
    };
    MapComponent.prototype.calculateTotalDistance = function (tripItems) {
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
    MapComponent.prototype.callSomething = function (customInfo) {
        //Bodom
        //this.searchService.getSuburbDetails(customInfo).subscribe(info => {
        //    console.log(info);
        //});
    };
    return MapComponent;
}());
MapComponent = __decorate([
    core_1.Component({
        selector: "map",
        template: require('./map.component.html'),
        styles: [require('./map.component.css')]
    }),
    __metadata("design:paramtypes", [search_service_1.SearchService, map_bridge_1.MapBridge, ng2_completer_1.CompleterService])
], MapComponent);
exports.MapComponent = MapComponent;
//# sourceMappingURL=map.component.js.map