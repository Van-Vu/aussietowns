import Vue from "vue";
import { Component } from "vue-property-decorator";
import Router  from "vue-router";

import HomePage from '../page/home.page.vue';
import SearchPage from '../page/search.page.vue';
import ListingPage from '../page/listing.page.vue';
import ProfilePage from '../page/profile.page.vue';
import TestPage from '../page/test.page.vue';
import * as HelpPage from '../page/static/help.page.vue';
import * as AboutPage from '../page/static/about.page.vue';
import * as TermsAndConditionsPage from '../page/static/termsandconditions.page.vue';

Component.registerHooks([
    'asyncData',
    'beforeRouteEnter',
    'beforeRouteUpdate',
    'beforeRouteLeave'
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
            name: "newListing",
            component: ListingPage,
            props: true
        },
        {
            path: "/listing/:seoString-:listingId(\\d+)",
            name: "listingDetail",
            component: ListingPage,
            props: true
        },
        {
            path: "/help",
            name: "help",
            component: HelpPage
        },
        {
            path: "/about",
            name: "about",
            component: AboutPage
        },
        {
            path: "/termsandconditions",
            name: "termsandconditions",
            component: TermsAndConditionsPage
        },
        {
            path: "/test",
            name: "TestPage",
            component: TestPage
        }
  ]
})

export default router