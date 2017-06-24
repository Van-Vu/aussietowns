<template>
    <div>
        <upload-image url="bodomtest" name="bodomtest" :max_files="maxFileAllowed"></upload-image>
    </div>
</template>

<script lang="ts">
import UserImageComponent from "./userimage.component.ts";
export default UserImageComponent;
</script>