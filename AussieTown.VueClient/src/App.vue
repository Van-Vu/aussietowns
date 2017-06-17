<template>
    <div id="app">
        <header class="hero-head">
            <nav-menu></nav-menu>
        </header>
        <secion class="hero-body">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </secion>
        <secion class="hero-foot">
            <div>
                This is the footer
            </div>
        </secion>
    </div>
</template>

<script lang="ts">
import App from "./App.ts";
export default App;
</script>

<style lang="scss">
    @import './sass/base.scss'
</style>