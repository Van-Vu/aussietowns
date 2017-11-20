<template>
    <div class="trip-content">
        <ul class="tile is-parent is-multiline is-gapless quad">
            <li class="tile is-3" v-for="offer in listings">
                <cardsmall :listingDetail="offer"></cardsmall>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import ListingsComponent from "./listings.component.ts";
export default ListingsComponent;
</script>