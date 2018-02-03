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
import ScheduleModel from '../../model/schedule.model';
import CheckButtonModel from '../../model/checkbutton.model';
import vuetimepicker from './external/vuetimepicker.vue';
import datepicker from './external/datepicker.vue';
import CheckButton from './checkbutton.component.vue';
import { RepeatedDay } from '../../model/enum';
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
            { value: 1, display: 'Daily' },
            { value: 2, display: 'Weekly' }
            //{ value: '3', display: 'Monthly' }
        ];
        _this.weekdayList = [
            new CheckButtonModel(RepeatedDay[1], '1', RepeatedDay[1]),
            new CheckButtonModel(RepeatedDay[2], '2', RepeatedDay[2]),
            new CheckButtonModel(RepeatedDay[3], '3', RepeatedDay[3]),
            new CheckButtonModel(RepeatedDay[4], '4', RepeatedDay[4]),
            new CheckButtonModel(RepeatedDay[5], '5', RepeatedDay[5]),
            new CheckButtonModel(RepeatedDay[6], '6', RepeatedDay[6]),
            new CheckButtonModel(RepeatedDay[0], '0', RepeatedDay[0]),
        ];
        _this.disableDays = {
            to: new Date()
            //days: [6, 0] // Disable Saturday's and Sunday's
        };
        return _this;
    }
    //get model() {
    //    return this.$store.state.dynamicModal.props.schedule;
    //}
    //@Watch('schedule')
    //onScheduleChanged(value: ScheduleModel, oldValue: ScheduleModel) {
    //    this.model = value;
    //}
    ScheduleComponent.prototype.onRepeatedChanged = function (value, oldValue) {
        console.log("isRepeated: " + value);
        this.model.repeatedDay = [];
        this.model.repeatedType = 0;
    };
    ScheduleComponent.prototype.validateBeforeSubmit = function () {
        var _this = this;
        this.$validator.validateAll().then(function (result) {
            if (result) {
                _this.model.repeatedDay = _this.repeatedDay;
                _this.$emit('onSave', _this.model);
            }
        }).catch(function () {
            alert('Correct them errors!');
        });
    };
    ScheduleComponent.prototype.onUpdatedWeekdayList = function (value) {
        //var clone = JSON.parse(JSON.stringify(value));
        var clone = Object.assign([], value);
        this.repeatedDay = clone.sort();
    };
    __decorate([
        Prop(),
        __metadata("design:type", ScheduleModel)
    ], ScheduleComponent.prototype, "model", void 0);
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
                "datepicker": datepicker,
                "checkButton": CheckButton
            }
        })
    ], ScheduleComponent);
    return ScheduleComponent;
}(Vue));
export default ScheduleComponent;
