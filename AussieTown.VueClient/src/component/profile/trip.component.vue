<template>
    <div class="trip-content">
        <h2>Upcoming</h2>
        <ul class="tile is-parent is-multiline is-gapless quad">
            <li class="tile is-3" v-for="listing in confirmedGuests">
                <cardsmall :listingDetail="listing"></cardsmall>
            </li>
        </ul>
        <h2>Requests</h2>
        <ul class="tile is-parent is-multiline is-gapless quad">
            <li class="tile is-3" v-for="request in requests">
                <cardsmall :listingDetail="request"></cardsmall>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import TripComponent from "./trip.component.ts";
export default TripComponent;
</script>