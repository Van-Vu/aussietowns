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
import BookingDetailPage from '../page/bookingdetail.page.vue';
import BookingManagePage from '../page/bookingmanage.page.vue';
import AboutPage from '../page/static/about.page.vue';
import TermsAndConditionsPage from '../page/static/termsandconditions.page.vue';
import ConfirmEmailPage from '../page/confirmemail.page.vue';
import MessageComponent from '../component/profile/message.component.vue';
import TripComponent from '../component/profile/trip.component.vue';
import UserImageComponent from '../component/profile/userimage.component.vue';
import UserDetailComponent from '../component/profile/userdetail.component.vue';
import ListingsComponent from '../component/profile/listings.component.vue';
import LoginForm from '../component/form/loginform.component.vue';
import RegistrationForm from '../component/form/registration.component.vue';
import ChangePasswordComponent from '../component/profile/changepassword.component.vue';
import ForgetPasswordForm from '../component/form/forgetpassword.component.vue';
import { UserRole } from '../model/enum';
import Meta from 'vue-meta';
Vue.use(Router);
Vue.use(Meta);
Vue.use(Meta, {
    keyName: 'metaInfo',
    attribute: 'data-vue-meta',
    ssrAttribute: 'data-vue-meta-server-rendered',
    tagIDKeyName: 'vmid' // the property name that vue-meta uses to determine whether to overwrite or append a tag
});
var router = new Router({
    mode: 'history',
    routes: [
        {
            path: "/search/:seoString-:suburbId(\\d+)",
            name: "search",
            component: SearchPage,
            meta: {
                permission: UserRole.User,
                fail: '/login'
            }
        },
        {
            path: "/confirmemail/:confirmToken",
            name: "confirmEmail",
            component: ConfirmEmailPage,
            meta: {
                permission: UserRole.User,
                fail: '/login'
            }
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
                    component: UserDetailComponent,
                    meta: {
                        permission: UserRole.User,
                        isPublic: true,
                        fail: '/'
                    }
                },
                {
                    // UserProfile will be rendered inside User's <router-view>
                    // when /user/:id/profile is matched
                    path: 'images',
                    name: "profileImages",
                    component: UserImageComponent,
                    meta: {
                        permission: UserRole.Editor,
                        isPublic: false,
                        fail: '/'
                    }
                },
                {
                    // UserProfile will be rendered inside User's <router-view>
                    // when /user/:id/profile is matched
                    path: 'messages',
                    name: 'profileMessages',
                    component: MessageComponent,
                    meta: {
                        permission: UserRole.SuperAdmin,
                        isPublic: false,
                        fail: '/'
                    }
                },
                {
                    path: 'trips',
                    name: 'profileTrips',
                    component: TripComponent,
                    meta: {
                        permission: UserRole.Admin,
                        isPublic: false,
                        fail: '/'
                    }
                },
                {
                    path: 'changepassword',
                    name: 'changePassword',
                    component: ChangePasswordComponent,
                    meta: {
                        permission: UserRole.SuperAdmin,
                        isPublic: false,
                        fail: '/'
                    }
                },
                {
                    path: 'listings',
                    name: 'profileListings',
                    component: ListingsComponent,
                    meta: {
                        permission: UserRole.SuperAdmin,
                        isPublic: false,
                        fail: '/'
                    }
                }
            ]
        },
        {
            path: "/listing/:listingType(offer|request)",
            name: "newListing",
            component: ListingPage,
            props: true,
            meta: {
                permission: UserRole.User,
                fail: '/',
                isPublic: false
            }
        },
        {
            path: "/listing/:seoString-:listingId(\\d+)",
            name: "listingDetail",
            component: ListingPage,
            props: true,
            meta: {
                permission: UserRole.Anonymous,
                fail: '/'
            }
        },
        {
            path: "/booking/:seoString-:bookingId(\\d+)",
            name: "bookingDetail",
            component: BookingDetailPage,
            props: true,
            meta: {
                permission: UserRole.User,
                fail: '/',
                isPublic: false
            }
        },
        {
            path: "/booking/manage/:seoString-:listingId(\\d+)",
            name: "bookingManage",
            component: BookingManagePage,
            props: true,
            meta: {
                permission: UserRole.User,
                fail: '/',
                isPublic: false
            }
        },
        {
            path: "/booking",
            name: "booking",
            component: BookingPage,
            props: true,
            meta: {
                permission: UserRole.User,
                fail: '/',
                isPublic: false
            }
        },
        {
            path: "/login",
            name: "login",
            component: LoginForm,
            props: true,
            meta: {
                permission: UserRole.Anonymous,
                fail: '/'
            }
        },
        {
            path: "/registration",
            name: "registration",
            component: RegistrationForm,
            props: true,
            meta: {
                permission: UserRole.Anonymous,
                fail: '/'
            }
        },
        {
            path: "/resetpassword/:guidString",
            name: "resetpassword",
            component: ForgetPasswordForm,
            props: true,
            meta: {
                permission: UserRole.Anonymous,
                fail: '/'
            }
        },
        {
            path: "/help",
            name: "help",
            component: HelpPage,
            meta: {
                permission: UserRole.Anonymous,
                fail: '/'
            }
        },
        {
            path: "/about",
            name: "about",
            component: AboutPage,
            meta: {
                permission: UserRole.Anonymous,
                fail: '/'
            }
        },
        {
            path: "/termsandconditions",
            name: "termsandconditions",
            component: TermsAndConditionsPage,
            meta: {
                permission: UserRole.Anonymous,
                fail: '/'
            }
        },
        {
            path: "/test",
            name: "TestPage",
            component: TestPage,
            meta: {
                permission: UserRole.Anonymous,
                fail: '/'
            }
        },
        {
            path: "/",
            name: "home",
            component: HomePage,
            meta: {
                permission: UserRole.Anonymous,
                fail: '/'
            }
        },
        {
            path: "",
            redirect: { name: 'home' }
        },
        {
            path: "*",
            redirect: { name: 'home' }
        }
    ]
});
router.afterEach(function (to, from) {
    store.dispatch("DISABLE_LOADING");
    store.dispatch('SET_CURRENT_PAGE', to.name);
});
export default router;
