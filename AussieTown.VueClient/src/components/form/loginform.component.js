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
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);
var LoginForm = (function (_super) {
    __extends(LoginForm, _super);
    function LoginForm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.email = "";
        _this.password = "";
        _this.formSubmitted = false;
        return _this;
    }
    LoginForm.prototype.validateBeforeSubmit = function (e) {
        this.$validator.validateAll().then(function () {
            // eslint-disable-next-line
            alert('From Submitted!');
        }).catch(function () {
            // eslint-disable-next-line
            alert('Correct them errors!');
        });
    };
    LoginForm.prototype.submitForm = function () {
        this.formSubmitted = true;
    };
    return LoginForm;
}(Vue));
LoginForm = __decorate([
    Component({
        name: "Loginform"
    })
], LoginForm);
export default LoginForm;
