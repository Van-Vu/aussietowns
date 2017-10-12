<template>
    <article class="card-small">
        <router-link :to="{ name: 'listingDetail', params: { seoString: headerLink, listingId: id }}">
            <div class="listing-header">
                <div class="header-text">{{header }}</div>
                <!--<div class="listing-cost">A${{cost }}</div>-->
            </div>
            <div class="listing-image">
                <img v-lazy="imageUrl" :alt="imageUrl"/>
            </div>
            <div class="listing-content">
                <div class="listing-location">In: {{location}}</div>
                <div class="listing-date">Time: {{date}} - {{time}}</div>
                <div class="listing-host">Host by: {{hostName }}</div>
                <!--<div class="listing-review">review star here</div>-->
            </div>
            <div class="tooltip">
                <div class="rating"></div>
                <div class="shortlist"></div>
            </div>
        </router-link>
    </article>
</template>

<script lang="ts">
import CardSmallComponent from "./cardsmall.component.ts";
export default CardSmallComponent;
</script>