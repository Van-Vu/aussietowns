<template>
    <div class="trip-content">
        <div>
            <listingcard v-for="offer in listings" :key="offer.id" :cardDetail="offer" :cardType="listingCardType"></listingcard>
        </div>
    </div>
</template>

<script lang="ts">
import ListingsComponent from "./listings.component.ts";
export default ListingsComponent;
</script>