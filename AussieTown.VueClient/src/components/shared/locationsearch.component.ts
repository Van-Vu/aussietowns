﻿import Vue from "vue";
import { Component, Inject, Watch, Prop } from "vue-property-decorator";
import axios from "axios";
import { AutocompleteItem } from '../model/autocomplete.model';
import SearchService from '../../services/search.service';
import AutoCompleteComponent from './autocomplete.vue';


@Component({
    name: "LocationSearch",
    components: {
        "autocomplete": AutoCompleteComponent
    }
})

export default class LocationSearchComponent extends Vue {
    @Prop initialData: AutocompleteItem;

    placeHolderText = "Type in a location / suburb";
    locations: any[] = [];

    onLocationSearch(searchTerm) {
        (new SearchService()).getLocation(searchTerm)
            .then(response => this.locations = response);
    }

    onLocationSelected(selectedItem) {
        this.$emit("onSelected", selectedItem);
    }
}