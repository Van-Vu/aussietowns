var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Vue from "vue";
import { Component } from "vue-property-decorator";
import CardFullComponent from '../shared/listingcard.component.vue';
var TripComponent = (function (_super) {
    __extends(TripComponent, _super);
    function TripComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.offers = new Array();
        _this.requests = new Array();
        return _this;
    }
    TripComponent.prototype.created = function () {
        if (this.$store.state.profile) {
            var profile = this.$store.state.profile;
            if (profile.operatorListings)
                this.offers = profile.operatorListings;
            if (profile.guestListings)
                this.requests = profile.guestListings;
        }
    };
    return TripComponent;
}(Vue));
TripComponent = __decorate([
    Component({
        name: "TripComponent",
        components: {
            "listingcard": CardFullComponent
        }
    })
], TripComponent);
export default TripComponent;
