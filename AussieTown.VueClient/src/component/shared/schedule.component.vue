<template>
        <div class="schedule-wrapper" style="margin-top:100px;">
            <template v-for="schedule in model">
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
                    <datepicker v-model="schedule.startDate"></datepicker>
                </div>
                <div class="left25">
                    <vue-timepicker v-model="schedule.startTime" :minute-interval="15"></vue-timepicker>
                    <!--<input class="form-control" type="text" placeholder="hh:mm" (keyup)="onStartTimeInput($event)" formControlName="startTime">-->
                </div>
                <div class="left25">
                    <vue-timepicker v-model="schedule.duration" :minute-interval="15"></vue-timepicker>
                    <!--<timepicker formControlName="duration"></timepicker>-->

                </div>
                <div class="left25" v-show="isRepeated">
                    <div v-for="period of repeatPeriods">
                        <label class="radio">
                            <input type="radio" name="period" :value="period.value" v-model="schedule.repeatedType">
                            {{period.display}}
                        </label>
                    </div>
                    <div>
                        <p style="width: 30px; display: inline-block; bottom: 10px; position: relative;">Until</p>
                        <datepicker v-model="schedule.endDate"></datepicker>
                    </div>
                </div>
            </template>
        </div>
</template>
<script lang="ts">
import ScheduleComponent from "./schedule.component.ts";
export default ScheduleComponent;
</script>