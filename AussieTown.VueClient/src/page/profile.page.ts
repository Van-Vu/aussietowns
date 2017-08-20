import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { UserRole, UserAction } from '../model/enum';

@Component({
    name: 'ProfilePage'
})

export default class ProfilePage extends Vue {
    currentTab: string = '';
    $auth: any;

    created() {
        this.$store.dispatch('SET_CURRENT_PAGE', 'profile');
        this.currentTab = this.$route.name;
    }

    get canEdit() {
        return this.$auth.check(UserRole.Editor, (this.$route.params as any).profileId, UserAction.Edit);
    }

    @Watch('$route')
    onRouteParamChanged(value, oldValue) {
        //console.log(`route change ${value}`);
        this.currentTab = value.name;
    }
}