import Vue from "vue";
import { Component, Inject, Watch, Prop } from "vue-property-decorator";
import axios from "axios";
//import Datepicker from 'vuejs-datepicker';
//import VueTimepicker from 'vue2-timepicker';

@Component
export default class ScheduleComponent extends Vue {
    startDate = new Date(2016, 9, 16);
    startTime = { HH: '08', mm: '00' };
    duration = { HH: '08', mm: '00' };
    endDate = new Date(2017, 4, 28);
    isRepeated = false;


    public repeatPeriods = [
        { value: '1', display: 'Daily' },
        { value: '2', display: 'Weekly' },
        { value: '3', display: 'Monthly' }
    ];
    selectedPeriod: any = 0;
}