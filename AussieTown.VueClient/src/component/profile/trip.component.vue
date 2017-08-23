<template>
    <div class="trip-content">
        <h2>Upcoming</h2>
        <ul class="columns is-multiline is-gapless">
            <li class="column is-one-quarter" v-for="listing in confirmedGuests">
                <cardsmall :listingDetail="listing"></cardsmall>
            </li>
        </ul>
        <h2>Requests</h2>
        <ul class="columns is-multiline is-gapless">
            <li class="column is-one-quarter" v-for="request in requests">
                <cardsmall :listingDetail="request"></cardsmall>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import TripComponent from "./trip.component.ts";
export default TripComponent;
</script>