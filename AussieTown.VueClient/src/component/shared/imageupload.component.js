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
import UploadImage from './external/vueuploadimage.vue';
import Swiper from './external/vue-swiper.vue';
import RingLoader from './external/ringloader.vue';
import { NotificationType } from '../../model/enum';
import { GlobalConfig } from '../../GlobalConfig';
var ImageUploadComponent = (function (_super) {
    __extends(ImageUploadComponent, _super);
    function ImageUploadComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.carouselCurrentPage = 1;
        _this.isUploading = false;
        _this.maxFileAllowed = GlobalConfig.maxImagesPerListing;
        _this.maxFileConfig = GlobalConfig.maxImagesPerListing;
        return _this;
    }
    ImageUploadComponent.prototype.created = function () {
        this.maxFileAllowed -= this.images.length;
    };
    ImageUploadComponent.prototype.close = function () {
    };
    ImageUploadComponent.prototype.onSlideChangeEnd = function (currentPage) {
        this.carouselCurrentPage = currentPage;
    };
    ImageUploadComponent.prototype.onRemoveImage = function () {
        var _this = this;
        this.isUploading = true;
        this.$store.dispatch('REMOVE_IMAGE', { listingId: this.$store.state.listing.id, url: this.images[this.carouselCurrentPage - 1].url })
            .then(function (response) {
            _this.maxFileAllowed += 1;
            _this.$emit('uploadImageCompleted');
            _this.isUploading = false;
        })
            .catch(function (error) {
            _this.$store.dispatch('ADD_NOTIFICATION', { title: "Upload error", text: error.message ? error.message : "Error uploading. We're on it !", type: NotificationType.Error });
            _this.isUploading = false;
        });
        ;
    };
    ImageUploadComponent.prototype.onUploadImages = function (formData) {
        var _this = this;
        var storeAction;
        var actionId;
        this.isUploading = true;
        if (this.uploadType === 0) {
            storeAction = 'UPLOAD_LISTING_IMAGES';
            actionId = this.$store.state.listing.id;
        }
        else {
            storeAction = 'UPLOAD_PROFILE_IMAGES';
            actionId = this.$store.state.profile.id;
        }
        this.$store.dispatch(storeAction, {
            data: formData,
            actionId: actionId
        }).then(function (response) {
            _this.maxFileAllowed -= response;
            _this.$emit('uploadImageCompleted');
            _this.isUploading = false;
        })
            .catch(function (error) {
            _this.$store.dispatch('ADD_NOTIFICATION', { title: "Upload error", text: error.message ? error.message : "Error uploading. We're on it !", type: NotificationType.Error });
            _this.isUploading = false;
        });
    };
    ImageUploadComponent.prototype.removeImage = function () {
    };
    __decorate([
        Prop,
        __metadata("design:type", Number)
    ], ImageUploadComponent.prototype, "uploadType", void 0);
    __decorate([
        Prop,
        __metadata("design:type", Array)
    ], ImageUploadComponent.prototype, "images", void 0);
    __decorate([
        Prop,
        __metadata("design:type", Boolean)
    ], ImageUploadComponent.prototype, "isEditing", void 0);
    ImageUploadComponent = __decorate([
        Component({
            name: "ImageUploadComponent",
            components: {
                'upload-image': UploadImage,
                'swiper': Swiper,
                'ringloader': RingLoader
            }
        })
    ], ImageUploadComponent);
    return ImageUploadComponent;
}(Vue));
export default ImageUploadComponent;
