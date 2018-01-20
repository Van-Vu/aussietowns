<template>
    <div :id="userId" class="miniprofile-wrapper">
        <div class="overlay" @click="onRemoveUser()" v-if="isRemovable && !isPrimary">
            <span class="icon icon-minus-circle"></span>
        </div>
        <div class="overlay" v-if="isPrimary" @click="onViewUserProfile()">
            <p>Main host</p>
        </div>
        <router-link :to="{ name: 'profileHome', params: { seoString: profileLink, profileId: userId }}">
            <div class="photo_wrapper">
                <img class="is-circle" :src="profileImageUrl" :alt="fullName">
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