<template>
    <div>
        <div class="image-upload">
            <swiper ref="swiper"
                    direction="horizontal"
                    :showNavButton="true"
                    :mousewheel-control="true"
                    :performance-mode="false"
                    :pagination-visible="false"
                    :pagination-clickable="false"
                    @slide-change-end="onSlideChangeEnd"
                    :loop="false"
                    :totalImage="images.length">
                <div v-if="images.length > 0" v-for="image in images">
                    <img :src="image.url" :alt="image.url"/>
                </div>
                <div class="noimage" v-if="images.length == 0">
                </div>
            </swiper>
            
            <div class="removeImage" @click="onRemoveImage" v-if="isEditing && images.length > 0">
                <i class="icon icon-minus-circle" tooltip="Remove image"></i>
            </div>
        </div>
        <div>
            <zoneloading :isLoading="isUploading" :loadingText="'Uploading'"></zoneloading>
            <vueUploadImage v-if="isEditing" :maxFileAllowed="maxFileAllowed" :maxFileConfig="maxFileConfig" @uploadImages="onUploadImages"></vueUploadImage>
        </div>
    </div>
</template>

<script lang="ts">
import ImageUploadComponent from "./imageupload.component.ts";
export default ImageUploadComponent;
</script>