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
var forms_1 = require("@angular/forms");
exports.MASKEDINPUT_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return TextMaskMock; }),
    multi: true
};
var TextMaskMock = /** @class */ (function () {
    function TextMaskMock() {
    }
    TextMaskMock.prototype.writeValue = function (value) { };
    TextMaskMock.prototype.registerOnChange = function (fn) { };
    TextMaskMock.prototype.registerOnTouched = function (fn) { };
    TextMaskMock.prototype.setDisabledState = function (isDisabled) { };
    __decorate([
        core_1.Input('textMask'),
        __metadata("design:type", Object)
    ], TextMaskMock.prototype, "textMask", void 0);
    TextMaskMock = __decorate([
        core_1.Directive({
            selector: '[textMask]',
            providers: [exports.MASKEDINPUT_VALUE_ACCESSOR]
        })
    ], TextMaskMock);
    return TextMaskMock;
}());
exports.TextMaskMock = TextMaskMock;
var TextMaskMockModule = /** @class */ (function () {
    function TextMaskMockModule() {
    }
    TextMaskMockModule = __decorate([
        core_1.NgModule({
            declarations: [TextMaskMock],
            exports: [TextMaskMock]
        })
    ], TextMaskMockModule);
    return TextMaskMockModule;
}());
exports.TextMaskMockModule = TextMaskMockModule;
//# sourceMappingURL=textmask_Mock.js.map