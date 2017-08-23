<template>
    <article class="card-full">
        <router-link :to="{ name: 'listingDetail', params: { seoString: headerLink, listingId: id }}">
            <div class="listing-header">
                <div class="header-text">{{header }}</div>
                <!--<div class="listing-cost">A${{cost }}</div>-->
            </div>
            <div class="listing-swiper">
                <swiper id="homepage-swipe" ref="swiper"
                        direction="horizontal"
                        :mousewheel-control="true"
                        :performance-mode="false"
                        :pagination-visible="false"
                        :pagination-clickable="true"
                        :loop="false">
                    <div v-for="url in imageUrls">
                        <img v-lazy="url" />
                    </div>
                    
                </swiper>
            </div>
            <div class="container is-fluid listing-footer">
                <h4 class="listing-header">{{header}}</h4>
                <div class="listing-location">In: {{location }}</div>
                <div class="listing-date">Start time: {{date}} - {{time}}</div>
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
import ListingCardComponent from "./listingcard.component.ts";
export default ListingCardComponent;
</script>