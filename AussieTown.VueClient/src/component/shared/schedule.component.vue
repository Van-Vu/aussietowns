<template>
    <form @submit.prevent="validateBeforeSubmit" v-if="model">
        <div class="field">
            <label class="label">Start date</label>
            <p class="control has-icon has-icon-right">
                <datepicker :disabled="disableDays" :range="false" v-model="model.startDate"></datepicker>
            </p>
        </div>
        <div class="field">
            <label class="label" for="password">Start time</label>
            <p class="control has-icon has-icon-right">
                <vue-timepicker v-model="model.startTime" :minute-interval="15"></vue-timepicker>
            </p>
        </div>
        <div class="field">
            <label class="label" for="password">Duration</label>
            <p class="control has-icon has-icon-right">
                <vue-timepicker v-model="model.duration" :minute-interval="15"></vue-timepicker>
            </p>
        </div>
        <div class="field">
            <input type="checkbox" id="checkbox" v-model="isRepeated">
            <span style="font-weight: 700;" for="checkbox">Repeated</span>
            <ul class="control has-icon has-icon-right" v-show="isRepeated">
                <li class="li-horizontal" v-for="period of repeatPeriods">
                    <input type="radio" name="period" :value="period.value" v-model="model.repeatedType">
                    {{period.display}}
                </li>
                <li class="box" v-if="model.repeatedType == 2">
                    <input type="checkbox" id="monday" value="1" v-model="model.repeatedDay">
                    <label for="monday">Mon</label>
                    <input type="checkbox" id="tuesday" value="2" v-model="model.repeatedDay">
                    <label for="tuesday">Tue</label>
                    <input type="checkbox" id="wednesday" value="4" v-model="model.repeatedDay">
                    <label for="wednesday">Wed</label>
                    <input type="checkbox" id="thursday" value="8" v-model="model.repeatedDay">
                    <label for="thursday">Thu</label>
                    <input type="checkbox" id="friday" value="16" v-model="model.repeatedDay">
                    <label for="friday">Fri</label>
                    <input type="checkbox" id="saturday" value="32" v-model="model.repeatedDay">
                    <label for="saturday">Sat</label>
                    <input type="checkbox" id="sunday" value="64" v-model="model.repeatedDay">
                    <label for="sunday">Sun</label>
                </li>
            </ul>
        </div>
        <div class="field">
            <label class="label">End date</label>
            <p class="control has-icon has-icon-right">
                <datepicker v-model="model.endDate"></datepicker>
            </p>
        </div>
        <button type="submit" class="button mtl_button">Save</button>
    </form>
</template>
<script lang="ts">
import ScheduleComponent from "./schedule.component.ts";
export default ScheduleComponent;
</script>