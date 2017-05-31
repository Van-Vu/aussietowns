import Vue from "vue";
import { Component, Inject, Watch, Prop } from "vue-property-decorator";
import axios from "axios";
import ScheduleModel from '../model/schedule.model';
import * as vuetimepicker from './vuetimepicker.vue';

//import Datepicker from 'vuejs-datepicker';
//import VueTimepicker from 'vue2-timepicker';

@Component({
    name: "Schedule",
    components: {
        "vue-timepicker": vuetimepicker
    }
})
export default class ScheduleComponent extends Vue {
    @Prop model: ScheduleModel[];
    isRepeated: boolean = false;
    public repeatPeriods = [
        { value: '1', display: 'Daily' },
        { value: '2', display: 'Weekly' },
        { value: '3', display: 'Monthly' }
    ];

    created() {
        if (this.model.length === 0) {
            this.model.push(new ScheduleModel(new Date(), { HH: '08', mm: '00' }, { HH: '08', mm: '00' }, new Date(),2));
        }
    }
}