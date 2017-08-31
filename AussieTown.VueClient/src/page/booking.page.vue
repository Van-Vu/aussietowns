<template>
    <div class="page-content container tile">
        <div class="tile is-8 is-vertical box">
            <div class="box-header-strip"></div>
            <form-wizard v-if="!isBooked" @on-complete="confirmBooking" 
                         @on-loading="setLoading" 
                         @on-error="handleErrorMessage"
                         title="Booking" subtitle=""
                         style="position:relative;">
                <div slot="title">
                    <h2>Just simple steps to open up your amazing experience</h2>
                </div>
                <template slot="step" scope="props">
                    <wizard-step :tab="props.tab"
                                 :transition="props.transition"
                                 :key="props.tab.title"
                                 :index="props.index">
                    </wizard-step>
                </template>
                <template slot="footer" scope="props">
                    <div class=wizard-footer-left>
                        <wizard-button v-if="props.activeTabIndex > 0" @click.native="props.prevTab()" class="mtl_button">Previous</wizard-button>
                    </div>
                    <div class="wizard-footer-right">
                        <wizard-button v-if="!props.isLastStep" @click.native="props.nextTab()" class="wizard-footer-right mtl_button">Next</wizard-button>

                        <wizard-button v-else  @click.native="props.nextTab()" class="wizard-footer-right finish-button" :style="props.fillButtonStyle">{{props.isLastStep ? 'Confirm' : 'Next'}}</wizard-button>
                    </div>
                </template>
                <tab-content title="Schedule" :before-change="validateBookingTime"
                             icon="glyphicon glyphicon-time">
                    <div v-if="errorMsg" class="booking-error">
                        <span>{{errorMsg}}</span>
                    </div>
                    <availability @bookingDateChanged="onBookingDateChanged" @bookingTimeChanged="onBookingTimeChanged">
                    </availability>
                </tab-content>
                <tab-content title="Participants" :before-change="validateParticipantInfo"
                             icon="glyphicon glyphicon-user">
                    <!--<div>
                        <a @click.prevent="addMoreParticipant" class="button mtl_button">
                            <i class="glyphicon glyphicon-plus-sign" /><span>Add participant</span>
                        </a>
                    </div>-->
                    <!--<details class="tile is-vertical is-parent box participant-summary " v-for="(user, index) in model.participants" :data-vv-scope="index">-->
                    <div v-if="errorMsg" class="booking-error">
                        <span>{{errorMsg}}</span>
                    </div>
                    <ul>
                        <li class="tile" v-for="(user, index) in model.participants">
                            <details class="tile is-vertical is-parent box participant-summary " >
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
                                <i class="glyphicon glyphicon-plus-sign" /><span>Add participant</span>
                            </a>
                            <!--<usersearch v-show="isAdding" @onSelected="onUserSelect($event)"></usersearch>-->
                        </li>
                    </ul>
                </tab-content>
                <tab-content title="Review" :before-change="confirmBooking"
                             icon="glyphicon glyphicon-file">
                    <ul>
                    <li class="tile is-vertical is-parent box participant-summary " v-for="(user, index) in model.participants">
                        <div class="tile is-parent">
                            <div class="tile is-4">Email</div>
                            <p class="tile control">
                                <label>{{ user.email }}</label>
                            </p>
                        </div>
                        <div class="tile is-parent">
                            <div class="tile is-4" for="firstName">First Name</div>
                            <p class="tile control">
                                <label>{{ user.firstName }}</label>
                            </p>
                        </div>
                        <div class="tile is-parent">
                            <div class="tile is-4" for="lastName">Last Name</div>
                            <p class="tile control">
                                <label>{{ user.lastName }}</label>
                            </p>
                        </div>
                        <div class="tile is-parent">
                            <div class="tile is-4" for="header">Contact number</div>
                            <div class="tile control">
                                <label>{{ user.phone }}</label>
                            </div>
                        </div>
                        <div class="tile is-parent">
                            <div class="tile is-4">Address</div>
                            <div class="tile control">
                                <label>{{ user.address }}</label>
                            </div>
                        </div>
                        <div class="tile is-parent">
                            <div class="tile is-4">Emergency contact</div>
                            <div class="tile control">
                                <label>{{ user.emergencyContact }}</label>
                            </div>
                        </div>
                    </li>
                    </ul>
                </tab-content>
                <div class="loading-screen is-flex is-overlay" v-if="isLoading">
                    <span class="absolute-center">In progress ...</span>
                    <ringloader class="absolute-center"></ringloader>
                </div>
            </form-wizard>

            <form-wizard v-else title="Awesome" 
                subtitle="Your host has been notified ! He will contact you soon to process futher">
                <template slot="footer" scope="props">
                    <div class=wizard-footer-left>
                    </div>
                    <div class="wizard-footer-right">
                    </div>
                </template>
                <tab-content title="Finish"
                             icon="glyphicon glyphicon-check">
                </tab-content>
            </form-wizard>
        </div>
        <div v-if="!isBooked" class="tile is-vertical is-parent" :class="{'is-sticky-box': isStickyBoxRequired}">
            <div class="field box">
                <div class="box-header-strip"></div>
                <div class="columns">
                    <h2>{{ model.listing.header }}</h2>
                </div>
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
import BookingPage from "./booking.page.ts";
export default BookingPage;
</script>