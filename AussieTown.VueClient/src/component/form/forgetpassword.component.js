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
import VeeValidate from 'vee-validate';
import { verifyResetToken, resetPassword } from '../../service/auth.service';
import ResetPasswordModel from '../../model/resetpassword.model';
Vue.use(VeeValidate);
var ForgetPasswordForm = (function (_super) {
    __extends(ForgetPasswordForm, _super);
    function ForgetPasswordForm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = new ResetPasswordModel();
        _this.formSubmitted = false;
        return _this;
    }
    ForgetPasswordForm.prototype.created = function () {
        verifyResetToken(this.guidString).then(function (x) {
            console.log(x);
        });
    };
    ForgetPasswordForm.prototype.onResetPassword = function () {
        //this.$validator.validateAll().then(() => {
        //    // eslint-disable-next-line
        //    (new UserService()).signup(this.model)
        //        .then(response => {
        //            this.$emit('onSuccessfulLogin', response);
        //        });
        //}).catch(() => {
        //    // eslint-disable-next-line
        //    alert('Correct them errors!');
        //});
        this.model.isChangePassword = false;
        this.model.resetToken = this.guidString;
        resetPassword(this.model)
            .then(function (x) { return console.log(x); });
    };
    __decorate([
        Prop,
        __metadata("design:type", String)
    ], ForgetPasswordForm.prototype, "guidString", void 0);
    ForgetPasswordForm = __decorate([
        Component({
            name: 'ForgetPasswordForm',
            components: {}
        })
    ], ForgetPasswordForm);
    return ForgetPasswordForm;
}(Vue));
export default ForgetPasswordForm;
