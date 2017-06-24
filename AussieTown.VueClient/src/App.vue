<template>
    <div id="app">
        <header class="hero-head">
            <nav-menu></nav-menu>
        </header>
        <secion class="hero-body">
            <transition :duration="{ enter: 5000, leave: 500 }" name="fade">
                <router-view></router-view>
            </transition>
        </secion>
        <secion class="hero-foot">
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