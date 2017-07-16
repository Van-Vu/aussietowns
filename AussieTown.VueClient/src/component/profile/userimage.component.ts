import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import ImageUploadComponent from '../shared/imageupload.component.vue';

@Component({
    name: "UserImageComponent",
    components: {
        "imageupload": ImageUploadComponent
    }
})

export default class UserImageComponent extends Vue {

    created(): void {
    }
}
