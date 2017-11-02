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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var AppComponent = /** @class */ (function () {
    function AppComponent(document) {
        this.document = document;
    }
    AppComponent.prototype.onWindowScroll = function () {
        //let number = this.document.body.scrollTop;
        //console.log(`number ${number}`);
    };
    AppComponent.prototype.onKeyUp = function (ev) {
        // do something meaningful with it
        //console.log(`The user just pressed ${ev.key}!`);
    };
    AppComponent.prototype.onDragover = function (event) {
        // do something meaningful with it
        //console.log("drag Over");
        if (event.preventDefault) {
            event.preventDefault();
        }
        return false;
    };
    AppComponent.prototype.onDrop = function (event) {
        // do something meaningful with it
        //console.log("Drop");
        var offset = event.dataTransfer.getData("text/plain").split(',');
        var dm = document.getElementById('dragme');
        dm.style.left = (event.clientX + parseInt(offset[0], 10)) + 'px';
        dm.style.top = (event.clientY + parseInt(offset[1], 10)) + 'px';
        event.preventDefault();
        return false;
    };
    __decorate([
        core_1.HostListener("window:scroll", []),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], AppComponent.prototype, "onWindowScroll", null);
    __decorate([
        core_1.HostListener('document:keyup', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], AppComponent.prototype, "onKeyUp", null);
    __decorate([
        core_1.HostListener('document:dragover', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], AppComponent.prototype, "onDragover", null);
    __decorate([
        core_1.HostListener('document:drop', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], AppComponent.prototype, "onDrop", null);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app',
            template: require('./app.component.html'),
            styles: [require('../../../asset/sass/base.scss').toString()]
        }),
        __param(0, core_1.Inject(platform_browser_1.DOCUMENT)),
        __metadata("design:paramtypes", [Object])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map