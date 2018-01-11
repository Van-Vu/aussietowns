import Vue from "vue";
import { Component, Inject, Watch, Prop } from "vue-property-decorator";
import axios from "axios";
import MiniProfileComponent from './miniprofile.component.vue';
import UserSearchComponent from './search/usersearch.component.vue';
import SearchService from '../../service/search.service';


@Component({
    name: "ParticipantComponent",
    components: {
        "miniprofile": MiniProfileComponent,
        "usersearch": UserSearchComponent
    }
})

export default class ParticipantComponent extends Vue {
    @Prop() participants: any[];
    @Prop() participantType: string;
    @Prop() isEditing: boolean;
    @Prop({ default: true }) allowAdd: boolean;
    @Prop({ default: true }) allowRemove: boolean;

    searchStr: string = "";
    placeHolderText = "this is the test";
    searchUsers: any[] = [];
    isAdding = false;
    needCleanup: boolean = true;
    buttonText: string;
    internalUsers: any[];

    created() {

        //this.internalUsers = this.exixtingUsers;
    }

    mounted() {
        this.buttonText = "Add " + this.participantType;        
    }

    toggleProfileSearch() {
        this.isAdding = !this.isAdding;
        if (this.isAdding) {
            this.buttonText = "Done";
        } else {
            this.buttonText = "Add " + this.participantType;
        }
    }

    onUserSelect(user) {
        this.$emit("userAdded", user);
        this.toggleProfileSearch();

    }

    onUserRemove(user) {
        //this.internalUsers.splice(this.internalUsers.indexOf(user), 1);
        this.$emit("userRemoved", user);
    }
}
