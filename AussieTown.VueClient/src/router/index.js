import Vue from "vue";
import Router from "vue-router";
import Hello from "../components/Hello.vue";
import HomeComponent from '../components/home/home.component.vue';
import SearchComponent from '../components/search/search.component.vue';
import Test from '../components/test';
import LoginForm from '../components/form/loginform.component.vue';
import RegistrationForm from '../components/form/registration.component.vue';
import ProfileComponent from '../components/profile/profile.component.vue';
import ListingOfferForm from '../components/form/listingoffer.component.vue';
import ListingRequestForm from '../components/form/listingrequest.component.vue';
import ParticipantComponent from '../components/shared/participant.component.vue';
import ScheduleComponent from '../components/shared/schedule.component.vue';
import UserDetailComponent from '../components/form/userdetail.component.vue';
Vue.use(Router);
var router = new Router({
    mode: 'history',
    routes: [
        {
            path: "/test",
            name: "test",
            component: Test
        },
        {
            path: "/login",
            name: "login",
            component: LoginForm
        },
        {
            path: "/home",
            name: "home",
            component: HomeComponent
        },
        {
            path: "/search",
            name: "search",
            component: SearchComponent
        },
        {
            path: "/tourdetail",
            name: "tourdetail",
            component: Test
        },
        {
            path: "/profile",
            name: "profile",
            component: ProfileComponent
        },
        {
            path: "/offer",
            name: "ListingOfferForm",
            component: ListingOfferForm
        },
        {
            path: "/request",
            name: "ListingRequestForm",
            component: ListingRequestForm
        },
        {
            path: "/participant",
            name: "ParticipantComponent",
            component: ParticipantComponent
        },
        {
            path: "/schedule",
            name: "ScheduleComponent",
            component: ScheduleComponent
        },
        {
            path: "/pform",
            name: "ProfileForm",
            component: UserDetailComponent
        },
        {
            path: "/reg",
            name: "RegistrationForm",
            component: RegistrationForm
        },
        {
            path: "/",
            name: "Hello",
            component: Hello
        },
    ]
});
export default router;
