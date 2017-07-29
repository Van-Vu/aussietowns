<template>
    <div class="loading-screen is-overlay is-flex" v-show="isLoading">
        <div class="loading-background is-overlay"></div>
        <div class="loading-content absolute-center">
            <span class="absolute-center">Loading ...</span>
            <ringloader class="absolute-center" :color="'#00FF00'"></ringloader>
        </div>
    </div>
</template>

<script lang="ts">
import LoadingComponent from "./loading.component.ts";
export default LoadingComponent;
</script>