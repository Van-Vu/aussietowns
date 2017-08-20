import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import VeeValidate from 'vee-validate';
import LocationSearchComponent from "../shared/search/locationsearch.component.vue";
import UserModel from '../../model/user.model';
import { UserRole, UserAction } from '../../model/enum';
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
    isEditing: boolean = false;
    modelCache: any = null;
    $auth: any;

    get model() {
        return this.$store.state.profile;
    }

    asyncData({ store, route }) {
        if (route.params.profileId) {
            return store.dispatch('FETCH_PROFILE_BY_ID', route.params.profileId);
        }
    }

    get canEdit() {
        return this.$auth.check(UserRole.Editor, (this.$route.params as any).profileId, UserAction.Edit);
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

