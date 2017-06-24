<template>
    <article class="listing-wrapper">
        <router-link :to="{ name: 'listingDetail', params: { seoString: headerLink, listingId: id }}">
            <div class="listing-header">
                <!--<div class="header-text"><h4>{{header }}</h4></div>
                <div class="listing-cost">A${{cost }}</div>-->
            </div>
            <div class="listing-content">
                <swiper ref="swiper"
                        direction="horizontal"
                        :mousewheel-control="true"
                        :performance-mode="false"
                        :pagination-visible="true"
                        :pagination-clickable="true"
                        :loop="false"
                        @slide-change-start="onSlideChangeStart"
                        @slide-change-end="onSlideChangeEnd">
                    <div v-for="slide in slides">
                        <img v-lazy="slide.imgSrc" />
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