import Vue from "vue";
import { Component, Inject, Watch, Prop } from "vue-property-decorator";
import axios from "axios";
import { AutocompleteItem } from '../model/autocomplete.model';
import SearchService from '../../services/search.service';
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
