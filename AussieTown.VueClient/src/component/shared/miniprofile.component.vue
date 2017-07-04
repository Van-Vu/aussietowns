<template>
    <div :id="userId" class="miniprofile-wrapper">
        <div class="overlay" @click="onRemoveUser()" v-if="!isRemovable">
            <span class="glyphicon glyphicon-remove-sign"></span>
        </div>
        <router-link :to="{ name: 'profileHome', params: { seoString: profileLink, profileId: userId }}">
            <div class="photo_wrapper">
                <img class="profile_photo_img" :src="profileImageUrl" width="50" height="50" :alt="fullName">
            </div>
            <div class="text_wrapper">
                <div>{{fullName}}</div>
                <div>
                    <span>{{shortDescription}}</span>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script lang="ts">
import MiniProfileComponent from "./miniprofile.component.ts";
export default MiniProfileComponent;
</script>