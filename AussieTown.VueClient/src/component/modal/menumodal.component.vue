<template>
    <modalshell :show.sync="show" @onClose="close">
        <div slot="header">
            This is header
        </div>
        <div slot="body">
            <router-link :to="{ name: 'home' }">Home</router-link>
            <router-link :to="{ name: 'newListing', params: { listingType: 'offer' }}">Create new fun</router-link>
            <router-link :to="{ name: 'newListing', params: { listingType: 'request' }}">Find fun</router-link>
            <router-link :to="{ name: 'help' }">Help</router-link>
            <router-link :to="{ name: 'termsandconditions' }">Terms and Conditions</router-link>
            <router-link :to="{ name: 'about'}">About</router-link>
        </div>
    </modalshell>
</template>

<script lang="ts">
import MenuModal from "./menumodal.component.ts";
export default MenuModal;
</script>