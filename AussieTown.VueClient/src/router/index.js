import Vue from "vue";
import Router from "vue-router";
import store from '../store';
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
import BookingPage from '../page/booking.page.vue';
import AboutPage from '../page/static/about.page.vue';
import TermsAndConditionsPage from '../page/static/termsandconditions.page.vue';
import MessageComponent from '../component/profile/message.component.vue';
import TripComponent from '../component/profile/trip.component.vue';
import UserImageComponent from '../component/profile/userimage.component.vue';
import UserDetailComponent from '../component/profile/userdetail.component.vue';
import LoginForm from '../component/form/loginform.component.vue';
import RegistrationForm from '../component/form/registration.component.vue';
import ChangePasswordComponent from '../component/profile/changepassword.component.vue';
import ForgetPasswordForm from '../component/form/forgetpassword.component.vue';
Vue.use(Router);
var router = new Router({
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
                    meta: { requiresAuth: true },
                    component: MessageComponent,
                },
                {
                    path: 'trips',
                    name: 'profileTrips',
                    meta: { requiresAuth: false },
                    component: TripComponent
                },
                {
                    path: 'changepassword',
                    name: 'changePassword',
                    meta: { requiresAuth: true },
                    component: ChangePasswordComponent
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
            path: "/resetpassword/:guidString",
            name: "resetpassword",
            component: ForgetPasswordForm,
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
});
router.beforeEach(function (to, from, next) {
    store.dispatch("ENABLE_LOADING");
    if (to.matched.some(function (record) { return record.meta.requiresAuth; })) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        //if (!auth.loggedIn()) {
        //    next({
        //        path: '/login',
        //        query: { redirect: to.fullPath }
        //    })
        //} else {
        console.log('inside route of Auth');
        next();
    }
    else {
        next(); // make sure to always call next()!
    }
});
router.afterEach(function (to, from) {
    store.dispatch("DISABLE_LOADING");
});
export default router;
