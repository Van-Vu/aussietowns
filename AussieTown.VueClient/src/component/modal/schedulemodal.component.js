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
import ModalShellComponent from './modalshell.component.vue';
import ScheduleComponent from '../shared/schedule.component.vue';
var ScheduleModal = (function (_super) {
    __extends(ScheduleModal, _super);
    function ScheduleModal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScheduleModal.prototype.created = function () {
        var abc = this.schedule;
    };
    ScheduleModal.prototype.onVisibilityChanged = function (value, oldValue) {
        var abc = this.schedule;
    };
    ScheduleModal.prototype.close = function () {
        this.$emit('onClose');
    };
    return ScheduleModal;
}(Vue));
__decorate([
    Prop,
    __metadata("design:type", Boolean)
], ScheduleModal.prototype, "show", void 0);
__decorate([
    Prop,
    __metadata("design:type", Object)
], ScheduleModal.prototype, "schedule", void 0);
__decorate([
    Watch('show'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ScheduleModal.prototype, "onVisibilityChanged", null);
ScheduleModal = __decorate([
    Component({
        name: "login-modal",
        components: {
            "modalshell": ModalShellComponent,
            "schedule": ScheduleComponent
        }
    })
], ScheduleModal);
export default ScheduleModal;
