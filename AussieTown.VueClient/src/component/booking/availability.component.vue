<template>
    <div>
        <div class="tile is-parent">
            <div class="tile is-4">Booking date</div>
            <div class="tile">
                <datepicker v-if="!model || model.repeatedType > 0" id="availDay" :disabled="disableDays" :range="false"
                            :availableDays="availableDays" @input="onBookingDateChanged"></datepicker>
                <p v-else>{{startDateFormated}}</p>
            </div>

        </div>
        <div class="tile is-parent">
            <div class="tile is-4">Time</div>
            <div class="tile">
                <select v-if="!model || model.repeatedType > 0" class="select" v-model="bookingTime" style="width:100%;">
                    <option value="" selected="selected">Choose time</option>
                    <option v-for="timeslot in availableTimeslot" v-bind:value="timeslot">
                        {{ timeslot }}
                    </option>
                </select>
                <p v-else>{{model.duration}}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import AvailabilityComponent from "./availability.component.ts";
export default AvailabilityComponent;
</script>