"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
function getWindow() {
    return window;
}
var BreakPoints;
(function (BreakPoints) {
    BreakPoints[BreakPoints["MediumModeScreenWidth"] = 737] = "MediumModeScreenWidth";
    BreakPoints[BreakPoints["DesktopModeScreenWidth"] = 1201] = "DesktopModeScreenWidth";
})(BreakPoints = exports.BreakPoints || (exports.BreakPoints = {}));
var DeviceMode;
(function (DeviceMode) {
    DeviceMode[DeviceMode["Mobile"] = 0] = "Mobile";
    DeviceMode[DeviceMode["Medium"] = 1] = "Medium";
    DeviceMode[DeviceMode["Desktop"] = 2] = "Desktop";
})(DeviceMode = exports.DeviceMode || (exports.DeviceMode = {}));
var DeviceDetectionService = /** @class */ (function () {
    function DeviceDetectionService() {
    }
    Object.defineProperty(DeviceDetectionService.prototype, "nativeWindow", {
        get: function () {
            return getWindow();
        },
        enumerable: true,
        configurable: true
    });
    DeviceDetectionService.prototype.getCurrentMode = function () {
        var size = this.nativeWindow.innerWidth;
        if (size >= BreakPoints.DesktopModeScreenWidth) {
            return DeviceMode.Desktop;
        }
        else if (size >= BreakPoints.MediumModeScreenWidth) {
            return DeviceMode.Medium;
        }
        return DeviceMode.Mobile;
    };
    DeviceDetectionService.prototype.isScrollOverHalfPage = function () {
        var height = this.nativeWindow.innerHeight / 2;
        var scrollY = this.nativeWindow.scrollY;
        if (scrollY >= height) {
            return true;
        }
        return false;
    };
    DeviceDetectionService = __decorate([
        core_1.Injectable()
    ], DeviceDetectionService);
    return DeviceDetectionService;
}());
exports.DeviceDetectionService = DeviceDetectionService;
//# sourceMappingURL=devicedetection.service.js.map