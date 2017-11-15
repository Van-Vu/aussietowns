import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import VueUploadImage from './external/vueuploadimage.vue';
import Swiper from './external/vue-swiper.vue';
import ImageModel from '../../model/image.model';
import RingLoader from './external/ringloader.vue';
import { NotificationType } from '../../model/enum';
import { GlobalConfig } from '../../GlobalConfig';

import ImageService from '../../service/image.service';

@Component({
    name: "ImageUploadComponent",
    components: {
        'vueUploadImage': VueUploadImage,
        'swiper': Swiper,
        'ringloader': RingLoader
    }
})

export default class ImageUploadComponent extends Vue {
    @Prop() uploadType: number;
    @Prop() images: ImageModel[];
    @Prop() isEditing: boolean;
    carouselCurrentPage: number = 1;
    isUploading: boolean = false;
    maxFileAllowed: number = GlobalConfig.maxImagesPerListing;
    maxFileConfig: number = GlobalConfig.maxImagesPerListing;

    created() {
        if (this.images) {
            this.maxFileAllowed -= this.images.length;    
        }
    }

    close() {
    }

    onSlideChangeEnd(currentPage) {
        this.carouselCurrentPage = currentPage;
    }

    onRemoveImage() {
        this.isUploading = true;
        this.$store.dispatch('REMOVE_IMAGE', { listingId: this.$store.state.listing.id, url: this.images[this.carouselCurrentPage - 1].url })
            .then(response => {
                this.maxFileAllowed += 1;
                this.$emit('uploadImageCompleted');
                this.isUploading = false;
            })
            .catch(error => {
                this.isUploading = false;
            });;
    }

    onUploadImages(fileList) {
        let storeAction;
        let actionId;

        Array.from(Array(fileList.length).keys())
            .map(x => {
                return (new ImageService()).resizeImage(GlobalConfig.listingImageSize,
                    {
                        originalFileName: fileList[x].name,
                        originalFile: fileList[x],
                        storeAction: 'UPLOAD_LISTING_IMAGES',
                        storeActionId: this.$store.state.listing.id
                    }).then(() => this.onUploadImageSuccess());
            });

        //for (var value of formData.values()) {
            //return (new ImageService()).resizeImage(GlobalConfig.heroImageSize,
            //    {
            //        originalFileName: fileList[x].name,
            //        originalFile: fileList[x],
            //        storeAction: 'UPLOAD_PROFILE_HEROIMAGE',
            //        storeActionId: this.$store.state.profile.id
            //    }).then(() => this.onUploadImageSuccess());
        //    console.log(value); 
        //}

        //this.isUploading = true;
        //if (this.uploadType === 0) {
        //    storeAction = 'UPLOAD_LISTING_IMAGES';
        //    actionId = this.$store.state.listing.id;
        //} else {
        //    storeAction = 'UPLOAD_PROFILE_IMAGES';
        //    actionId = this.$store.state.profile.id;
        //}

        //this.$store.dispatch(storeAction,
        //{
        //    data: formData,
        //    actionId: actionId
        //}).then(response => {
        //    this.maxFileAllowed -= response as any;
        //    this.$emit('uploadImageCompleted');
        //    this.isUploading = false;
        //})
        //.catch(error => {
        //    this.isUploading = false;
        //});
    }

    onUploadImageSuccess() {
        this.$emit('uploadImageCompleted');
        this.$store.dispatch('ADD_NOTIFICATION', { title: "Upload finish", type: NotificationType.Success });
    }

    removeImage() {
        
    }
}
