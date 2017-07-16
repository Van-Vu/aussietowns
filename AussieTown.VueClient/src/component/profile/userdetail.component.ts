﻿import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import VeeValidate from 'vee-validate';
import LocationSearchComponent from "../shared/search/locationsearch.component.vue";
import UserModel from '../../model/user.model';
import { AutocompleteItem } from '../../model/autocomplete.model';
import datepicker from '../shared/external/datepicker.vue';

Vue.use(VeeValidate);

@Component({
    name: 'UserDetail',
    components: {
        "locationsearch": LocationSearchComponent,
        "datepicker": datepicker
    }
})

export default class UserDetailComponent extends Vue {
    model: UserModel = new UserModel();
    isEditing: boolean = false;
    modelCache: any = null;

    created() {
        if (this.$store.state.profile) {
            this.model = this.$store.state.profile;
        }
    }

    onLocationSelected(item: AutocompleteItem) {
        this.model.locationId = +item.id;
    }

    onInsertorUpdate() {
        if (this.model.id > 0) {
            return this.$store.dispatch('UPDATE_USER', this.contructBeforeSubmit(this.model));
            //(new ListingService()).updateListing(this.contructBeforeSubmit(this.model));
        }
    }

    onEdit() {
        this.isEditing = true;
        this.modelCache = Object.assign({}, this.model);
    }

    onCancelEdit() {
        this.isEditing = false;
        Object.assign(this.model, this.modelCache);
        this.modelCache = null;
    }

    contructBeforeSubmit(model) {
        return this.model;
    }

onUpdate(){}
capture(){}
}

