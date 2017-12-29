import Vue from "vue";
import { Component, } from "vue-property-decorator";
import ZoneLoadingComponent from '../shared/zoneloading.component.vue';


@Component({
    name: "Logoutform",
    components: {
        "zoneloading": ZoneLoadingComponent
    }
})


export default class LogoutForm extends Vue {
    $cookie: any;

    created() {
        this.$store.dispatch('SET_CURRENT_USER', null);
        this.$cookie.remove('mtltk');
        this.$cookie.remove('mtl');

        if (process.env.VUE_ENV === 'client') {
            setTimeout(() => {
                window.location.href = '/';
            }, 3000)
        }
    }
}
