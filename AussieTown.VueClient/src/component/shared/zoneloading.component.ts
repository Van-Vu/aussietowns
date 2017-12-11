import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import RingLoader from './external/ringloader.vue';

@Component({
    name: "ZoneLoadingComponent",
    components: {
        "ringloader": RingLoader
    }
})

export default class ZoneLoadingComponent extends Vue {
    @Prop() isLoading: boolean;
    @Prop({ default: 'Loading' }) loadingText: string;
}
