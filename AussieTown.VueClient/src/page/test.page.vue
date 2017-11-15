<template>
    <div class="page-content container tile is-vertical">
        <router-link :to="{ name: 'bookingManage', params: { seoString: 'testing', listingId: '19' } }">
            <label class="tab-text">Manage Booking</label>
        </router-link>
        <datepicker id="availDay" :range="false"></datepicker>


        <router-link :to="{ name: 'resetpassword', params: { guidString: 'cbe74c7a-9b54-402e-9d8e-d86ffb75fa85' } }">
            test here
        </router-link>


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