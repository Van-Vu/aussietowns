"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var MiniProfileComponent = (function () {
    function MiniProfileComponent() {
        //@Input() user: User;
        this.userId = "test";
        this.profileUrl = "http://icons.iconarchive.com/icons/graphicloads/100-flat/256/home-icon.png";
        this.profileImageUrl = "http://icons.iconarchive.com/icons/graphicloads/100-flat/256/home-icon.png";
        this.fullName = "Fullname";
        this.shortDescription = "This is a short description";
    }
    return MiniProfileComponent;
}());
MiniProfileComponent = __decorate([
    core_1.Component({
        selector: 'miniprofile',
        template: require('./miniprofile.component.html'),
        styles: [require('./miniprofile.component.css')]
    })
], MiniProfileComponent);
exports.MiniProfileComponent = MiniProfileComponent;
//# sourceMappingURL=miniprofile.component.js.map