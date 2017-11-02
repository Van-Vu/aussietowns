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
var utils_1 = require("../../shared/utils");
var angular2_universal_1 = require("angular2-universal");
var ListingOfferCardComponent = /** @class */ (function () {
    function ListingOfferCardComponent() {
        this.slides = [
            { "text": "", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/a5bdb2fc08f9096fb1ef3afca2e5c1ff5292daf9fe7b86b8710d091ae7fa5547/400/232/1.0" },
            { "text": "", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/2466d2267dc2316b277610eafb1d957d7ce978df7e9bdd053fd8c67c40d57165/400/232/1.0" },
            { "text": "", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/5da2f1e6962f0c61837683b9fedbed7f0f2bb39d87626fda2cc1176d2f892fbc/400/232/1.0" },
            { "text": "", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/7f905e034dbde2f070551d1c979bac39b5e58a9a43e8d454bc20a1f23924c2e4/400/232/1.0" },
            { "text": "", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/2466d2267dc2316b277610eafb1d957d7ce978df7e9bdd053fd8c67c40d57165/400/232/1.0" }
        ];
        this.config = {
            direction: 'horizontal',
            //nextButton: '.swiper-button-next',
            //prevButton: '.swiper-button-prev',
            slidesPerView: 1,
            paginationClickable: true,
            spaceBetween: 0,
            loop: true
        };
        this.initializeSlide = false;
    }
    ListingOfferCardComponent.prototype.ngOnInit = function () {
        this.id = this.listingDetail.id;
        this.location = this.listingDetail.location;
        this.hostName = this.listingDetail.primaryOwner;
        this.header = this.listingDetail.header;
        this.cost = this.listingDetail.cost;
        this.date = utils_1.Utils.getDate(this.listingDetail.schedules[0].startDate);
        this.time = utils_1.Utils.getTime(this.listingDetail.schedules[0].startDate);
        this.description = this.listingDetail.description;
        if (angular2_universal_1.isBrowser) {
            this.initializeSlide = true;
        }
    };
    __decorate([
        core_1.Input("Id"),
        __metadata("design:type", Object)
    ], ListingOfferCardComponent.prototype, "tourId", void 0);
    __decorate([
        core_1.Input("listing-detail"),
        __metadata("design:type", Object)
    ], ListingOfferCardComponent.prototype, "listingDetail", void 0);
    ListingOfferCardComponent = __decorate([
        core_1.Component({
            selector: 'listingoffercard',
            template: require('./listingoffercard.component.html')
        })
    ], ListingOfferCardComponent);
    return ListingOfferCardComponent;
}());
exports.ListingOfferCardComponent = ListingOfferCardComponent;
//# sourceMappingURL=listingoffercard.component.js.map