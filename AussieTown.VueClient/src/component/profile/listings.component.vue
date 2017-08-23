<template>
    <div class="trip-content">
        <ul class="columns is-multiline is-gapless">
            <li class="column is-one-quarter" v-for="offer in listings">
                <cardsmall :listingDetail="offer"></cardsmall>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import ListingsComponent from "./listings.component.ts";
export default ListingsComponent;
</script>