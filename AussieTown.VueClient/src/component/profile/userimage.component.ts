import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import * as UploadImage from '../shared/external/vueuploadimage.vue';

@Component({
    name: "UserImage",
    components: {
        'upload-image': UploadImage
    }
})

export default class UserImageComponent extends Vue {
    maxFileAllowed: number = 5;

    created(): void {
    }

    close() {
    }
}
