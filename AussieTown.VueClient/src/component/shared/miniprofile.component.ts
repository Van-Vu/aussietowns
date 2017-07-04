import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Utils } from '../utils'

@Component({
    name: "MiniProfile"
})

export default class MiniProfileComponent extends Vue{
    @Prop data: any;
    @Prop isRemovable: boolean;

    userId: number;
    profileUrl: string;
    profileImageUrl: string;
    fullName: string;
    shortDescription: string;
    profileLink: string;

    created() {
        this.userId = this.data.id;
        this.profileImageUrl = this.data.photoUrl;
        this.profileUrl = '';
        this.fullName = this.data.fullname;
        this.shortDescription = this.data.shortDescription;        
        this.profileLink = Utils.seorizeString(this.fullName);
    }

    onRemoveUser() {
        this.$emit("removeUser", this.data);
    }
}
