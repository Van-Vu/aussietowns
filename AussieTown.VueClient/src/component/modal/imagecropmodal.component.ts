import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import ModalShellComponent from './modalshell.component.vue';
import ImageCropComponent from '../shared/imagecrop.component.vue';

@Component({
    name: "login-modal",
    components: {
        "modalshell": ModalShellComponent,
        "imagecrop": ImageCropComponent
    }
})

export default class ImageCropModalComponent extends Vue {
    @Prop() show: boolean;
    @Prop() imageSources: any;
    @Prop() imageSizeSettings: any;

    onClose() {
        this.$emit('onClose');
    }
}
