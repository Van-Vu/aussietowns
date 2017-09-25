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
import Vue from "vue";
import { Component } from "vue-property-decorator";
import SearchBarComponent from '../component/shared/search/searchbar.component.vue';
import Swiper from '../component/shared/external/vue-swiper.vue';
import NumberChooser from '../component/shared/numberchooser.component.vue';
import { NotificationType } from '../model/enum';
import datepicker from '../component/shared/external/datepicker.vue';
import LoginForm from '../component/form/loginform.component.vue';
import ScheduleComponent from '../component/shared/schedule.component.vue';
import CardFullComponent from '../component/shared/listingcard.component.vue';
var TestPage = /** @class */ (function (_super) {
    __extends(TestPage, _super);
    function TestPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.showListingRequest = false;
        _this.showListingOffer = false;
        _this.numberChooser = 0;
        _this.currentView = 'listingcard';
        _this.listings = [];
        _this.disableDays = {
            days: [6, 0] // Disable Saturday's and Sunday's
        };
        _this.startDate = new Date();
        return _this;
    }
    TestPage.prototype.switchModal = function () {
        if (this.currentView == 'loginmodal') {
            this.currentView = 'listingcard';
        }
        else {
            this.currentView = 'loginmodal';
        }
    };
    TestPage.prototype.asyncData = function (_a) {
        var store = _a.store, route = _a.route;
        return store.dispatch('FETCH_FEATURELISTINGS');
    };
    TestPage.prototype.created = function () {
        this.listings = this.$store.state.featureListings;
        //this.$store.dispatch('SEARCH_LISTINGS_BY_SUBURB', 129).then(() => {
        //    this.listings = this.$store.state.searchListings;
        //});
    };
    TestPage.prototype.checkLogginUser = function () {
        this.$store.dispatch('TEST');
    };
    TestPage.prototype.addNotification = function () {
        this.$store.dispatch('ADD_NOTIFICATION', { title: "this is title", text: "this is the text", type: NotificationType.Success });
    };
    TestPage = __decorate([
        Component({
            name: 'TestPage',
            components: {
                "searchbar": SearchBarComponent,
                "swiper": Swiper,
                "numberchooser": NumberChooser,
                "datepicker": datepicker,
                "loginmodal": LoginForm,
                "schedulemodal": ScheduleComponent,
                "listingcard": CardFullComponent
            }
        })
    ], TestPage);
    return TestPage;
}(Vue));
export default TestPage;
