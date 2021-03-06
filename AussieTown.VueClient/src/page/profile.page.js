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
import { Component, Watch } from "vue-property-decorator";
import { UserRole, UserAction } from '../model/enum';
var ProfilePage = /** @class */ (function (_super) {
    __extends(ProfilePage, _super);
    function ProfilePage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.currentTab = '';
        return _this;
    }
    ProfilePage.prototype.created = function () {
        this.currentTab = this.$route.name;
    };
    Object.defineProperty(ProfilePage.prototype, "canEdit", {
        get: function () {
            return this.$auth.check(UserRole.Editor, this.$route.params.profileId, UserAction.Edit);
        },
        enumerable: true,
        configurable: true
    });
    ProfilePage.prototype.onRouteParamChanged = function (value, oldValue) {
        //console.log(`route change ${value}`);
        this.currentTab = value.name;
    };
    __decorate([
        Watch('$route'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], ProfilePage.prototype, "onRouteParamChanged", null);
    ProfilePage = __decorate([
        Component({
            name: 'ProfilePage'
        })
    ], ProfilePage);
    return ProfilePage;
}(Vue));
export default ProfilePage;
