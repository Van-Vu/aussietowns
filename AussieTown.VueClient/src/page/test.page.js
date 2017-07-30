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
import SearchBarComponent from '../component/shared/search/searchbar.component.vue';
import Swiper from '../component/shared/external/vue-swiper.vue';
import NumberChooser from '../component/shared/numberchooser.component.vue';
var TestPage = (function (_super) {
    __extends(TestPage, _super);
    function TestPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.showListingRequest = false;
        _this.showListingOffer = false;
        _this.numberChooser = 0;
        _this.requestSlides = [];
        return _this;
    }
    TestPage.prototype.asyncData = function (_a) {
        var store = _a.store, route = _a.route;
        return store.dispatch('SET_CURRENT_PAGE', 'home');
    };
    TestPage.prototype.onSelect = function (val) {
        console.log(val);
    };
    TestPage.prototype.onSearch = function (val) {
        //{ name: 'user', params: { userId: 123 } }
        this.$router.push('search');
    };
    TestPage.prototype.created = function () {
    };
    TestPage.prototype.onSlideChangeStart = function (currentPage) {
        console.log('onSlideChangeStart', currentPage);
    };
    TestPage.prototype.onSlideChangeEnd = function (currentPage) {
        console.log('onSlideChangeEnd', currentPage);
    };
    TestPage.prototype.checkLogginUser = function () {
        this.$store.dispatch('TEST');
    };
    TestPage.prototype.addNotification = function () {
        this.$store.dispatch('ADD_NOTIFICATION', { title: "this is title", text: "this is the text" });
    };
    return TestPage;
}(Vue));
TestPage = __decorate([
    Component({
        name: 'TestPage',
        components: {
            "searchbar": SearchBarComponent,
            "swiper": Swiper,
            "numberchooser": NumberChooser
        }
    })
], TestPage);
export default TestPage;
