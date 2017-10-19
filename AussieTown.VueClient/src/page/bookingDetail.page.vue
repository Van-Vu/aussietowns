<template>
    <div class="page-content container tile is-vertical">
        <div v-if="true" class="tile is-8 is-vertical is-parent">
            <div class="tile is-vertical box">
                <div class="box-header-strip"></div>
                <availability :date="model.bookingDate" :time="model.bookingTime"
                    @bookingDateChanged="onBookingDateChanged" @bookingTimeChanged="onBookingTimeChanged">
                </availability>
            </div>
            <div class="tile is-vertical box">
                <div class="box-header-strip"></div>
                <ul>
                    <li class="tile" v-for="(user, index) in model.participants">
                        <details class="tile is-vertical is-parent box participant-summary ">
                            <summary class="is-flex">
                                <div>User {{index}}</div><div class="mtl_button deleteButton" @click.prevent="removeParticipant(index)">Remove</div>
                            </summary>
                            <div class="tile is-parent">
                                <div class="tile is-2">Email</div>
                                <p class="tile control">
                                    <input name="email" v-model="user.email" v-validate="'required|email'"
                                            :class="{'input': true, 'is-danger': errors.has('email') }" type="text">
                                    <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
                                </p>
                            </div>
                            <div class="tile is-parent">
                                <div class="tile is-2" for="firstName">First Name</div>
                                <p class="tile control">
                                    <input name="firstname" v-model="user.firstName" v-validate="'required'"
                                            :class="{'input': true, 'is-danger': errors.has('firstname') }" type="text">
                                    <span v-show="errors.has('firstname')" class="help is-danger">{{ errors.first('firstname') }}</span>
                                </p>
                            </div>
                            <div class="tile is-parent">
                                <div class="tile is-2" for="lastName">Last Name</div>
                                <p class="tile control">
                                    <input name="lastname" v-model="user.lastName" v-validate="'required'"
                                            :class="{'input': true, 'is-danger': errors.has('lastname') }" type="text">
                                    <span v-show="errors.has('lastname')" class="help is-danger">{{ errors.first('lastname') }}</span>
                                </p>
                            </div>
                            <div class="tile is-parent">
                                <div class="tile is-2" for="header">Contact number</div>
                                <div class="tile control">
                                    <input name="phone" v-model="user.phone" v-validate="'required'" v-mask="'##########'"
                                            :class="{'input': true, 'is-danger': errors.has('phone') }" type="text" placeholder="">
                                    <span v-show="errors.has('phone')" class="help is-danger">{{ errors.first('phone') }}</span>
                                </div>
                            </div>
                            <div class="tile is-parent">
                                <div class="tile is-2">Address</div>
                                <div class="tile control">
                                    <input name="address" v-model="user.address" v-validate="'required'"
                                            :class="{'input': true, 'is-danger': errors.has('address') }" type="text" placeholder="">
                                    <span v-show="errors.has('address')" class="help is-danger">{{ errors.first('address') }}</span>
                                </div>
                            </div>
                            <div class="tile is-parent">
                                <div class="tile is-2">Emergency contact</div>
                                <div class="tile control">
                                    <input name="emergencyContact" v-model="user.emergencyContact" v-validate="'required'" v-mask="'##########'"
                                            :class="{'input': true, 'is-danger': errors.has('emergencyContact') }" type="text" placeholder="">
                                    <span v-show="errors.has('emergencyContact')" class="help is-danger">{{ errors.first('emergencyContact') }}</span>
                                </div>
                            </div>
                        </details>
                    </li>
                    <li class="tile box">
                        <a @click.prevent="addMoreParticipant" class="button mtl_grey_button">
                            <i class="icon icon-user-add" /><span>Add participant</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="container is-gapless is-flex is-sticky-bottom">
                <button class="column is-half button mtl_button-no-round" @click="onModify">Modify</button>
                <button class="column is-half button mtl_button-no-round" @click="onWithdraw">Withdraw</button>
            </div>
        </div>
        <!--<form-wizard v-else title="Awesome"
                        subtitle="Your host has been notified ! He will contact you soon to process futher">
            <template slot="footer" scope="props">
                <div class=wizard-footer-left>
                </div>
                <div class="wizard-footer-right">
                </div>
            </template>
            <tab-content title="Finish"
                            icon="icon icon-checkbox-checked">
            </tab-content>
        </form-wizard>-->
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
import BookingDetailPage from "./bookingDetail.page.ts";
export default BookingDetailPage;
</script>