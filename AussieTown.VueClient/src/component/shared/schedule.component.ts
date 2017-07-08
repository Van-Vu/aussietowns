import Vue from "vue";
import { Component, Inject, Watch, Prop } from "vue-property-decorator";
import axios from "axios";
import ScheduleModel from '../../model/schedule.model';
import vuetimepicker from './external/vuetimepicker.vue';
import datepicker from './external/datepicker.vue';
import { Utils } from '../utils';

import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);


@Component({
    name: "Schedule",
    components: {
        "vue-timepicker": vuetimepicker,
        "datepicker": datepicker
    }
})
export default class ScheduleComponent extends Vue {
    @Prop schedule: any;
    isRepeated: boolean = true;
    model: ScheduleModel = null;

    public repeatPeriods = [
        { value: '1', display: 'Daily' },
        { value: '2', display: 'Weekly' },
        { value: '3', display: 'Monthly' }
    ];

    @Watch('schedule')
    onScheduleChanged(value: ScheduleModel, oldValue: ScheduleModel) {
        this.model = value;
        if (typeof (this.model.startTime) === 'string') {
            this.model.startTime = {
                HH: this.model.startTime.toString().substring(0, 2),
                mm: this.model.startTime.toString().substring(3, 5)
            };
        }
        if (typeof (this.model.duration) === 'string') {
            this.model.duration = {
                HH: this.model.duration.toString().substring(0, 2),
                mm: this.model.duration.toString().substring(3, 5)
            };
        }
    }

    @Watch('isRepeated')
    onRepeatedChanged(value: boolean, oldValue: boolean) {
        console.log(`isRepeated: ${value}`);
    }

    validateBeforeSubmit() {
        this.$validator.validateAll().then(() => {
            this.$emit('onSave', this.model);
        }).catch(() => {
            alert('Correct them errors!');
        });
    }
}