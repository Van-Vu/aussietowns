import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import SearchBarComponent from '../component/shared/search/searchbar.component.vue';
import Swiper from '../component/shared/external/vue-swiper.vue';

import UserService from '../service/user.service';

@Component({
    name: 'TestPage',
    components: {
        "searchbar": SearchBarComponent,
        "swiper": Swiper
    }
})

export default class TestPage extends Vue {
    showListingRequest: boolean = false;
    showListingOffer: boolean = false;

    asyncData({ store, route }) {
        return store.dispatch('SET_CURRENT_PAGE', 'home');
    }

    requestSlides: Array<any> = [
    ];

    onSelect(val) {
        console.log(val);
    }

    onSearch(val) {
        //{ name: 'user', params: { userId: 123 } }
        this.$router.push('search');
    }

    created() {

    }

    onSlideChangeStart(currentPage) {
        console.log('onSlideChangeStart', currentPage);
    }

    onSlideChangeEnd(currentPage) {
        console.log('onSlideChangeEnd', currentPage);
    }

    checkLogginUser() {
        this.$store.dispatch('TEST');
    }

}
