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
var CardFullComponent = (function (_super) {
    __extends(CardFullComponent, _super);
    function CardFullComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = 0;
        _this.location = '';
        _this.hostName = '';
        _this.header = '';
        _this.cost = 0;
        _this.date = '';
        _this.time = '';
        _this.headerLink = '';
        _this.imageUrl = '';
        return _this;
    }
    CardFullComponent.prototype.created = function () {
        this.id = this.listingDetail.id;
        this.location = this.listingDetail.location;
        this.header = this.listingDetail.header;
        this.cost = this.listingDetail.cost;
        this.hostName = this.listingDetail.primaryOwner;
        //this.imageUrl = this.listingDetail.imageUrl;
        var startDatetime = new Date(this.listingDetail.schedules[0].startDate);
        this.date = Utils.getDate(startDatetime);
        this.time = Utils.getTime(startDatetime);
        this.headerLink = Utils.seorizeString(this.header);
    };
    __decorate([
        Prop,
        __metadata("design:type", Object)
    ], CardFullComponent.prototype, "listingDetail", void 0);
    CardFullComponent = __decorate([
        Component({
            name: "CardFull",
            components: {
                "swiper": Swiper
            }
        })
    ], CardFullComponent);
    return CardFullComponent;
}(Vue));
export default CardFullComponent;
