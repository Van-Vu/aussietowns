<template>
    <div class="loading-screen is-overlay is-flex" v-show="isLoading">
        <div class="loading-content absolute-center">
            <span class="absolute-center">{{loadingText}} ...</span>
            <ringloader class="absolute-center" :color="'#00FF00'"></ringloader>
        </div>
    </div>
</template>

<script lang="ts">
import ZoneLoadingComponent from "./zoneloading.component.ts";
export default ZoneLoadingComponent;
</script>