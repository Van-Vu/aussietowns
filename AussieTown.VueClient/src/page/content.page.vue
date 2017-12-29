<template>
    <div class="page-content contentPage">
        <component v-if="template.name" v-bind:is="template.name" v-bind="template.props"></component>
    </div>
    
</template>

<script lang="ts">
import ContentPage from "./content.page.ts";
export default ContentPage;
</script>