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
import LoginForm from '../form/loginform.component.vue';
var LoginModal = (function (_super) {
    __extends(LoginModal, _super);
    function LoginModal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoginModal.prototype.created = function () {
    };
    LoginModal.prototype.close = function () {
        this.$emit('onClose');
    };
    LoginModal.prototype.onSuccessfulLogin = function (userId) {
        this.$emit('onSuccessfulLogin', userId);
    };
    return LoginModal;
}(Vue));
__decorate([
    Prop,
    __metadata("design:type", Boolean)
], LoginModal.prototype, "show", void 0);
LoginModal = __decorate([
    Component({
        name: "login-modal",
        components: {
            "modalshell": ModalShellComponent,
            "loginform": LoginForm
        }
    })
], LoginModal);
export default LoginModal;
