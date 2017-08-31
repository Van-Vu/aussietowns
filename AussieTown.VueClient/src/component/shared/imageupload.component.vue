<template>
    <div>
        <div class="image-upload">
            <swiper v-if="images" ref="swiper"
                    direction="horizontal"
                    :mousewheel-control="true"
                    :performance-mode="false"
                    :pagination-visible="false"
                    :pagination-clickable="false"
                    @slide-change-end="onSlideChangeEnd"
                    :loop="false">
                <div v-for="image in images">
                    <img v-lazy="image.url" />
                </div>
            </swiper>
            <div class="removeImage" @click="onRemoveImage" v-if="isEditing && images.length > 0">
                <i class="glyphicon glyphicon-minus-sign" tooltip="Remove image"></i>
            </div>
        </div>
        <div>
            <div class="loading-screen is-flex is-overlay" v-if="isUploading">
                <span class="absolute-center">Uploading ...</span>
                <ringloader class="absolute-center"></ringloader>
            </div>
            <upload-image v-if="isEditing" :maxFileAllowed="maxFileAllowed" :maxFileConfig="maxFileConfig" @uploadImages="onUploadImages"></upload-image>
        </div>
    </div>
</template>

<script lang="ts">
import ImageUploadComponent from "./imageupload.component.ts";
export default ImageUploadComponent;
</script>