import Vue from "vue";
import { Component, Inject, Watch, Prop } from "vue-property-decorator";
import axios from "axios";
import ScheduleModel from '../../model/schedule.model';
import CheckButtonModel from '../../model/checkbutton.model';

import vuetimepicker from './external/vuetimepicker.vue';
import datepicker from './external/datepicker.vue';
import { Utils } from '../utils';
import CheckButton from './checkbutton.component.vue';

import { RepeatedDay } from '../../model/enum';

import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);


@Component({
    name: "Schedule",
    components: {
        "vue-timepicker": vuetimepicker,
        "datepicker": datepicker,
        "checkButton": CheckButton
    }
})
export default class ScheduleComponent extends Vue {
    @Prop() model: ScheduleModel;
    isRepeated: boolean = true;
    repeatedDay: Array<string> = [];

    //model: ScheduleModel = null;

    repeatPeriods = [
        { value: 1, display: 'Daily' },
        { value: 2, display: 'Weekly' }
        //{ value: '3', display: 'Monthly' }
    ];

    weekdayList =  [
            new CheckButtonModel(RepeatedDay[1], '1', RepeatedDay[1]),
            new CheckButtonModel(RepeatedDay[2], '2', RepeatedDay[2]),
            new CheckButtonModel(RepeatedDay[3], '3', RepeatedDay[3]),
            new CheckButtonModel(RepeatedDay[4], '4', RepeatedDay[4]),
            new CheckButtonModel(RepeatedDay[5], '5', RepeatedDay[5]),
            new CheckButtonModel(RepeatedDay[6], '6', RepeatedDay[6]),
            new CheckButtonModel(RepeatedDay[0], '0', RepeatedDay[0]),
        ];

    disableDays = {
        to: new Date()
        //days: [6, 0] // Disable Saturday's and Sunday's
    };

    //get model() {
    //    return this.$store.state.dynamicModal.props.schedule;
    //}

    //@Watch('schedule')
    //onScheduleChanged(value: ScheduleModel, oldValue: ScheduleModel) {
    //    this.model = value;
    //}

    @Watch('isRepeated')
    onRepeatedChanged(value: boolean, oldValue: boolean) {
        console.log(`isRepeated: ${value}`);
        this.model.repeatedDay = [];
        this.model.repeatedType = 0;
    }

    validateBeforeSubmit() {
        this.$validator.validateAll().then((result) => {
            if (result) {
                this.model.repeatedDay = this.repeatedDay;
                this.$emit('onSave', this.model);                
            }
        }).catch(() => {
            alert('Correct them errors!');
        });
    }

    onUpdatedWeekdayList(value) {
        //var clone = JSON.parse(JSON.stringify(value));
        var clone = Object.assign([], value);
        this.repeatedDay = clone.sort();
    }
}