<template>
    <div class="page-content container tile is-vertical">
        <router-link :to="{ name: 'bookingManage', params: { seoString: 'testing', listingId: '19' } }">
            <label class="tab-text">Manage Booking</label>
        </router-link>
        <datepicker id="availDay" :range="false"></datepicker>

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