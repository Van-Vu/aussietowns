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
import MiniProfileComponent from './miniprofile.component.vue';
import UserSearchComponent from './search/usersearch.component.vue';
var ParticipantComponent = (function (_super) {
    __extends(ParticipantComponent, _super);
    function ParticipantComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.searchStr = "";
        _this.placeHolderText = "this is the test";
        _this.searchUsers = [];
        _this.isAdding = false;
        _this.needCleanup = true;
        return _this;
    }
    ParticipantComponent.prototype.created = function () {
        //this.internalUsers = this.exixtingUsers;
    };
    ParticipantComponent.prototype.mounted = function () {
        this.buttonText = "Add " + this.participantType;
    };
    ParticipantComponent.prototype.toggleProfileSearch = function (event) {
        this.isAdding = !this.isAdding;
        if (this.isAdding) {
            this.buttonText = "Done";
        }
        else {
            this.buttonText = "Add " + this.participantType;
        }
        event.stopPropagation();
    };
    ParticipantComponent.prototype.onUserSelect = function (user) {
        this.$emit("userAdded", user);
    };
    ParticipantComponent.prototype.onUserRemove = function (user) {
        //this.internalUsers.splice(this.internalUsers.indexOf(user), 1);
        this.$emit("userRemoved", user);
    };
    __decorate([
        Prop,
        __metadata("design:type", Array)
    ], ParticipantComponent.prototype, "participants", void 0);
    __decorate([
        Prop,
        __metadata("design:type", String)
    ], ParticipantComponent.prototype, "participantType", void 0);
    __decorate([
        Prop,
        __metadata("design:type", Boolean)
    ], ParticipantComponent.prototype, "isEditing", void 0);
    __decorate([
        Prop({ default: true }),
        __metadata("design:type", Boolean)
    ], ParticipantComponent.prototype, "allowAdd", void 0);
    ParticipantComponent = __decorate([
        Component({
            name: "ParticipantComponent",
            components: {
                "miniprofile": MiniProfileComponent,
                "usersearch": UserSearchComponent
            }
        })
    ], ParticipantComponent);
    return ParticipantComponent;
}(Vue));
export default ParticipantComponent;
