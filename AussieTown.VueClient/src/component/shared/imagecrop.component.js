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
import RingLoader from './external/ringloader.vue';
import { Utils } from '../utils';
import { GlobalConfig } from '../../GlobalConfig';
var ImageCropComponent = /** @class */ (function (_super) {
    __extends(ImageCropComponent, _super);
    function ImageCropComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImageCropComponent.prototype.isHeroImage = function () {
        return this.imageSizeSettings.maxWidth > GlobalConfig.listingImageSize.maxWidth;
    };
    ImageCropComponent.prototype.mounted = function () {
        console.log(this.$refs.drag);
        this.dragElement(document.getElementById("imagecrop_draggable"));
    };
    ImageCropComponent.prototype.cropAndUpload = function () {
        var _this = this;
        var formData = new FormData();
        var topCrop = -(document.getElementById("imagecrop_draggable").offsetTop);
        if (this.isHeroImage()) {
            //100px: the dim div above
            topCrop = (topCrop + 100) * 2;
        }
        return Utils.cropImage(this.imageSources.resizedImage, {
            width: this.imageSizeSettings.maxWidth,
            height: this.imageSizeSettings.maxHeight,
            // offsetTop: need negative when positive and vice versa 
            top: topCrop,
            imageBlob: null
        })
            .then(function (finalImage) {
            _this.$store.dispatch("ENABLE_LOADING");
            formData.append('files', finalImage, _this.imageSources.originalFileName);
            _this.$store.dispatch(_this.imageSources.storeAction, {
                data: formData,
                actionId: _this.imageSources.storeActionId
            }).then(function (response) {
                _this.$store.dispatch("DISABLE_LOADING");
                _this.$store.dispatch("IMAGECROP_FINISH");
                _this.$emit('imageCropCompleted');
            });
        });
    };
    ImageCropComponent.prototype.dragElement = function (elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0, newTop = 0;
        elmnt.onmousedown = dragMouseDown;
        function dragMouseDown(e) {
            e = e || window.event;
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            elmnt.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            elmnt.onmousemove = elementDrag;
        }
        function elementDrag(e) {
            e = e || window.event;
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            //if (elmnt.offsetTop - pos2 >= 0) {
            newTop = elmnt.offsetTop - pos2;
            //}
            elmnt.style.top = newTop + "px";
            //if (elmnt.offsetLeft - pos1 >= 0) {
            //    newLeft = elmnt.offsetLeft - pos1;
            //}
            //elmnt.style.left = newLeft + "px";
        }
        function closeDragElement() {
            /* stop moving when mouse button is released:*/
            elmnt.onmouseup = null;
            elmnt.onmousemove = null;
        }
    };
    __decorate([
        Prop(),
        __metadata("design:type", Object)
    ], ImageCropComponent.prototype, "imageSources", void 0);
    __decorate([
        Prop(),
        __metadata("design:type", Object)
    ], ImageCropComponent.prototype, "imageSizeSettings", void 0);
    ImageCropComponent = __decorate([
        Component({
            name: "ImageCropComponent",
            components: {
                "ringloader": RingLoader
            }
        })
    ], ImageCropComponent);
    return ImageCropComponent;
}(Vue));
export default ImageCropComponent;
