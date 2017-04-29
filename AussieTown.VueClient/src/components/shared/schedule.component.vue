<template>
        <div class="schedule-wrapper">
            <div class="left25">
                Date
            </div>
            <div class="left25">
                Start time
            </div>
            <div class="left25">
                Duration
            </div>
            <div class="left25">
                <input type="checkbox" v-model="isRepeated"   
                    v-bind:true-value="true"
                    v-bind:false-value="false" style="width: 20px;"> Repeat
            </div>
            <div class="left25">
                <datepicker v-model="startDate"></datepicker>
            </div>
            <div class="left25">
                <vue-timepicker v-model="startTime"></vue-timepicker>
                <!--<input class="form-control" type="text" placeholder="hh:mm" (keyup)="onStartTimeInput($event)" formControlName="startTime">-->
            </div>
            <div class="left25">
                <vue-timepicker v-model="duration"></vue-timepicker>
                <!--<timepicker formControlName="duration"></timepicker>-->
            </div>
            <div class="left25" v-show="isRepeated">
                <div v-for="period of repeatPeriods">
                    <label class="radio">
                        <input type="radio" name="period" :value="period.value" v-model="selectedPeriod">
                        {{period.display}}
                    </label>
                </div>
                <div>
                    <p style="width: 30px; display: inline-block; bottom: 10px; position: relative;">Until</p>
                    <datepicker v-model="endDate"></datepicker>
                </div>
            </div>
        </div>
</template>

<script lang="ts">
import ScheduleComponent from "./schedule.component.ts";
export default ScheduleComponent;
</script>