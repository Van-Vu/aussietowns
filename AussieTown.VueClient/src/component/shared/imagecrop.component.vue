<template>
    <div>
        <div id="imagecrop_filter1" v-show="isHeroImage()"></div>
        <div id="imagecrop_wrapper">
            <div id="imagecrop_draggable" v-bind:style="{ 'background-image': 'url(' + imageSources.cropImage.dataUrl + ')' }"></div>
        </div>
        <div id="imagecrop_filter2" v-show="isHeroImage()"></div>
        <button class="button mtl_button-no-round" @click="cropAndUpload">Save</button>
    </div>
</template>

<script lang="ts">
import ImageCropComponent from "./imagecrop.component.ts";
export default ImageCropComponent;
</script>