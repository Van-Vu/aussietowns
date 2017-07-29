<template>
    <div class="image-upload">
        <swiper v-if="images" ref="swiper"
                direction="horizontal"
                :mousewheel-control="true"
                :performance-mode="false"
                :pagination-visible="true"
                :pagination-clickable="true"
                @slide-change-end="onSlideChangeEnd"
                :loop="false">
            <div v-for="image in images">
                <img v-lazy="image.url" />
            </div>
        </swiper>
        <i v-if="isEditing && images.length > 0" class="glyphicon glyphicon-trash" @click="onRemoveImage"></i>
        <!--style="position:absolute;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,1);"-->
        <div class="loading-screen is-flex is-overlay" v-if="isUploading">
            <span class="absolute-center">Uploading ...</span>            
            <ringloader class="absolute-center"></ringloader>
        </div>        
        
        <upload-image v-if="isEditing" :max_files="maxFileAllowed" @uploadImages="onUploadImages"></upload-image>
    </div>
</template>

<script lang="ts">
import ImageUploadComponent from "./imageupload.component.ts";
export default ImageUploadComponent;
</script>