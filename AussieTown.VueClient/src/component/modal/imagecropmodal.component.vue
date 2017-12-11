<template>
    <modalshell :show.sync="show" @onClose="onClose">
        <h1 slot="header">Please crop your image</h1>
        <imagecrop :imageSources="imageSources" :imageSizeSettings="imageSizeSettings" @imageCropCompleted="onCompleted" slot="body"></imagecrop>
    </modalshell>
</template>

<script lang="ts">
import ImageCropModalComponent from "./imagecropmodal.component.ts";
export default ImageCropModalComponent;
</script>