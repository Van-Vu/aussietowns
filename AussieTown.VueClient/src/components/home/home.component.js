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
import AutoCompleteComponent from "../autocomplete/autocomplete.vue";
import ListingRequestModalComponent from '../modal/listingrequestmodal.component.vue';
import ListingOfferModalComponent from '../modal/listingoffermodal.component.vue';
import { SearchService } from '../../services/search.service';
var HomeComponent = (function (_super) {
    __extends(HomeComponent, _super);
    function HomeComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //The time to show the next photo
        _this.NextPhotoInterval = 5000;
        //Looping or not
        _this.noLoopSlides = true;
        //Photos
        _this.slides = [];
        _this.initializeRequestSlide = false;
        _this.showListingRequest = false;
        _this.showListingOffer = false;
        _this.requestSlides = [
            { "text": "slide conten asdfa sdfasfd asdf asdf asdf as dfasd", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/a5bdb2fc08f9096fb1ef3afca2e5c1ff5292daf9fe7b86b8710d091ae7fa5547/400/232/1.0" },
            { "text": "slide conten", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/2466d2267dc2316b277610eafb1d957d7ce978df7e9bdd053fd8c67c40d57165/400/232/1.0" },
            { "text": "slide conten", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/5da2f1e6962f0c61837683b9fedbed7f0f2bb39d87626fda2cc1176d2f892fbc/400/232/1.0" },
            { "text": "slide conten", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/7f905e034dbde2f070551d1c979bac39b5e58a9a43e8d454bc20a1f23924c2e4/400/232/1.0" },
            { "text": "slide conten", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/2466d2267dc2316b277610eafb1d957d7ce978df7e9bdd053fd8c67c40d57165/400/232/1.0" },
            { "text": "slide conten", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/5da2f1e6962f0c61837683b9fedbed7f0f2bb39d87626fda2cc1176d2f892fbc/400/232/1.0" },
            { "text": "slide conten", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/7f905e034dbde2f070551d1c979bac39b5e58a9a43e8d454bc20a1f23924c2e4/400/232/1.0" },
            { "text": "slide conten", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/2466d2267dc2316b277610eafb1d957d7ce978df7e9bdd053fd8c67c40d57165/400/232/1.0" },
            { "text": "slide conten", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/5da2f1e6962f0c61837683b9fedbed7f0f2bb39d87626fda2cc1176d2f892fbc/400/232/1.0" },
            { "text": "slide conten", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/7f905e034dbde2f070551d1c979bac39b5e58a9a43e8d454bc20a1f23924c2e4/400/232/1.0" }
        ];
        _this.requestConfig = {
            direction: 'horizontal',
            //nextButton: '.swiper-button-next',
            //prevButton: '.swiper-button-prev',
            slidesPerView: 3,
            paginationClickable: true,
            spaceBetween: 0,
            loop: true,
            controlBy: 'container'
        };
        _this.searchStr = "";
        _this.selectedId = 0;
        _this.list = [];
        _this.placeHolderText = "this is the test";
        return _this;
    }
    HomeComponent.prototype.addNewSlide = function () {
        this.slides.push({ index: 1, image: 'http://www.angulartypescript.com/wp-content/uploads/2016/03/car1.jpg', text: 'BMW 1' }, { index: 2, image: 'http://www.angulartypescript.com/wp-content/uploads/2016/03/car2.jpg', text: 'BMW 2' });
    };
    HomeComponent.prototype.removeLastSlide = function () {
        this.slides.pop();
    };
    HomeComponent.prototype.onLocationSearch = function (event) {
        var _this = this;
        this.searchStr = event;
        (new SearchService()).getLocation('syd')
            .then(function (response) { return _this.list = response; });
    };
    HomeComponent.prototype.onSelect = function (val) {
        this.searchStr = val.Description;
        this.selectedId = val.Value;
    };
    HomeComponent.prototype.onSearch = function (model) {
        console.log(model.value);
        this.$router.push('search');
    };
    HomeComponent.prototype.created = function () {
        //axios.get(`http://jsonplaceholder.typicode.com/posts`)
        //.then(response => {
        //  // JSON responses are automatically parsed.
        //  this.posts = response.data
        //})
        //.catch(e => {
        //  this.errors.push(e)
        //})
    };
    return HomeComponent;
}(Vue));
__decorate([
    Prop,
    __metadata("design:type", Array)
], HomeComponent.prototype, "posts", void 0);
HomeComponent = __decorate([
    Component({
        name: 'Home',
        components: {
            "autocomplete": AutoCompleteComponent,
            "listingrequestmodal": ListingRequestModalComponent,
            "listingoffermodal": ListingOfferModalComponent
        }
    })
], HomeComponent);
export default HomeComponent;
