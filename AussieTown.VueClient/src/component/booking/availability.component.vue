<template>
    <div>
        <div class="columns is-gapless">
            <label class="column is-5">Participants</label>
            <numberchooser class="column" :value="participants" @input="onParticipantChanged"></numberchooser>
        </div>
        <div class="columns is-gapless">
            <datepicker id="availDay" :disabled="disableDays" :range="false" :inline="true"
                    :showTextbox="true" :value="bookingDate" @input="onBookingDateChanged"></datepicker>
        </div>
    </div>
</template>

<script lang="ts">
import AvailabilityComponent from "./availability.component.ts";
export default AvailabilityComponent;
</script>