import Vue from "vue";
import { Component } from "vue-property-decorator";
import Router  from "vue-router";

import HomePage from '../page/home.page.vue';
import SearchPage from '../page/search.page.vue';
import ListingPage from '../page/listing.page.vue';
import ProfilePage from '../page/profile.page.vue';
import TestPage from '../page/test.page.vue'

Component.registerHooks([
    'asyncData',
    'beforeRouteEnter'
])



Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: "/home",
            name: "home",
            component: HomePage
        },
        {
            path: "/search/:seoString-:suburbId(\\d+)",
            name: "search",
            component: SearchPage
        },
        {
            path: "/profile/:seoString-:profileId(\\d+)",
            name: "profile",
            component: ProfilePage
        },
        {
            path: "/listing/:listingType(offer|request)",
            name: "listing",
            component: ListingPage,
            props: true
        },
        {
            path: "/test",
            name: "TestPage",
            component: TestPage
        }
  ]
})

export default router