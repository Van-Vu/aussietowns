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
var MiniProfileComponent = /** @class */ (function () {
    function MiniProfileComponent() {
        this.isRemovable = true;
        this.removeUser = new core_1.EventEmitter();
    }
    MiniProfileComponent.prototype.ngOnInit = function () {
        this.userId = this.data.id;
        this.profileImageUrl = this.data.photoUrl;
        this.fullName = this.data.fullname;
        this.shortDescription = this.data.shortDescription;
    };
    MiniProfileComponent.prototype.onRemoveUser = function () {
        this.removeUser.emit(this.data);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], MiniProfileComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], MiniProfileComponent.prototype, "isRemovable", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], MiniProfileComponent.prototype, "removeUser", void 0);
    MiniProfileComponent = __decorate([
        core_1.Component({
            selector: 'miniprofile',
            template: require('./miniprofile.component.html'),
            styles: [require('./miniprofile.component.css')]
        })
    ], MiniProfileComponent);
    return MiniProfileComponent;
}());
exports.MiniProfileComponent = MiniProfileComponent;
//# sourceMappingURL=miniprofile.component.js.map