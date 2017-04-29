<template>
    <div :id="userId" class="miniprofile-wrapper">
        <div class="overlay" @click="onRemoveUser()" v-if="!isRemovable">
            <span class="glyphicon glyphicon-remove-sign"></span>
        </div>
        <div class="photo_wrapper">
            <a :href="profileUrl" target="_blank">
                <img class="profile_photo_img" :src="profileImageUrl" width="50" height="50" :alt="fullName">
            </a>
        </div>
        <div class="text_wrapper">
            <div>
                <a class="user" :href="profileUrl" target="_blank">{{fullName}}</a>
            </div>
            <div>
                <span>{{shortDescription}}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import MiniProfileComponent from "./miniprofile.component.ts";
export default MiniProfileComponent;
</script>