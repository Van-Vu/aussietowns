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
var itinerary_bridge_1 = require("../../services/itinerary.bridge");
var map_bridge_1 = require("../../services/map.bridge");
var ItineraryComponent = (function () {
    function ItineraryComponent(itineraryBridge, mapBridge) {
        this.itineraryBridge = itineraryBridge;
        this.mapBridge = mapBridge;
        this.suburbs = [];
        this.tripItems = [];
        //this.subscription = itineraryBridge.suburbToAdd$.subscribe(
        //    suburb => {
        //        this.suburbs.push(suburb);
        //    });
    }
    ItineraryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.suburbInfoSubscription = this.itineraryBridge.suburbToAdd$.subscribe(function (suburb) {
            _this.suburbs.push(suburb);
        });
        //this.itineraryBridge.getSuburbToItinerary().subscribe(
        //    suburb => {
        //        this.suburbs.push(suburb);
        //    });
    };
    ItineraryComponent.prototype.ngOnDestroy = function () {
        // prevent memory leak when component destroyed
        this.suburbInfoSubscription.unsubscribe();
    };
    ItineraryComponent.prototype.onDragend = function (event) {
        event.target.style.opacity = 1;
    };
    ItineraryComponent.prototype.onStart = function (event) {
        console.log("Start");
        var style = window.getComputedStyle(event.target, null);
        event.dataTransfer.setData("text/plain", (parseInt(style.getPropertyValue("left"), 10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"), 10) - event.clientY));
        event.target.style.opacity = .5;
    };
    ItineraryComponent.prototype.onDragover = function (event) {
        // do something meaningful with it
        //console.log("drag Over");
        if (event.preventDefault) {
            event.preventDefault();
        }
        return false;
    };
    ItineraryComponent.prototype.onDrop = function (event) {
        // do something meaningful with it
        //console.log("Drop");
        var suburbDetail = JSON.parse(event.dataTransfer.getData("application/x-${zone}"));
        this.suburbs.push(suburbDetail.suburbName);
        this.tripItems.push({
            suburbName: suburbDetail.suburbName,
            state: suburbDetail.state,
            lat: suburbDetail.lat,
            lng: suburbDetail.lng
        });
        event.preventDefault();
        return false;
    };
    ItineraryComponent.prototype.calculateTotalDistance = function () {
        this.mapBridge.calculateTotalDistance(this.tripItems);
    };
    return ItineraryComponent;
}());
ItineraryComponent = __decorate([
    core_1.Component({
        selector: 'itinerary',
        template: require('./itinerary.component.html'),
        styles: [require('./itinerary.component.css')]
    }),
    __metadata("design:paramtypes", [itinerary_bridge_1.ItineraryBridge, map_bridge_1.MapBridge])
], ItineraryComponent);
exports.ItineraryComponent = ItineraryComponent;
//# sourceMappingURL=itinerary.component.js.map