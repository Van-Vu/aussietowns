<template>
    <div class="page-content container tile is-vertical">
        <div v-if="true" class="tile is-8 is-vertical is-parent">
            <div class="tile is-vertical box">
                <div class="box-header-strip"></div>
                <availability :bookingDate="model.bookingDate" :bookingTime="model.bookingTime"
                              :availableDays="availableDays"
                              @bookingDateChanged="onBookingDateChanged" @bookingTimeChanged="onBookingTimeChanged">
                </availability>
            </div>
            <div class="tile is-vertical box booking-detail-panel">
                <div class="box-header-strip"></div>
                <ul class="wrap-collabsible" v-if="isDateChoosen">
                    <li class="tile is-vertical is-parent list" v-for="(group, index) in model.bookingGroups">
                        <input :id="group.id" type="checkbox" class="approveCheck" title='Approve this booking'>
                        <input :id="index" class="toggle" type="checkbox">
                        <label :for="index" class="lbl-toggle">Group booked by {{group.participants[0].firstName}}</label>
                        <div class="collapsible-content">
                            <div class="content-inner">
                                <div class="tile is-parent is-vertical" v-for="user in group.participants">
                                    <div class="tile">
                                        <div class="tile is-4" for="firstName">First Name</div>
                                        <p class="tile">{{ user.firstName }}</p>
                                    </div>
                                    <div class="tile">
                                        <div class="tile is-4" for="lastName">Last Name</div>
                                        <p class="tile">{{ user.lastName }}</p>
                                    </div>
                                    <div class="tile">
                                        <div class="tile is-4">Email</div>
                                        <p class="tile">{{ user.email }}</p>
                                    </div>
                                    <div class="tile">
                                        <div class="tile is-4" for="header">Contact number</div>
                                        <div class="tile">{{ user.phone }}</div>
                                    </div>
                                    <div class="tile">
                                        <div class="tile is-4">Address</div>
                                        <div class="tile">{{ user.address }}</div>
                                    </div>
                                    <div class="tile">
                                        <div class="tile is-4">Emergency contact</div>
                                        <div class="tile">{{ user.emergencyContact }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="tile is-parent">
                        <button class="column is-half button mtl_button-no-round" @click="onModify">Update</button>
                    </li>
                </ul>
                <div v-else>
                    Please choose available date with booking
                </div>
                <div class="loading-screen is-flex is-overlay" v-if="isLoading">
                    <span class="absolute-center">Loading ...</span>
                    <ringloader class="absolute-center"></ringloader>
                </div>
            </div>
        </div>
        <div class="tile is-vertical" :class="{'is-sticky-box': isStickyBoxRequired}">
            <div class="field box">
                <div class="box-header-strip"></div>
                <router-link :to="{ name: 'listingDetail', params: { seoString: model.listing.headerLink, listingId: model.listing.id }}">
                    <h2 class="listing-headertext">{{ model.listing.header }}</h2>
                </router-link>
                <a class="columns listing-headertext">

                </a>
                <div class="columns">
                    <div class="column is-2" for="firstName">Date</div>
                    <div class="column">{{ model.bookingDate }}</div>
                </div>
                <div class="columns">
                    <div class="column is-2" for="firstName">Time</div>
                    <div class="column">{{ model.bookingTime }}</div>
                </div>
                <div class="tile">
                    {{ model.listing.description }}
                </div>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
import BookingManagePage from "./bookingManage.page.ts";
export default BookingManagePage;
</script>