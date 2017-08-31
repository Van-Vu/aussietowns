<template>
    <div class="page-content container tile is-vertical">
        <button @click.prevent="switchModal">current {{currentView}}</button>

        <component v-bind:is="currentView">
            <!-- component changes when vm.currentView changes! -->
        </component>
     </div>
</template>

<script lang="ts">
import TestPage from "./test.page.ts";
export default TestPage;
</script>