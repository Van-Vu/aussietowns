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
var itinerary_bridge_1 = require("../../services/itinerary.bridge");
var SuburbInforCardComponent = /** @class */ (function () {
    function SuburbInforCardComponent(searchService, itineraryBridge) {
        this.searchService = searchService;
        this.itineraryBridge = itineraryBridge;
        this.isClassVisible = false;
    }
    SuburbInforCardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.suburbFullName = this.data.suburbName + " (" + this.data.state + ")";
        var myLatLng = { lat: this.data.lat, lng: this.data.lng };
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: this.map,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 5
            }
        });
        google.maps.event.addListener(marker, 'click', function () {
            //this.searchService.getSuburbDetails(this.data.postcode).subscribe(info => {
            //    console.log(info);
            //});
            _this.isClassVisible = !_this.isClassVisible;
        });
    };
    SuburbInforCardComponent.prototype.moreDetail = function () {
        this.isClassVisible = !this.isClassVisible;
        return false;
    };
    SuburbInforCardComponent.prototype.addToItinerary = function () {
        this.itineraryBridge.addSuburbToItinerary(this.data.suburbName);
    };
    SuburbInforCardComponent.prototype.onDragend = function (event) {
        event.target.style.opacity = 1;
    };
    SuburbInforCardComponent.prototype.onStart = function (event) {
        console.log("Start");
        var style = window.getComputedStyle(event.target, null);
        event.dataTransfer.setData("application/x-${zone}", JSON.stringify(this.data));
        event.target.style.opacity = .5;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SuburbInforCardComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SuburbInforCardComponent.prototype, "map", void 0);
    SuburbInforCardComponent = __decorate([
        core_1.Component({
            selector: 'suburbinfocard',
            template: require('./suburbinfocard.component.html'),
            styles: [require('./suburbinfocard.component.css')]
        }),
        __metadata("design:paramtypes", [search_service_1.SearchService, itinerary_bridge_1.ItineraryBridge])
    ], SuburbInforCardComponent);
    return SuburbInforCardComponent;
}());
exports.SuburbInforCardComponent = SuburbInforCardComponent;
//# sourceMappingURL=suburbinfocard.component.js.map