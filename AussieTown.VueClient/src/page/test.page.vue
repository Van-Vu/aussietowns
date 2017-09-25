<template>
    <div class="page-content container tile is-vertical">
        <ul>
            <li v-for="listing in listings">
                <listingcard :listingDetail="listing"></listingcard>
            </li>
        </ul>
     </div>
</template>

<script lang="ts">
import TestPage from "./test.page.ts";
export default TestPage;
</script>