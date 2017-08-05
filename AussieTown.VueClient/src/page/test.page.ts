import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import SearchBarComponent from '../component/shared/search/searchbar.component.vue';
import Swiper from '../component/shared/external/vue-swiper.vue';
import NumberChooser from '../component/shared/numberchooser.component.vue';
import UserService from '../service/user.service';
import { NotificationType } from '../model/enum';


@Component({
    name: 'TestPage',
    components: {
        "searchbar": SearchBarComponent,
        "swiper": Swiper,
        "numberchooser": NumberChooser
    }
})

export default class TestPage extends Vue {
    showListingRequest: boolean = false;
    showListingOffer: boolean = false;
    numberChooser : number = 0;


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

    addNotification() {
        this.$store.dispatch('ADD_NOTIFICATION', { title: "this is title", text: "this is the text", type: NotificationType.Success });
    }

}
