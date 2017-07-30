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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import VeeValidate from 'vee-validate';
import { changePassword, encryptText } from '../../service/auth.service';
import ResetPasswordModel from '../../model/resetpassword.model';
Vue.use(VeeValidate);
var ChangePasswordComponent = (function (_super) {
    __extends(ChangePasswordComponent, _super);
    function ChangePasswordComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.confirmPassword = '';
        _this.model = new ResetPasswordModel();
        _this.formSubmitted = false;
        return _this;
    }
    ChangePasswordComponent.prototype.created = function () {
    };
    ChangePasswordComponent.prototype.onChangePassword = function () {
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
        this.model.isChangePassword = true;
        this.model.email = this.$store.state.loggedInUser.email;
        this.model.newPassword = encryptText(this.model.newPassword);
        this.model.oldPassword = encryptText(this.model.oldPassword);
        changePassword(this.model)
            .then(function (x) { return console.log(x); });
    };
    return ChangePasswordComponent;
}(Vue));
__decorate([
    Prop,
    __metadata("design:type", String)
], ChangePasswordComponent.prototype, "guidString", void 0);
ChangePasswordComponent = __decorate([
    Component({
        name: 'ChangePasswordComponent',
        components: {}
    })
], ChangePasswordComponent);
export default ChangePasswordComponent;
