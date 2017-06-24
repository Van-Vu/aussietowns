<template>
    <form @submit.prevent="validateBeforeSubmit" v-if="model">
        <div class="field">
            <label class="label">Date</label>
            <p class="control has-icon has-icon-right">
                <datepicker v-model="model.startDate"></datepicker>
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
            <div class="control has-icon has-icon-right" v-show="isRepeated">
                <div v-for="period of repeatPeriods">
                    <label class="radio">
                        <input type="radio" name="period" :value="period.value" v-model="model.repeatedType">
                        {{period.display}}
                    </label>
                </div>
                <div>
                    <datepicker v-model="model.endDate"></datepicker>
                </div>
            </div>
        </div>
        <button type="submit" class="button">Save</button>
    </form>
</template>
<script lang="ts">
import ScheduleComponent from "./schedule.component.ts";
export default ScheduleComponent;
</script>