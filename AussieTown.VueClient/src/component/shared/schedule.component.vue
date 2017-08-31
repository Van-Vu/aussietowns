<template>
    <form @submit.prevent="validateBeforeSubmit" v-if="model">
        <div class="columns">
            <div class="column is-2">Start date</div>
            <div class="column is-6">
                <!--<datepicker :disabled="disableDays" :range="false" v-model="model.startDate"></datepicker>-->
            </div>
        </div>
        <div class="columns">
            <div class="column is-2">Start time</div>
            <div class="column is-6">
                <vue-timepicker v-model="model.startTime" :minute-interval="30"></vue-timepicker>
            </div>
        </div>
        <div class="columns">
            <div class="column is-2">Duration</div>
            <div class="column is-6">
                <vue-timepicker v-model="model.duration" :minute-interval="30"></vue-timepicker>
            </div>
        </div>
        <div class="columns">
            <div class="column is-3">
                <input type="checkbox" id="checkbox" v-model="isRepeated">
                <span for="checkbox">Repeated</span>
            </div>
           <ul class="column" v-show="isRepeated">
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
        <div class="columns">
            <div class="column is-2">End date</div>
            <div class="column is-6">
                <datepicker v-model="model.endDate"></datepicker>
            </div>
        </div>
        <div class="columns">
            <button type="submit" class="column is-one-quarter button mtl_button-no-round">Save</button>
        </div>
    </form>
</template>
<script lang="ts">
import ScheduleComponent from "./schedule.component.ts";
export default ScheduleComponent;
</script>