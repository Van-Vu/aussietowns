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
import { Utils } from '../utils';
var MiniProfileComponent = (function (_super) {
    __extends(MiniProfileComponent, _super);
    function MiniProfileComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MiniProfileComponent.prototype.created = function () {
        this.userId = this.data.id;
        this.profileImageUrl = this.data.photoUrl;
        this.profileUrl = '';
        this.fullName = this.data.fullname;
        this.shortDescription = this.data.shortDescription;
        this.profileLink = Utils.seorizeString(this.fullName);
    };
    MiniProfileComponent.prototype.onRemoveUser = function () {
        this.$emit("removeUser", this.data);
    };
    return MiniProfileComponent;
}(Vue));
__decorate([
    Prop,
    __metadata("design:type", Object)
], MiniProfileComponent.prototype, "data", void 0);
__decorate([
    Prop,
    __metadata("design:type", Boolean)
], MiniProfileComponent.prototype, "isRemovable", void 0);
MiniProfileComponent = __decorate([
    Component({
        name: "MiniProfile"
    })
], MiniProfileComponent);
export default MiniProfileComponent;
