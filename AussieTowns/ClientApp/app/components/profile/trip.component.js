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
var listing_service_1 = require("../../services/listing.service");
var router_1 = require("@angular/router");
var TripComponent = /** @class */ (function () {
    function TripComponent(listingService, route) {
        this.listingService = listingService;
        this.route = route;
        this.profileId = 0;
    }
    TripComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.profileId = +params['id'] | 0; // (+) converts string 'id' to a number
            if (_this.profileId > 0) {
                _this.listingService.getListingsByUserId(_this.profileId).subscribe(function (data) {
                });
            }
        });
    };
    TripComponent = __decorate([
        core_1.Component({
            selector: 'tripcomponent',
            template: require('./trip.component.html')
        }),
        __metadata("design:paramtypes", [listing_service_1.ListingService, router_1.ActivatedRoute])
    ], TripComponent);
    return TripComponent;
}());
exports.TripComponent = TripComponent;
//# sourceMappingURL=trip.component.js.map