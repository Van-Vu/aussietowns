import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import UserDetailComponent from '../component/profile/userdetail.component.vue';
import TripComponent from '../component/profile/trip.component.vue';
import MessageComponent from '../component/profile/message.component.vue';
import UserImageComponent from '../component/profile/userimage.component.vue';

@Component({
    name: 'ProfilePage',
    components: {
        'profileform': UserDetailComponent,
        'tripcomponent': TripComponent,
        'messagecomponent': MessageComponent,
        'userimage': UserImageComponent
    }
})

export default class ProfilePage extends Vue {
    currentTab: string = '';

    asyncData({ store, route }) {
        console.log('profile id:' + route.params.profileId);
        if (route.params.profileId) {
            return store.dispatch('FETCH_USER_BY_ID', route.params.profileId);
            //return store.dispatch('FETCH_CONVERSATIONS_BY_USER', route.params.profileId);
        }
    }

    created() {
        this.$store.dispatch('SET_CURRENT_PAGE', 'profile');
        this.currentTab = this.$route.name;

        console.log('create profile page');
    }

    @Watch('$route')
    onRouteParamChanged(value, oldValue) {
        //console.log(`route change ${value}`);
        this.currentTab = value.name;
    }
}