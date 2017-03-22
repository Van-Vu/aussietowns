"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var TourParticipantComponent = (function () {
    function TourParticipantComponent() {
        this.userAdded = new core_1.EventEmitter();
        this.userRemoved = new core_1.EventEmitter();
        this.isAdding = false;
    }
    TourParticipantComponent.prototype.toggleProfileSearch = function (event) {
        this.isAdding = !this.isAdding;
        event.stopPropagation();
    };
    TourParticipantComponent.prototype.handleUserAdded = function (user) {
        this.isAdding = false;
        this.users.push(user);
        this.userAdded.emit(user);
    };
    TourParticipantComponent.prototype.handleUserRemoved = function (user) {
        this.users.splice(this.users.indexOf(user), 1);
        this.userRemoved.emit(user);
    };
    return TourParticipantComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], TourParticipantComponent.prototype, "users", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TourParticipantComponent.prototype, "participantType", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TourParticipantComponent.prototype, "userAdded", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TourParticipantComponent.prototype, "userRemoved", void 0);
TourParticipantComponent = __decorate([
    core_1.Component({
        selector: 'tourparticipant',
        template: require('./tourparticipant.component.html'),
        styles: [require('./tourparticipant.component.css')]
    })
], TourParticipantComponent);
exports.TourParticipantComponent = TourParticipantComponent;
//# sourceMappingURL=tourparticipant.component.js.map