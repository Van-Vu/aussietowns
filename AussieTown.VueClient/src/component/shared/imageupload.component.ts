import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import UploadImage from './external/vueuploadimage.vue';
import Swiper from './external/vue-swiper.vue';
import ImageModel from '../../model/image.model';
import RingLoader from './external/ringloader.vue';

@Component({
    name: "ImageUploadComponent",
    components: {
        'upload-image': UploadImage,
        'swiper': Swiper,
        'ringloader': RingLoader
    }
})

export default class ImageUploadComponent extends Vue {
    @Prop uploadType: number;
    @Prop images: ImageModel[];
    @Prop isEditing: boolean;
    carouselCurrentPage: number = 1;
    isUploading: boolean = false;
    maxFileAllowed: number = 5;

    created(): void {
    }

    close() {
    }

    onSlideChangeEnd(currentPage) {
        this.carouselCurrentPage = currentPage;
    }

    onRemoveImage() {
        this.$store.dispatch('REMOVE_IMAGE', { listingId: this.$store.state.listing.id, url: this.images[this.carouselCurrentPage - 1].url });
    }

    onUploadImages(formData) {
        let storeAction;
        let actionId;

        this.isUploading = true;
        if (this.uploadType === 0) {
            storeAction = 'UPLOAD_LISTING_IMAGES';
            actionId = this.$store.state.listing.id;
        } else {
            storeAction = 'UPLOAD_PROFILE_IMAGES';
            actionId = this.$store.state.profile.id;
        }

        this.$store.dispatch(storeAction,
        {
            data: formData,
            actionId: actionId
        }).then(response => {
            this.$emit('uploadImageCompleted');
            this.isUploading = false;
        });
    }

    removeImage() {
        
    }
}
