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
import ModalShellComponent from './modalshell.component.vue';
import ContactForm from '../form/contactform.component.vue';
var ContactModal = /** @class */ (function (_super) {
    __extends(ContactModal, _super);
    function ContactModal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContactModal.prototype.onClose = function () {
        this.$emit('onClose');
    };
    __decorate([
        Prop(),
        __metadata("design:type", Boolean)
    ], ContactModal.prototype, "show", void 0);
    __decorate([
        Prop(),
        __metadata("design:type", Object)
    ], ContactModal.prototype, "contactModel", void 0);
    ContactModal = __decorate([
        Component({
            name: "ContactModal",
            components: {
                "modalshell": ModalShellComponent,
                "contactform": ContactForm
            }
        })
    ], ContactModal);
    return ContactModal;
}(Vue));
export default ContactModal;
