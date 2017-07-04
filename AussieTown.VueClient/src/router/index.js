import Vue from "vue";
import { Component } from "vue-property-decorator";
import Router from "vue-router";
// https://github.com/vuejs/vue-router/issues/1379
var HomePage = function (resolve) { return require(['../page/home.page.vue'], function (module) {
    resolve(module.default);
}); };
//import SearchPage = resolve => require(['../page/search.page.vue'], resolve);
var SearchPage = function (resolve) { return require(['../page/search.page.vue'], function (module) {
    resolve(module.default);
}); };
//import SearchPage from '../page/search.page.vue';
var ListingPage = function (resolve) { return require(['../page/listing.page.vue'], function (module) {
    resolve(module.default);
}); };
//import ListingPage from '../page/listing.page.vue';
var ProfilePage = function (resolve) { return require(['../page/profile.page.vue'], function (module) {
    resolve(module.default);
}); };
//import ProfilePage from '../page/profile.page.vue';
var TestPage = function (resolve) { return require(['../page/test.page.vue'], function (module) {
    resolve(module.default);
}); };
//import TestPage from '../page/test.page.vue';
var HelpPage = function (resolve) { return require(['../page/static/help.page.vue'], function (module) {
    resolve(module.default);
}); };
//import * as HelpPage from '../page/static/help.page.vue';
var AboutPage = function (resolve) { return require(['../page/static/about.page.vue'], function (module) {
    resolve(module.default);
}); };
//import * as AboutPage from '../page/static/about.page.vue';
var TermsAndConditionsPage = function (resolve) { return require(['../page/static/termsandconditions.page.vue'], function (module) {
    resolve(module.default);
}); };
import MessageComponent from '../component/profile/message.component.vue';
import TripComponent from '../component/profile/trip.component.vue';
import UserImageComponent from '../component/profile/userimage.component.vue';
import UserDetailComponent from '../component/profile/userdetail.component.vue';
Component.registerHooks([
    'asyncData',
    'beforeRouteEnter',
    'beforeRouteUpdate',
    'beforeRouteLeave'
]);
Vue.use(Router);
var router = new Router({
    mode: 'history',
    routes: [
        {
            path: "/",
            name: "defaultHome",
            component: HomePage
        },
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
            component: ProfilePage,
            children: [
                {
                    // UserProfile will be rendered inside User's <router-view>
                    // when /user/:id/profile is matched
                    path: '',
                    name: "profileHome",
                    meta: { child: 'home' },
                    component: UserDetailComponent
                },
                {
                    // UserProfile will be rendered inside User's <router-view>
                    // when /user/:id/profile is matched
                    path: 'images',
                    name: "profileImages",
                    meta: { child: 'image' },
                    component: UserImageComponent
                },
                {
                    // UserProfile will be rendered inside User's <router-view>
                    // when /user/:id/profile is matched
                    path: 'messages',
                    name: 'profileMessages',
                    meta: { child: 'message' },
                    component: MessageComponent
                },
                {
                    // UserPosts will be rendered inside User's <router-view>
                    // when /user/:id/posts is matched
                    path: 'trips',
                    name: 'profileTrips',
                    meta: { child: 'trip' },
                    component: TripComponent
                }
            ]
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
        },
        {
            path: "*",
            redirect: "/"
        }
    ]
});
export default router;
