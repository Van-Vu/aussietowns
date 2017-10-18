<template>
    <form class="tile is-vertical" @submit.prevent="validateBeforeSubmit" v-if="model">
        <div class="tile is-parent">
            <div class="tile is-3">Start date</div>
            <div class="tile is-9">
                <datepicker :disabled="disableDays" :range="false" v-model="model.startDate" v-validate="'required'"
                    :class="{'is-danger': errors.has('startDate') }"></datepicker>
                <span v-show="errors.has('startDate')" class="help is-danger">{{ errors.first('startDate') }}</span>
            </div>
        </div>
        <div class="tile is-parent">
            <div class="tile is-3">Start time</div>
            <div class="tile is-9">
                <vue-timepicker v-model="model.startTime" :minute-interval="30"></vue-timepicker>
            </div>
        </div>
        <div class="tile is-parent">
            <div class="tile is-3">Duration (hrs)</div>
            <div class="tile is-9">
                <vue-timepicker v-model="model.duration" :minute-interval="30"></vue-timepicker>
            </div>
        </div>
        <div class="tile is-parent">
            <div class="tile is-3">
                <input type="checkbox" id="repeated" v-model="isRepeated">
                <label for="repeated">Repeat</label>
            </div>
            <div class="tile is-vertical is-9">
                <ul>
                    <li class="li-horizontal" v-for="period of repeatPeriods" style="margin-right:15px;">
                        <input type="radio" :id="period.display" :value="period.value" v-model="model.repeatedType" :disabled="!isRepeated">
                        <label :for="period.display">{{period.display}}</label>
                    </li>
                </ul>
                <div class="" v-if="model.repeatedType == 2 && isRepeated">
                    <input type="checkbox" id="monday" value="1" v-model="repeatedDay">
                    <label for="monday">Mon</label>
                    <input type="checkbox" id="tuesday" value="2" v-model="repeatedDay">
                    <label for="tuesday">Tue</label>
                    <input type="checkbox" id="wednesday" value="4" v-model="repeatedDay">
                    <label for="wednesday">Wed</label>
                    <input type="checkbox" id="thursday" value="8" v-model="repeatedDay">
                    <label for="thursday">Thu</label>
                    <input type="checkbox" id="friday" value="16" v-model="repeatedDay">
                    <label for="friday">Fri</label>
                    <input type="checkbox" id="saturday" value="32" v-model="repeatedDay">
                    <label for="saturday">Sat</label>
                    <input type="checkbox" id="sunday" value="64" v-model="repeatedDay">
                    <label for="sunday">Sun</label>
                </div>

            </div>
        </div>
        <div class="tile is-parent">
            <div class="tile is-3">End date</div>
            <div class="tile is-9">
                <datepicker v-model="model.endDate"></datepicker>
            </div>
        </div>
        <div class="tile is-parent has-text-centered">
            <button type="submit" class="is-one-quarter button mtl_button-no-round">Save</button>
        </div>
    </form>
</template>
<script lang="ts">
import ScheduleComponent from "./schedule.component.ts";
export default ScheduleComponent;
</script>