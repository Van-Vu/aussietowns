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
var modalframe_component_1 = require("./modalframe.component");
var RegistrationModalComponent = /** @class */ (function () {
    function RegistrationModalComponent() {
    }
    RegistrationModalComponent.prototype.handleRegistration = function (event) {
        if (event) {
            this.modal.hide();
        }
    };
    RegistrationModalComponent.prototype.show = function () {
        this.modal.show();
    };
    __decorate([
        core_1.ViewChild(modalframe_component_1.ModalFrameComponent),
        __metadata("design:type", modalframe_component_1.ModalFrameComponent)
    ], RegistrationModalComponent.prototype, "modal", void 0);
    RegistrationModalComponent = __decorate([
        core_1.Component({
            selector: 'registrationmodal',
            template: require('./registrationmodal.component.html')
        })
    ], RegistrationModalComponent);
    return RegistrationModalComponent;
}());
exports.RegistrationModalComponent = RegistrationModalComponent;
//# sourceMappingURL=registrationmodal.component.js.map