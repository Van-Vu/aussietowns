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
var user_service_1 = require("../../services/user.service");
var HomeComponent = (function () {
    function HomeComponent(userService) {
        this.userService = userService;
        this.src = "";
        this.resizeOptions = {
            resizeMaxHeight: 128,
            resizeMaxWidth: 128
        };
    }
    HomeComponent.prototype.addFile = function () {
        var fi = this.fileInput.nativeElement;
        if (fi.files && fi.files[0]) {
            var fileToUpload = fi.files[0];
            this.userService
                .upload(fileToUpload)
                .subscribe(function (res) {
                console.log(res);
            });
        }
    };
    HomeComponent.prototype.selected = function (imageResult) {
        this.src = imageResult.resized
            && imageResult.resized.dataURL
            || imageResult.dataURL;
    };
    return HomeComponent;
}());
__decorate([
    core_1.ViewChild("fileInput"),
    __metadata("design:type", Object)
], HomeComponent.prototype, "fileInput", void 0);
HomeComponent = __decorate([
    core_1.Component({
        selector: 'home',
        template: require('./home.component.html')
    }),
    __metadata("design:paramtypes", [user_service_1.UserService])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map