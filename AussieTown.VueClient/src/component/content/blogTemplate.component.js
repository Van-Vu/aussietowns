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
import MiniProfileComponent from '../shared/miniprofile.component.vue';
import CheckButtonComponent from "../shared/checkbutton.component.vue";
import { Utils } from '../utils';
var BlogTemplate = /** @class */ (function (_super) {
    __extends(BlogTemplate, _super);
    function BlogTemplate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(BlogTemplate.prototype, "fullUrl", {
        get: function () {
            return "" + Utils.getCurrentHost() + this.$route.fullPath;
        },
        enumerable: true,
        configurable: true
    });
    BlogTemplate.prototype.onFacebookShare = function () {
        Utils.openWindow("http://www.facebook.com/sharer.php?u=" + this.fullUrl + "&t=" + this.model.title, 'toolbar=0,status=0,width=626,height=436');
    };
    BlogTemplate.prototype.onTwitterShare = function () {
        Utils.openWindow("https://www.twitter.com/intent/tweet?url=" + this.fullUrl + "&text=" + this.model.title, 'toolbar=0,status=0,width=626,height=436');
    };
    BlogTemplate.prototype.onGooglePlusShare = function () {
        Utils.openWindow("http://plus.google.com/share?url=" + this.fullUrl, 'toolbar=0,status=0,width=626,height=436');
    };
    __decorate([
        Prop(),
        __metadata("design:type", Object)
    ], BlogTemplate.prototype, "model", void 0);
    BlogTemplate = __decorate([
        Component({
            name: "blogTemplate",
            components: {
                "miniprofile": MiniProfileComponent,
                "checkButton": CheckButtonComponent
            }
        })
    ], BlogTemplate);
    return BlogTemplate;
}(Vue));
export default BlogTemplate;
