<template>
    <modalshell :show.sync="show" @onClose="close">
        <div slot="header">
            This is Listing Request
        </div>
        <div slot="body">
            <listingrequestform></listingrequestform>
        </div>
    </modalshell>
</template>

<script lang="ts">
import ListingRequestModalComponent from "./listingrequestmodal.component.ts";
export default ListingRequestModalComponent;
</script>