import Vue from "vue";
import { Component } from "vue-property-decorator";
import Router  from "vue-router";

// LAZY LOADING ATTEMP
// https://github.com/vuejs/vue-router/issues/1379
//const HomePage = (resolve) => (require as any)(['../page/home.page.vue'], module => {
//    resolve(module.default)
//})
//const SearchPage = (resolve) => (require as any)(['../page/search.page.vue'], module => {
//    resolve(module.default)
//})
//const ListingPage = (resolve) => (require as any)(['../page/listing.page.vue'], module => {
//    resolve(module.default)
//})
//const ProfilePage = (resolve) => (require as any)(['../page/profile.page.vue'], module => {
//    resolve(module.default)
//})
//const TestPage = (resolve) => (require as any)(['../page/test.page.vue'], module => {
//    resolve(module.default)
//})
//const HelpPage = (resolve) => (require as any)(['../page/static/help.page.vue'], module => {
//    resolve(module.default)
//})
//const AboutPage = (resolve) => (require as any)(['../page/static/about.page.vue'], module => {
//    resolve(module.default)
//})
//const TermsAndConditionsPage = (resolve) => (require as any)(['../page/static/termsandconditions.page.vue'], module => {
//    resolve(module.default)
//})

import HomePage from '../page/home.page.vue';
import SearchPage from '../page/search.page.vue';
import ListingPage from '../page/listing.page.vue';
import ProfilePage from '../page/profile.page.vue';
import TestPage from '../page/test.page.vue';
import HelpPage from '../page/static/help.page.vue';
import BookingPage from '../page/booking.page.vue'
import AboutPage from '../page/static/about.page.vue';
import TermsAndConditionsPage from '../page/static/termsandconditions.page.vue';

import App from '../App.vue';

import MessageComponent from '../component/profile/message.component.vue';
import TripComponent from '../component/profile/trip.component.vue';
import UserImageComponent from '../component/profile/userimage.component.vue';
import UserDetailComponent from '../component/profile/userdetail.component.vue';
import LoginForm from '../component/form/loginform.component.vue';
import RegistrationForm from '../component/form/registration.component.vue';

Vue.use(Router);

const router = new Router({
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
                    meta: {child: 'home'},
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
                    meta: { requiresAuth: true },
                    component: MessageComponent,

                },
                {
                    // UserPosts will be rendered inside User's <router-view>
                    // when /user/:id/posts is matched
                    path: 'trips',
                    name: 'profileTrips',
                    meta: { requiresAuth: true },
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
            path: "/booking",
            name: "booking",
            component: BookingPage,
            props: true
        },

        {
            path: "/login",
            name: "login",
            component: LoginForm,
            props: true
        },
        {
            path: "/registration",
            name: "registration",
            component: RegistrationForm,
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
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        console.log('inside route of Auth')
        next()
    } else {
        next() // make sure to always call next()!
    }

    next()
})

export default router