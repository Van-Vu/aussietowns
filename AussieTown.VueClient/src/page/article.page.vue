<template>
    <div class="page-content container tile is-vertical article">
        <div class="tile">
            <router-link :to="{ name: 'TestPage' }"> Back to previous page </router-link>
        </div>
        <div class="tile is-parent">
            <!--<button class="tile button mtl_button-no-round" @click="onPublish">Publish</button>
            <button class="tile button mtl_button-no-round" @click="onArchive">Archive</button>-->
            <button class="tile button mtl_button-no-round" @click="onSave">Save article</button>
            <button class="tile button mtl_button-no-round" @click="onCancel">Cancel</button>
        </div>
        <div class="tile is-parent">
            <div class="tile is-6 is-vertical articleHeader_left">
                <div class="tile is-parent">
                    <h2 v-if="!isNew">Editing article {{model.id}}</h2>
                    <h2 v-if="isNew">Create new article</h2>
                </div>
                <div class="tile is-parent">
                    <div class="tile is-2">Status</div>
                    <div class="tile">
                        <div class="select">
                            <select name="gender" v-model="model.status">
                                <option value="0">Draft</option>
                                <option value="1">Publish</option>
                                <option value="2">Archive</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="tile is-parent">
                    <div class="tile is-2"><label for="isFeatured">Is Featured</label></div>
                    <div class="tile">
                        <input type="checkbox" id="isFeatured" v-model="model.isFeatured">
                    </div>
                </div>
                <div class="tile is-parent">
                    <div class="tile is-2">Article Type</div>
                    <div class="tile">
                        <div class="tile is-1"></div>
                        <div class="tile is-3">
                            <input type="radio" id="blog" value="0" v-model="model.category">
                            <label for="blog">Blog</label>
                        </div>
                        <div class="tile is-3">
                            <input type="radio" id="whatson" value="1" v-model="model.category">
                            <label for="whatson">What's On</label>
                        </div>
                        <div class="tile is-5">
                            <input type="radio" id="introduction" value="2" v-model="model.category">
                            <label for="introduction">Introduction</label>
                        </div>
                    </div>
                </div>
                <div class="tile is-parent">
                    <div v-if="isEditing" class="tile is-2" for="header">Title</div>
                    <div class="tile is-vertical control has-icon has-icon-right">
                        <input name="title" v-if="isEditing" v-model="model.title" v-validate="'required|max: 200'"
                               :class="{'input': true, 'is-danger': errors.has('title') }" type="text" placeholder="">
                        <i v-if="isEditing" class="icon icon-lock"></i>
                        <div v-show="errors.has('title')" class="help is-danger">{{ errors.first('title') }}</div>
                    </div>
                </div>
                <div class="tile is-parent">
                    <div v-if="isEditing" class="tile is-2" for="header">Tags</div>
                    <div class="tile is-vertical control has-icon has-icon-right">
                        <input-tag :on-change="onUpdateTag" :tags="model.tagList"></input-tag>
                    </div>
                </div>
            </div>
            <div class="tile article_image">
                <figure class="image" v-bind:class="{ 'is-16by9': !model.imageUrl }">
                    <img v-if="model.imageUrl" :src="model.imageUrl" alt="Header Image" />
                </figure>
                <input id="headImageUpload" type="file" style="display:none;" @change="onUploadImage($event.target.files); fileCount = $event.target.files.length" accept="image/*">
                <i class="icon icon-pencil icon-btn" @click.prevent="onReplaceImage"></i>
                <zoneloading :isLoading="isImageUploading" :loadingText="'Uploading'"></zoneloading>
            </div>
        </div>
        
        <div class="tile is-parent is-vertical">
            <div v-if="isEditing" class="tile is-2"></div>
            <div class="tile is-12">
                <vue-html5-editor :content="model.content" :height="300" :z-index="5"
                                    @change="onUpdateContent" :auto-height="false" :show-module-name="false"></vue-html5-editor>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import ArticlePage from "./article.page.ts";
export default ArticlePage;
</script>