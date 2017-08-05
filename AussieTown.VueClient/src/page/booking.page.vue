<template>
    <div class="page-content container tile is-parent">
        <div class="listing-main-content tile is-vertical is-ancestor box is-7">
            <h2>Participant Details</h2>
            <details class="tile is-vertical is-parent box" v-for="(user, index) in model.participants">
                <summary>User {{index}}</summary>
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
                        <input name="phone" v-model="user.phone" v-validate="'required'"
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
                    <div class="tile is-2">Emregency contact</div>
                    <div class="tile control">
                        <input name="phone" v-model="user.emergencyContact" v-validate="'required'"
                                :class="{'input': true, 'is-danger': errors.has('emergencyContact') }" type="text" placeholder="">
                        <span v-show="errors.has('emergencyContact')" class="help is-danger">{{ errors.first('emergencyContact') }}</span>
                    </div>
                </div>
            </details>
        </div>
        <div class="tile is-vertical box">
            <div class="field box">
                <h2>Listing Detail</h2>
                <div class="tile">
                    <div class="tile is-2" for="firstName">Name</div>
                    <label class="tile is-narrow">{{ model.listing.header }}</label>
                </div>
                <div class="tile">
                    <div class="tile is-2" for="firstName">Time</div>
                    <p class="tile is-narrow">
                        <label>{{ model.bookingDate }}</label>
                    </p>
                </div>
                <div class="tile">
                    {{ model.listing.description }}
                </div>
            </div>
            <div class="field">
                <button class="button mtl_button mtl-btn-large relative-center-x" @click="confirmBooking"> Confirm </button>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import BookingPage from "./booking.page.ts";
export default BookingPage;
</script>