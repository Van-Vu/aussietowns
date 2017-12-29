var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import CheckButtonModel from '../../model/checkbutton.model';
var CheckButton = /** @class */ (function (_super) {
    __extends(CheckButton, _super);
    function CheckButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.checkValue = new Array();
        _this.readonlyValue = [];
        return _this;
    }
    CheckButton.prototype.created = function () {
        //this.model = [
        //    new CheckButtonModel('1', 'Apple', 'Apple'),
        //    new CheckButtonModel('2', 'Orange', 'Orange'),
        //    new CheckButtonModel('3', 'Pear', 'Pear'),
        //    new CheckButtonModel('4', 'Cherry', 'Cherry'),
        //    new CheckButtonModel('5', 'Cherry2', 'Cherryasdf asdfa sdf adfsa '),
        //    new CheckButtonModel('6', 'Cherry3', 'asdfa sdf adfsa'),
        //];
        this.checkValue = this.checked;
    };
    CheckButton.prototype.onCheckedValueChanged = function (value, oldValue) {
        this.readonlyValue.length = 0;
        for (var _i = 0, _a = this.checkValue; _i < _a.length; _i++) {
            var item = _a[_i];
            this.readonlyValue.push(new CheckButtonModel('', item, item));
        }
        this.$emit('onChange', value);
    };
    __decorate([
        Prop(),
        __metadata("design:type", Array)
    ], CheckButton.prototype, "model", void 0);
    __decorate([
        Prop(),
        __metadata("design:type", Array)
    ], CheckButton.prototype, "checked", void 0);
    __decorate([
        Prop(),
        __metadata("design:type", Boolean)
    ], CheckButton.prototype, "isEditing", void 0);
    __decorate([
        Watch('checkValue'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CheckButton.prototype, "onCheckedValueChanged", null);
    CheckButton = __decorate([
        Component({
            name: "CheckButton"
        })
    ], CheckButton);
    return CheckButton;
}(Vue));
export default CheckButton;
