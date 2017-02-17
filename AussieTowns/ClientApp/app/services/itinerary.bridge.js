"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var angular2_uuid_1 = require("angular2-uuid");
var ItineraryBridge = (function () {
    function ItineraryBridge() {
        this.suburbToAdd = new Subject_1.Subject();
        this.suburbToAdd$ = this.suburbToAdd.asObservable();
        this.uuid = angular2_uuid_1.UUID.UUID();
    }
    ItineraryBridge.prototype.addSuburbToItinerary = function (suburb) {
        this.suburbToAdd.next(suburb);
    };
    return ItineraryBridge;
}());
ItineraryBridge = __decorate([
    core_1.Injectable()
], ItineraryBridge);
exports.ItineraryBridge = ItineraryBridge;
//# sourceMappingURL=itinerary.bridge.js.map