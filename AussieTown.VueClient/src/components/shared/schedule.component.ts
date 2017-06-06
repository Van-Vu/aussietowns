import Vue from "vue";
import { Component, Inject, Watch, Prop } from "vue-property-decorator";
import axios from "axios";
import ScheduleModel from '../model/schedule.model';
import * as vuetimepicker from './vuetimepicker.vue';
import * as datepicker from './datepicker.vue';
import { Utils } from './utils';

@Component({
    name: "Schedule",
    components: {
        "vue-timepicker": vuetimepicker,
        "datepicker": datepicker
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
        if (this.model.length > 0) {
            for (var i = 0; i < this.model.length; i++) {
                console.log('run here, server?');
                var schedule = this.model[i];
                if (typeof (schedule.startTime) === 'string') {
                    schedule.startTime = {
                        HH: schedule.startTime.toString().substring(0, 2),
                        mm: schedule.startTime.toString().substring(3, 5)
                    };                    
                }
                if (typeof (schedule.duration) === 'string') {
                    schedule.duration = {
                        HH: schedule.duration.toString().substring(0, 2),
                        mm: schedule.duration.toString().substring(3, 5)
                    };                    
                }
            }
        }
    }
}