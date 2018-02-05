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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Utils } from '../utils';
import Swiper from './external/vue-swiper.vue';
import { CardType } from '../../model/enum';
import CheckButtonComponent from "../shared/checkbutton.component.vue";
import lazy from 'vue-lazy-image';
Vue.use(lazy, {
    loading: '/static/images/loading.gif',
    try: 2,
});
var CardFullComponent = /** @class */ (function (_super) {
    __extends(CardFullComponent, _super);
    function CardFullComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = 0;
        _this.location = '';
        _this.owner = '';
        _this.header = '';
        _this.cost = 0;
        _this.date = '';
        _this.time = '';
        _this.headerLink = '';
        _this.imageUrls = '';
        _this.duration = '';
        _this.description = '';
        _this.cardLinkTo = null;
        _this.tagList = null;
        return _this;
    }
    CardFullComponent.prototype.created = function () {
        this.id = this.cardDetail.id;
        this.location = this.cardDetail.location;
        this.header = this.cardDetail.header;
        this.cost = this.cardDetail.cost;
        this.owner = this.cardDetail.primaryOwner;
        this.imageUrls = this.cardDetail.imageUrls ? this.cardDetail.imageUrls.split(';') : '';
        this.headerLink = this.cardDetail.seoUrl;
        this.description = this.cardDetail.description;
        if (!!this.cardDetail.schedules) {
            var startDatetime = this.cardDetail.schedules.length > 0 ? new Date(this.cardDetail.schedules[0].startDate) : new Date();
            this.date = Utils.formatDate(startDatetime);
            this.time = Utils.getTime(startDatetime);
            this.duration = this.cardDetail.schedules.length > 0 ? this.cardDetail.schedules[0].duration : 0;
        }
        switch (this.cardType) {
            case CardType.Article:
                this.cardLinkTo = { name: 'aboutus', params: { seoString: this.headerLink, articleId: this.id } };
                break;
            case CardType.Listing:
            default:
                this.cardLinkTo = { name: 'listingDetail', params: { seoString: this.headerLink, listingId: this.id } };
                break;
        }
        if (!!this.cardDetail.tagList) {
            this.tagList = this.cardDetail.tagList;
        }
    };
    Object.defineProperty(CardFullComponent.prototype, "isListingType", {
        get: function () {
            return this.cardType === CardType.Listing;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Prop(),
        __metadata("design:type", Object)
    ], CardFullComponent.prototype, "cardDetail", void 0);
    __decorate([
        Prop(),
        __metadata("design:type", Number)
    ], CardFullComponent.prototype, "cardType", void 0);
    CardFullComponent = __decorate([
        Component({
            name: "CardFull",
            components: {
                "swiper": Swiper,
                "checkButton": CheckButtonComponent
            }
        })
    ], CardFullComponent);
    return CardFullComponent;
}(Vue));
export default CardFullComponent;
