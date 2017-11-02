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
var user_service_1 = require("../../services/user.service");
var angular2_universal_1 = require("angular2-universal");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var search_service_1 = require("../../services/search.service");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(userService, fb, router, searchService) {
        this.userService = userService;
        this.fb = fb;
        this.router = router;
        this.searchService = searchService;
        //The time to show the next photo
        this.NextPhotoInterval = 5000;
        //Looping or not
        this.noLoopSlides = true;
        //Photos
        this.slides = [];
        this.initializeRequestSlide = false;
        //config: Object = {
        //    pagination: '.swiper-pagination',
        //    paginationClickable: true,
        //    nextButton: '.swiper-button-next',
        //    prevButton: '.swiper-button-prev',
        //    spaceBetween: 30
        //};
        //images: Array<any> = [{ "sType": "img", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/a5bdb2fc08f9096fb1ef3afca2e5c1ff5292daf9fe7b86b8710d091ae7fa5547/400/232/1.0" }, { "sType": "div", "content": "...Hello It's slidable content" }];
        this.requestSlides = [
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
        this.requestConfig = {
            direction: 'horizontal',
            //nextButton: '.swiper-button-next',
            //prevButton: '.swiper-button-prev',
            slidesPerView: 3,
            paginationClickable: true,
            spaceBetween: 0,
            loop: true,
            controlBy: 'container'
        };
        this.src = "";
        this.resizeOptions = {
            resizeMaxHeight: 128,
            resizeMaxWidth: 128
        };
        this.addNewSlide();
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.model = this.fb.group({
            location: [''],
            time: ['']
        });
        this.model.controls['location'].setValue({ id: '123', name: 'Bodom' });
    };
    HomeComponent.prototype.onSearch = function (model) {
        console.log(model.value);
        this.router.navigate(['search']);
    };
    HomeComponent.prototype.ngAfterViewChecked = function () {
        if (angular2_universal_1.isBrowser) {
            this.initializeRequestSlide = true;
        }
    };
    HomeComponent.prototype.addNewSlide = function () {
        this.slides.push({ index: 1, image: 'http://www.angulartypescript.com/wp-content/uploads/2016/03/car1.jpg', text: 'BMW 1' }, { index: 2, image: 'http://www.angulartypescript.com/wp-content/uploads/2016/03/car2.jpg', text: 'BMW 2' });
    };
    HomeComponent.prototype.removeLastSlide = function () {
        this.slides.pop();
    };
    HomeComponent.prototype.addFile = function () {
        var fi = this.fileInput.nativeElement;
        if (fi.files && fi.files[0]) {
            var fileToUpload = fi.files[0];
            this.userService
                .upload(fileToUpload)
                .subscribe(function (res) {
                console.log(res);
            });
        }
    };
    HomeComponent.prototype.selected = function (imageResult) {
        this.src = imageResult.resized
            && imageResult.resized.dataURL
            || imageResult.dataURL;
    };
    HomeComponent.prototype.onLocationSearch = function (search) {
        var _this = this;
        this.searchService.autoComplete(search).subscribe(function (response) {
            _this.searchLocations = response;
        });
    };
    __decorate([
        core_1.ViewChild("fileInput"),
        __metadata("design:type", Object)
    ], HomeComponent.prototype, "fileInput", void 0);
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home',
            template: require('./home.component.html')
        }),
        __metadata("design:paramtypes", [user_service_1.UserService, forms_1.FormBuilder, router_1.Router, search_service_1.SearchService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map