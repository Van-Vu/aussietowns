<template>
    <div>
        <div class="columns">
            <div class="column is-4">Choose your suitable day</div>
            <div class="column">
                <datepicker id="availDay" :disabled="disableDays" :range="false"
                            :availableDays="availableDays"
                            :value="bookingDate" @input="onBookingDateChanged"></datepicker>
            </div>

        </div>
        <div class="columns">
            <div class="column is-4">Time</div>
            <div class="column">
                <select class="select" v-model="bookingTime" style="width:100%;">
                    <option value="" selected="selected">Choose time</option>
                    <option v-for="timeslot in availableTimeslot" v-bind:value="timeslot">
                        {{ timeslot }}
                    </option>
                </select>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import AvailabilityComponent from "./availability.component.ts";
export default AvailabilityComponent;
</script>