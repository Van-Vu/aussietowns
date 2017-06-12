<template>
    <div style="position: relative;height: 100%;">
        <section class="search-result">
            <div class="listing-card">
                <ul>
                    <!--<li *ngFor="let listing of listings">
                        <listingoffercard [listing-detail]="listing"></listingoffercard>
                    </li>-->
                    <li v-for="listing in listings">
                        <listingcard :listingDetail="listing"></listingcard>
                    </li>
                    <!--<button class="create-request" @click="showListingRequest = !showListingRequest" style="width: 49%;margin-left: auto;margin-bottom: 40px;margin-right: auto;">
                        Can't find your tour ?
                        <span>+</span>Add a request
                    </button>
                    <button class="create-request" @click="showListingOffer = !showListingOffer" style="width: 49%;margin-left: auto;margin-bottom: 40px;margin-right: auto;">
                        Can't find your tour ?
                        <span>+</span>Create a Tour
                    </button>-->
                </ul>
            </div>
        </section>
        <section class="map">
            <gmap-map id="gmap" :center="center"
                      :zoom="7">
                <gmap-marker :key="index"
                             v-for="(m, index) in markers"
                             :position="m.position"
                             :clickable="true"
                             :draggable="true"
                             @click="center=m.position"></gmap-marker>
            </gmap-map>
        </section>
        <!--<article class="itinerary">
            <itinerary></itinerary>
        </article>-->
        <!--<listingrequestmodal :show="showListingRequest" @onClose="showListingRequest = !showListingRequest"></listingrequestmodal>
        <listingoffermodal :show="showListingOffer" @onClose="showListingOffer = !showListingOffer"></listingoffermodal>-->
    </div>
</template>
<script lang="ts">
import SearchComponent from "./search.component.ts";
export default SearchComponent;
</script>