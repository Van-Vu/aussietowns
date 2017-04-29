<template>
    <modalshell :show.sync="show" @onClose="close">
        <div slot="header">
            This is Listing Offer
        </div>
        <div slot="body">
            <listingofferform></listingofferform>
        </div>
    </modalshell>
</template>

<script lang="ts">
import ListingOfferModalComponent from "./listingoffermodal.component.ts";
export default ListingOfferModalComponent;
</script>