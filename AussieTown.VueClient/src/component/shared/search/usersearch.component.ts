import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import axios from "axios";
import { AutocompleteItem } from '../../../model/autocomplete.model';
import SearchService from '../../../service/search.service';
import AutoCompleteComponent from './autocomplete.vue';


@Component({
    name: "UserSearch",
    components: {
        "autocomplete": AutoCompleteComponent
    }
})

export default class UserSearchComponent extends Vue {
    @Prop initialData: AutocompleteItem;

    placeHolderText = "Type in a person name / email";
    users: any[] = [];

    onUserSearch(searchTerm) {
        (new SearchService()).getUser(searchTerm)
            .then(response => this.users = response);
    }

    onUserSelected(selectedItem) {
        this.$emit("onSelected", selectedItem);
    }
}
