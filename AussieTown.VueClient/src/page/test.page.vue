<template>
    <div class="page-content container tile is-vertical">
        <checkButton :model="hobbies"></checkButton>

        <button @click="fetchHobbies"> get Hobbies</button>
        <router-link :to="{ name: 'bookingManage', params: { seoString: 'testing', listingId: '19' } }">
            <label class="tab-text">Manage Booking</label>
        </router-link>

        <router-link :to="{ name: 'bookingDetail', params: { seoString: 'testing', bookingId: '11' } }">
            <label class="tab-text">View Booking</label>
        </router-link>

        <router-link :to="{ name: 'aboutus', params: { seoString: 'testing', articleId: 1 } }">
            <label class="tab-text">View Article</label>
        </router-link>

        <router-link :to="{ name: 'editArticle', params: { seoString: 'testing', articleId: 1 } }">
            <label class="tab-text">Edit Article</label>
        </router-link>

        <router-link :to="{ name: 'createArticle' }">
            <label class="tab-text">Create New Article</label>
        </router-link>

        <datepicker id="availDay" :range="false"></datepicker>


        <router-link :to="{ name: 'resetpassword', params: { guidString: 'cbe74c7a-9b54-402e-9d8e-d86ffb75fa85' } }">
            test here
        </router-link>


        <button @click="onContact">Contact Someone</button>

        <form @submit.prevent="validateBeforeSubmit">
            <div class="field">
                <p class="control has-icon has-icon-right" :class="{'is-loading': isValidating}">
                    <input name="email" v-model="email" @blur="onBlur"
                           :class="{'input': true, 'is-danger': errors.has('email') }" type="text" placeholder="Enter your email">
                    <i class="icon icon-envelope-o" v-show="!isValidating"></i>
                    <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
                </p>
            </div>
            <div class="field">
                <p class="control has-icon has-icon-right">
                    <input name="password" v-model="rawPassword" v-validate="'required'"
                           :class="{'input': true, 'is-danger': errors.has('password') }" type="password" placeholder="●●●●●●●">
                    <span class="icon user">
                        <i class="icon icon-lock"></i>
                    </span>
                    <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
                </p>
            </div>
            <div class="field has-text-centered">
                <button type="submit" class="button is-full button mtl_button-no-round mtl-btn-large">Submit</button>
            </div>
        </form>
        <div>Hey test</div>
        <ul>
            <li v-for="listing in listings">
                <listingcard :listingDetail="listing"></listingcard>
            </li>
        </ul>
     </div>
</template>

<script lang="ts">
import TestPage from "./test.page.ts";
export default TestPage;
</script>