import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component({
    name: 'ProfilePage'
})

export default class ProfilePage extends Vue {
    currentTab: string = '';

    created() {
        this.$store.dispatch('SET_CURRENT_PAGE', 'profile');
        this.currentTab = this.$route.name;
    }

    @Watch('$route')
    onRouteParamChanged(value, oldValue) {
        //console.log(`route change ${value}`);
        this.currentTab = value.name;
    }
}