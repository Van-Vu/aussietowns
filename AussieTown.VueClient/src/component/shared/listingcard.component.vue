<template>
    <article class="card-full">
        <router-link :to="{ name: 'listingDetail', params: { seoString: headerLink, listingId: id }}">
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
            <!--<div class="listing-header">
                <div class="header-text">{{header }}</div>
            </div>-->
            <div class="listingcard-header">
                <h3>{{header}}</h3>
            </div>
            <div class="listingcard-description">
                {{description}}
            </div>
            <div class="listingcard-content">
                <div class="left">
                    <div>{{location }}</div>
                    <div>Duration: {{duration}} hrs</div>
                </div>
                <div class="right">
                    <div>Prices from</div>
                    <div class="listingcost">{{cost}} AUD</div>
                </div>
                <!--<div class="listing-host">Host by: {{hostName }}</div>-->
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