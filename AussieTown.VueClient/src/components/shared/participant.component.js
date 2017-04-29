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
import AutoCompleteComponent from '../autocomplete/autocomplete.vue';
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
        this.buttonText = "Add " + this.participantType;
        //this.internalUsers = this.exixtingUsers;
        this.internalUsers = [
            {
                id: 1,
                photoUrl: "/static/images/logo.png",
                fullname: "asdfasdfas",
                shortDescription: "asdfasdfa"
            }
        ];
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
    ParticipantComponent.prototype.onUserSearch = function (search) {
        //this.userService.search(search).subscribe((response: any) => {
        //    this.searchUsers = response;
        //});
    };
    ParticipantComponent.prototype.onUserSelected = function (user) {
        this.internalUsers.push(user);
        this.$emit("userAdded", user);
    };
    ParticipantComponent.prototype.onUserRemove = function (user) {
        this.internalUsers.splice(this.internalUsers.indexOf(user), 1);
        this.$emit("userRemoved", user);
    };
    return ParticipantComponent;
}(Vue));
__decorate([
    Prop,
    __metadata("design:type", Array)
], ParticipantComponent.prototype, "exixtingUsers", void 0);
__decorate([
    Prop,
    __metadata("design:type", String)
], ParticipantComponent.prototype, "participantType", void 0);
ParticipantComponent = __decorate([
    Component({
        name: "Participant",
        components: {
            "miniprofile": MiniProfileComponent,
            "autocomplete": AutoCompleteComponent
        }
    })
], ParticipantComponent);
export default ParticipantComponent;
