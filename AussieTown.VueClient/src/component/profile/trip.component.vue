﻿<template>
    <div class="trip-content">
        <h2>Upcoming</h2>
        <div>
            <listingcard v-for="listing in confirmedGuests" :key="listing.id" :cardDetail="listing" :cardType="listingCardType"></listingcard>
        </div>
        <h2>Requests</h2>
        <div>
            <listingcard v-for="request in requests" :key="request.id" :cardDetail="request" :cardType="listingCardType"></listingcard>
        </div>
    </div>
</template>

<script lang="ts">
import TripComponent from "./trip.component.ts";
export default TripComponent;
</script>