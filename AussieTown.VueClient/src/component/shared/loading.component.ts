import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import RingLoader from './external/ringloader.vue';

@Component({
    name: "LoadingComponent",
    components: {
        "ringloader": RingLoader
    }
})

export default class LoadingComponent extends Vue {

    get isLoading() {
        return this.$store.state.isLoading;
    }
}
