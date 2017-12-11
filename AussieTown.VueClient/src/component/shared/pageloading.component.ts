import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import RingLoader from './external/ringloader.vue';

@Component({
    name: "PageLoadingComponent",
    components: {
        "ringloader": RingLoader
    }
})

export default class PageLoadingComponent extends Vue {

    get isLoading() {
        return this.$store.state.isLoading;
    }
}
