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
import { Component, Watch, Prop } from "vue-property-decorator";
import vuetimepicker from './external/vuetimepicker.vue';
import datepicker from './external/datepicker.vue';
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);
var ScheduleComponent = /** @class */ (function (_super) {
    __extends(ScheduleComponent, _super);
    function ScheduleComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isRepeated = true;
        _this.repeatedDay = [];
        //model: ScheduleModel = null;
        _this.repeatPeriods = [
            { value: '1', display: 'Daily' },
            { value: '2', display: 'Weekly' },
            { value: '3', display: 'Monthly' }
        ];
        _this.disableDays = {
            to: new Date(),
            days: [6, 0] // Disable Saturday's and Sunday's
        };
        return _this;
    }
    Object.defineProperty(ScheduleComponent.prototype, "model", {
        get: function () {
            return this.$store.state.dynamicModal.props.schedule;
        },
        enumerable: true,
        configurable: true
    });
    //@Watch('schedule')
    //onScheduleChanged(value: ScheduleModel, oldValue: ScheduleModel) {
    //    this.model = value;
    //}
    ScheduleComponent.prototype.onRepeatedChanged = function (value, oldValue) {
        console.log("isRepeated: " + value);
    };
    ScheduleComponent.prototype.validateBeforeSubmit = function () {
        var _this = this;
        this.$validator.validateAll().then(function () {
            _this.model.repeatedDay = _this.repeatedDay;
            _this.$emit('onSave', _this.model);
        }).catch(function () {
            alert('Correct them errors!');
        });
    };
    __decorate([
        Prop,
        __metadata("design:type", Object)
    ], ScheduleComponent.prototype, "schedule", void 0);
    __decorate([
        Watch('isRepeated'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Boolean, Boolean]),
        __metadata("design:returntype", void 0)
    ], ScheduleComponent.prototype, "onRepeatedChanged", null);
    ScheduleComponent = __decorate([
        Component({
            name: "Schedule",
            components: {
                "vue-timepicker": vuetimepicker,
                "datepicker": datepicker
            }
        })
    ], ScheduleComponent);
    return ScheduleComponent;
}(Vue));
export default ScheduleComponent;
