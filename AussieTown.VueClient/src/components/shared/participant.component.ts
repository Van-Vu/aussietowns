import Vue from "vue";
import { Component, Inject, Watch, Prop } from "vue-property-decorator";
import axios from "axios";
import MiniProfileComponent from './miniprofile.component.vue';
import AutoCompleteComponent from '../autocomplete/autocomplete.vue';

@Component({
    name: "Participant",
    components: {
        "miniprofile": MiniProfileComponent,
        "autocomplete": AutoCompleteComponent
    }
})

export default class ParticipantComponent extends Vue {
    @Prop exixtingUsers: any[];
    @Prop participantType: string;

    searchStr: string = "";
    placeHolderText = "this is the test";
    searchUsers: any[] = [];
    isAdding = false;
    needCleanup: boolean = true;
    buttonText: string;
    internalUsers: any[];

    created() {
        this.buttonText = "Add " + this.participantType;
        //this.internalUsers = this.exixtingUsers;

        this.internalUsers = [
            {
                id: 1,
                photoUrl: "/static/images/logo.png",
                fullname: "asdfasdfas",
                shortDescription: "asdfasdfa"                      
            }
        ];
    }

    toggleProfileSearch(event) {
        this.isAdding = !this.isAdding;
        if (this.isAdding) {
            this.buttonText = "Done";
        } else {
            this.buttonText = "Add " + this.participantType;
        }

        event.stopPropagation();
    }

    onUserSearch(search) {
        //this.userService.search(search).subscribe((response: any) => {
        //    this.searchUsers = response;
        //});
    }

    onUserSelected(user) {
        this.internalUsers.push(user);
        this.$emit("userAdded", user);
    }

    onUserRemove(user) {
        this.internalUsers.splice(this.internalUsers.indexOf(user), 1);
        this.$emit("userRemoved", user);
    }
}
