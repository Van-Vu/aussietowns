import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import VueUploadImage from './external/vueuploadimage.vue';
import Swiper from './external/vue-swiper.vue';
import ImageModel from '../../model/image.model';
import ZoneLoadingComponent from '../shared/zoneloading.component.vue';

import { NotificationType } from '../../model/enum';
import { GlobalConfig } from '../../GlobalConfig';

import ImageService from '../../service/image.service';

@Component({
    name: "ImageUploadComponent",
    components: {
        'vueUploadImage': VueUploadImage,
        'swiper': Swiper,
        'zoneloading': ZoneLoadingComponent
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

    @Watch('$store.state.isImageCropping')
    onImageCroppingModalChanged(value: string, oldValue: string) {
        if (!value) {
            this.$emit('uploadImageCompleted');
        }
    }

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
        this.isUploading = true;
        Array.from(Array(fileList.length).keys())
            .map(x => {
                return (new ImageService()).resizeImage(GlobalConfig.listingImageSize,
                    {
                        originalFileName: fileList[x].name,
                        originalFile: fileList[x],
                        storeAction: 'UPLOAD_LISTING_IMAGES',
                        storeActionId: this.$store.state.listing.id
                    }).then(() => {
                            this.isUploading = false;
                            if (!this.$store.state.isImageCropping) {
                                this.$emit('uploadImageCompleted');    
                            }
                        });
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

    removeImage() {
        
    }
}
