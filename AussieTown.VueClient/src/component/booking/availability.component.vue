<template>
    <div>
        <div>
            <numberchooser :value="participants" @input="onParticipantChanged"></numberchooser>
        </div>
        <div>
            <datepicker id="availDay" :disabled="disableDays" :range="false" :showTextbox="true" :value="bookingDate" @input="onBookingDateChanged"></datepicker>
        </div>
    </div>

</template>

<script lang="ts">
import AvailabilityComponent from "./availability.component.ts";
export default AvailabilityComponent;
</script>