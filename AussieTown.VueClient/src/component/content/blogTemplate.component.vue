<template>
    <div class="tile is-vertical blogContent">
        <div class="tile blogContent_header">
            <div class="tile is-vertical is-6 is-left">
                <h1>{{ model.title }}</h1>
                <div class="blogContent_author">Last update: {{model.updatedDate}}</div>
                <div>Author</div>
                <miniprofile :data="model.author" :isRemovable="false"></miniprofile>
            </div>
            <div class="tile blogContent_image">
                <figure class="image" v-bind:class="{ 'is-16by9': !model.imageUrl }">
                    <img v-if="model.imageUrl" :src="model.imageUrl" alt="Header Image" />
                </figure>
            </div>

        </div>
        <div class="tile blogContent_article">
            <div class="tile is-2 left_panel">
                <ul class="social-media">
                    <li>
                        <a @click="onFacebookShare" class="social-medial-icon social-medial-icon_facebook"></a>
                    </li>
                    <li>
                        <a @click="onTwitterShare" class="social-medial-icon social-medial-icon_twitter"></a>
                    </li>
                    <!--<li>
                        <a @click="onGooglePlusShare" class="social-medial-icon social-medial-icon_googlePlus"></a>
                    </li>-->
                    <li>
                        <a class="social-medial-icon social-medial-icon_instagram"></a>
                    </li>
                    <li>
                        <a class="social-medial-icon social-medial-icon_pinterest"></a>
                    </li>
                </ul>
            </div>
            <div class="tile is-vertical" v-html="model.content"></div>
        </div>
        <div class="tile is-center blogContent_topic">
            Topics: 
            <checkButton :model="model.tagList" :checked="model.tagList" :isEditing="false"></checkButton>
        </div>
    </div>
    
</template>

<script lang="ts">
import BlogTemplate from "./blogtemplate.component.ts";
export default BlogTemplate;
</script>