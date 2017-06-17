import Vue from "vue";
import { Component } from "vue-property-decorator";
import axios from "axios";
import LocationSearchComponent from './locationsearch.component.vue';


@Component({
    name: "UserSearch",
    components: {
        "locationsearch": LocationSearchComponent
    }
})

export default class SearchBarComponent extends Vue {
    onSelect(val) {
        this.$emit('onSelect', val);
    }

    onSearch(val) {
        //{ name: 'user', params: { userId: 123 } }
        this.$emit('onSearch', val);
    }

}
