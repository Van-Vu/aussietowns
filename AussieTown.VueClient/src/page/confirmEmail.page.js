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
import { plainToClass } from "class-transformer";
import UserModel from '../model/user.model';
Vue.use(VeeValidate);
var ConfirmEmailPage = /** @class */ (function (_super) {
    __extends(ConfirmEmailPage, _super);
    function ConfirmEmailPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isConfirmed = false;
        return _this;
    }
    ConfirmEmailPage.asyncData = function (_a) {
        var store = _a.store, route = _a.route;
        if (route.params.confirmToken) {
            return store.dispatch('VERIFY_EMAIL_TOKEN', route.params.confirmToken);
        }
    };
    Object.defineProperty(ConfirmEmailPage.prototype, "model", {
        get: function () {
            return plainToClass(UserModel, this.$store.state.profile);
        },
        enumerable: true,
        configurable: true
    });
    ConfirmEmailPage.prototype.created = function () {
    };
    ConfirmEmailPage.prototype.onChangePassword = function () {
        var _this = this;
        this.$validator.validateAll().then(function (result) {
            if (result) {
                if (_this.model.id > 0) {
                    _this.$store.dispatch("ENABLE_LOADING");
                    _this.model.token = _this.$route.params.confirmToken;
                    return _this.$store.dispatch('CONFIRM_USER', _this.model)
                        .then(function (response) {
                        _this.$store.dispatch("DISABLE_LOADING");
                        if (response == 1) {
                            _this.isConfirmed = true;
                        }
                    })
                        .catch(function (err) {
                    });
                }
            }
        }).catch(function () {
            alert('Correct them errors!');
        });
    };
    __decorate([
        Prop(),
        __metadata("design:type", String)
    ], ConfirmEmailPage.prototype, "confirmToken", void 0);
    ConfirmEmailPage = __decorate([
        Component({
            name: 'ConfirmEmailPage',
            components: {}
        })
    ], ConfirmEmailPage);
    return ConfirmEmailPage;
}(Vue));
export default ConfirmEmailPage;
