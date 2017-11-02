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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var user_service_1 = require("../../services/user.service");
var forms_1 = require("@angular/forms");
var TourParticipantComponent = /** @class */ (function () {
    function TourParticipantComponent(userService, fb) {
        this.userService = userService;
        this.fb = fb;
        this.userAdded = new core_1.EventEmitter();
        this.userRemoved = new core_1.EventEmitter();
        this.isAdding = false;
        this.needCleanup = true;
    }
    TourParticipantComponent.prototype.ngOnInit = function () {
        this.buttonText = "Add " + this.participantType;
    };
    TourParticipantComponent.prototype.toggleProfileSearch = function (event) {
        this.isAdding = !this.isAdding;
        if (this.isAdding) {
            this.buttonText = "Done";
        }
        else {
            this.buttonText = "Add " + this.participantType;
        }
        event.stopPropagation();
    };
    TourParticipantComponent.prototype.onUserSearch = function (search) {
        var _this = this;
        this.userService.search(search).subscribe(function (response) {
            _this.searchUsers = response;
        });
    };
    TourParticipantComponent.prototype.onUserSelected = function (user) {
        this.users.push(user);
        this.userAdded.emit(user);
    };
    TourParticipantComponent.prototype.onUserRemove = function (user) {
        this.users.splice(this.users.indexOf(user), 1);
        this.userRemoved.emit(user);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], TourParticipantComponent.prototype, "users", void 0);
    __decorate([
        core_1.Input('participantType'),
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
            template: require('./tourparticipant.component.html')
        }),
        __metadata("design:paramtypes", [user_service_1.UserService, forms_1.FormBuilder])
    ], TourParticipantComponent);
    return TourParticipantComponent;
}());
exports.TourParticipantComponent = TourParticipantComponent;
//# sourceMappingURL=tourparticipant.component.js.map