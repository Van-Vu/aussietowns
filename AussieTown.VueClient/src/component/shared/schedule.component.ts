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

    repeatPeriods = [
        { value: '1', display: 'Daily' },
        { value: '2', display: 'Weekly' },
        { value: '3', display: 'Monthly' }
    ];

    disableDays = {
        days: [6, 0] // Disable Saturday's and Sunday's
    };

    @Watch('schedule')
    onScheduleChanged(value: ScheduleModel, oldValue: ScheduleModel) {
        this.model = value;
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