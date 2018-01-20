import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Utils } from '../utils'

@Component({
    name: "MiniProfile"
})

export default class MiniProfileComponent extends Vue{
    @Prop() data: any;
    @Prop() isRemovable: boolean;

    userId: number;
    profileUrl: string;
    profileImageUrl: string;
    fullName: string;
    shortDescription: string;
    profileLink: string;
    isPrimary: boolean;

    created() {
        this.userId = this.data.id;
        this.profileImageUrl = this.data.photoUrl;
        this.profileUrl = '';
        this.fullName = this.data.fullname == ' ' ? this.data.email : this.data.fullname;
        this.isPrimary = this.data.isPrimary ? this.data.isPrimary : false;
        this.shortDescription = this.data.shortDescription;        
        this.profileLink = Utils.seorizeString(this.fullName);
    }

    onRemoveUser() {
        this.$emit("removeUser", this.data);
    }

    onViewUserProfile() {
        this.$router.push({ name: 'profileHome', params: { seoString: this.profileLink, profileId: this.userId.toString() } });
    }
}
