<template>
    <div>
        <div class="box-header-strip"></div>
        <ul>
            <li v-for="offer in offers">
                <listingcard :listingDetail="offer"></listingcard>
            </li>
        </ul>
        <ul>
            <li v-for="request in requests">
                <listingcard :listingDetail="request"></listingcard>
            </li>
        </ul>
    </div>

</template>

<script lang="ts">
import TripComponent from "./trip.component.ts";
export default TripComponent;
</script>