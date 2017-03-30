"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var ModalFrameComponent = (function () {
    function ModalFrameComponent() {
        this.visible = false;
        this.visibleAnimate = false;
    }
    ModalFrameComponent.prototype.show = function () {
        var _this = this;
        this.visible = true;
        setTimeout(function () { return _this.visibleAnimate = true; });
    };
    ModalFrameComponent.prototype.hide = function () {
        var _this = this;
        this.visibleAnimate = false;
        setTimeout(function () { return _this.visible = false; }, 300);
    };
    return ModalFrameComponent;
}());
ModalFrameComponent = __decorate([
    core_1.Component({
        selector: 'modalframe',
        template: require('./modalframe.component.html'),
        styles: [require('./modalframe.component.css')]
    })
], ModalFrameComponent);
exports.ModalFrameComponent = ModalFrameComponent;
//# sourceMappingURL=modalframe.component.js.map